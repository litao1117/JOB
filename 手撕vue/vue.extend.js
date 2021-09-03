/**
 * vue.extend
 */

 Vue.cid = 0
 let cid = 1;
  
 Vue.extend = function(extendOptions){
  extendOptions = extendOptions || {};
  const Super = this;
  const SuperId = Super.cid;
  const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
  if(cachedCtors[SuperId]){
   return cachedCtors[SuperId];
  }
  const name = extendOptions.name || Super.options.name;
  if(process.env.NODE_ENV !== 'production'){
   if(!/^[a-zA-Z][\w-]*$/.test(name)){
    warn(
     'invalid component name:"'+name+'".Component names'+
     'can only contain alphanumeric characters and the hyphen,'+
     'and must start with a letter.'
    )
   }
  }
  const Sub = function VueComponent(options){
   this._init(options);
  }
//   <!-- 将父类原型继承到子类中 -->
//   <!-- cid每个类的唯一标识 -->
  Sub.prototype = Object.create(Super.prototype);
  Sub.prototype.constructor = Sub;
  Sub.cid = cid++;
//   <!-- 将父类的options选项继承到子类中 -->
  Sub.options = mergeOptions(
   Super.options,
   extendOptions
  )
  Sub['super'] = Super;
//   <!-- 如果选项中存在props属性，则初始化它 -->
  if(Sub.options.props){
   initProps(Sub);
  }
//   <!-- 如果选项中存在computed属性，则对它进行初始化 -->
  if(Sub.options.computed){
   initComputed(Sub);
  }
//   <!-- 将父类中存在的属性依次复制到子类中 -->
  Sub.extend = Super.extend;
  Sub.mixin = Super.mixin
  Sub.use = Super.use;
  ASSET_TYPES = ['component','directive','filter']
//   <!--  -->
  ASSET_TYPES.forEach(function(type){
   Sub[type] = Super[type];
  })
  
  if(name){
   Sub.options.components[name] = Sub;
  }
  
  Sub.superOptions = Super.options;
  Sub.extendOptions = extendOptions;
  Sub.sealedOptions = extend({},Sub.options);
//   <!-- 缓存构造函数 -->
  cachedCtors[SuperId] = Sub;
  return sub;
 }