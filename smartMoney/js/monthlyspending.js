var UCon = (function() {

    var string = {
      iType: '.type',
      iDescription: '.description',
      iValue: '.value',
      iButton: '.abutton',
      ilist: '.ilist',
      elist: '.elist',
      bvalue: '.bvalue',
      ivalue: '.income_value',
      evalue: '.expense_value',
  
      box: '.box',
  
      month: '.month'
    };
  
    var format = function(num, type) {
      var nsplit, i, d, type;
  
      num = Math.abs(num);
      num = num.toFixed(2);
  
      nsplit = num.split('.');
  
      i = nsplit[0];
      d = nsplit[1];
  
      return (type === 'e' ? '-' : '+') + ' ' + i + '.' + d;
  
    };
  
    var nodeList = function(list, callback) {
      for (var i = 0; i < list.length; i++) {
        callback(list[i], i);
      }
    };
  
    return {
      disMonth: function() {
        var n;
        var mon;
        var m;
  
        n = new Date();
  
        mon = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        m = n.getMonth();
  
        document.querySelector(string.month).textContent = mon[m];
      },
      getI: function() {
        return {
          type: document.querySelector(string.iType).value, 
          description: document.querySelector(string.iDescription).value,
          value: parseFloat(document.querySelector(string.iValue).value)
        };
      },
  
      addlist: function(obj, type) {
        var h, newH, ele;
        // Create HTML string with placeholder text
  
        if (type === 'i') {
          ele = string.ilist;
  
          h = '<div class="item tables" id="i-%id%"> <div class="item__description">%description%</div><div class="rightposition tables"><div class="item_value">%value%</div><div class="item_delete"><button class="item_delete_button"><i class="outline">remove</i></button></div></div></div>';
        } else if (type === 'e') {
          ele = string.elist;
  
          h = '<div class="item tables" id="e-%id%"><div class="item__description">%description%</div><div class="rightposition tables"><div class="item_value">%value%</div><div class="item_delete"><button class="item_delete_button"><i class="outline">remove</i></button></div></div></div>';
        }
  
  
        newH = h.replace('%id%', obj.id);
        newH = newH.replace('%description%', obj.description);
        newH = newH.replace('%value%', format(obj.value, type));
  
        document.querySelector(ele).insertAdjacentHTML('beforeend', newH);
      },
  
      clear: function() {
        var field, Arr;
  
        field = document.querySelectorAll(string.iDescription + ', ' + string.iValue);
  
        Arr = Array.prototype.slice.call(field);
  
        Arr.forEach(function(current, index, array) {
          current.value = "";
        });
  
        Arr[0].focus();
      },
      deletelist: function(selectorID) {
  
        var e = document.getElementById(selectorID);
        e.parentNode.removeChild(e);
  
      },
  
  
      changeT: function() {
  
        var fields = document.querySelectorAll(
          string.iType + ',' +
          string.iDescription + ',' +
          string.iValue);
  
        nodeList(fields, function(cur) {
          cur.classList.toggle('r_focus');
        });
  
        document.querySelector(string.iButton).classList.toggle('r');
  
      },
      display: function(obj) {
        var type;
        obj.budget > 0 ? type = 'i' : type = 'e';
  
        document.querySelector(string.bvalue).textContent = format(obj.budget, type);
        document.querySelector(string.ivalue).textContent = format(obj.totalI, 'i');
        document.querySelector(string.evalue).textContent = format(obj.totalE, 'e');
  
  
      },
      gets: function() {
        return string;
      }
    };
  
  })();
  
  var budgetCon = (function() {
      var data = {
      all: {
        e: [],
        i: []
      },
      totals: {
        e: 0,
        i: 0
      },
      budget: 0,
  
    };
    var Exp = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };
  
    var Inc = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };
  
    var Total = function(type) {
      var sum = 0;
      data.all[type].forEach(function(cur) {
        sum = sum + cur.value;
      });
      data.totals[type] = sum;
    };
  
    return {
      addI: function(type, des, val) {
        var newI, IDs;
  
        if (data.all[type].length > 0) {
          IDs = data.all[type][data.all[type].length - 1].id + 1;
        } else {
          IDs = 0;
        }
  
        if (type === 'e') {
          newI = new Exp(IDs, des, val);
        } else if (type === 'i') {
          newI = new Inc(IDs, des, val);
        }
  
        data.all[type].push(newI);
  
        return newI;
      },
  
      deleteI: function(type, id) {
        var ids, counter;
  
        ids = data.all[type].map(function(current) {
          return current.id;
        });
  
        counter = ids.indexOf(id);
  
        if (counter !== -1) {
          data.all[type].splice(counter, 1);
        }
  
      },
  
      calculate: function() {
        Total('e');
        Total('i');
        data.budget = data.totals.i - data.totals.e;
      },
  
      getB: function() {
        return {
          budget: data.budget,
          totalI: data.totals.i,
          totalE: data.totals.e,
  
        };
      },
  
    };
  
  })();
  var con = (function(budC, UC) {
  
    var setup = function() {
      var DOMs = UC.gets();
  
      document.querySelector(DOMs.iButton).addEventListener('click', cadd);
  
      document.addEventListener('keypress', function(event) {
        if (event.Code === 13 || event.wh === 13) {
          cadd();
        }
      });
  
      document.querySelector(DOMs.box).addEventListener('click', cdelete);
  
      document.querySelector(DOMs.iType).addEventListener('change', UC.changeT);
    };
  
    var update = function() {
  
      budC.calculate();
  
      var budget = budC.getB();
  
      UC.display(budget);
    };
  
    var cadd = function() {
      var input, newItem;
  
      input = UC.getI();
  
      if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
        newItem = budC.addI(input.type, input.description, input.value);
  
        UC.addlist(newItem, input.type);
  
        UC.clear();
  
        update();
  
  
      }
    };
  
  
    var cdelete = function(event) {
      var iID, sID, type, ID;
  
      iID = event.target.parentNode.parentNode.parentNode.parentNode.id;
  
      if (iID) {
  
        sID = iID.split('-');
        type = sID[0];
        ID = parseInt(sID[1]);
  
        budC.deleteI(type, ID);
  
        UC.deletelist(iID);
  
        update();
  
  
      }
    };
  
  
    return {
      init: function() {
        UC.disMonth();
        UC.display({
          budget: 0,
          totalI: 0,
          totalE: 0,
  
        });
        setup();
      }
    };
  
  })(budgetCon, UCon);
  
  
  con.init();