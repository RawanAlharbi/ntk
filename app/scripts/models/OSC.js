define([
	'backbone',
	'models/Hardware',
],
function( Backbone, HardwareModel ) {
    'use strict';

    /**
     * OSC Model containing OSC specific properties and defaults
     *
     * @return
     */
	var OSC = HardwareModel.extend({

		// Need to update for separated inputs/outputs
		defaults: {
			type: "OSC",
			ntkReceiveMsg: 0,
			ntkSendMsg: 0,
		},

    });

	return OSC;
});
