function $(selector) {
    if (selector.charAt(0) === '#') {
        return document.getElementById(selector.slice(1));
    }
    else if (selector.charAt(0) === '.') {
        return document.getElementsByClassName(selector.slice(1));
    } 
    else {
        return document.getElementsByTagName(selector);
    }
}

var calendar = new Grego($('#year'), $('#month'), $('.day'), 'today');
calendar.generate();
$('#prev').addEventListener('click', function() {
    calendar.showPrevMonth();
});
$('#next').addEventListener('click', function() {
    calendar.showNextMonth();
});
