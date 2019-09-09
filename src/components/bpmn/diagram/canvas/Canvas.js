import eventBus from './../event-bus';

import {
	append as svgAppend,
	attr as svgAttr,
	classes as svgClasses,
	create as svgCreate,
	transform as svgTransform
} from 'tiny-svg';

import {
	isNumber,
	assign,
	forEach,
	every,
	debounce,
	bind,
	reduce
} from 'min-dash';

export default class Canvas {
	constructor(config) {
		this._eventBus = eventBus
		this._init(config)
	}
	_init = function (config) {
		var eventBus = this._eventBus;

		var container = this._container = createContainer(config)

		// 创建svg画布区域
		var svg = this._svg = svgCreate('svg')
		svgAttr(svg, {
			width: '100%',
			height: '100%'
		});
		svgAppend(container, svg);
		var viewport = this._viewport = createGroup(svg, 'viewport');
		this.layers = {};

		eventBus.on('diagram.init', function () {
			eventBus.fire('canvas.init', {
				svg: svg,
				viewport: viewport
			});
		}, this)

	}
	getContainer = ()=> {
		return this._container
	}
}

function createContainer(config) {
	var options = {
		width: '100%',
		height: '100%'
	};

	var container = config.container || document.body;

	var parent = document.createElement('div');
	parent.setAttribute('class', 'dg-canvas-container')
	assign(parent.style, {
		position: 'relative',
		overflow: 'hidden',
		width: options.width,
		height: options.height
	})

	container.appendChild(parent);

	return parent
}

function createGroup(parent, cls, childIndex) {
	var group = svgCreate('g');
	svgClasses(group).add(cls);

	var index = childIndex !== undefined ? childIndex : parent.childNodes.length - 1;

	parent.insertBefore(group, parent.childNodes[index] || null);

	return group;
}