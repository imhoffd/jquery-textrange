/**
 * jquery-textrange
 * A jQuery plugin for getting, setting and replacing the selected text in input fields and textareas.
 * See the [README](https://github.com/dwieeb/jquery-textrange/blob/1.x/README.md) for usage and examples.
 *
 * (c) 2012-2014 Daniel Imhoff <dwieeb@gmail.com> - danielimhoff.com
 */

(function(factory) {

	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		factory(require('jquery'));
	} else {
		factory(jQuery);
	}

})(function($) {

	var browserType,

	textrange = {

		/**
		 * $().textrange() or $().textrange('get')
		 *
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
		 *
		 * Sets the selected text of an object by specifying the start and length of the selection.
		 *
		 * The start and length parameters are identical to PHP's substr() function with the following changes:
		 *  - excluding start will select all the text in the field.
		 *  - passing 0 for length will set the cursor at start. See $().textrange('setcursor')
		 *
		 * @param (optional) start
		 * @param (optional) length
		 *
		 * @see http://php.net/manual/en/function.substr.php
		 */
		set: function(start, length) {
			var s = parseInt(start),
			    l = parseInt(length),
			    e;

			if (typeof start === 'undefined') {
				s = 0;
			} else if (start < 0) {
				s = this[0].value.length + s;
			}

			if (typeof length !== 'undefined') {
				if (length >= 0) {
					e = s + l;
				} else {
					e = this[0].value.length + l;
				}
			}

			_textrange[browserType].set.apply(this, [s, e]);

			return this;
		},

		/**
		 * $().textrange('setcursor')
		 *
		 * Sets the cursor at a position of the text field.
		 *
		 * @param position
		 */
		setcursor: function(position) {
			return this.textrange('set', position, 0);
		},

		/**
		 * $().textrange('replace')
		 * Replaces the selected text in the input field or textarea with text.
		 *
		 * @param text The text to replace the selection with.
		 */
		replace: function(text) {
			_textrange[browserType].replace.apply(this, [String(text)]);

			return this;
		},

		/**
		 * Alias for $().textrange('replace')
		 */
		insert: function(text) {
			return this.textrange('replace', text);
		}
	},

	_textrange = {
		xul: {
			get: function(property) {
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
				if (typeof end === 'undefined') {
					end = this[0].value.length;
				}

				this[0].selectionStart = start;
				this[0].selectionEnd = end;
			},

			replace: function(text) {
				var start = this[0].selectionStart;
				var end = this[0].selectionEnd;
				var val = this.val();
				this.val(val.substring(0, start) + text + val.substring(end, val.length));
				this[0].selectionStart = start;
				this[0].selectionEnd = start + text.length;
			}
		},

		msie: {
			get: function(property) {
				var range = document.selection.createRange();

				if (typeof range === 'undefined') {
					var props = {
						position: 0,
						start: 0,
						end: this.val().length,
						length: this.val().length,
						text: this.val()
					};

					return typeof property === 'undefined' ? props : props[property];
				}

				var start = 0;
				var end = 0;
				var length = this[0].value.length;
				var lfValue = this[0].value.replace(/\r\n/g, '\n');
				var rangeText = this[0].createTextRange();
				var rangeTextEnd = this[0].createTextRange();
				rangeText.moveToBookmark(range.getBookmark());
				rangeTextEnd.collapse(false);

				if (rangeText.compareEndPoints('StartToEnd', rangeTextEnd) === -1) {
					start = -rangeText.moveStart('character', -length);
					start += lfValue.slice(0, start).split('\n').length - 1;

					if (rangeText.compareEndPoints('EndToEnd', rangeTextEnd) === -1) {
						end = -rangeText.moveEnd('character', -length);
						end += lfValue.slice(0, end).split('\n').length - 1;
					} else {
						end = length;
					}
				} else {
					start = length;
					end = length;
				}

				var props = {
					position: start,
					start: start,
					end: end,
					length: length,
					text: range.text
				};

				return typeof property === 'undefined' ? props : props[property];
			},

			set: function(start, end) {
				var range = this[0].createTextRange();

				if (typeof range === 'undefined') {
					return;
				}

				if (typeof end === 'undefined') {
					end = this[0].value.length;
				}

				var ieStart = start - (this[0].value.slice(0, start).split("\r\n").length - 1);
				var ieEnd = end - (this[0].value.slice(0, end).split("\r\n").length - 1);

				range.collapse(true);

				range.moveEnd('character', ieEnd);
				range.moveStart('character', ieStart);

				range.select();
			},

			replace: function(text) {
				document.selection.createRange().text = text;
			}
		}
	};

	$.fn.textrange = function(method) {
		if (typeof this[0] === 'undefined') {
			return this;
		}

		if (typeof browserType === 'undefined') {
			browserType = 'selectionStart' in this[0] ? 'xul' : document.selection ? 'msie' : 'unknown';
		}

		// I don't know how to support this browser. :c
		if (browserType === 'unknown') {
			return this;
		}

		// Focus on the element before operating upon it.
		if (document.activeElement !== this[0]) {
			this[0].focus();
		}

		if (typeof method === 'undefined' || typeof method !== 'string') {
			return textrange.get.apply(this);
		} else if (typeof textrange[method] === 'function') {
			return textrange[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else {
			$.error("Method " + method + " does not exist in jQuery.textrange");
		}
	};
});
