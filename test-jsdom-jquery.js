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

                // Log mem.
                console.log(count + ')', Math.round(process.memoryUsage().heapUsed / 1000000) +' MB');

                // Usage.
                var $ = window.$;
                console.log('test:', $('p').length);

                // Free mem.
                window.close();

                callback();
            }
        });


    },
    function (err) {
    }
);

