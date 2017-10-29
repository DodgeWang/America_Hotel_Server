//handlebars模板引擎自定义helper

var helper = {
        section: function(name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
        radio_ck: function(v1, v2) {
            if (v1 == v2) return 'checked';
        },
        checkbox_ck: function(list, x) {
            for (var i = 0; i < list.length; i++) {
                if (list[i] == x) return 'checked';
            }
        },
        if_eq: function(v1, v2, options) {
            if (v1 == v2) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        },
        numAdd: function(num) {
            return num + 1;
        },
        operation: function() {
            var exps = [];
            var arg_len = arguments.length;
            var len = arg_len-1;
            for(var j = 0;j<len;j++){
              exps.push(arguments[j]);
            }
            var result = eval(exps.join(' '));
            return result;
        },
        listEq: function(a,b,c){
           var e = ""
           for(var i = 0; i<b.length; i++){
              if(a == b[i].id){
                e = b[i].type;
                return e;
              }
           }
           if(e == ""){
               return c;
           }
        },
        if_todayTask: function(list,options){
           if(list.length>0){
              return options.fn(this); 
           }else{
              return options.inverse(this);
           }
        },
        menu_show: function(id,list,options){
           var show = false;
           list = list.split(',');
           for(var i = 0; i<list.length; i++){
              if(parseInt(list[i])==parseInt(id)) show = true;
           }
           if(show === true){
              return options.fn(this); 
           }else{
              return options.inverse(this);
           }
           
        }
    }

module.exports = helper;