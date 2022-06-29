//Given a string s, find the length of the longest substring without repeating characters.

//Input: s = "abcabcbb"
//Output: 3
//Explanation: The answer is "abc", with the length of 3.

//Input: s = "bbbbb"
//Output: 1
//Explanation: The answer is "b", with the length of 1.

//Input: s = "pwwkew"
//Output: 3
//Explanation: The answer is "wke", with the length of 3.
//Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
package longestNonRepeatSubString;

public class LongestNonRepeatSubString {
  public int lengthOfLongestSubstring(String s) {
    int max = 0;
    int end = 0;
    int start = 0;
    
    Set<Character> hs = new HashSet<>();
    while (end < s.length()) {
        if (!hs.contains(s.charAt(end))) {
            hs.add(s.charAt(end));
            end++;
            max = Math.max(hs.size(), max);
        } else {
            hs.remove(s.charAt(start));
            start++;
        }
        
    }
    return max;
  }
}
