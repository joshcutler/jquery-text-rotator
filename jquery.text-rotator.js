/*
 *  jQuery textRotate - v0.9
 *  A text rotation plugin for jquery
 *
 *  Made by Josh Cutler
 *  Under MIT License
 */
;(function ( $, window, document, undefined ) {
    // Create the defaults once
    var pluginName = "textRotate",
        defaults = {
        animation: 'vertical-rotate',
        delay: 1000,
        random: true,
        phrases: [],
        keep_initial: true,
        height: '30px',
        width: '200px'
    };

    // The actual plugin constructor
    function Plugin ( element, options ) {
      this.element = element;
      this.$element = $(element)
      this.settings = $.extend( {}, defaults, options );
      this._defaults = defaults;
      this._name = pluginName;
      this.init();
    }

    Plugin.prototype = {
      init: function () {
        // Parse settings
        this.settings.ix = 0
        if (this.settings.keep_initial) {
          this.settings.ix = 1
          this.settings.phrases.unshift(this.$element.text());
        }
        if (this.settings.random) {
          this.settings.phrases = this.shuffle_array(this.settings.phrases)
        }

        // Setup render wrapper
        this.$element.html("<span class='textRotate-rotator animation-" + this.settings.animation +"'><span class='front'></span><span class='back'></span></span>");
        this.$rotator = this.$element.find('.textRotate-rotator');
        this.$front_element = this.$element.find('.front');
        this.$front_element.css('width', this.settings.width).css('height', this.settings.height);
        this.$back_element = this.$element.find('.back');
        this.$back_element.css('width', this.settings.width).css('height', this.settings.height);
        this.$front_element.text(this.settings.phrases[0]);

        var $this = this;
        changeText = function($this) {
          console.log($this.settings.ix)
          ix = $this.settings.ix
          
          var back_buffer, front_buffer;
          if ($this.$rotator.hasClass('flipped')) {
            back_buffer = $this.$front_element;
            front_buffer = $this.$back_element;
          } else {
            front_buffer = $this.$front_element;
            back_buffer = $this.$back_element;
          }

          back_buffer.text($this.settings.phrases[ix]);
          $this.$rotator.toggleClass('flipped')
          $this.settings.ix = (ix + 1) % $this.settings.phrases.length;
        }

        setInterval(function() { changeText($this); }, this.settings.delay); 
      },
      shuffle_array: function(array_to_shuffle) {
        var i = array_to_shuffle.length, j, temp;
        if ( i == 0 ) return;
        while ( --i ) {
            j = Math.floor( Math.random() * ( i + 1 ) );
            temp = array_to_shuffle[i];
            array_to_shuffle[i] = array_to_shuffle[j];
            array_to_shuffle[j] = temp;
        }
        return array_to_shuffle;
      }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
      this.each(function() {
          if ( !$.data( this, "plugin_" + pluginName ) ) {
              $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
          }
      });

      // chain jQuery functions
      return this;
    };

})( jQuery, window, document );