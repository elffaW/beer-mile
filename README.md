# beer-mile

Idea is to set up a timing mechanism for a race. Uses dash buttons (one per runner) to track progress. At pre-defined checkpoints throughout the race, the runner will press the button to hit the checkpoint. Ideally we'll have a form where a runner can sign up and pick a button (alternative is we will pre-assign buttons manually in the DB). Also would be nice to have a live-updating race progress page for people to check on during the race. If we can't do that, would be nice to at least be able to display the results afterwards.


### Code Structure

- **app/**
  - contains all the frontend code

- **build/**
  - index.html 
  - after build, will contain a client/ and a server/ folder for separation
  - webpack will also put any image or css or other resources here

- *server.js*
  - node/express server and button listener
  - serves up the front end, and gets all the buttons from DB so it can listen for presses from any of them. upon a press, it inserts a timestamp for the button that was pressed

- **db**
  - db.js is meant to setup the DB, and then take the models we setup in the ./models dir and setup relationships
  - crud.js has any database create/read/update/delete functions

- **db/models**
  - contains the database table models

- **scripts**
  - a helper script i found online to listen for network requests from MACs as they happen on Windows (run it in powershell, enter a filename at the prompt and it will log MACs to that file as you press the buttons)

### How To Use
- Clone it
- `npm install`
- `npm run resetdb` -- creates DB and inserts runners and buttons
- `npm run build-all` -- cleans the build/client and build/server dirs and rebuilds front and backend
- `npm start` -- executes `node server` which serves frontend and handles buttons

### TODO (https://github.com/elffaW/beer-mile/projects/1)
- frontend (realtime display of times? add user? and associate user to button?)
  - [x] Set up skeleton project for front end under app/ directory
  - [x] Set up webpack as builder
  - [ ] Update dependencies for front end stuff (in progress)
  - [ ] Update server to do more than just listen for button presses (i.e., make it an actual app server) (in progress)
  - [ ] static runner-to-button association (on data load)
  - [ ] dynamic runner-to-button association (i.e., via frontend)

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
