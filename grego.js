// The || operator can be used for settings defaults, but it's bad practice, as passing values like "" or 0 will break it
// that being said, the selectors can't be "" or 0 anyways, so... :3
function Grego(ySlct, mSlct, hSlct, dSlct, tdSlct, opt) {
    this.dLookup = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    this.mLookup = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    this.ySlct = ySlct || 'grego-year';
    this.mSlct = mSlct || 'grego-month';
    this.hSlct = hSlct || 'grego-header';
    this.dSlct = dSlct || 'grego-day';
    this.tdSlct = tdSlct || 'grego-today';
    this.today = new Date();
    this.date = new Date();
    
    try {
        this.gregoNode = document.getElementById('grego-calendar');
        this.yNode = document.createElement('h1');
        this.mNode = document.createElement('h2');
        this.dNodes = new Array();

        var table = document.createElement('table');
        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');
        var theadRow = document.createElement('tr');

        this.yNode.id = this.ySlct;
        this.mNode.id = this.mSlct;
        
        this.gregoNode.appendChild(this.yNode);
        this.gregoNode.appendChild(this.mNode);
        this.gregoNode.appendChild(table);
        table.appendChild(thead);
        thead.appendChild(theadRow);
        for (var i = 0; i < 7; i++) {
            var thTmp = document.createElement('th');
            thTmp.className = this.hSlct;
            thTmp.innerHTML = this.dLookup[i];
            theadRow.appendChild(thTmp);
        }

        table.appendChild(tbody);
        for (var i = 0; i < 6; i++) {
            var rowTmp = document.createElement('tr');
            tbody.appendChild(rowTmp);
            for (var j = 0; j < 7; j++) {
                this.dNodes.push(document.createElement('td'));
                this.dNodes[j+i*6].className = this.dSlct;
                rowTmp.appendChild(this.dNodes[j+i*6]);
            }
        }
    } catch (e) {
        console.log('Grego calendar initialization failed, did you remember to add <div id=\'grego-calendar\'></div>? Here\'s the error message: ' + e);
    }
}

/*function Grego(ySelector, mSelector, dSelector, tdClass) {
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
*/
