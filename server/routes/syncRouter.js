let express = require('express');
let router = express.Router();
let syncController = require('../controllers/syncController');
const constData = require('../constants');
let auth = require('./leaderBoardRouter');

if (constData.contestOver) {
    router.post('/api/v1/sync', syncController.syncSteps); 
    router.post('/api/v1/syncmanual', syncController.syncStepsManual);
}
router.post("/api/v1/sync",  syncController.syncSteps); 
router.get('/api/v1/playersync', syncController.playerSync);
router.post('/api/v1/syncmanual', syncController.syncStepsManual);
module.exports = router;