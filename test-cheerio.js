var fs = require('fs');
var async = require('async');
var util = require('util');
var cheerio = require('cheerio');

console.log('start');

var file = fs.readFileSync('./test.html').toString();

var count = 0;

async.whilst(
    function () {
        return count < 4000;
    },
    function (callback) {

        count++;

        var $ = cheerio.load(file);

        // Usage.
        console.log('test:', $('p').length);

        // Log mem.
        console.log(count + ')', Math.round(process.memoryUsage().heapUsed / 1000000) +' MB');

        if (!global.gc) {
            console.error('Use "node --expose-gc script.js" to test with gc.')
            return;
        } else {
            global.gc();
        }

        setTimeout(callback, 1000);
    },
    function (err) {

    }
);

