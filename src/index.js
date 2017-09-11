// The || operator can be used for settings defaults, but it's bad practice, as passing values like "" or 0 will break it
// that being said, the selectors can't be "" or 0 anyways, so... :3
function Grego(ySlct, mSlct, hSlct, dSlct, tdSlct, nxtBtnSlct, prvBtnSlct) {
  this.dLookup = ['SUN', 'MON', 'TUES', 'WED', 'THU', 'FRI', 'SAT'];
  this.mLookup = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  this.ySlct = ySlct || 'grego-year';
  this.mSlct = mSlct || 'grego-month';
  this.hSlct = hSlct || 'grego-header';
  this.dSlct = dSlct || 'grego-day';
  this.tdSlct = tdSlct || 'grego-today';
  this.nxtBtnSlct = nxtBtnSlct || 'grego-next';
  this.prvBtnSlct = prvBtnSlct || 'grego-prev';
  this.today = new Date();
  this.date = new Date();
  var ctx = this;

  //warning: the 'this' above and the 'this' below seem to be different
  try {
    this.gregoNode = document.getElementById('grego-calendar');
    this.yNode = document.createElement('h1');
    this.mNode = document.createElement('h2');
    this.dNodes = new Array();
    this.prvBtn = document.createElement('button');
    this.nxtBtn = document.createElement('button');

    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
    var theadRow = document.createElement('tr');

    this.yNode.id = this.ySlct;
    this.mNode.id = this.mSlct;
    this.nxtBtn.id = this.nxtBtnSlct;
    this.prvBtn.id = this.prvBtnSlct;

    this.prvBtn.innerHTML = '&#10094;';
    this.nxtBtn.innerHTML = '&#10095;';
    this.prvBtn.addEventListener('click', function() {
      ctx.showPrevMonth(ctx);
    });
    this.nxtBtn.addEventListener('click', function() {
      ctx.showNextMonth(ctx);
    });

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
        this.dNodes[j+i*7].className = this.dSlct;
        rowTmp.appendChild(this.dNodes[j+i*7]);
      }
    }
    this.gregoNode.appendChild(this.prvBtn);
    this.gregoNode.appendChild(this.nxtBtn);
  } catch (e) {
    console.log('Grego calendar initialization failed, did you remember to add <div id=\'grego-calendar\'></div>? Here\'s the error message: ' + e);
  }

  this.generate();
}
Grego.prototype.getFirstDay = function(year, month) {
  return new Date(year, month, 1).getDay();
};
Grego.prototype.getDaysInMonth = function(year, month) {
  return new Date(year, month+1, 0).getDate();
};
Grego.prototype.clear = function() {
  for (var i = 0; i < this.dNodes.length; i++) {
    var elem = this.dNodes[i];
    var strIndex = elem.className.indexOf(this.tdClass);
    elem.innerHTML = '';
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
    var dNode = this.dNodes[startDay + i - 1];
    if (i === this.today.getDate() && 
      this.date.getMonth() === this.today.getMonth() &&
      this.date.getFullYear() === this.today.getFullYear()) {
      dNode.className += " " + this.tdSlct;
    } else {
      dNode.className = this.dSlct;
    }
    dNode.innerHTML = i.toString();
  }
  this.mNode.innerHTML = this.mLookup[this.date.getMonth()];
  this.yNode.innerHTML = this.date.getFullYear();
};
Grego.prototype.showNextMonth = function(ctx) {
  if (ctx.date.getMonth() != 11) {
    ctx.date.setFullYear(ctx.date.getFullYear(), ctx.date.getMonth()+1, 1);
  } else {
    ctx.date.setFullYear(ctx.date.getFullYear()+1, 0, 1);
  }
  ctx.clear();
  ctx.generate();
};
Grego.prototype.showPrevMonth = function(ctx) {
  if (ctx.date.getMonth() != 0) {
    ctx.date.setFullYear(ctx.date.getFullYear(), ctx.date.getMonth()-1, 1);
  } else {
    ctx.date.setFullYear(ctx.date.getFullYear()-1, 11, 1);
  }
  ctx.clear();
  ctx.generate();
};
