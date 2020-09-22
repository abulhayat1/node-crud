const eventsController = require('./controllers/events.controller');
const mainControllers = require('./controllers/main.controllers');

//create a new express router
const express = require('express'),
    router = express.Router();
    mainController = require('./controllers/main.controllers');

//export router
module.exports = router;

//define routes
router.get('/',mainControllers.showHome);
router.get('/events/seed',eventsController.seedEvents);
router.get('/events', eventsController.showEvents);


//create events
router.get('/events/create', eventsController.showCreate);
router.post('/events/create', eventsController.processCreate);

router.get('/events/:slug', eventsController.showSingle);