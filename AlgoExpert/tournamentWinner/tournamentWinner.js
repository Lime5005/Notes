// {
//   "competitions": [
//     ["HTML", "C#"],
//     ["C#", "Python"],
//     ["Python", "HTML"]
//   ],
//   "results": [0, 0, 1]
// }
// In given competitions arrays[homeTeam, awayTeam] and results array[1 is for homeTeam win, 0 is for awayTeam win], calculate who is the final winner.
// Ex, the 1st round: C# win, +3 points
// the 2nd round: Python win, +3 points
// the 3rd round: still Python win, +3 = total 6 points
// The final winner: Python
const HOME_TEAM_WON = 1

function tournamentWinner(competitions, results) {
    let bestTeam = ''
    const scores = {
        [bestTeam]: 0
    }
    for (let i = 0; i < competitions.length; i++) {
        // Use some logic to represente each element of the args
        const result = results[i]
        const [homeTeam, awayTeam] = competitions[i]

        // Suppose the homeTeam won, store it in a new const
        const winningTeam = result === HOME_TEAM_WON ? homeTeam : awayTeam

        // Update the winner and it's total scores
        updateScores(winningTeam, 3, scores)

        if (scores[winningTeam] > scores[bestTeam]) {
            bestTeam = winningTeam
        }
    }

    return bestTeam;
}
// Keep changing/updating the winner, does the winner team ever in the record? If not, add it and it's points.
function updateScores(team, points, scores) {
    if (!(team in scores)) scores[team] = 0
    scores[team] += points
}