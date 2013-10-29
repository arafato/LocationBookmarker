(function ($) {
    var app = {
        initialize: function () {
            var userAgent = navigator.userAgent.toLowerCase();
            //var userAgent = 'iphone';
            this.bindEvents();
            this.loadRessources(userAgent);
            this.toggleFooters(userAgent);
        },

        loadBookmarks: function() {
            var entries = [];
            var db = storage.storageUnit.instance();

            db.getAllData(function (items) {
                for (var i = 0; i < items.length; ++i) {
                    var parsed = JSON.parse(items[i]);
                    var bmark = new bookmark(parsed.title, parsed.description);
                    bmark.longitude(parsed.longitude);
                    bmark.latitude(parsed.latitude);
                    bmark.image(parsed.image || "");

                    entries.push(bmark);
                }
            })

            return entries;
        },

        loadRessources: function (userAgent) {
            if (userAgent.indexOf("windows phone") !== -1) {
                $.mobile.pushStateEnabled = false;
                yepnope({
                    load: ['css/wp/jquery.mobile.wp.theme.css', 'css/wp/app-bar.css', 'js/wp/app-bar.js', 'js/lib/jquery.easing.js', 'js/wp/jquery.mobile.wp.theme.init.js'],
                    complete: function () {
                        // app-bar.js loads asynchronously and executes when pagecreate event has already been fired. Thus, we invoke the plugin
                        // manually on all app-bar containing elements after script execution has been completed.
                        $(":jqmData(role='app-bar')").appbar();
                    }
                });
            }
            else if (userAgent.indexOf("android") !== -1) {
                $.mobile.pushStateEnabled = true;
                yepnope({
                    load: ['css/jquery.mobile.min.css', 'css/android/android-theme.css', 'js/android/jquery.mobile.android.theme.init.js']
                });
            }
            else if (userAgent.indexOf("iphone") !== -1 || userAgent.indexOf("ipad") != -1) {
                $.mobile.pushStateEnabled = true;
                yepnope({
                    load: ['css/jquery.mobile.min.css', 'css/ios/ios-theme.css', 'js/ios/jquery.mobile.ios.theme.init.js']
                });
            }
        },

    toggleFooters: function(userAgent){
        // Hiding/Showing footer and app-bar, respectively, depending on the platform.
        if (userAgent.indexOf("windows phone") !== -1) {
            $('div[data-role="footer"]').hide();
            $('div[data-role="app-bar"]').show();
        } else {
            $('div[data-role="footer"]').show();
            $('div[data-role="app-bar"]').hide();
        }
    },

    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function () {
        var entries = app.loadBookmarks();
        ko.applyBindings(new vm(entries));
    }
};

app.initialize();
})(jQuery);
