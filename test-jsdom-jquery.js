var jsdom = require('jsdom');
var fs = require('fs');
var async = require('async');
var util = require('util');

var file = fs.readFileSync('./test.html').toString();
var jquery = fs.readFileSync("./jquery.js").toString();

var count = 0;

async.whilst(
    function () {
        return count < 2000;
    },
    function (callback) {

        count++;

        jsdom.env({
            html: file,
            src: [jquery],
            done: function(error, window) {

                // Usage.
                var $ = window.$;
                console.log('test:', $('p').length);

                // Log mem.
                var mem = process.memoryUsage().heapUsed;
                console.log(count + ')', Math.round(mem / 1000000) +' MB', '('+mem+')');

                // Free mem.
                window.close();

                if (!global.gc) {
                    console.error('Use "node --expose-gc script.js" to test with gc.')
                    return;
                } else {
                    global.gc();
                }

                setTimeout(callback, 100);
            }
        });


    },
    function (err) {
    }
);

