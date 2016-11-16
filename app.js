function moveHands() {
    with(new Date()) {
        let hoursInClockDay = hoursInClock * 2;
        let minutesInClockHour = hoursInClock * 5;
        let secondsInClockMinute = hoursInClock * 5;
        let millisecondsToday = getMilliseconds() + 1e3 * (getSeconds() + 60 * (getMinutes() + 60 * getHours()));
        let millisecondsRealDay = 1000*60*60*24;
        let millisecondsInClockHour = millisecondsRealDay / hoursInClockDay;
        let millisecondsInClockMinute = millisecondsInClockHour / minutesInClockHour;
        let millisecondsInClockSecond = millisecondsInClockMinute / secondsInClockMinute;

        let seconds = Math.round((millisecondsToday % millisecondsInClockMinute) / millisecondsInClockSecond);
        let minutes = Math.round(((millisecondsToday - seconds*millisecondsInClockSecond) % millisecondsInClockHour) / millisecondsInClockMinute);
        let hours = Math.round(((millisecondsToday - seconds*millisecondsInClockSecond - minutes*millisecondsInClockMinute) / millisecondsInClockHour));

        let h = 360 / hoursInClock * (hours % hoursInClock + minutes / minutesInClockHour);
        let m = 360 / minutesInClockHour * (minutes + seconds / secondsInClockMinute);
        let s = 360 / secondsInClockMinute * seconds;

        document.getElementById('seconds').style.cssText = "-webkit-transform:rotate(" + s + "deg);"; // setting the rotate CSS attribute to those degree values
        document.getElementById('minutes').style.cssText = "-webkit-transform:rotate(" + m + "deg);";
        document.getElementById('hours').style.cssText = "-webkit-transform:rotate(" + h + "deg);";

        setTimeout(moveHands, 10); // calling the function every millisecond
    }
}

function setFace(){
    var width = $('.clock').width();
    var r = width * .4
    var letterHeight = 40;
    var letterWidth = 30;

    for(var numeral=hoursInClock; numeral>0; numeral -= 1) {
        let size = numeral === hoursInClock ? 60 : 40;
        let widthAdjustment = numeral > 9 ? 2 : 1;
        var x = Math.round(r*Math.sin(Math.PI*2*(numeral/hoursInClock))) + width/2 - letterWidth/2*widthAdjustment;
        var y = Math.round(r*Math.cos(Math.PI*2*(numeral/hoursInClock))) - width/2 + letterHeight/2;
          $('<div>', {'class':'time'})
            .text(numeral)
            .css({ 'left': (x)+'px', 'top': (-y)+'px', 'font-size': size+'px' })
            .appendTo('.clock');
        }

}

const hoursInClock = 11;
$(document).ready(function() {
    setFace();
    moveHands();
});

