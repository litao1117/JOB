/*
 * @Descripttion: js实现优先队列、最小、最大
 * @version: 1.0.0
 * @Author: litao39@baidu.com
 * @Date: 2022-01-14 16:40:33
 * @LastEditors: litao39@baidu.com
 * @LastEditTime: 2022-01-14 17:00:54
 */

// 优先队列
function PriorityQueueSimple(maxLength = null, type = 'min') {
    var queue = [];
    this.maxLength = maxLength;
    this.type = type;
    // 队列是否为空
    this.isEmpty = function () {
        return !queue.length;
    };
    this.value = function () {
        return queue;
    };
    this.enqueue = function (item) {
        if (this.isEmpty()) {
            queue.push(item);
        } else {
            var flag = false; //判断是否排队
            for (let i = 0; i < queue.length; i++) {
                if(this.type === 'min') {
                    if (queue[i].priority <= item.priority) {
                        if(this.size() === this.maxLength) {
                            queue.splice(i, 0, item);
                            queue.shift();
                        } else {
                            queue.splice(i, 0, item);
                        }
                        flag = true;
                        break;
                    }
                } else {
                    if (queue[i].priority >= item.priority) {
                        if(this.size() === this.maxLength) {
                            queue.splice(i, 0, item);
                            queue.shift();
                        } else {
                            queue.splice(i, 0, item);
                        }
                        flag = true;
                        break;
                    }
                }
            }
            // 循环后未入队，优先级最大，插入到第一位
            if (!flag) {
                if(this.size() === this.maxLength) {
                    queue.shift();
                } 
                queue.push(item);                
            }
        }
    };
    this.dequeue = function () {
        if(this.size() === 0) {
            throw new Error('队列已经为空');
        }
        // 出队直接将排在第一位的元素弹出
        return queue.pop();
    }
    this.size = function () {
        return queue.length;
    }
    this.front = function () {
        return queue[this.size() - 1];
    }
}

let pq = new PriorityQueueSimple(3, 'min');
pq.enqueue({priority: 1});
pq.enqueue({priority: 4});
pq.enqueue({priority: 2});
pq.enqueue({priority: 6});
console.log(pq.value());