/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

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

// JavaScript Document

if (typeof wahelper == 'undefined') {
	var wahelper = {
		maxWeight: 1
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
