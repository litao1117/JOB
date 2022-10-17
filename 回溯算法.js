// 全排列
function permute(nums) {
    let lists = [];
    let list = [];
    backtrack(nums, list, lists);
    return lists;

    function backtrack(nums, list, lists) {
        if (list.length === nums.length) {
            lists.push(list.slice())
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (list.includes(nums[i])) {
                continue;
            }
            list.push(nums[i]);
            backtrack(nums, list, lists);
            list.pop()
        }
    }
}

// console.log(permute([1,2,3]));

// 全排列，不重复的序列
function permuteUnique(nums) {
    const list = [];
    const lists = [];
    nums = nums.sort((a, b) => a - b);
    backtrack(nums, list, lists, []);
    return lists;

    function backtrack(nums, list, lists, used) {
        if (list.length === nums.length) {
            lists.push(list.slice())
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i] || (i > 0 && nums[i] === nums[i-1] && !used[i-1])) {
                continue;
            }
            list.push(nums[i]);
            used[i] = true;
            backtrack(nums, list, lists, used);
            list.pop()
            used[i] = false
        }
    }
}

// console.log(permuteUnique([1,1,2]))