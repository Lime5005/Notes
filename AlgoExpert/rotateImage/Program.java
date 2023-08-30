/**
 * You are given an n x n 2D matrix that represents an image. Rotate the image by 90 degrees (clockwise).
 * You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.
 * Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
 */

package rotateImage;

public class Program {
  public void rotate(int[][] matrix) {
    int lens = matrix.length;
    // Loop through the matrix, cut the matrix into 2 parts, and swap the elements.
    for (int i = 0; i < (lens + 1)/2; i++) {
      // Cut the matrix into 2 parts, and swap the elements.
        for (int j = 0; j < lens/2; j++) {
          // Use a temp variable to store the value of the last element in the first part.
          // Which means the first element in the second part.
            int temp = matrix[lens - 1 - j][i];
            // Swap the next of the first part to the last of the first part.
            // So the last of the first part is the first of the second part.
            matrix[lens - 1 - j][i] = matrix[lens - 1 - i][lens - j - 1];
            // Swap the last of the first part to the last of the second part.
            // So the last of the second part is the first of the first part.
            matrix[lens - 1 - i][lens - j - 1] = matrix[j][lens - 1 - i];
            // Swap the first of the second part to the last of the second part.
            // So the first of the second part is the last of the first part.
            matrix[j][lens - 1 - i] = matrix[i][j];
            // Swap the temp value to the first of the second part.
            // To complete the swap of the first part and the second part.
            matrix[i][j] = temp;
        }
    }
  }
}
