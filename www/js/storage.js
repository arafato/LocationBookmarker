var storage = {};

storage.storageUnit = (function () {

    var localStorageWrapper = (function () {
        var storage = window.localStorage;

        return {
            set: function (key, value, success, error) {
                try {
                    storage.setItem(key, value);
                } catch (e) {
                    error(e.message);
                    return;
                }

                success();
            },

            getAllData: function (processResult) {
                if (typeof processResult !== 'function') {
                    return null;
                }

                var bookmarks = [];
                for (var i = 0; i < storage.length; ++i) {
                    bookmarks.push(storage.getItem(storage.key(i)));
                }
                processResult(bookmarks);
            },

            remove: function (key) {
                storage.removeItem(key);
            }
        }
    })();

    var sqlLiteWrapper = (function () {
        var db;
        var TABLE = "BOOKMARK";

        function init() {
            db = window.openDatabase("Database", "1.0", "Location Bookmarker", 200000);
            db.transaction(function (tx) {
                tx.executeSql('DROP TABLE IF EXISTS' + TABLE);
                tx.executeSql('CREATE TABLE IF NOT EXISTS ' + TABLE + ' (id unique, data)');
            }, function (err) {
                alert("Fatal Error: Unable to create initial Database: " + err);
            });
        }

        return {
            set: function (key, value, success, error) {
                if (typeof success !== 'function' || typeof error !== 'function') {
                    throw new Error("Error calling set: sqlLiteWrapper: callback was not a function.");
                }

                if (typeof db === 'undefined' || db === null) {
                    init();
                }

                db.transaction(function (tx) {
                    tx.executeSql('INSERT INTO ' + TABLE + ' (id, data) VALUES (' + date + ', ' + obj);
                },
                    error(err),
                    success
                )
            },

            getAllData: function (processResult) {
                if (typeof db === 'undefined' || db === null) {
                    init();
                }

                db.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM ' + TABLE);
                },
                function (tx, results) {
                    var bookmarks = [];
                    var len = results.rows.length;
                    for (var i = 0; i < len; ++i) {
                        bookmarks.push(JSON.parse(results.rows.item(i).data))
                        processResult(bookmarks);
                    }
                },
                function (err) {
                    alert("Error loading bookmarks: " + err);
                })
            },

            remove: function (key, success, error) {
                if (typeof db === 'undefined' || db === null) {
                    init();
                }

                db.transaction(function(tx) {
                    tx.executeSql('DELETE FROM ' + TABLE + 'WHERE ID = ' + key);
                }, 
                function(err){
                    alert('Error deleting bookmark.');
                })
            }
        }
    })();

    return {
        instance: function () {
            if (navigator.userAgent.toLowerCase().indexOf("windows phone") != -1) {
                return localStorageWrapper;
            }
            else {
                return sqlLiteWrapper;
            }
        }
    };
})();
