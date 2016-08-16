var tal = {
    q: [], // list of queued libraries
    r: [], // list of ready libraries
    ready: function(list, callback, count){
        if(!count){count=0}
        if(typeof list == "string"){list = [list]}
        for(var i in list){
            if(charm.r.indexOf(list[i]) < 0){
                setTimeout(function () { charm.ready(list, callback, count+1)}, 99);
                return;
            }
        }
        setTimeout(callback, 99);
    },
    load: function (url, reference, dependances) {
        if(typeof reference == "string"){
            if(charm.q.indexOf(reference) >= 0){return;}
            charm.q.push(reference);
        }
        if(typeof dependances == "undefined"){
            charm.get(url, reference);
        } else {
            charm.ready(dependances, function(){
                charm.get(url, reference)
            });
        }
    },
    get: function(url, reference){
        var ext = url.split(".").pop(),
            js = ext == "js",
            el = document.createElement((js ? 'script' : 'link'));
        el.onload = el.onreadystatechange = function () {
            if (!el.readyState || el.readyState == 'loaded' || el.readyState == 'complete') {
                if(typeof reference == "string"){charm.r.push(reference);}
                el.onload = el.onreadystatechange = null;
            }
        };
        if (js) {
            el.type = "text/javascript";
            el.async = true;
            el.src = url;
        } else {
            el.rel = "stylesheet";
            el.href = url;
        }
        document.getElementsByTagName('head')[0].appendChild(el);
    }
};
