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
            // for (var i = 0; i < list.length; i++) {
            //     if (list[i] == x) return 'checked';
            // }
            return 'checked';
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
        }
    }

module.exports = helper;