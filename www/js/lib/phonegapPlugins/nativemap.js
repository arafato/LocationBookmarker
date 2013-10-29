(function () {

    function checkArgs(win, fail) {
        if (win && typeof win === "function" && fail && typeof fail === "function") {
            return true;
        }
        else {
            console.log("NativeMap Error: successCallback || errorCallback is not a function");
            return false;
        }
    }

    var cdv = window.cordova || window.Cordova;
    navigator.plugins.nativemap = {
        show: function(successCallback, errorCallback, options) {
            if (checkArgs(successCallback, errorCallback)) {
                cdv.exec(successCallback, errorCallback, "NativeMap", "show", options);
            }
        }
    };

})();