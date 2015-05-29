/* 
* 
* Copyright (c) 2012-2015 Adobe Systems Incorporated. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
* 
*/

var systemNotifications = {
    fadeDelay: 800,
    showDelay: 5000,
    hideDelay: 2000,

    init: function() {
        systemNotifications.queue = systemNotifications.queue|| $('<div id="systemNotificationQueue"></div>').appendTo('body');
    },

    showSticky: function (title, message, type) {
        this.init();
        var notification = $('<div class="systemNotification systemNotificationType-' + type + '"><span class="systemNotificationTitle">' + title + '</span><div class="systemNotificationContent">' + message + '</div></div>').hide().appendTo(systemNotifications.queue).fadeIn(systemNotifications.fadeDelay);

        var closeButton = $('<span class="systemNotificationClose">x</span>').appendTo(notification);

        closeButton.click(function() {
            notification.fadeOut(systemNotifications.fadeDelay, function() { $(this).remove(); });
        });
    },

    showNormal: function (title, message, type) {
        doNotShow = false;
        this.init();

        if(doNotShow != true){
            var notification = $('<div class="systemNotification systemNotificationType-' + type + '"><span class="systemNotificationTitle">' + title + '</span><div class="systemNotificationContent">' + message + '</div></div>');
            notification.hide().appendTo(systemNotifications.queue).fadeIn(systemNotifications.fadeDelay);

            var timer = setTimeout(function() {
                notification.fadeOut(systemNotifications.fadeDelay, function() { $(this).remove(); });
            }, systemNotifications.showDelay);

            notification.mouseenter(function() {
                clearTimeout(timer);
            });

            notification.mouseleave(function() {
                timer = setTimeout(function() {
                    notification.fadeOut(systemNotifications.fadeDelay, function() { $(this).remove(); });
                }, systemNotifications.hideDelay);
            });
        }
    },

    showError: function(title, message, options) {
        if (options && options.sticky) {
            this.showSticky(title, message, 'error')
        } else {
            this.showNormal(title, message, 'error')
        }
    },

    showInfo: function(title, message, options) {
        if (options && options.sticky) {
            this.showSticky(title, message, 'info')
        } else {
            this.showNormal(title, message, 'info')
        }
    },

    showSuccess: function(title, message, options) {
        if (options && options.sticky) {
            this.showSticky(title, message, 'ok')
        } else {
            this.showNormal(title, message, 'ok')
        }
    }


}
