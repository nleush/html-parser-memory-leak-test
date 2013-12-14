var fs = require('fs');
var async = require('async');

var file = fs.readFileSync('./test.html').toString();

var count = 0;

async.whilst(
    function () {
        return count < 2000;
    },
    function (callback) {

        count++;

        var jsdom = require('jsdom').jsdom
            , myWindow = jsdom().createWindow()
            , jQuery = require('jquery').create(myWindow);

        var $file = jQuery(file);

        // Usage.
        console.log('test:', $file.find('p').length);

        // Log mem.
        var mem = process.memoryUsage().heapUsed;
        console.log(count + ')', Math.round(mem / 1000000) +' MB', '('+mem+')');

        // Free mem.
        myWindow.close();   // Here exception got.

        if (!global.gc) {
            console.error('Use "node --expose-gc script.js" to test with gc.')
            return;
        } else {
            global.gc();
        }

        setTimeout(callback, 10);

    },
    function (err) {
    }
);

