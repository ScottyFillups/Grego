function $(selector) {
    if (selector.charAt(0) === '#') {
        return document.getElementById(selector.slice(1));
    }
    else if (selector.charAt(0) === '.') {
        return document.getElementsByClassName(selector.slice(1));
    } else {
        return document.getElementsByTagName(selector);
    }
}
function getDaysInMonth(year, month) {
    // 0 will get the last day of the previous month, 
    // hence month+1, which returns the last date of the current month
    return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year, month) {
    return new Date(year, month, 1).getDay();
}

var monthLookup = new Array();
monthLookup[0] = "jan";
monthLookup[1] = "feb";
monthLookup[2] = "mar";
monthLookup[3] = "apr";
monthLookup[4] = "may";
monthLookup[5] = "jun";
monthLookup[6] = "jul";
monthLookup[7] = "aug";
monthLookup[8] = "sep";
monthLookup[9] = "oct";
monthLookup[10] = "nov";
monthLookup[11] = "dec";

var date = new Date();

//startDate is 0 indexed, so 0-6
var startDate = getFirstDay(date.getFullYear(), date.getMonth());
var daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth());

$('#grego-month').innerHTML = monthLookup[date.getMonth()];
for (var i = 1; i <= daysInMonth; i++) {
    var tag = $('td')[startDate + i - 1];
    if (i === date.getDate()) {
        tag.className = 'grego-today';
    }
    tag.innerHTML = i.toString();
}
