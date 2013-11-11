var fs = require('fs');
var async = require('async');
var readability = require('iframely-readability');

var file = fs.readFileSync('./test.html').toString();

var count = 0;

async.whilst(
    function () {
        return count < 2000;
    },
    function (callback) {

        count++;

        readability.parse(file, "https://github.com/tautologistics/node-htmlparser", {
            debug: false,
            returnContentOnly: true,
            straightifyDocument: true,
            videoIframesEnabled: true
        }, function(result) {

            // Usage.
            console.log('test:', result.title);

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
        });

    },
    function (err) {
    }
);

