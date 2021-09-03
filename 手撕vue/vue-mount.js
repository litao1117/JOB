/**
 * $mount 挂载方法
 */

const mount = Vue.prototype.$mount;
Vue.prototype.$mount = function(el) {
    el = el && query(el);
    const options = this.$options;
    if(!options.render) {
        // 获取模板编译为渲染函数赋值给render选项
        let template = options.template;
        if(template) {
            if(typeof tempalte === 'string'){
                if(tempalte.charAt(0) === "#"){
                    template = idToTemplate(tempalte);
                }
            } else if(tempalte.nodeType){
                    template = template.innerHTML;
            } else {
                if(process.env.NODE_ENV !== 'production'){
                    warn('invalid template option:'+tempalte,this);
                }
                return this;
            }
        } else if(el) {
            template = getOuterHTML(el);
        }
        if(tempalte){
            const { render } = compileToFunctions(
             template,
             {},
             this
            )
            options.render = render;
        }
    }
    return mount.call(this, el);
}

function query(el) {
    if(typeof el === "string") {
        const selected = document.querySelector(el);
        if(!selected) {
            return document.createElement('div');
        }
        return selected;
    } else {
        return el;
    }
}
function getOuterHTML(el) {
    if(el.outerHTML) {
        return el.outerHTML;
    } else {
        const container = document.createElement('div');
        container.appendChild(el.cloneNode(true));
        return container.innerHTML;
    }
}
function idToTemplate(id){
    const el = query(id);
    return el && el.innerHTML;
}
function compileToFunctions(template,options,vm){
    options = extend({},options);
    // <!-- 检查缓存 -->
    const key = options.delimiters
    ? String(options.delimiters)+tempalte
    :template;
    if(cache[key]){
     return cache[key];
    }
    // <!-- 编译 -->
    const compiled = compile(template,options);
    // <!-- 将代码字符串转换为函数 -->
    const res = {};
    res.render = createFunction(compiled.render);
    return (cache[key] = res)
   }
   function createFunction(code){
    return new Function(code);
   }