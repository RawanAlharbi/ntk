define([
	'backbone',
	'views/item/WidgetMulti',
	'text!./template.js',

	'codemirror',
],
function(Backbone, WidgetView, Template, CodeMirror){
    'use strict';

	return WidgetView.extend({
		// Map inputs to model
		ins: [
			// title: decorative, to: <widget model field>
			{title: 'in1', to: 'in1'},
			{title: 'in2', to: 'in2'},
            {title: 'in3', to: 'in3'},
			{title: 'in4', to: 'in4'},
		],
		outs: [
			// title: decorative, from: <widget model field>, to: <widget model field being listened to>
			{title: 'out1', from: 'output', to: 'out1'},
		],
		sources: [],
		typeID: 'Code',
		className: 'code',
        categories: ['logic'],
		template: _.template(Template),

		initialize: function(options) {
			if(!options) {
				options = {};
			}
            
            var code =  '// Enter your Javascript here to process inputs and return the result\n' +
            '// the four input values are in an array called "ins" as\n' + 
            '// ins.in1, ins.in2, ins.in3, ins.in4\n' +
            '//\n' +
            'var output = ins.in1 + ins.in2 + ins.in3 + ins.in4;\n' +
            '\n' +
            'return output;';
            
			_.extend(options, {
				filter: code,
				in1: 0,
				in2: 0,
                in3: 0,
				in4: 0,
				out1: 0,
			});
			// Call the superclass constructor
			WidgetView.prototype.initialize.call(this, options);
			this.model.set('title', 'Code');

			// Re-register the filter function after a change. Filter is interpreted once and converted to a function so it has to be re-evaluated
			this.model.on('change', function(model) {
				if(model.changedAttributes().filter) {
					this.registerFilters();
				}
			}, this);

		},
        /**
         * called when widget is rendered
         *
         * @return
         */
		onRender: function() {
			WidgetView.prototype.onRender.call(this);

            var self = this;

			this.registerFilters();

			var codeEditor = CodeMirror.fromTextArea(this.$('.filterFunction')[0], {
				lineNumbers: true,
				smartIndent: true,
				mode: "javascript",
			});

			codeEditor.on('blur', function() {
				self.model.set('filter', codeEditor.getValue());
				self.registerFilters.apply(self);
			});
            
            this.$( ".widgetBottom .tab" ).click(function() {
                // ensure the code is visible
                codeEditor.refresh();
            });
		},
        
		registerFilters: function() {
			this.signalChainFunctions.length = 0;
			this.signalChainFunctions.push(new Function("var ins = arguments[1]; " + this.model.get('filter')));
		},
	});
});
