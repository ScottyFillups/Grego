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

var calendar = new Grego();
