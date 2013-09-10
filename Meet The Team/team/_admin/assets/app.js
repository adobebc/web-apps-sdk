var App = {
}

App.Config = {
    'webappName': 'MeetTheTeam',
    'MembersPerPage': 100
}

App.


App.Helpers = {
    getUrlVars: function() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },

    // merge a template with data
    // assume we always get a list
    // so for the form we will pass a collection of one item
    //cheaper
    renderTemplateWithData: function(items, templateScriptSelector, containerSelector) {
        var templateData = $(templateScriptSelector).html();
        var compiledTemplate = _.template(templateData);
        _.each(items, function(item) {
            $(containerSelector).append(compiledTemplate({"item": item}));
        })
    }
}


