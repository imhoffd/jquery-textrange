/**
 * jquery-textrange
 * A jQuery plugin for getting, setting and replacing the selected text in input fields and textareas.
 *
 * (c) 2012 Daniel Imhoff <dwieeb@gmail.com> - danielimhoff.com
 */
(function($) {
   var textrange = {
      /**
       * $().textrange() or $().textrange('get')
       * Retrieves an object containing the start and end location of the text range, the length of the range and the
       * substring of the range.
       *
       * @param (optional) property 
       * @return The object or 
       */
      get: function(property) {
         var properties = {}

         if('selectionStart' in this[0]) {
            properties.position = this[0].selectionStart;
            properties.start = this[0].selectionStart;
            properties.end = this[0].selectionEnd;
            properties.length = properties.end - properties.start;
            properties.text = this.val().substring(properties.start, properties.end);
         }

         return typeof property === 'undefined' ? properties : properties[property];
      },

      /**
       * $().textrange('set')
       * Sets the selected text of an object by specifying the start and end of the selection.
       *
       * @param start The starting position of the selection, or the position of the cursor, if end is not given.
       * @param (optional) end The ending position of the selection.
       */
      set: function(start, end) {
         if('selectionStart' in this[0]) {
            this[0].selectionStart = start;
            this[0].selectionEnd = end;
         }

         return this;
      },

      /**
       * $().textrange('replace')
       * Replaces the selected text in 
       */
      replace: function(text) {
         

         return this;
      }
   };

   $.fn.textrange = function(method) {
      if(typeof method === 'undefined' || typeof method !== 'string') {
         return textrange.get.apply(this);
      }
      else if(typeof textrange[method] === 'function') {
         return textrange[method].apply(this, Array.prototype.slice.call(arguments, 1));
      }
      else {
         $.error("Method " + method + " does not exist in jQuery.textrange");
      }
   };
})(jQuery);