import java.util.*;
//O(n^2)| O(1) space complexity 在同一个数组中做比较，每个元素比较2次。
class Program {
    public static int[] selectionSort(int[] array) {
      if (array.length == 0) {
        return new int[] {};
      }

      int startIdx = 0;
//If array.length > 1;
      while (startIdx < array.length - 1) {
        int minIdx = startIdx; // The smallest index is the next index going to be compared.
        for (int i = startIdx + 1; i < array.length; i++) {
          if (array[minIdx] > array[i]) { // i 是第二位，如果第二位比第一位小，那么第二位就是最小的
            minIdx = i;
          }
        }
        swap(startIdx, minIdx, array);//在数组中交换0和1位置的数据
        startIdx++; //继续比较下一位
      }
      return array;
  }

    public static void swap(int i, int j, int[] array) {
      int temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

}
  

