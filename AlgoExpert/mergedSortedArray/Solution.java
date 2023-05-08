package mergedSortedArray;
//You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

// Merge nums1 and nums2 into a single array sorted in non-decreasing order.

// The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.

//Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// Output: [1,2,2,3,5,6]
// Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
// The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.

//Input: nums1 = [1], m = 1, nums2 = [], n = 0
// Output: [1]
// Explanation: The arrays we are merging are [1] and [].
// The result of the merge is [1].
public class Solution {
  public void merge(int[] nums1, int m, int[] nums2, int n) {
    int r1 = m - 1;
    int r2 = n - 1;
    for (int w = m + n - 1; w >= 0; w--) { // Use the length of m + n as the index of the merged array
      if (r1 >= 0 && r2 >= 0) {
        nums1[w] = nums1[r1] > nums2[r2] ? nums1[r1--] : nums2[r2--]; // The writing pointer moves from right end to left one by one
      } else if (r1 >= 0) {
        nums1[w] = nums1[r1--]; // If r2 is exhausted, just copy the rest of r1 to nums1
      } else {
        nums1[w] = nums2[r2--];
      }
    }
    return;
  }
}
