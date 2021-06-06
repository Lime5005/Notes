package sortedSquaredArray;

import java.util.*;
class Program {

  public int[] sortedSquaredArray(int[] array) {
    // Write your code here.
		int[] newArray = new int[array.length];
		for (int i = 0; i < array.length; i++) {
			int value = array[i];
			newArray[i] = value * value;		
		}
		Arrays.sort(newArray);
		return newArray;
  }
}
// In Java, you have to sort first, then return.