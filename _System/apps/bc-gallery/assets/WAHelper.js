// JavaScript Document
if (typeof wahelper == 'undefined') {
	var wahelper = {
		masWeight: 1
	};
}

wahelper.fixWeightInconsistancies = function(data) {
    wahelper.maxWeight = 1;
    
    for (var i=0;i<data.models.length-1;i++) {

        if (data.models[i].get('weight') == null) {

            data.models[i].set({
                weight: wahelper.maxWeight
            });
            data.models[i].save();
            
            console.log("Fixing webapp null weighting for #" + data.models[i].id + ". Fixing to " + data.models[i].get('weight'));

        } else {
        
            if (i > 0) {
        
                if (data.models[i-1].get('weight')  == data.models[i].get('weight') ) {
        
                    data.models[i].set({
                        weight: wahelper.maxWeight
                    });
                    data.models[i].save();
                    
                    console.log("Fixing webapp duplicate weighting for #" + data.models[i].id + ". Fixing to " + wahelper.maxWeight);
                }
            }
        }

        wahelper.maxWeight = data.models[i].get('weight')+1;
    }
    
    return data;
}

// update weightings
wahelper.updateWeightings = {};

wahelper.updateWeightings.start = function(event, ui) {
	wahelper.updateWeightings.oldIndex = ui.item.index();
};

wahelper.updateWeightings.update = function(event, ui, waName, callback) {
    var items = ui.item.parent().children();

    var newOrders = {};
    var newIndex = ui.item.index();
    var from, to, dir;
    
    if (newIndex < wahelper.updateWeightings.oldIndex) {
        from = newIndex;
        to = wahelper.updateWeightings.oldIndex;
        dir = 1;
    } else {
        from = wahelper.updateWeightings.oldIndex+1;
        to = newIndex+1;
        dir = -1;
    }

    for (var i=from;i<to;i++) {
        newOrders[$(items[i]).attr('id').replace(/[^\d]/g, '')] = $(items[i+dir]).data('weight');
    }

    newOrders[$(items[wahelper.updateWeightings.oldIndex]).attr('id').replace(/[^\d]/g, '')] = $(items[newIndex]).data('weight');

    
    if (newIndex < wahelper.updateWeightings.oldIndex) {
        from = newIndex;
        to = wahelper.updateWeightings.oldIndex;
    } else {
        from = wahelper.updateWeightings.oldIndex;
        to = newIndex;
    }

    for (var i=from;i<=to;i++) {
		$(items[i]).data('weight', newOrders[$(items[i]).attr('id').replace(/[^\d]/g, '')]);
    }

    wahelper.updateWeightings.doUpdate(waName, newOrders, callback);
};

wahelper.updateWeightings.doUpdate = function(waName, newWeights, callback) {
    for (var itemId in newWeights) {
        var itemToUpdate = wadata.get(itemId);
        itemToUpdate.set({
            "weight": newWeights[itemId]
       	});
        itemToUpdate.save({});
    }
    callback();
};
