/**
 * jquery-textrange
 * A jQuery plugin for getting, setting and replacing the selected text in input fields and textareas.
 *
 * (c) 2012 Daniel Imhoff <dwieeb@gmail.com> - danielimhoff.com
 */
(function($) {
   var browserType;

   var textrange = {
      /**
       * $().textrange() or $().textrange('get')
       * Retrieves an object containing the start and end location of the text range, the length of the range and the
       * substring of the range.
       *
       * @param (optional) property 
       * @return An object of properties including position, start, end, length, and text or a specific property.
       */
      get: function(property) {
         return _textrange[browserType].get.apply(this, [property]);
      },

      /**
       * $().textrange('set')
       * Sets the selected text of an object by specifying the start and end of the selection.
       *
       * @param start The starting position of the selection, or the position of the cursor, if end is not given.
       * @param (optional) end The ending position of the selection.
       */
      set: function(start, end) {
         if(typeof start === 'undefined') {
            start = 0;
            end = -1;
         }

         if(typeof end === 'undefined') {
            end = start;
         }
         else if(end === -1) {
            end = this.val().length;
         }

         _textrange[browserType].set.apply(this, [start, end]);

         return this;
      },

      /**
       * $().textrange('replace')
       * Replaces the selected text in the input field or textarea with text.
       *
       * @param text The text to replace the selection with.
       */
      replace: function(text) {
         _textrange[browserType].replace.apply(this, [text]);

         return this;
      },

      /**
       * Alias for $().textrange('replace')
       */
      insert: function(text) {
         return this.textrange('replace', text);
      }
   };

   var _textrange = {
      xul: {
         get: function(property) {
            this[0].focus();
            var props = {
               position: this[0].selectionStart,
               start: this[0].selectionStart,
               end: this[0].selectionEnd,
               length: this[0].selectionEnd - this[0].selectionStart,
               text: this.val().substring(this[0].selectionStart, this[0].selectionEnd)
            };

            return typeof property === 'undefined' ? props : props[property];
         },

         set: function(start, end) {
            this[0].focus();
            this[0].selectionStart = start;
            this[0].selectionEnd = end;
         },

         replace: function(text) {
            this[0].focus();
            var start = this[0].selectionStart;
            this.val(this.val().substring(0, this[0].selectionStart) + text + this.val().substring(this[0].selectionEnd, this.val().length));
            this[0].selectionStart = start;
            this[0].selectionEnd = start + text.length;
         }
      },

      msie: {
         get: function(property) {
            this[0].focus();

            var range = document.selection.createRange();

            if(typeof range === 'undefined') {
               return {
                  position: 0,
                  start: 0,
                  end: this[0].val().length,
                  length: this[0].val().length,
                  text: this.val()
               };
            }

            var rangetext = this[0].createTextRange();
            var rangetextcopy = rangetext.duplicate();

            rangetext.moveToBookmark(range.getBookmark());
            rangetextcopy.setEndPoint('EndToStart', rangetext);

            return {
               position: rangetextcopy.text.length,
               start: rangetextcopy.text.length,
               end: rangetextcopy.text.length + range.text.length,
               length: range.text.length,
               text: range.text
            };
         },

         set: function(start, end) {
            this[0].focus();

            var range = this[0].createTextRange();

            if(typeof range === 'undefined') {
               return this;
            }

            if(typeof start !== 'undefined') {
               range.moveStart('character', start);
               range.collapse();
            }

            if(typeof end !== 'undefined') {
               range.moveEnd('character', end - start);
            }

            range.select();
         },

         replace: function(text) {
            this[0].focus();

            document.selection.createRange().text = text;
         }
      }
   };

   $.fn.textrange = function(method) {
      if(typeof browserType === 'undefined') {
         browserType = 'selectionStart' in this[0] ? 'xul' : document.selection ? 'msie' : 'unknown';
      }

      // I don't know how to support this browser. :c
      if(browserType === 'unknown') {
         return this;
      }

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