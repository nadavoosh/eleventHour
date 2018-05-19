function moveHands() {
    with(new Date()) {
        //keeping certian ratios fixed:

        const hoursInClockDay = hoursInClock * 2;
        const minutesInClockHour = hoursInClock * 5;
        const secondsInClockMinute = hoursInClock * 5;
        const millisecondsToday = getMilliseconds() + 1e3 * (getSeconds() + 60 * (getMinutes() + 60 * getHours()));
        const millisecondsRealDay = 1000*60*60*24;
        const millisecondsInClockHour = millisecondsRealDay / hoursInClockDay;
        const millisecondsInClockMinute = millisecondsInClockHour / minutesInClockHour;
        const millisecondsInClockSecond = millisecondsInClockMinute / secondsInClockMinute;

        const seconds = Math.round((millisecondsToday % millisecondsInClockMinute) / millisecondsInClockSecond);
        const minutes = Math.round(((millisecondsToday - seconds*millisecondsInClockSecond) % millisecondsInClockHour) / millisecondsInClockMinute);
        const hours = Math.round(((millisecondsToday - seconds*millisecondsInClockSecond - minutes*millisecondsInClockMinute) / millisecondsInClockHour));

        const h = 360 / hoursInClock * (hours % hoursInClock + minutes / minutesInClockHour);
        const m = 360 / minutesInClockHour * (minutes + seconds / secondsInClockMinute);
        const s = 360 / secondsInClockMinute * seconds;

        document.getElementById('seconds').style.cssText = "-webkit-transform:rotate(" + s + "deg);"; // setting the rotate CSS attribute to those degree values
        document.getElementById('minutes').style.cssText = "-webkit-transform:rotate(" + m + "deg);";
        document.getElementById('hours').style.cssText = "-webkit-transform:rotate(" + h + "deg);";

        setTimeout(moveHands, 10); // calling the function every millisecond
    }
}

function setFace(){
    var width = $('.clock').width();
    var r = width * .4
    const characterScaling = Math.sqrt(12) / Math.sqrt(hoursInClock);

    for(var numeral=hoursInClock; numeral>0; numeral -= 1) {
        const size = (numeral === hoursInClock ? 60 : 40) * characterScaling;
        const characterHeight = size;
        const characterWidth = size*0.6359; //magic,
        const characterCount = numeral.toString().length;
        var x = Math.round(r*Math.sin(Math.PI*2*(numeral/hoursInClock))) + width/2 - characterWidth/2*characterCount;
        console.log('x is ' + x)
        var y = Math.round(r*Math.cos(Math.PI*2*(numeral/hoursInClock))) - width/2 + characterHeight/2;
          $('<div>', {'class':'time'})
            .text(numeral)
            .css({ 'left': (x)+'px', 'top': (-y)+'px', 'font-size': size+'px' })
            .appendTo('.clock');
        }

}
const hoursInClock = window.location.hash ? window.location.hash.toString().replace('#', '') : 11;
$(document).ready(function() {
    setFace();
    moveHands();
});

