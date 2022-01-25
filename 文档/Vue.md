# 组件间通信方式

https://segmentfault.com/a/1190000019208626

1. props/$emit
    1. 父组件向子组件传值（props）
    2. 子组件向父组件传值（$emit）
2. eventbus
3. vuex 与 localstorage
4. $attrs/$listeners
5. provide/inject
6. $parent / $children 与 ref

常见使用场景可以分为三类：

-   父子通信：

父向子传递数据是通过 props，子向父是通过 events（`$emit`）；通过父链 / 子链也可以通信（`$parent` / `$children`）；ref 也可以访问组件实例；provide / inject API；`$attrs/$listeners`

-   兄弟通信：

Bus；Vuex

-   跨级通信：

Bus；Vuex；provide / inject API、`$attrs/$listeners`

# vue 与 react 思想对比
https://www.cnblogs.com/zhulimin/p/13168623.html
# vue 与 react diff对比
https://www.jianshu.com/p/fac3d2b112a6

# diff 算法
## vue2 
https://segmentfault.com/a/1190000008782928
```js
function patch(oldVnode, vnode) {
    if (sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode);
    } else {
        const oEl = oldVnode.el;
        let parentEle = api.parentNode(oEl);
        createEle(vnode);
        if (parentEle !== null) {
            api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl));
            api.removeChild(parentEle, oldVnode.el);
            oldVnode = null;
        }
    }
    return vnode;
}

function patchVnode(oldVnode, vnode) {
    const el = (vnode.el = oldVnode.el);
    let i,
        oldCh = oldVnode.children,
        ch = vnode.children;
    if (oldVnode === vnode) return;
    if (
        oldVnode.text !== null &&
        vnode.text !== null &&
        oldVnode.text !== vnode.text
    ) {
        api.setTextContent(el, vnode.text);
    } else {
        updateEle(el, vnode, oldVnode);
        if (oldCh && ch && oldCh !== ch) {
            updateChildren(el, oldCh, ch);
        } else if (ch) {
            createEle(vnode); //create el's children dom
        } else if (oldCh) {
            api.removeChildren(el);
        }
    }
}
function updateChildren (parentElm, oldCh, newCh) {
    let oldStartIdx = 0, newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx
    let idxInOld
    let elmToMove
    let before
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {   //对于vnode.key的比较，会把oldVnode = null
                oldStartVnode = oldCh[++oldStartIdx]
            }else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx]
            }else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx]
            }else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx]
            }else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode)
                oldStartVnode = oldCh[++oldStartIdx]
                newStartVnode = newCh[++newStartIdx]
            }else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode)
                oldEndVnode = oldCh[--oldEndIdx]
                newEndVnode = newCh[--newEndIdx]
            }else if (sameVnode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode)
                api.insertBefore(parentElm, oldStartVnode.el, api.nextSibling(oldEndVnode.el))
                oldStartVnode = oldCh[++oldStartIdx]
                newEndVnode = newCh[--newEndIdx]
            }else if (sameVnode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode)
                api.insertBefore(parentElm, oldEndVnode.el, oldStartVnode.el)
                oldEndVnode = oldCh[--oldEndIdx]
                newStartVnode = newCh[++newStartIdx]
            }else {
               // 使用key时的比较
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) // 有key生成index表
                }
                idxInOld = oldKeyToIdx[newStartVnode.key]
                if (!idxInOld) {
                    api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                    newStartVnode = newCh[++newStartIdx]
                }
                else {
                    elmToMove = oldCh[idxInOld]
                    if (elmToMove.sel !== newStartVnode.sel) {
                        api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                    }else {
                        patchVnode(elmToMove, newStartVnode)
                        oldCh[idxInOld] = null
                        api.insertBefore(parentElm, elmToMove.el, oldStartVnode.el)
                    }
                    newStartVnode = newCh[++newStartIdx]
                }
            }
        }
        if (oldStartIdx > oldEndIdx) {
            before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].el
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx)
        }else if (newStartIdx > newEndIdx) {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
        }
}
```

## vue3
https://zhuanlan.zhihu.com/p/150103393