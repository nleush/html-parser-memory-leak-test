var jsdom = require('jsdom');
var fs = require('fs');
var async = require('async');
var util = require('util');

var file = fs.readFileSync('./test.html').toString();

var count = 0;

async.whilst(
    function () {
        return count < 3000;
    },
    function (callback) {

        count++;

        var arr = [];

        for(var i = 0; i < 100000; i++) {
            arr.push(file);
        }

        // Mark array as garbage.
        arr = null;

        // Log mem.
        console.log(count + ')', Math.round(process.memoryUsage().heapUsed / 1000000) +' MB');

        callback();

    },
    function (err) {
    }
);

