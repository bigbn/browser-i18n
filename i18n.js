var I18n = function(options){
    for (var prop in options) {
        this[prop] = options[prop];
    };
    this.getLocaleFileFromServer();
};

I18n.localeCache = {};
I18n.locale = 'default';
I18n.url = '/locale';

I18n.prototype = {
    locale: 'default',


    getLocaleFileFromServer: function(){
        localeFile = null;

        $.ajax({
            url: I18n.url,
            async: false,
            dataType: 'json',
            success: function(data){
                localeFile = data;
            }
        });

        I18n.localeCache[this.locale] = localeFile;
    },

    __: function(){
        if  (I18n.localeCache[I18n.locale])
        var msg = I18n.localeCache[I18n.locale][arguments[0]];
        if (!msg) return _.toArray(arguments).join(' ');

        if (arguments.length > 1)
            msg = vsprintf(msg, Array.prototype.slice.call(arguments, 1));

        return msg;
    },

    __n: function(singular, count){
        var msg = I18n.localeCache[I18n.locale][singular];

        count = parseInt(count, 10);
        if(count === 0)
            msg = msg.zero;
        else
            msg = count > 1 ? msg.other : msg.one;

        msg = vsprintf(msg, [count]);

        if (arguments.length > 2)
            msg = vsprintf(msg, Array.prototype.slice.call(arguments, 2));

        return msg;
    }
};
