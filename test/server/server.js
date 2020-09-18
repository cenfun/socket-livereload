const http = require("http");
const Koa = require("koa");
const KSR = require("koa-static-resolver");
const socketIO = require("socket.io");

const open = require("open");

const app = new Koa();
app.use(KSR({
    dirs: [
        "./test/client/",
        //for livereload
        "./node_modules/socket.io-client/dist/",
        //"./node_modules/socket.io-livereload/dist/",
        "./dist/"
    ],
    //max-age=<seconds>
    maxAge: 1,
    livereload: '\n<script src="/livereload.js"></script>\n'
}));

const server = http.createServer(app.callback());
const io = socketIO(server);
io.on("connection", function(client) {
    client.on("data", function(data) {
    });
    client.on("disconnect", function() {
        console.log(`${new Date().toString()} a preview page disconnected`);
    });
    console.log(`${new Date().toString()} a preview page connected`);
});

const sockets = io.sockets;

const port = 8080;
server.listen(port, function() {
    const url = `http://localhost:${port}`;
    console.log(`${new Date().toString()} server started: ${url}`);
    open(url);
});


//test
const refreshHandler = function() {
    
    setTimeout(function() {

        sockets.emit("data", {
            message: "Show something ..."
        });

        setTimeout(function() {

            sockets.emit("data", {
                message: "Reloading for something ...",
                action: "reload"
            });
            refreshHandler();

        }, 3000);
        
    }, 3000);

};

refreshHandler();