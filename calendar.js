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
    return new Date(year, month, 0).getDate();
}
function getFirstDay(year, month) {
    return new Date(year, month, 1).getDay();
}

