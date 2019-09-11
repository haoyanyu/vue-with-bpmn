import inherits from 'inherits';

import BaseRenderer from './../../diagram-js/lib/draw/BaseRenderer';

import {
	componentsToPath,
	createLine
} from './../../diagram-js/lib/util/RenderUtil';

import {
	append as svgAppend,
	attr as svgAttr,
	create as svgCreate
} from 'tiny-svg';
import {
	getBusinessObject
} from '../../bpmn-js/lib/util/ModelUtil';

import {
	getFillColor,
	getStrokeColor
} from './../../bpmn-js/lib/draw/BpmnRenderUtil';

/**
 * A renderer that knows how to render custom elements.
 */
export default function CustomRenderer(config, eventBus, styles, bpmnRenderer, customPathMap) {

	BaseRenderer.call(this, eventBus, 1500);
	var defaultFillColor = config && config.defaultFillColor,
		defaultStrokeColor = '#405265';
	var computeStyle = styles.computeStyle;
	this.bpmnRenderer = bpmnRenderer;

	this.drawMessagePath = function (p, element,color) {
		var pathData = customPathMap.getScaledPath('MESSAGE', {
			xScaleFactor: 0.9,
			yScaleFactor: 0.9,
			containerWidth: element.width,
			containerHeight: element.height,
			position: {
				mx: 0.235,
				my: 0.315
			}
		})
		var attrs;
		attrs = computeStyle(attrs, {
			fill: getFillColor(element, '#fff'),
			stroke: getStrokeColor(element, color),
			strokeWidth: 2,
			transform: 'translate(14,57) scale(0.05, -0.05)',
		});
		var polygon = drawPath(p, element, pathData, attrs)

		return polygon;
	}
	this.drawStartPath = function (p, element) {
		var pathData = customPathMap.getScaledPath('START', {
			xScaleFactor: 0.9,
			yScaleFactor: 0.9,
			containerWidth: element.width,
			containerHeight: element.height,
			position: {
				mx: 0.235,
				my: 0.315
			}
		})
		var attrs;
		attrs = computeStyle(attrs, {
			fill: getFillColor(element, '#FFFFFF'),
			stroke: getStrokeColor(element, defaultStrokeColor),
			strokeWidth: 2,
			transform: 'translate(2.5,29) scale(0.03, -0.03)',
		});
		var polygon = drawPath(p, element, pathData, attrs)

		return polygon;
	}
	this.drawEndPath = function (p, element) {
		var pathData = customPathMap.getScaledPath('END', {
			xScaleFactor: 0.9,
			yScaleFactor: 0.9,
			containerWidth: element.width,
			containerHeight: element.height,
			position: {
				mx: 0.235,
				my: 0.315
			}
		})
		var attrs;
		attrs = computeStyle(attrs, {
			fill: getFillColor(element, '#FFFFFF'),
			stroke: getStrokeColor(element, defaultStrokeColor),
			strokeWidth: 2,
			transform: 'translate(2.5,29) scale(0.03, -0.03)',
		});
		var polygon = drawPath(p, element, pathData, attrs)

		return polygon;
	}
	this.drawTagPath = function (p, element,pathname, color) {
		var pathData = customPathMap.getScaledPath(pathname, {
			xScaleFactor: 0.9,
			yScaleFactor: 0.9,
			containerWidth: element.width,
			containerHeight: element.height,
			position: {
				mx: 0.235,
				my: 0.315
			}
		})
		var attrs;
		attrs = computeStyle(attrs, {
			fill: getFillColor(element, '#fff'),
			stroke: getStrokeColor(element, color),
			strokeWidth: 2,
			transform: 'translate(18,57) scale(0.045, -0.05)',
		});
		var polygon = drawPath(p, element, pathData, attrs)

		return polygon;
	}
	this.drawRemoveTagPath = function (p, element,pathname, color) {
		var pathData = customPathMap.getScaledPath('TAG_REMOVE', {
			xScaleFactor: 0.9,
			yScaleFactor: 0.9,
			containerWidth: element.width,
			containerHeight: element.height,
			position: {
				mx: 0.235,
				my: 0.315
			}
		})
		var attrs;
		attrs = computeStyle(attrs, {
			fill: getFillColor(element, '#fff'),
			stroke: getStrokeColor(element, color),
			strokeWidth: 2,
			transform: 'translate(0,60) scale(0.045, -0.05)',
		});
		var polygon = drawPath(p, element, pathData, attrs)

		return polygon;
	}
	this.drawAppPath = function (p, element, color) {
		var pathData = customPathMap.getScaledPath('APP', {
			xScaleFactor: 0.9,
			yScaleFactor: 0.9,
			containerWidth: element.width,
			containerHeight: element.height,
			position: {
				mx: 0.235,
				my: 0.315
			}
		})
		var attrs;
		attrs = computeStyle(attrs, {
			fill: getFillColor(element, '#Fff'),
			stroke: getStrokeColor(element, color),
			strokeWidth: 2,
			transform: 'translate(18,57) scale(0.045, -0.05)',
		});
		var polygon = drawPath(p, element, pathData, attrs)

		return polygon;
	}
	this.drawGetwayPath= function (p, element) {
		var pathData = customPathMap.getScaledPath('GATEWAY', {
			xScaleFactor: 0.9,
			yScaleFactor: 0.9,
			containerWidth: element.width,
			containerHeight: element.height,
			position: {
				mx: 0.235,
				my: 0.315
			}
		})
		var attrs;
		attrs = computeStyle(attrs, {
			fill: getFillColor(element, '#FFFFFF'),
			stroke: getStrokeColor(element, defaultStrokeColor),
			strokeWidth: 2,
			transform: 'translate(9,39) scale(0.03, -0.03)',
		});
		var polygon = drawPath(p, element, pathData, attrs)

		return polygon;
	}

	function drawRect(parentGfx, width, height, r, offset, attrs) {

		attrs = computeStyle(attrs, {
			fill: getFillColor(element, defaultFillColor),
			stroke: getStrokeColor(element, defaultStrokeColor),
			strokeWidth: 5,
		});

		var rect = svgCreate('rect');
		svgAttr(rect, {
			x: 0,
			y: 0,
			width: width,
			height: height,
			rx: r,
			ry: r
		});
		svgAttr(rect, attrs);

		svgAppend(parentGfx, rect);

		return rect;
	}

	function drawPath(parentGfx,element, d, attrs) {

		attrs = computeStyle(attrs,{
			strokeWidth: 2,
			fill: getFillColor(element, '#fff'),
			stroke: getStrokeColor(element, '#405265'),
		});
		var path = svgCreate('path');
		svgAttr(path, {
			d: d
		});
		svgAttr(path, attrs);

		svgAppend(parentGfx, path);

		return path;
	}


}

inherits(CustomRenderer, BaseRenderer);

CustomRenderer.$inject = ['config', 'eventBus', 'styles', 'bpmnRenderer', 'customPathMap'];


CustomRenderer.prototype.canRender = function (element) {
	return !element.labelTarget;
};

const CUSTOM_STROKE_COLOR = {
	'shortMessageDelegate': '#8E95F9',
	'tagDelegate': '#3B96D9',
	'unTagDelegate': '#184998',
	'appPushDelegate': '#FDA007',
}
CustomRenderer.prototype.drawShape = function (p, element) {
	var shape; 
	var customId = this.getCustomId(element);
	shape = this.bpmnRenderer.drawShape(p, element,CUSTOM_STROKE_COLOR[customId]);
	if (customId === 'shortMessageDelegate') {
		this.drawMessagePath(p, element,CUSTOM_STROKE_COLOR[customId]);
	}
	if (customId === 'tagDelegate') {
		this.drawTagPath(p, element,'TAG',CUSTOM_STROKE_COLOR[customId]);
	}
	if (customId === 'unTagDelegate') {
		this.drawRemoveTagPath(p, element,'TAG_REMOVE',CUSTOM_STROKE_COLOR[customId]);
	}
	if (customId === 'appPushDelegate') {
		this.drawAppPath(p, element,CUSTOM_STROKE_COLOR[customId]);
	}
	// console.log(element.type)
	if(element.type === 'bpmn:StartEvent') {
		this.drawStartPath(p, element, 'START');
	}
	if(element.type === 'bpmn:EndEvent') {
		this.drawEndPath(p, element, 'END');
	}
	// if(element.type === 'bpmn:ExclusiveGateway') {
	// 	this.drawGetwayPath(p, element, 'GATEWAY');
	// }
	return shape
};

CustomRenderer.prototype.getShapePath = function (shape) {
	var type = shape.type;

	if (type === 'custom:triangle') {
		return this.getTrianglePath(shape);
	}

	if (type === 'custom:circle') {
		return this.getCirclePath(shape);
	}
};

CustomRenderer.prototype.drawConnection = function (p, element) {

	var type = element.type;

	if (type === 'custom:connection') {
		return this.drawCustomConnection(p, element);
	}
};


CustomRenderer.prototype.getConnectionPath = function (connection) {

	var type = connection.type;

	if (type === 'custom:connection') {
		return this.getCustomConnectionPath(connection);
	}
};

CustomRenderer.prototype.getCustomId = function (element) {
	const businessObject = getBusinessObject(element);
	// console.log(businessObject)
	const {id} = businessObject

	return id.split('_')[1]
}


// this.drawTriangle = function (p, side) {
// 	var halfSide = side / 2,
// 		points,
// 		attrs;

// 	points = [halfSide, 0, side, side, 0, side];

// 	attrs = computeStyle(attrs, {
// 		stroke: COLOR_GREEN,
// 		strokeWidth: 2,
// 		fill: COLOR_GREEN
// 	});

// 	var polygon = svgCreate('polygon');

// 	svgAttr(polygon, {
// 		points: points
// 	});

// 	svgAttr(polygon, attrs);

// 	svgAppend(p, polygon);

// 	return polygon;
// };

// this.getTrianglePath = function (element) {
// 	var x = element.x,
// 		y = element.y,
// 		width = element.width,
// 		height = element.height;

// 	var trianglePath = [
// 		['M', x + width / 2, y],
// 		['l', width / 2, height],
// 		['l', -width, 0],
// 		['z']
// 	];

// 	return componentsToPath(trianglePath);
// };

// this.drawCircle = function (p, width, height) {
// 	var cx = width / 2,
// 		cy = height / 2;

// 	var attrs = computeStyle(attrs, {
// 		stroke: COLOR_YELLOW,
// 		strokeWidth: 4,
// 		fill: COLOR_YELLOW
// 	});

// 	var circle = svgCreate('circle');

// 	svgAttr(circle, {
// 		cx: cx,
// 		cy: cy,
// 		r: Math.round((width + height) / 4)
// 	});

// 	svgAttr(circle, attrs);

// 	svgAppend(p, circle);

// 	return circle;
// };

// this.getCirclePath = function (shape) {
// 	var cx = shape.x + shape.width / 2,
// 		cy = shape.y + shape.height / 2,
// 		radius = shape.width / 2;

// 	var circlePath = [
// 		['M', cx, cy],
// 		['m', 0, -radius],
// 		['a', radius, radius, 0, 1, 1, 0, 2 * radius],
// 		['a', radius, radius, 0, 1, 1, 0, -2 * radius],
// 		['z']
// 	];

// 	return componentsToPath(circlePath);
// };

// this.drawCustomConnection = function (p, element) {
// 	var attrs = computeStyle(attrs, {
// 		stroke: COLOR_RED,
// 		strokeWidth: 2
// 	});

// 	return svgAppend(p, createLine(element.waypoints, attrs));
// };

// this.getCustomConnectionPath = function (connection) {
// 	var waypoints = connection.waypoints.map(function (p) {
// 		return p.original || p;
// 	});

// 	var connectionPath = [
// 		['M', waypoints[0].x, waypoints[0].y]
// 	];

// 	waypoints.forEach(function (waypoint, index) {
// 		if (index !== 0) {
// 			connectionPath.push(['L', waypoint.x, waypoint.y]);
// 		}
// 	});

// 	return componentsToPath(connectionPath);
// };