//Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array. The result should also be sorted in ascending order.

//An integer a is closer to x than an integer b if:

//|a - x| < |b - x|, or
//|a - x| == |b - x| and a < b

//Input: arr = [1,2,3,4,5], k = 4, x = 3
//Output: [1,2,3,4]

//Input: arr = [1,2,3,4,5], k = 4, x = -1
//Output: [1,2,3,4]

class Solution {
  public List<Integer> findClosestElements(int[] arr, int k, int x) {
      // find 4 numbers in which they are close to 3
      
      List<Integer> result = new ArrayList<>();
      for (int i : arr) {
          result.add(i);
      }
      //Collections.sort -> from small to big
      Collections.sort(result, (num1, num2) -> Math.abs(num1 - x) - Math.abs(num2 - x));
      
      result = result.subList(0, k);
      
      Collections.sort(result);
      return result;
  }
}