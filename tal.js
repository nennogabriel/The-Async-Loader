var tal = (function(){
    var _query = [],
        _ready = [];


    function _get(url, reference){
        var ext = url.split(".").pop(),
            js = ext == "js",
            el = document.createElement((js ? 'script' : 'link'));
        el.onload = el.onreadystatechange = function () {
            if (!el.readyState || el.readyState == 'loaded' || el.readyState == 'complete') {
                if(typeof reference == "string"){_ready.push(reference);}
                el.onload = el.onreadystatechange = null;
            }
        };
        if (js) {
            el.type = "text/javascript";
            // el.async = true;
            el.src = url;
        } else {
            el.rel = "stylesheet";
            el.href = url;
        }
        document.getElementsByTagName('head')[0].appendChild(el);
    }

    function load(url, reference, dependances) {
        if(typeof reference == "string"){
            if(_query.indexOf(reference) >= 0){return;}
            _query.push(reference);
        }
        if(typeof dependances == "undefined"){
            _get(url, reference);
        } else {
            ready(dependances, function(){
                _get(url, reference)
            });
        }
    }

    function ready(values, callback, count){
        var list = (typeof values == "string" ? [values] : values );
        count = count || 0;
        for(var i in list){
            if(_ready.indexOf(list[i]) < 0){
                setTimeout(function () { ready(list, callback, count+1)}, 99);
                return;
            }
        }
        setTimeout(callback, 99);
    }
    return {
        ready: ready,
        load: load
    }

})();
