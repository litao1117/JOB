# CSS
## css中属性继承性总结
1. css可以和不可以继承的属性
* 不可继承的：display、margin、border、padding、background、height、min-height、max-height、width、min-width、max-width、overflow、position、left、right、top、bottom、z-index、float、clear、table-layout、vertical-align、page-break-after、page-bread-before和unicode-bidi。
* 所有元素可继承：visibility和cursor。
* 内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、font-family、font-size、font-style、font-variant、font-weight、text-decoration、text-transform、direction。
* 终端块状元素可继承：text-indent和text-align。
* 列表元素可继承：list-style、list-style-type、list-style-position、list-style-image。
* 表格元素可继承：border-collapse。

2. 值的继承

    继承也是基于文档树的，文档树中元素的某些属性可以被其子元素继承，每一个CSS属性都定义了它能否被继承。要设定文档的某些缺省样式属性，可以在文档树的根上设定该属性，如果这个属性可以继承，则其后代元素将继承这个属性，例如color、font-size等属性。

3. “inherit(继承)”值

    每一个属性可以指定值为“inherit”，即：对于给定的元素，该属性和它父元素相对属性的计算值取一样的值。继承值通常只用作后备值，它可以通过显式地指定“inherit”而得到加强，例如：
```css
p { font-size: inherit; }
```

4. 继承的局限性

    继承虽然减少了重复定义的麻烦，但是，有些属性是不能继承的，例如border（边框）、margin（边距）、padding（补白）和背景等。
    这样设定是有道理的，例如，为一个元素设定了边框，如果此属性也继承的话，那么在这个内所有的元素都会有边框，这无疑会产生一个让人眼花缭乱的结果。同样的，影响元素位置的属性，例如margin（边距）和padding（补白），也不会被继承。
    　　同时，浏览器的缺省样式也在影响着继承的结果。例如：
```html
<h2>2级标题的文字不是12px。</h2> 
<!-- H2中文字将是标题2样式的文字而非12px大小的文字。 -->
body { font-size: 12px; }
```
这是因为浏览器的缺省样式设定了```<h2>```的CSS规则。同时，有些老版本的浏览器可能对继承支持的不太好，例如某些浏览器当遇到```<table>```的时候，就会丢失所有的继承的属性

5. 能否取消

    css属性一旦继承了不能被取消，只能重新定义样式。

6. 案例

    父元素position:relative，子元素：position:absolute，父元素宽度固定，子元素会继承父元素的宽度（对于二级导航很重要，当隐藏的那个导航栏宽度不固定，或者宽度大于父元素时，此时一般只能重新设置子元素的宽度）
