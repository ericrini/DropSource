var DropSource = DropSource ? DropSource : {};

(function (DropSource) {

	'use strict';

	DropSource.ComponentManager = function () {};

	DropSource.ComponentManager.prototype.render = function (data, parent) {
		if (data && data.elements) {
			for (var index = 0; index < data.elements.length; index++) {
				var current = data.elements[index];

				// Render this component onto the parent element.
				var component = new DropSource.Component(current, parent);
				component.render();

				// Recursively traverse the children. Note the current component becomes the new parent context.
				if (current.elements) {
					this.render(current, component);
				}
			}
		}
	};

})(DropSource);