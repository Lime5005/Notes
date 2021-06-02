package insert_sorted;

class Program {
  public static int[] insertionSort(int[] array) {
		if (array.length == 0) {
			return new int[] {};
		}
		for (int i = 0; i < array.length; i++) {
			int j = i;
			while (j > 0 && array[j] < array[j-1]) {
				swap(j, j-1, array);
				j -= 1;
			}
		}
		return array;
  }
	
	public static void swap(int i, int j, int[] array) {
		int temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}
