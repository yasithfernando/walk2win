let express = require('express');
let router = express.Router();
let leaderBoardController = require('../controllers/leaderBoardController');

router.get('/api/v1/leaderboard/topteams', isAuthorized, leaderBoardController.topTeams);
router.get('/api/v1/leaderboard/topteams/:teamId', isAuthorized, leaderBoardController.topTeamPlayers);
router.get('/api/v1/leaderboard/topplayers', isAuthorized, leaderBoardController.topPlayers);
router.get('/api/v1/leaderboard/topplayers/:playerId', leaderBoardController.topPlayersData);
router.get('/api/v1/leaderboard/topmaleplayers', isAuthorized, leaderBoardController.topMalePlayers);
router.get('/api/v1/leaderboard/topfemaleplayers', isAuthorized, leaderBoardController.topFemalePlayers);

function isAuthorized(req, res, next) {
    const bearer = req.headers.authorization;
    if (bearer === process.env.AUTH_TOKEN) {
        next();
    }
    else {
        res.sendStatus(401);
    }
  }

module.exports = router;