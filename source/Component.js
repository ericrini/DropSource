var DropSource = DropSource ? DropSource : {};

(function (document, $, DropSource) {

	'use strict';

	DropSource.Component = function (data, parent) {
		this.id = data.unique_id;
		this.type = data.type;
		this.frame = data.frame;
		this.parent = parent ? parent : { element: document.body };
	};

	DropSource.Component.prototype.getDraggableBounds = function () {
		var container = $(this.parent.element);

		return {
			top: {
				min: 0,
				max: container.innerHeight() - this.frame.height 
			},
			left: {
				min: 0,
				max: container.innerWidth() - this.frame.width
			}
		}
	};

	DropSource.Component.prototype.render = function () {
		var self = this;

		self.element = $('<div>');

		self.element.attr('id', self.id);

		self.element.css({
			position: 'absolute',
			left: self.frame.left,
			top: self.frame.top,
			width: self.frame.width,
			height: self.frame.height,
			'background-color': self.frame['background-color']
		});

		self.element.draggable({
			drag: function (event, data) {
				var target = $(event.target);
				var bounds = self.getDraggableBounds();

				console.log(
					data.position.top, data.position.left,
					bounds.top.min, bounds.top.max, bounds.left.min, bounds.left.max
				);

				if (data.position.top < bounds.top.min) {
					data.position.top = bounds.top.min;
				} 

				if (data.position.top > bounds.top.max) {
					data.position.top = bounds.top.max;
				}

				if (data.position.left < bounds.left.min) {
					data.position.left = bounds.top.min;
				}

				if (data.position.left > bounds.left.max) {
					data.position.left = bounds.left.max;
				}
			}
		});

		self.element.appendTo(self.parent.element);
	};

})(document, $, DropSource);