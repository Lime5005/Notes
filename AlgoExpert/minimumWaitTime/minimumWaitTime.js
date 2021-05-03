// Calculate in an array of integers, the shortest waiting time for each item to start to run.
// {
//   "queries": [5, 4, 3, 2, 1]
// }
function minimumWaitingTime(queries) {
    // Write your code here.
    let totalTime = 0;
    let newQueries = queries.sort((a, b) => a - b);
    for (let i = 0; i < newQueries.length; i++) {
        const eachValue = newQueries[i];
        const elementLeft = newQueries.length - (i + 1);
        totalTime = totalTime + (eachValue * elementLeft);
    }
    return totalTime;
}
// eachValue * elementLeft
// Each value is the time all the elements left have to wait, the elements left decrease gradually until the last one which is 0.