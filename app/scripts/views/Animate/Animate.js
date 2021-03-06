define([
	'backbone',
    'rivets',
	'views/item/WidgetMulti',
	'text!./template.js',

	// If you would like signal processing classes and functions include them here
	'utils/SignalChainFunctions',
	'utils/SignalChainClasses',
    'velocity',
    'velocity-ui',
],
function(Backbone, rivets, WidgetView, Template, SignalChainFunctions, SignalChainClasses, velocity, Velocity){
    'use strict';

	return WidgetView.extend({
		// Map inputs to model
		ins: [
			// title: decorative, to: <widget model field>
			{title: 'in', to: 'in'},
            {title: 'Length', to: 'aniLength'},
            {title: 'Start', to: 'aniStart'},
            {title: 'End', to: 'aniEnd'},
		],
		outs: [
			// title: decorative, from: <widget model field>, to: <widget model field being listened to>
			{title: 'out1', from: 'output', to: 'out1'},
		],
		sources: [],
		typeID: 'Animate',
		className: 'animate',
        categories: ['logic'],
		template: _.template(Template),

		initialize: function(options) {

			// Call the superclass constructor
			WidgetView.prototype.initialize.call(this, options);
            
            // Call any custom DOM events here
            this.model.set({
                title: 'Animate',
                in: 0,
				output: 0,
                aniLength: 2000,
                aniStart: 0,
                aniEnd: 1023,
                aniLoop: false,
                playSequence: false,
                threshold: 512,
                animationRunning: false,
                lastInput: -1,
                userSequence: "0,500,500\n500,100,1000\n100,1000,500\n1000,0,500",
                sequencePosition: 0,
                
            });
            
            this.stateHighlight = '#f8c885';


		},
        /**
         * called when widget is rendered
         *
         * @return
         */
		onRender: function() {
			WidgetView.prototype.onRender.call(this);
            
            this.$(".animateDiv").css('visibility','hidden');
            this.$(".animateDiv").css('position','absolute');
            
            var self = this;

		},
        
        onModelChange: function(model) {
            if(model.changedAttributes().in !== undefined) {
                
                var input = parseFloat(this.model.get('in'));
                var lastInput = this.model.get('lastInput');
                var length = parseFloat(this.model.get('aniLength'));
                var start = parseFloat(this.model.get('aniStart'));
                var end = parseFloat(this.model.get('aniEnd'));
                var threshold = parseFloat(this.model.get('threshold'));

                if (input >= threshold && lastInput < threshold) {
                    this.runAnimation(start,end,length);
                    
                } else if (input < threshold  && lastInput >= threshold) {
                    this.$(".animateDiv").velocity("stop");
                    this.model.set('animationRunning',false);
                }
                this.model.set('lastInput',input);
            }
        },
        
        runAnimation: function(start, end, length) {
            
            var self = this;
            var animateDiv = this.$(".animateDiv");
            
            if (!this.model.get('animationRunning')) {

                if (this.model.get('playSequence')) {
                    // build a sequence from the text field in the widget
                    var userSequence = [];
                    var velocitySequence = [];
                    
                    // get the string and parse it into an array
                    // the format for each move in the sequence is start, end, duration, one move to a line
                    var str = this.model.get('userSequence');
                    str = str.replace(/(\r\n|\n|\r)/gm, "\n");
                    str.split('\n').forEach( function(item) {
                        var move = item.split(',');
                        userSequence.push(move);
                        //console.log(move);
                    } );
                    
                    var sequenceLen = userSequence.length;
                    self.model.set('sequencePosition',0);
                    // build the Velocity sequence http://julian.com/research/velocity/#uiPack
                    userSequence.forEach( function(item) { 
                         var obj = {
                              e: animateDiv,
                              p: { tween: [ item[1], item[0] ] },
                              o: { 
                                  duration: item[2],
                                  progress: function(elements, c, r, s, t) {
                                      self.model.set('output',t);
                                  },
                                  complete: function() {
                                      var currentPosition = 1 + self.model.get('sequencePosition');
                                      if (currentPosition >= sequenceLen) {
                                          if (self.model.get('aniLoop')) {
                                              self.model.set('sequencePosition',0);
                                              $.Velocity.RunSequence(velocitySequence);
                                          } else {
                                              self.model.set('animationRunning',false);
                                          }
                                      } else {
                                          self.model.set('sequencePosition',currentPosition);
                                      }
                                  },
                              },
                         }
                         velocitySequence.push(obj);
                    } );
                    
                    // execute the sequence
                    $.Velocity.RunSequence(velocitySequence);
                } else {
                    animateDiv.velocity({
                        tween: [ end, start ]
                    }, {
                        duration: length,
                        progress: function(elements, c, r, s, t) {
                            //console.log("The current tween value is " + t);
                            self.model.set('output',t);
                        },
                        loop: this.model.get('aniLoop'),
                        complete: function() {
                            self.model.set('animationRunning',false);
                        },
                    });
                
                    this.model.set('animationRunning', true);
                }
            }
        },
	});
});
