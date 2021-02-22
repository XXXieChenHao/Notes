# JavaScript 模块化全面解析

IE6 之前没有 JS 引擎， JS 引擎只是渲染引擎的一部分

原来脚本文件两种形式
1. 在html中写 `<script type="text/javascript">...</script>`
2. 单独引入一个脚本文件 `<script src="..."></script>`

随着互联网的发展，JavaScript 的作用越来越重要，代码也越写越多，于是一个页面只维护一个页面的脚本。相应的不同的页面引用不同的脚本文件。

模块化是为了解决一个很现实的问题。
1. 加载顺序
2. 污染全局