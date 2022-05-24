(function(window) {

    const showLog = function(msg) {
        console.log(`[livereload] ${msg}`);
    };

    const showMessage = function(msg) {
        const className = 'livereload-helper';
        let elem = document.querySelector(`.${className}`);
        if (!elem) {
            elem = document.createElement('div');
            elem.className = className;
            const cssText = 'pointer-events: none; position: fixed; z-index: 99998; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 8px 8px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #fff; border-radius: 5px; background-color: rgba(0,0,0,0.6);';
            elem.style.cssText = cssText;
            document.body.appendChild(elem);
        }
        if (!msg) {
            elem.style.display = 'none';
            return;
        }
        showLog(msg);
        elem.innerHTML = msg;
        elem.style.display = 'block';
    };

    if (window.location !== top.location) {
        showLog('disabled in frame');
        return;
    }

    showLog('loaded');

    const initSocket = function() {

        if (!window.io) {
            showLog('not found io');
            return;
        }

        const socket = window.io.connect('/');

        let server_connected = false;
        let has_error = false;
        let reconnect_times = 0;

        const reload = function() {
            socket.close();
            window.location.reload();
        };

        socket.on('data', function(data) {
            if (server_connected) {
                showMessage(data.message);
                if (data.action === 'reload') {
                    reload();
                }
            }
        });
        socket.on('connect', function(data) {
            showLog('socket connected');
            if (server_connected) {
                if (has_error) {
                    showMessage('Reloading for socket reconnected ...');
                    reload();
                }
            }
            server_connected = true;
            has_error = false;
            reconnect_times = 0;
        });

        socket.on('connect_error', function(data) {
            showLog('socket connection error');
            has_error = true;
        });

        socket.on('connect_timeout', function(data) {
            showLog('socket connection timeout');
        });

        socket.on('reconnecting', function(data) {
            reconnect_times += 1;
            showLog(`socket reconnecting ... ${reconnect_times}`);
            if (reconnect_times > 20) {
                socket.close();
                showLog(`socket closed after retry ${reconnect_times} times`);
            }
        });

        socket.on('reconnect_error', function(data) {
            showLog('socket reconnection error');
            has_error = true;
        });

        socket.on('reconnect_failed', function(data) {
            showLog('socket reconnection failed');
            has_error = true;
        });
    };

    let clientJs = 'socket.io.min.js';
    const elem = document.querySelector('.livereload');
    if (elem) {
        const client = elem.getAttribute('client');
        if (client) {
            clientJs = client;
        }
    }

    const script = document.createElement('script');
    script.src = clientJs;
    script.onload = function() {
        initSocket();
    };
    script.onerror = function() {
        showLog(`failed to load ${clientJs}`);
    };
    document.body.appendChild(script);

})(window);
