This jQuery plugin is for easily finding the starting and ending positions of selected text in text fields and textareas. It can also be used to set the selection, and replace the selection with given text (or insert text wherever the cursor is in the text field or textarea).

## Methods
* [$().textrange('get')](https://github.com/dwieeb/jquery-textrange/wiki/Get)
* [$().textrange('set')](https://github.com/dwieeb/jquery-textrange/wiki/Set)
* [$().textrange('setcursor')](https://github.com/dwieeb/jquery-textrange/wiki/SetCursor)
* [$().textrange('replace')](https://github.com/dwieeb/jquery-textrange/wiki/Replace)

## Demo
* http://dwieeb.github.com/jquery-textrange/

## Minified Version
A minified version of this plugin can be generated using Google's Closure Compiler (preferred).

    wget http://closure-compiler.googlecode.com/files/compiler-latest.tar.gz
    tar -zvxf compiler-latest.tar.gz compiler.jar
    wget https://raw.github.com/dwieeb/jquery-textrange/master/jquery-textrange.js
    java -jar compiler.jar --js jquery-textrange.js --js_output_file jquery-textrange.min.js
