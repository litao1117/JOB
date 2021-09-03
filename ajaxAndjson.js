/**
 * js写一个简单的ajax请求
 * 1.创建一个ajax对象
 * 2.调用xhr对象的open方法
 * 3.send一些数据
 * 4.对服务器的响应过程进行监听，来知道服务器是否正确得出了响应，接着就可以做一些事情。
 * 比如获取服务器响应内容，在页面上进行呈现
 */

//
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
        if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            console.log(xhr.responseText);
        } else {
            console.log("fail");
        }
    }
}
xhr.open('get', 'http://js.com/day6/ajax_get.php');
xhr.send(null);



/**
 * 
 */