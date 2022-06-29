//Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

//Input: nums = [1,1,1,2,2,3], k = 2
//Output: [1,2]
//Input: nums = [1], k = 1
//Output: [1]
public class TopKFrequent {
  public int[] topKFrequent(int[] nums, int k) {
    // O(1) time
    if (k == nums.length) {
        return nums;
    }
    
   Map<Integer, Integer> count = new HashMap<>();

    for (int num : nums) {
        count.put(num, count.getOrDefault(num, 0) + 1);
    }

    Set<Map.Entry<Integer, Integer>> entries = count.entrySet();
    Map<Integer, Integer> result = new LinkedHashMap<>();
    for (Map.Entry<Integer, Integer> entry : entries) {
        result.put(entry.getKey(), entry.getValue());
    }

    List<Map.Entry<Integer, Integer>> list = new LinkedList(result.entrySet());
    list.sort(new Comparator<Map.Entry<Integer, Integer>>() {
        @Override
        public int compare(Map.Entry<Integer, Integer> o1, Map.Entry<Integer, Integer> o2) {
            return o2.getValue().compareTo(o1.getValue());
        }
    });


    int[] top = new int[k];

    for (int i = 0; i < k; i++) {
        top[i] = list.get(i).getKey();
    }

    return top;
  }
}
