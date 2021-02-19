# Template 模板引擎原理

Templace 模板引擎将不显示在页面中的结构通过遍历、字符串替换的方式重新渲染进页面中去

## script 标签

\<script> 用于定义客户端脚本，script 既可以包含脚本语句，也可以通过 src 属性指向外部脚本文件

\<script> 标签具有一个属性 type ，此属性规定脚本的类型，常用属性有

- text/javascript
- text/ecmascript
- application/ecmascript
- application/javascript
- text/vbscript

而 type 属性如果写错或者写其他内容时，浏览器不会将此内容展示在页面上，也不会按照 javascript 的解析方式进行解析。

 Template 模板引擎的 script 片段实际上定义了一个被 JS 调用的代吗，代码不在页面显示



## replace 方法

>  String.prototype.replace()

`replace()`方法返回一个由**替换值**替换部分或所有的模式匹配项后的新字符串。简而言之通过一定规则替换一部分内容，返回新字符串。规则可以是一个字符串或者一个正则表达式。

```javascript
string.replace(正则/字符串, 替换的字符串/function)
```

`replace()`方法并不会改变字符串原本，只是返回替换后的一个新的字符串



## replace 中的第二参数

在 repalce 方法中可以指定一个**函数**作为第二个参数。在这种情况下，当匹配执行后，该函数就会执行。 函数的返回值作为替换字符串。如果第一个参数是正则表达式，并且为全局匹配模式，则每一次匹配都将会调用此函数



```javascript
string.replace('正则表达式', fucntion (match, p1,p2, ... , offset, string) {
               // match 为匹配的子串
               // p1,p2, ...  代表第n个括号匹配的字符串 
               // 如果是用 /(\a+)(\b+)/ 这个来匹配，p1 就是匹配的 \a+，p2 就是匹配的 \b+
               // offset 偏移量
               // string 原字符串
               })
```

我们使用第二项即可，注意当正则表达式为全局匹配模式，每一次调用都将执行此函数

此函数拥有一个返回值，返回的值作为匹配内容的替换

## 代码实现

Template 实现主要分为三部分

- 页面结构
- 结构替换
- 渲染页面

首先在 HTML 中书写如下代码 

type 可以写 type 规定类型以外随意

```html
<ul id="list"></ul>
<script type="text/html" id="J_tpl">	// 标识 script 后续获取结构使用
  <li>
    <div>{{name}}</div>
    <div>{{age}}</div>
    <div>{{sex}}</div>
  </li>
</script>
```

在另一个 script 标签或 脚本文件中 书写以下代码

```javascript
// 声明模拟数据
    var arr = [
      { name: 'xichao', age: '24', sex: '男' },
      { name: 'zs', age: '18', sex: '女' },
      { name: 'ls', age: '22', sex: '男' },
      { name: 'ww', age: '33', sex: '男' },
      { name: 'zl', age: '25', sex: '女' },
    ]

    function init() {
      var list = document.getElementById('list'); 
      list.innerHTML = render(arr) // 将render函数编写为纯函数 接收返回值渲染页面
    }

    function render(arr) {
      var J_tpl = document.getElementById('J_tpl').innerHTML, // 获取模板结构
        li_item = '';

      arr.forEach(function (item, index) {
        li_item += J_tpl.replace(/{{(.*?)}}/g, function (node, key) {
          return {
            name: item.name,
            age: item.age,
            sex: item.sex
          }[key]
            
          // 此正则匹配 {{}} 中 (.*?) 任意数量的任意字符的重复
          /*
          * return {
          *		name: 'xichao',
          *		age: 24,
          *		sex: '男'
          *	}[key]  其中 key 为匹配到的内容 (.*?)
          *	key 值为 {{中的内容}}  有 name  age  sex  
          *	实际上返回的就是 对象的[name]属性
          *	function将返回值作为正则匹配的替换 替换调原有的 {{name}}
          */
        })
      })

      return li_item;
    }

    init();

```

至此页面中就已加载完成 同时 script 标签中的各个标签也可以添加类名 设置样式。



