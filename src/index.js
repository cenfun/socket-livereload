(function(window) {

    var showLog = function(msg) {
        console.log("[livereload] " + msg);
    };

    var showMessage = function(msg) {
        var className = "livereload-helper";
        var elem = document.querySelector("." + className);
        if (!elem) {
            elem = document.createElement("div");
            elem.className = className;
            var cssText = "pointer-events: none; position: absolute; z-index: 99998; top: 0px; left: 0px; padding: 8px 8px;";
            cssText += "font-family: Helvetica, Arial; font-size: 14px; color: #fff; background-color: rgba(0,0,0,0.8);";
            elem.style.cssText = cssText;
            document.body.appendChild(elem);
        }
        if (!msg) {
            elem.style.display = "none";
            return;
        }
        showLog(msg);
        elem.innerHTML = msg;
        elem.style.display = "block";
    };

    if (window.location !== top.location) {
        showLog("disabled in frame");
        return;
    }

    showLog("loaded");

    var initSocket = function() {

        if (!window.io) {
            showLog("not found io");
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
            showLog("socket connected");
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
            showLog("socket connection error");
            has_error = true;
        });

        socket.on("connect_timeout", function(data) {
            showLog("socket connection timeout");
        });

        socket.on("reconnecting", function(data) {
            reconnect_times += 1;
            showLog("socket reconnecting ... " + reconnect_times);
            if (reconnect_times > 20) {
                socket.close();
                showLog("socket closed after retry " + reconnect_times + " times");
            }
        });

        socket.on("reconnect_error", function(data) {
            showLog("socket reconnection error");
            has_error = true;
        });

        socket.on("reconnect_failed", function(data) {
            showLog("socket reconnection failed");
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
        showLog("failed to load " + clientJs);
    };
    document.body.appendChild(script);

})(window);