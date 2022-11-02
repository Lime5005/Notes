// Given two strings s1 and s2, return true if s2 contains a permutation 无序排列组合 of s1, or false otherwise.

//In other words, return true if one of s1's permutations is the substring of s2.

//Input: s1 = "ab", s2 = "eidbaooo"
// Output: true
// Explanation: s2 contains one permutation of s1 ("ba").

//Input: s1 = "adc", s2 = "dcda"
// Output: true
// Explanation: s2 contains one permutation of s1 ("adc").


package permutationInString;

import java.util.HashMap;
import java.util.Map;

public class PermutationInString {
  public boolean checkInclusion(String s1, String s2) {
    //1, Fail fast
    if (s2.length() < s1.length()) return false;
    //2, Initiate comparing two Maps
    Map<Character, Integer> sMap1 = new HashMap<>();
    for (int i = 0; i < s1.length(); i++) {
      sMap1.put(s1.charAt(i), sMap1.getOrDefault(s1.charAt(i), 0) + 1);
    }
    //2.1, Loop through only the necessary length
    for (int i = 0; i <= s2.length() - s1.length(); i++) {
      Map<Character, Integer> sMap2 = new HashMap<>();
      //2.2, Window size is s1's length
      for (int j = 0; j < s1.length(); j++) {
        //2.3, Put the contents into the window one by one

        sMap2.put(s2.charAt(i + j), sMap2.getOrDefault(s2.charAt(i + j), 0) + 1);
        //i+j=0+0; i+j=0+1; i+j=0+2; //0, 1, 2   ==> (c, 1), (d, 2)
        //i+j=1+0; i+j=1+1; i+j=1+2; //1, 2, 3   ==> (a, 1), (c, 1), (d, 1)
        //i+j>i; done, out of loop
      }
      if (matches(sMap1, sMap2)) return true;
    }
    return false;
  }

  private boolean matches(Map<Character, Integer> map1, Map<Character, Integer> map2) {
    for (Character k : map1.keySet()) {
      if (map1.get(k) - map2.getOrDefault(k, -1) != 0) return false;
    }
    return true;
  }
}
