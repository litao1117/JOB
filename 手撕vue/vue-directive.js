/**
 * Vue.directive
 * 注册或获取全局指令，自定义指令
 */

Vue.options = Object.create(null);
Vue.options['directive'] = Object.create(null);

Vue.directive = function(id, definition) {
    if(!definition) {
        return this.options['directive'][id];
    } else {
        if(typeof definition === 'function') {
            definition = {bind: definition, update: definition};
        }
        this.options['directive'][id] = definition;
        return definition;
    }
}


/**
 * Vue.filter
 * 注册或获取全局过滤器
 */

Vue.options['filters'] = Object.create(null);
 
Vue.filter = function(id,definition){
  if(!definition){
   return this.options['filters'][id];
  }else{
   this.optipns['filters'][id] = definition;
   return definition;
  }
}

/**
 * Vue.component
 * 注册或获取全局组件。注册组件时，还会自动使用给定的id设置组件的名称。
 */

 Vue.options['components'] = Object.create(null);
 
 Vue.component = function(id,definition){
  if(!definition){
   return this.options['components'][id];
  }else{
   if(isPlainObject(definition)){
    definition.name = definition.name || id;
    definition = Vue.extend(definition);
   }
   this.optipns['components'][id] = definition;
   return definition;
  }
 }
