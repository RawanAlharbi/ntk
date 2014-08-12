define([
	'backbone',
	'rivets',
	'views/item/WidgetMulti',
	'text!tmpl/ElementControl_tmpl.js'
],
function(Backbone, rivets, WidgetView, Template){
    'use strict';

	return WidgetView.extend({
		className: 'elementControl',
		template: _.template(Template),
		sources: [],
		initialize: function(options) {
			WidgetView.prototype.initialize.call(this, options);
			this.model.set({
				ins: [
					//{name: 'in', to: 'in'},
					{title: 'opacity', to: 'opacity'},
					{title: 'X Position', to: 'left'},
					{title: 'Y Position', to: 'top'},
				],
				title: 'Element Control',
				activeControlParameter: 'left',
				controlParameters: [
					{
						name: 'X',
						parameter: 'left',
					},
					{
						name: 'Y',
						parameter: 'top',
					},
					{
						name: 'opacity',
						parameter: 'opacity',
					},
				],
				left: 0,
				opacity: 0,
				top: 50,
			});
		},

	});
});


