# beer-mile

Idea is to set up a timing mechanism for a race. Uses dash buttons (one per runner) to track progress. At pre-defined checkpoints throughout the race, the runner will press the button to hit the checkpoint. Ideally we'll have a form where a runner can sign up and pick a button (alternative is we will pre-assign buttons manually in the DB). Also would be nice to have a live-updating race progress page for people to check on during the race. If we can't do that, would be nice to at least be able to display the results afterwards.


### Code Structure
Basically, we've got a few things:

- *index.js*
shell of button listener - idea is it gets all the buttons and then listen for presses from any of them. upon a press, it inserts a timestamp for the button that was pressed.

- **db**
  - db.js is meant to setup the DB, and then take the models we setup in the ./models dir and setup relationships
  - crud.js has helper database functions

- **db/models**
  - contains the database table models

- **scripts**
  - a helper script i found online to listen for network requests from MACs as they happen on Windows (run it in powershell, enter a filename at the prompt and it will log MACs to that file as you press the buttons)

### How to use this thing
- Clone it
- `npm install`
- `npm run resetdb` -- creates DB and inserts runners and buttons
- `npm start` -- executes `node index.js` which gets buttons from DB and handles presses

### TODO
- frontend (realtime display of times? add user? and associate user to button?)
  - Set up skeleton project for front end under web/ directory
  - Set up webpack as builder
  - Update dependencies for front end stuff
  - Update server to do more than just listen for button presses (i.e., make it an actual app server)

### Button Testing Status
- seems to handle multiple presses from different buttons in succession / at once (tested with 6)
  - might lag a little on some of them (one time pressing 6 at once, 2 had 1sec delay)
- single button can't be pressed more than once every 7-10 seconds or so

### Raspberry Pi Setup
Assuming other dependencies are already installed, setup pm2 to manage the app (restart on crash/reboot)
- `npm install pm2 -g` -- installs pm2 globally
- `sudo pm2 start npm -- start` -- starts app and shows status
- `sudo pm2 startup` -- sets up startup script to run on reboot
- `sudo pm2 save` -- saves config
