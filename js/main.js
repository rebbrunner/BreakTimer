var breakMin = 25;
var microbreakMin = 5
var seconds = 0;
var interval = 0;

interval = setInterval(breakTimer, 1000);
$('#reset').on('click', function(){
    clearInterval(interval);
    breakMin = 25;
    microbreakMin = 5;
    seconds = 0;
    formatter(breakMin, seconds, $('#break'));
    formatter(microbreakMin, seconds, $('#microbreak'));
    interval = setInterval(breakTimer, 1000);
});

function breakTimer() {
    var format = true;
    if (seconds == 0) {
        if (breakMin == 0) {
            format = false;
            clearInterval(interval);
            interval = setInterval(function(){
                $('#break').fadeOut(750).fadeIn(750);
                $('#microbreak').fadeOut(750).fadeIn(750);

                if (Notification.permission === 'granted') {
                    new Notification('Pomodoro finished!');
                }
            }, 750);
        }
        else if (microbreakMin == 0) {
            microbreakMin = 0;

            if (Notification.permission === 'granted') {
                new Notification('Hands off the keyboard!  Take a microbreak now');
            }
        }
        seconds = 60;
        breakMin -= 1;
        microbreakMin -= 1;
        if (format) {
            formatter(breakMin, seconds, $('#break'));
            formatter(microbreakMin, seconds, $('#microbreak'));
        }
    }
    seconds -= 1;
    if (format) {
        formatter(breakMin, seconds, $('#break'));
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
