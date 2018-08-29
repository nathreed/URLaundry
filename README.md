# URLaundry
Better web client for the UR LaundryAlert app. Live [here](http://laundry.martianpancake.com).

The reason this has a client/server architecture instead of just having all the logic in a webpage is because the LaundryAlert API does not allow cross-domain GET requests, so they must be performed on the server and the data mirrored for this client.

## Setup

- NOTE: This is only on the off-chance you want to run the server for yourself/make changes. If you really just want to see the data, you don't need to do this - just look at the URL above.

- Run `npm install` to install dependencies (just `nodejs-websocket`).  
- Change `wsPort` in the top of `index.js` to some port you will listen on.
- Change the websocket URL in `index.html` to reflect the server address and port you have chosen (and maybe change it to "wss://" instead of "ws://" if you're using secure WebSockets - I am on my server, but that's handled separately and I haven't included the code for that here).
- Run `node index.js` to start the server
- Place `index.html` on a web server or some other way to access it (it's nothing but client side JS so simply opening the file locally would work)

## License  
MIT
