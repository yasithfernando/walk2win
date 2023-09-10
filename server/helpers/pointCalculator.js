let marks = require('../constants');
let Player = require('../models/player');
let Team = require('../models/team');

let calculatePoints = (options) => {
    let steps = options.steps;
    let points = 0;

    for (mark of marks.soloMarks) {
        if(mark[0] <= steps) {
            points = mark[1];
            break;
        }
    }
    return points;
};

let calculateTotalsSolo = async (id) => {
    let player = await Player.findOne({_id: id});
    if(!player) return;
    let totalPoints = player.total_steps.reduce((a, b) => (a + b.points), 0);
    let totalSteps = player.total_steps.reduce((a, b) => (a + b.steps), 0);
    await Player.updateOne({_id: id}, {points: totalPoints, steps: totalSteps});
    return {
        totalPoints: totalPoints,
        totalSteps: totalSteps
    };
}


let calculateTotalsTeam = async (id, myId) => {
    let players = await Player.find({team: id});
    let initialPlayer = await Player.findOne({_id: myId})
    let team = await Team.findOne({_id: id});

    let currentTotalSteps = team.total_steps;
    if(!players) return;
    let steps = 0;
    let points = 0;
    let pointsList = {}

    for (let player of players) {
        for (node of player.total_steps) {
            if (pointsList.hasOwnProperty(node.date)) {
                pointsList[node.date] += node.steps;
            } else {
                pointsList[node.date] = node.steps;
            }
        }
    }
    console.log(pointsList);   

    if (currentTotalSteps.length == 0) {
        currentTotalSteps = [...initialPlayer.total_steps];
    }

    for (const [key, value] of Object.entries(pointsList)) {
        currentTotalSteps.some((item) => { item.date == key ? item.steps = value : false})
      }
   

    console.log(currentTotalSteps)

    for (entry of currentTotalSteps) {
        steps += entry.steps;
        for (mark of marks.teamMarks) {
            if(mark[0] <= entry.steps) {
                entry.points = mark[1];
                break;
            }
        }
        points += entry.points;
    }
     
    await Team.updateOne({_id: id}, {steps: steps, points: points, total_steps: currentTotalSteps});
    return {steps: steps, points: points, total_steps: currentTotalSteps};
}

let leaderboardComparator = (a, b) => {
    const c = b.points - a.points;
    if(c == 0)
        return b.steps - a.steps;
    return c;
}

module.exports = {
    calculatePoints: calculatePoints,
    calculateTotalsSolo: calculateTotalsSolo,
    calculateTotalsTeam: calculateTotalsTeam,
    leaderboardComparator: leaderboardComparator
};
