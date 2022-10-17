/**
 * 数组转树
 */

const arr = [
  {id:1, parentId: null, name: 'a'},
  {id:2, parentId: null, name: 'b'},
  {id:3, parentId: 1, name: 'c'},
  {id:4, parentId: 2, name: 'd'},
  {id:5, parentId: 1, name: 'e'},
  {id:6, parentId: 3, name: 'f'},
  {id:7, parentId: 4, name: 'g'},
  {id:8, parentId: 7, name: 'h'},
]

// map
function arr2tree(arr) {
  if(!Array.isArray(arr) || !arr.length) return;
  let map = {};
  arr.forEach(item => map[item.id] = item);
  let roots = [];
  arr.forEach(item => {
    const parent = map[item.parentId];
    if(parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      roots.push(item);
    }
  })
  return roots;
} 

// console.log(JSON.stringify(arr2tree(arr)));

// 递归
function findChild(arr, pid) {
  let res = [];
  arr.forEach(item => {
    if(item.parentId === pid) {
      let itemChildren = findChild(arr, item.id);
      if(itemChildren.length) 
        item.children = itemChildren;
      res.push(item);
    }
  });
  return res;
}
// function arr2Tree(arr) {
//   let roots = [];
//   arr.forEach(item => {
//     if(!item.parentId) {
//       item.children = findChild(arr, item.id);
//       roots.push(item);
//     }
//   })
//   return roots;
// }
// console.log(JSON.stringify(findChild(arr, null)));
let a = arr2tree(arr);
// console.log(a);

/**
 * 树转数组
 */

// 深度优先遍历
function dfs(root) {
  const stack = Array.isArray(root) ? [...root] : [root];
  const res = [];
  while(stack.length) {
    let node = stack.pop();
    res.push(node);
    let children = node.children;
    if(children && children.length) {
      for(let i = children.length-1; i >= 0; i--) 
        stack.push(children[i]);
    }
  }
  return res;
}

console.log(dfs(a));;

// 广度优先遍历
function bfs(root) {
  const queue = Array.isArray(root) ? [...root] : [root];
  const res = [];
  while(queue.length) {
    let node = queue.shift();
    res.push(node);
    let children = node.children;
    if(children && children.length) {
      for(let i = 0; i < children.length; i++) 
        queue.push(children[i]);
    }
  }
  return res;
}

// 二叉树的深度
// 递归
function maxDepth(root) {
  if(!root) return 0;
  let leftDepth = maxDepth(root.left);
  let rightDepth = maxDepth(root.right);
  return leftDepth > rightDepth ? leftDepth + 1 : rightDepth + 1;
}

// 广度遍历
function maxDepth1(root) {
  if(!root) return 0;
  let queue = [root];
  let depth = 0;
  while(queue.length) {
    let queueLength = queue.length;
    while(queueLength) {
      let node = queue.shift();
      if(node.left) queue.push(node.left);
      if(node.right) queue.push(node.right);
      queueLength--;
    }
    depth++;
  }
  return depth;
}