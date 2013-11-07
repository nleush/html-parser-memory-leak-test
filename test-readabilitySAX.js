var jsdom = require('jsdom');
var fs = require('fs');
var async = require('async');
var util = require('util');
var createWritableStream = require("readabilitySAX").createWritableStream;

var file = fs.readFileSync('./test.html').toString();

var count = 0;

async.whilst(
    function () {
        return count < 999;
    },
    function (callback) {

        count++;

        var start = Date.now();

        createWritableStream(function(ret){

            // Usage.
            console.log('test:', ret.score);

            // Log mem.
            var mem = process.memoryUsage().heapUsed;
            console.log(count + ')', Math.round(mem / 1000000) +' MB', '('+mem+')');

            if (!global.gc) {
                console.error('Use "node --expose-gc script.js" to test with gc.')
                return;
            } else {
                global.gc();
            }

            setTimeout(callback, 1000);

        }).end(file);

    },
    function (err) {
    }
);

