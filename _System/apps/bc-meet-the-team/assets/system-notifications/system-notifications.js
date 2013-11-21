/*************************************************************************
*
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2013 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and may be covered by U.S. and Foreign Patents,
* patents in process, and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
*
*
**************************************************************************/

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
