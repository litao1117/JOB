# vue3
1. 无法在setup中使用this
2. script中定义的常量也必须在setup中通过return才能够使用
3. reactive数据和props解构构之后会失去响应性
	reactive内部其实是对数据进行了proxy处理，返回了一个proxy对象，结构的时候会跳过这层proxy对象之间copy值，所以也就获取不到get set方法，失去响应性。
	要具有响应性可通过toRefs去处理。
4. setup只会执行一次作为配置项，在beforeCreate之前
5. antd select组件value绑定一个state为空或者是null时placeholder不起作用，设为undefined
6. csv文件的编码格式与电脑excel编码格式不一样，会导致中文乱码问题
7. antd的initialValues不能被setState动态更新

# react
1. reducer必须配置default返回一个state
2. antd表格的row-key必须不会有重复的，否则渲染数据会出问题，比如排序后的数据
3. useEffect依赖项是一个数组或者对象时要注意。 可以使用useCompare自定义hook做比较

# css
1. 父元素设置min-height的时候子元素height：100%不会继承父元素的高度，因为父元素其实真正的高度是由min-height和内容高度共同决定了，min-height目前是个无效高度，子元素不会继承， 改为height：inherit