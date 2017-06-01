function Grego(ySelector, mSelector, dSelector, tdClass) {
    this.dayLookup = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    this.monthLookup = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    this.ySelector = ySelector;
    this.mSelector = mSelector;
    this.dSelector = dSelector;
    this.tdClass = tdClass;
    this.today = new Date();
    this.date = new Date();
}
Grego.prototype.clear = function() {
    for (var i = 0; i < this.dSelector.length; i++) {
        var elem = this.dSelector[i];
        var strIndex = elem.className.indexOf(this.tdClass);
        elem.innerHTML = "";
        if (strIndex !== -1) {
            elem.className = elem.className.slice(0, strIndex-1);
        }
    }
};
Grego.prototype.generate = function() {
    this.clear();

    var startDay = this.getFirstDay(this.date.getFullYear(), this.date.getMonth());
    var daysInMonth = this.getDaysInMonth(this.date.getFullYear(), this.date.getMonth());
    
    for (var i = 1; i <= daysInMonth; i++) {
        var dDOM = this.dSelector[startDay + i - 1];
        if (i === this.today.getDate() && 
            this.date.getMonth() === this.today.getMonth() &&
            this.date.getFullYear() === this.today.getFullYear()) {
            dDOM.className += " " + this.tdClass;
        }
        dDOM.innerHTML = i.toString();
    }
    this.mSelector.innerHTML = this.monthLookup[this.date.getMonth()];
    this.ySelector.innerHTML = this.date.getFullYear();
};
Grego.prototype.showNextMonth = function() {
    if (this.date.getMonth() != 11) {
        this.date.setFullYear(this.date.getFullYear(), this.date.getMonth()+1, 1);
    } else {
        this.date.setFullYear(this.date.getFullYear()+1, 0, 1);
    }
    this.clear();
    this.generate();
};
Grego.prototype.showPrevMonth = function() {
    if (this.date.getMonth() != 0) {
        this.date.setFullYear(this.date.getFullYear(), this.date.getMonth()-1, 1);
    } else {
        this.date.setFullYear(this.date.getFullYear()-1, 11, 1);
    }
    this.clear();
    this.generate();
};
Grego.prototype.getFirstDay = function(year, month) {
    return new Date(year, month, 1).getDay();
};
Grego.prototype.getDaysInMonth = function(year, month) {
    return new Date(year, month+1, 0).getDate();
};

