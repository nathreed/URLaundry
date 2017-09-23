# URLaundry
Better web client for the UR LaundryAlert app

## Setup
- Run `npm install` to install dependencies (just `nodejs-websocket`).  
- Change `wsPort` in the top of `index.js` to some port you will listen on.
- Change the websocket URL in `index.html` to reflect the server address and port you have chosen (and maybe change it to "wss://" instead of "ws://" if you're using secure WebSockets - I am on my server, but that's handled separately and I haven't included the code for that here).
- Run `node index.js` to start the server
- Place `index.html` on a web server or some other way to access it (it's nothing but client side JS so simply opening the file locally would work)

## License  
MIT
