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
       */
      get: function() {
      },

      /**
       * $().textrange('set')
       */
      set: function() {
      },

      /**
       * $().textrange('replace')
       */
      replace: function() {
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