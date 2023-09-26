let express = require('express');
let router = express.Router();
let syncController = require('../controllers/syncController');
const constData = require('../constants');
let auth = require('./leaderBoardRouter');

if (constData.contestOver) {
    router.post('/api/v1/sync', auth.isAuthorized, syncController.syncSteps); 
    router.post('/api/v1/syncmanual', auth.isAuthorized, syncController.syncStepsManual);
}
router.post("/api/v1/sync", auth.isAuthorized,  syncController.syncSteps); 
router.get('/api/v1/playersync', auth.isAuthorized, syncController.playerSync);
router.post('/api/v1/syncmanual', auth.isAuthorized, syncController.syncStepsManual);
module.exports = router;