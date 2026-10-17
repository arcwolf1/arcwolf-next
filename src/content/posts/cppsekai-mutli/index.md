---
title: CppSekai Android/Linux移植版正式发布
published: 2026-10-18T00:53:00
description: '终于能在MP4打烤了'
image: ''
tags: ['游戏','Games','Coding','PJSK']
category: '杂七杂八'
draft: false 
lang: ''
---
## 前言
:::warning
本项目与 SEGA、Colorful Palette 及《初音未来：缤纷舞台》官方没有任何关系；相关素材版权归官方所有，仅限本地学习与练习使用。如有侵权请联系移除。 
:::
刷stcn的时候看到了这么个项目:[CppSekai](https://forum.smart-teach.cn/d/3037-zhuan-wei-ban-ji-xi-wo-she-ji-de-pjskmo-ni-qi-cppsekai)  
![image](image.png)    
::github{repo="BSOD-MEMZ/CppSekai"}  
但可惜不支持linux和安卓，遂着手移植到这两个平台上，顺带做了个[官网](https://www.arcwolf.top/cppsekai)。  
在大肥鱼的协助下，耗时一周，成功将这玩意放到了这两个平台。  
这下，终于可以在各类垃圾设备上打烤了。  
同时，我也开源了移植后的版本：
::github{repo="arcwolf1/CppSekai-droid"}  
::github{repo="arcwolf1/CppSekai-linux"}  

## 介绍
虽说原作者介绍的很详细了，官网也有，但我还是想写(  
这玩意纯c++写的（抛开安卓那个ndk不谈），性能开销很低，mt6572这种老古董都能玩，而且轻量到离谱，整个包也才15mb左右，属于是那种有点地方就能装的玩意  
原作者有aero，多人和smtc，我砍了。你觉得安卓能开两个窗口吗？smtc在安卓毫无用处，OpenGL ES 2带不起aero，全砍了还省点代码，又不是不能玩。  
其他功能的话就是原汁原味了，基本没咋改过。  
（原谅安卓端那个老手机味的下载器，纯java和原生库搓的，能用就行）  
其他的看官网吧，上面啥都有。
