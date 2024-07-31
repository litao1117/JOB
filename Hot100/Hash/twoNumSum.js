/**
 * 1.两数之和
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 */

function twoSum(nums, target) {
  let temp = {}
  for (let i = 0; i < nums.length; i++) {
    let dif = target - nums[i]
    if (temp[dif] !== undefined) {
      return [temp[dif], i]
    }
    temp[nums[i]] = i
  }
}
