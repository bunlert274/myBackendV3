/****
    *
    *   http://callmenick.com/post/slide-and-push-menus-with-css3-transitions
    *
    */

(function(window) {

    'use strict';

    function extend(a, b) {
        for(var key in b) {
            if(b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    function each(collection, callback) {
        for (var i = 0; i < collection.length; i++) {
            var item = collection[i];
            callback(item);
        }
    }

    function SlideMenu(options) {
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
    }

    SlideMenu.prototype.options = {
        warpper: ".main-content",
        menuOpenrClass: "#nav-button",
        maskId: "#overlay"
    };

    SlideMenu.prototype._init = function() {
        this.body = document.body;
        this.warpper = document.querySelector(this.options.warpper);
        this.mask = document.querySelector(this.options.maskId);
        this.menu = document.querySelector(".main-sidebar");
        this.menuOpeners = document.querySelectorAll(this.options.menuOpenrClass);
        this._initEvents();
    }

    SlideMenu.prototype._initEvents = function() {
        this.mask.addEventListener('click', function(e) {
            e.preventDefault();
            this.close();
        }.bind(this));
    };

    SlideMenu.prototype.open = function() {
        this.body.classList.add('has-active-menu');
        this.warpper.classList.add('has-push-left');
        this.menu.classList.add('is-active');
        this.mask.classList.add('is-active');
        this.disableMenuOpeners();
    }

    SlideMenu.prototype.close = function() {
        this.body.classList.remove('has-active-menu');
        this.warpper.classList.remove('has-push-left');
        this.menu.classList.remove('is-active');
        this.mask.classList.remove('is-active');
        this.enableMenuOpeners();
    }

    SlideMenu.prototype.disableMenuOpeners = function() {
        each(this.menuOpeners, function(item) {
            item.disabled = true;
        });
    };

    SlideMenu.prototype.enableMenuOpeners = function() {
        each(this.menuOpeners, function(item) {
            item.disabled = false;
        });
    };

    window.SlideMenu = SlideMenu;

})(window);
