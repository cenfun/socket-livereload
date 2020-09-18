(function() {

    console.log("socket.io livereload loaded.");

    if (window.location !== top.location) {
        console.log("disabled livereload in frame.");
        return;
    }

    var showMessage = function(msg) {
        var className = "socket-io-livereload-helper";
        var elem = document.querySelector("." + className);
        if (!elem) {
            elem = document.createElement("div");
            elem.className = className;
            var cssText = "pointer-events: none; position: absolute; z-index: 99998;";
            cssText += "top: 0px; right: 0px; padding: 5px 5px; background-color: rgba(255,255,255,0.8);";
            elem.style.cssText = cssText;
            document.body.appendChild(elem);
        }
        if (!msg) {
            elem.style.display = "none";
            return;
        }
        console.log(msg);
        elem.innerHTML = msg;
        elem.style.display = "block";
    };

    var initSocket = function() {

        if (!window.io) {
            console.log();
            return;
        }

        var socket = window.io.connect("/");

        var server_connected = false;
        var has_error = false;
        var reconnect_times = 0;

        var reload = function() {
            socket.close();
            window.location.reload();
        };

        socket.on("data", function(data) {
            if (server_connected) {
                showMessage(data.message);
                if (data.action === "reload") {
                    reload();
                }
            }
        });
        socket.on("connect", function(data) {
            console.log("Socket Connected");
            if (server_connected) {
                if (has_error) {
                    showMessage("Reloading for socket reconnected ...");
                    reload();
                }
            }
            server_connected = true;
            has_error = false;
            reconnect_times = 0;
        });

        socket.on("connect_error", function(data) {
            console.log("Socket Connect error");
            has_error = true;
        });

        socket.on("connect_timeout", function(data) {
            console.log("Socket Connect timeout");
        });

        socket.on("reconnecting", function(data) {
            reconnect_times += 1;
            console.log("Socket Reconnecting ... " + reconnect_times);
            if (reconnect_times > 20) {
                socket.close();
                console.log("Socket closed after retry " + reconnect_times + " times.");
            }
        });

        socket.on("reconnect_error", function(data) {
            console.log("Socket Reconnect error");
            has_error = true;
        });

        socket.on("reconnect_failed", function(data) {
            console.log("Socket Reconnect failed");
            has_error = true;
        });
    };

    var clientJs = "socket.io.js";
    var script = document.createElement("script");
    script.src = clientJs;
    script.onload = function() {
        initSocket();
    };
    script.onerror = function() {
        console.log("Failed to load: " + clientJs);
    };
    document.body.appendChild(script);

})();
