var controller = {};

var lastTime = "asdads";
controller.title = function (x) {
    simply.title(x);
};

controller.subtitle = function (x) {
    simply.subtitle(x);
};

var prepareBody = function (arrivals) {
    var body = "";
    var len = arrivals.length;
    for (var i = 1; i < len; i++) {
        body += arrivals[i].routeId + " - " + arrivals[i].estimatedWait + (i + 1 < len ? "\n" : "");
    }
    return body;
};

controller.refresh = function () {
    var stopURL = 'http://countdown.tfl.gov.uk/stopBoard/51608';
    ajax({ url: stopURL, type: 'json' }, function (data) {
        if (typeof data.arrivals.length > 0) {
            var body = prepareBody(data.arrivals)
            if (lastTime !== data.arrivals[0].estimatedWait) {
                lastTime = data.arrivals[0].estimatedWait;

                var time = lastTime.substring(0, lastTime.indexOf(" "));
                if (!isNaN(time)) {
                    var time2 = parseInt(time)
                    for (var i = 0; i < time2; i++) {

                        setTimeout(function () {
                            simply.vibe("short")
                        }, 500 * i);
                    }
                }
                else {
                    simply.vibe("long");
                }
            }
            simply.text({ title: data.arrivals[0].routeId + " - " + data.arrivals[0].estimatedWait, subtitle: data.arrivals[0].destination, body: body });
        }
        else
        {
            simply.title("No buses");
        }
    });
};


module.exports = controller;