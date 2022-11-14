package bestTimeToBuyAndSellStockII;

public class Solution {
  public int maxProfit(int[] prices) {
    if (prices.length <= 1) return 0;
    int maxProfit = 0;
    for (int i = 0; i < prices.length - 1; i++) {
      // constantly adding all the differences from next int, if it's bigger, 总和一定比最小与最大之差大，因为总和有重叠的部分。
      maxProfit += Math.max(0, prices[i + 1] - prices[i])
    }
    return maxProfit;
  }
}
