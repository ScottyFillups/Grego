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
function Grego(ySelector, mSelector, dSelector, tdClass) {
    this.ySelector = ySelector;
    this.mSelector = mSelector;
    this.dSelector = dSelector;
    this.tdClass = tdClass;
    this.today = new Date();
    this.date = new Date();
}
Grego.prototype.clear = function() {
    for (var i = 0; i < $(this.dSelector).length; i++) {
        $(this.dSelector)[i].innerHTML = "";
    }
};
Grego.prototype.generate = function() {
    this.clear();

    var startDay = this.getFirstDay(this.date.getFullYear(), this.date.getMonth());
    var daysInMonth = this.getDaysInMonth(this.date.getFullYear(), this.date.getMonth());
    
    for (var i = 1; i <= daysInMonth; i++) {
        var dDOM = $(this.dSelector)[startDay + i - 1];
        if (i === this.today.getDate()) {
            dDOM.className += " " + this.tdClass;
        }
        dDOM.innerHTML = i.toString();
    }
    $(this.mSelector)[0].innerHTML = monthLookup[this.date.getMonth()];
    $(this.ySelector)[0].innerHTML = this.date.getFullYear();
};
Grego.prototype.getFirstDay = function(year, month) {
    return new Date(year, month, 1).getDay();
};
Grego.prototype.getDaysInMonth = function(year, month) {
    return new Date(year, month+1, 0).getDate();
};
Grego.prototype.showNextMonth = function() {
    if (this.date.getMonth() != 11) {
        this.date.setFullYear(this.date.getFullYear(), this.date.getMonth()+1, 1);
    } else {
        this.date.setFullYear(this.date.getFullYear()+1, 0, 1);
    }
    this.generate();
};
Grego.prototype.showPrevMonth = function() {
    if (this.date.getMonth() != 0) {
        this.date.setFullYear(this.date.getFullYear(), this.date.getMonth()-1, 1);
    } else {
        this.date.setFullYear(this.date.getFullYear()-1, 11, 1);
    }
    this.generate();
};



var calendar = new Grego('.year', '.month', '.day', '.today');
calendar.generate();
$('#left').addEventListener('click', function() {
    calendar.showPrevMonth();
});
$('#right').addEventListener('click', function() {
    calendar.showNextMonth();
});
