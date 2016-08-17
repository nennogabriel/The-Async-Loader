# The Async Loader

A very simple loader for javascript, CSS and fonts.

## How to use:

Include the minified version in the head for best performance.

###sumary
**url :** local link or external link for especific file

**unique-name :** name to be used when referenced in **list-of-dependances**
 
**list-of-dependances :** list of string names or just a string name passed as **unique-name** to a **url** 

Load a file asynchronously:

``tal.load( url, unique-name, [optional list-of-dependances]);``


Execute only after the librarie was loaded

``tal.ready(list-of-dependances, function);``


####Eg.
    <script>
    tal.ready("jquery", function () {console.log("jquery is ready")});
    tal.ready("materializecss", function () {console.log("materializecss is ready")});
    tal.ready("materializejs", function () {console.log("materializejs is ready")});
    tal.load("https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/css/materialize.min.css", "materializecss", ["jquery", "materializejs"]);
    tal.load("https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/js/materialize.min.js", "materializejs", "jquery");
    tal.load("https://code.jquery.com/jquery-2.1.1.min.js", "jquery");
    </script>
