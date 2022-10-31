//Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.

//Input: intervals = [[0,30],[5,10],[15,20]]
//Output: false

//Input: intervals = [[7,10],[2,4]]
//Output: true

package meetingRooms;

import java.util.Arrays;

public class Solution {
  public boolean canAttendMeetings(int[][] intervals) {
     //sort by each array's first number;
     Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
     //look at one head of me, to compare to the next one, last one has no next to compare, so length - 1;
     for (int i = 0; i < intervals.length - 1; i++) {
      //if the first number of the next array is smaller than the second number of the first array, then there is an overlap.
         if (intervals[i][1] > intervals[i + 1][0]) {
             return false;
         }
     }   
     return true;
  }
}
