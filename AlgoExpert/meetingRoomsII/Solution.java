//Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.
//Input: intervals = [[0,30],[5,10],[15,20]]
//Output: 2

//Input: intervals = [[7,10],[2,4]]
//Output: 1

import java.util.PriorityQueue;

class Solution {
  public int minMeetingRooms(int[][] intervals) {
      //here we are talking about how many rooms we need
      //ex, if both the numbers of the next array are smaller than the first array, then we cannot use the same room

      Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
      //PriorityQueue(Comparator<? super E> comparator)
      var heap = new PriorityQueue<int[]>((a, b) -> a[1] - b[1]);
      //boolean	offer(E e): Inserts the specified element into this priority queue.
      //Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions. When using a capacity-restricted queue, this method is generally preferable to add(E), which can fail to insert an element only by throwing an exception.
      for (var meeting : intervals) {
          heap.offer(meeting);
          //peek(): retrieve the head one
          if (heap.peek()[1] <= meeting[0]) {
              //poll(): retrieve the head one and remove it
              heap.poll();
          }
      }
      return heap.size();
  }
}
