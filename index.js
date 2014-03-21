var controller = require('lib/controller'),
    config = require('config');

simply.title("welcome");

function showMap(position) {
    Pebble.showSimpleNotificationOnPebble('location!',
            position.coords.latitude + "," + position.coords.longitude
    );
}

//navigator.geolocation.getCurrentPosition(showMap);

simply.scrollable(true);

var myVar;
var flag = true;
simply.on('singleClick', function (e) {
    if (e.button === 'up') {

    }
    else if (e.button === 'down') {
    }
    else if (e.button === 'select') {
        simply.title("refreshed")
        controller.refresh();
    }
});

simply.on('longClick', function (e) {
    if (e.button === 'select') {
        if (flag) {
            simply.title("live on")

            setTimeout(function () {
                controller.refresh();
                myVar = setInterval(function () {
                    controller.refresh();
                }, 30000);
            }, 1000);

            flag = false;
        }
        else {
            simply.title("live off")
            clearInterval(myVar);
            flag = true;
            setTimeout(function () {
                controller.refresh();
            }, 1000);
        }
    }
});


