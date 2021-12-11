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
 * 手撕jsonp
 */

function creatScript(url) {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('url', url);
    script.async = true;
    return script;
}

function jsonp(url, onSuccess, onError) {
    const hash = Math.random().toString().slice(2);
    window['jsonp'+hash] = function(data) {
        if(onSuccess && typeof onSuccess === 'function') {
            onSuccess(data);
        }
    }
    const script = creatScript(url+'?callback=jsonp'+hash);
    script.onload = script.onreadystatechange = function() {
        if(!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
            script.onload = script.onreadystatechange = null;
            if(script.parentNode) {
                script.parentNode.removeChild(script);
            }
            window['jsonp'+hash] = null;
        }
    }
    script.onerror = function() {
        if (onError && typeof(onError) === 'function') {
            onError();        
        }    
    }

    document.getElementsByTagName('head')[0].appendChild(script);
} 