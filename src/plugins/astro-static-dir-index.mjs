import fs from "node:fs";
import path from "node:path";

const DEFAULT_DIRS = ["cppsekai"];

/**
 * 让 public/ 下的独立静态站点（例如 public/cppsekai）在 dev 环境下
 * 也能通过目录地址（/cppsekai/）访问。
 *
 * 背景：Astro dev 只按精确路径查找 public/ 下的文件，
 * 请求 /cppsekai/ 时不会自动回退到 /cppsekai/index.html，因此补一个中间件。
 *
 * @param {{ dirs?: string[] }} [options]
 */
export function staticDirIndex(options = {}) {
	const dirs = options.dirs ?? DEFAULT_DIRS;

	return {
		name: "astro-static-dir-index",
		hooks: {
			"astro:config:setup": ({ updateConfig }) => {
				updateConfig({
					vite: {
						plugins: [
							{
								name: "astro-static-dir-index:middleware",
								enforce: "pre",
								configureServer(server) {
									const publicDir = path.resolve(
										server.config.publicDir,
									);
									server.middlewares.use(
										createDirIndexMiddleware(publicDir, dirs),
									);
								},
							},
						],
					},
				});
			},
			// 部署时（静态托管）由托管平台自己处理目录索引，
			// 这里只需要在本地 dev 预览时生效
		},
	};
}

function createDirIndexMiddleware(publicDir, dirs) {
	return function dirIndex(req, res, next) {
		if (!req.url || (req.method !== "GET" && req.method !== "HEAD")) {
			next();
			return;
		}

		const [rawPath] = req.url.split("?");
		let pathname;
		try {
			pathname = decodeURIComponent(rawPath);
		} catch {
			next();
			return;
		}

		const dir = dirs.find(
			(item) =>
				pathname === `/${item}` || pathname.startsWith(`/${item}/`),
		);
		// 只接管目录本身和目录内的请求，其它请求原样交给 Astro
		if (!dir || !pathname.endsWith("/")) {
			next();
			return;
		}

		const filePath = path.resolve(publicDir, `.${pathname}`, "index.html");
		if (
			!filePath.startsWith(`${publicDir}${path.sep}`) ||
			!fs.existsSync(filePath) ||
			!fs.statSync(filePath).isFile()
		) {
			next();
			return;
		}

		res.statusCode = 200;
		res.setHeader("Content-Type", "text/html; charset=utf-8");
		res.setHeader("Cache-Control", "no-cache");
		if (req.method === "HEAD") {
			res.end();
			return;
		}
		fs.createReadStream(filePath).pipe(res);
	};
}
