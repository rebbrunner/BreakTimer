var breakInt = 0;
var microbreakInt = 0;
var smallbreakInt = 0;
var longbreakInt = 0;
var breakMin = 25;
var microbreakMin = 5;
var smallbreakMin = 5;
var longbreakMin = 15;
var seconds = 0;
var repeat = 5;

microbreak();
microbreakInt = setInterval(microbreak, 1000);

function microbreak() {
    var format = true;
    if (seconds == 0) {
        if (microbreakMin == 0) {
            if (repeat > 0) {
                microbreakMin = 5;
                repeat -= 1;

                if (Notification.permission === 'granted') {
                    new Notification('Hands off the keyboard!  Take a microbreak.');
                }
            } else {
                format = false;
                clearInterval(microbreakInt);
                microbreakInt = setInterval(function(){
                    $('#microbreak').fadeOut(750).fadeIn(750);
                }, 750);
            }
        }
        seconds = 60
        microbreakMin -= 1;
    }
    seconds -= 1;
    if (format) {
        formatter(microbreakMin, seconds, $('#microbreak'));
    }
}

function formatter(minutes, seconds, element) {
    var str_min = minutes;
    var str_sec = seconds;
    if (minutes < 10) {
        str_min = '0' + minutes;
    }
    if (seconds < 10) {
        str_sec = '0' + seconds;
    }
    if (seconds == 60) {
        str_sec = '00'
    }

    element.text(str_min + ':' + str_sec);
}
