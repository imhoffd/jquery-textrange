This jQuery plugin is for easily finding the starting and ending positions of selected text in text fields and textareas. It can also be used to set the selection, and replace the selection with given text (or insert text wherever the cursor is in the text field or textarea).

## Demo

* http://dwieeb.github.com/jquery-textrange/

## Include

Include the file directly using `<script>` tags:

    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="jquery-plugins/jquery-textrange.js"></script>

Or, with RequireJS (**note**: jquery-textrange can be loaded through any [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)-compatible Javascript Module Loader):

    requirejs.config({
        "baseUrl": "lib",
        "paths": {
            "jquery": "//code.jquery.com/jquery-latest.min.js",
            "jquery-textrange": "jquery-plugins/jquery-textrange"
        }
    });

## Methods

You can use this method to get all the information on the selected text of an element or a specific bit of information.

### 'get'

##### Get everything

    $('input[name="example"]').textrange('get');

or for short:

    $('input[name="example"]').textrange();

This will return a JSON object with the following information:

    {
       position: (cursor location in the text field),
       start: (starting position of the selected text in the text field),
       end: (ending position of the selected text in the text field),
       length: (the length of the selected text in the text field),
       text: (the text that is selected)
    }

##### Get a particular property

This function can also be used to get a particular property of the object.

For example, this will obtain the starting location of the selected text:

    var start = $('input[name="example"]').textrange('get', 'start');

### 'set'

You can use this method to set the starting and ending locations of the selected text in an element.

It works much like [PHP's substr()](http://php.net/manual/en/function.substr.php) and [Ruby's String#slice](http://ruby-doc.org/core-2.0/String.html#method-i-slice), so if you're familiar with one of those, it should be a breeze! Here are some examples, anyway.

For the following examples, let's say `input[name="example"]` contains the text `abcdef`.

    $('input[name="example"]').textrange('set'); // selects "abcdef" (select all)
    $('input[name="example"]').textrange('set', 2); // selects "cdef"
    $('input[name="example"]').textrange('set', 2, 3); // selects "cde"
    $('input[name="example"]').textrange('set', 2, -2); // selects "cd"
    $('input[name="example"]').textrange('set', -3); // selects "def"
    $('input[name="example"]').textrange('set', -2, 1); // selects "e"
    $('input[name="example"]').textrange('set', -4, -1); // selects "cde"

If you're looking to set the cursor at one specific location, you can use `0` for length, or you can use [$().textrange('setcursor')](https://github.com/dwieeb/jquery-textrange/wiki/SetCursor).

### 'setcursor'

You can use this method to set the location of the cursor in your text field.

To set the cursor at the fifth character position:

    $('input[name="example"]').textrange('setcursor', 5);

### 'replace'

You can use this method to replace the selection with given text. 

    $('input[name="example"]').textrange('replace', 'some text');

There is also an `insert` alias for `replace` if you're using this method to insert text at the cursor location. They work the same way.

## Minified Version
A minified version of this plugin can be generated using Google's Closure Compiler (preferred).

    wget http://closure-compiler.googlecode.com/files/compiler-latest.tar.gz
    tar -zvxf compiler-latest.tar.gz compiler.jar
    wget https://raw.github.com/dwieeb/jquery-textrange/master/jquery-textrange.js
    java -jar compiler.jar --js jquery-textrange.js --js_output_file jquery-textrange.min.js
