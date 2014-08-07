(function(){
	var eventObjects = [],
		disabled = false,
		pub = {		
		/** Add an element that should be animated on scroll
		 * parameters: arg.element, arg.styles, arg.startAt, arg.endAt
		 */
		add: function( element, arg ){
			// Add styles for the object
			var tS = {};
			for(var i in arg.styles) {
				tS[i] = [/*default*/ parseFloat(element.css(i)) ,/*new*/ parseFloat(arg.styles[i]) ];
			}
			// Add eventObject to array
			eventObjects.push({
				animationStartAt: arg.startAt,
				animationEndAt: arg.endAt,
				targetStyle: tS,
				element: element
			});
		},
		clear: function(){
			eventObjects.length = 0;
		},
		/** Disable the animations
		 */
		disable: function(){
			disabled = true;
		},
		/** Enable the animations
		 */
		enable: function(){
			disabled = false;
		}
	};
	
	$(document).scroll(function(){
		if(disabled) return;
		var sT = $(document).scrollTop();		
		for(var i = 0; i < eventObjects.length; i++){
			var eo = eventObjects[i];
			if(sT <= eo.animationEndAt && sT >= eo.animationStartAt) {
				var progress = (sT - eo.animationStartAt) / (eo.animationEndAt - eo.animationStartAt);
				for (var attr in eo.targetStyle) {
					var def = eo.targetStyle[attr][0];
					eo.element.css(attr, def+((eo.targetStyle[attr][1] - def) * progress));
				}
			}
		}
	});
	
	jQuery.fn.animateByScroll = function() {
		if (typeof arguments[0] === "boolean")
			arguments[0] ? pub.enable() : pub.disable() // If true, enable; otherwise, disable. 
		else if (typeof arguments[0] === "object")
			pub.add(this, arguments[0]);
	};
})();
