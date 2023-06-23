package pairsOfSongs60;

public class Solution {
  public int numPairsDivisibleBy60(int[] time) {
    Map<Integer, Integer> map = new HashMap<>();
    int count = 0;
    for (int t : time) {
      // t % 60 is the remainder of t / 60
      int remainder = t % 60;
      // If remainder == 0, then pairNext = 0. No need to check map.
      // If remainder != 0, then pairNext = 60 - mod. Check if map containsKey(pairNext).
      int pairNext = remainder == 0 ? 0 : 60 - remainder;
      count += map.getOrDefault(pairNext, 0);
      // Put remainder into map after count += map.getOrDefault(pairNext, 0);
      // Because we don't want to count the current remainder into map.
      // We only want to count the previous remainder into map.
      // For example, if remainder == 20, then we want to check if map containsKey(40).
      // We don't want to check if map containsKey(20).
      map.put(remainder, map.getOrDefault(remainder, 0) + 1);
      // + 1 because we want to count the current remainder into map.
      // For example, if remainder == 20, then we want to put 20 into map.
      // Because we want to check if map containsKey(40) in the next iteration.
    }
    return count;
  }
  
}
