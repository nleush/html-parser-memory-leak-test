var jsdom = require('jsdom');
var fs = require('fs');
var async = require('async');
var util = require('util');

var file = fs.readFileSync('./test.html').toString();

var count = 0;

async.whilst(
    function () {
        return count < 2000;
    },
    function (callback) {

        count++;

        jsdom.env({
            html: file,
            done: function(error, window) {

                // Log mem.
                console.log(count + ')', Math.round(process.memoryUsage().heapUsed / 1000000) +' MB');

                // Usage.
                console.log('test:', window.document.querySelectorAll('p').length);

                // Free mem.
                window.close();

                callback();
            }
        });

    },
    function (err) {
    }
);

