# beer-mile

OK, this is kind of a wandering first commit because I was trying to get everything out that I could remember doing before. No promises that any of this works (and it's likely that it won't because I can't test anything yet!).

Basically, we've got a few things:

- *index.js*
shell of button listener - idea is it gets all the buttons and then listen for presses from any of them. upon a press, it inserts a timestamp for the button that was pressed.

- **db**
db.js is meant to setup the DB, and then take the models we setup in the ./models dir and setup relationships
crud.js has helper database functions

- **db/models**
contains the database table models

- **scripts**
a fun helper script i found online that lets me listen for network requests from MACs as they happen on Windows - run it in powershell, enter a filename at the prompt and it will log MACs to that file as you press the buttons

### How to use this thing
- Clone it
- `npm install`
- ...?

### TODO (so much...)
- figure out how to run all this crap (first: how do we setup the DB?)
- oh, and debug it because it is probably riddled with typos and things that don't work
- test multiple buttons (and simultaneous or near-simultaneous presses)
- frontend (realtime display of times? add user? and associate user to button?)