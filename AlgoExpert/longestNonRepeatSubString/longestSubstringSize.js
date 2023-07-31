/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let set = new Set();
  let left = 0;
  let maxSize = 0;
  if (s.length === 0) return 0;
  if (s.length === 1) return 1;
  for (let i = 0; i < s.length; i++) {
      while (set.has(s[i])) {
          set.delete(s[left]);
          left++;
      }
      set.add(s[i]);
      maxSize = Math.max(maxSize, i - left + 1);
  }
  return maxSize;
};
console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb")); // 1
console.log(lengthOfLongestSubstring("pwwkew")); // 3
console.log(lengthOfLongestSubstring("wsslpluuwekuaxt")); // 7
// why "wsslpluuwekuaxt" is 7 ? set will remove the first duplicate element
// first round [w]
// second round [w, s]
// third round [s, s] -> [s]
// fourth round [s, l]
// fifth round [s, l, p]
// sixth round [s, l, p, l] -> [p, l] -> remove the first index + set delete duplicate automatically
// [p, l, u]
// [p, l, u, u] -> [l, u]
// [l, u, w]
// [l, u, w, e]
// [l, u, w, e, k]
// [l, u, w, e, k, u] -> [w, e, k, u]
// [w, e, k, u, a]
// [w, e, k, u, a, x]
// last round [w, e, k, u, a, x, t]
