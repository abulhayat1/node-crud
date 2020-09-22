const Event = require('../models/event');


module.exports = {
    showEvents: showEvents,
    showSingle: showSingle,
    seedEvents: seedEvents,
    showCreate: showCreate,
    processCreate: processCreate
}


//show all events
function showEvents (req, res) {
    Event.find({}, (err, events) => {
        if(err){
            res.status(404);
            res.send('Events Not FOUND (');
        }else{
        res.render('pages/events', {events: events});
        }
    });
}

    //show single events
function showSingle (req, res) {

        Event.findOne({slug: req.params.slug}, (err, event) => {
            if(err){
                res.status(404);
                res.send('Events Not FOUND ');
            }else{
            res.render('pages/single', {
                event: event,
                success: req.flash('success')
            });
            }
        });
        
    }

    //seed database
function seedEvents (req, res) {
        const events = [
            { name: 'Basketball',  description: 'Throwing into a basket.' },
            { name: 'Swimming',  description: 'Michael Phelps is the fast fish.' },
            { name: 'Weightlifting', description: 'Lifting heavy things up' }
          ];

          for(event of events){
              let newEvent = new Event(event)
              newEvent.save();
          };
        //seeded
        res.send('Data Saved to DB');
    }


//show the create form
function showCreate (req, res) {
    res.render('pages/create');
}

//process create save it to the db
function processCreate (req, res) {
    const event = new Event({
        name: req.body.name,
        description: req.body.description,
        thumbnail: req.body.thumbnail
    });
    event.save((err) => {
        if(err) 
            throw err;

        //set a successful flash message
        req.flash ('success', 'Successfully created event!');
        res.redirect(`/events/${event.slug}`);
    })
}


