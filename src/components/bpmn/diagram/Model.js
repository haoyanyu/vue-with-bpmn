import {
  assign,
  find,
  isFunction,
  isNumber,
  omit
} from 'min-dash';

import {
  domify,
  query as domQuery,
  remove as domRemove
} from 'min-dom';

import eventBus from './event-bus';
import Canvas from './canvas'
import Palete from './palete'

const DEFAULT_OPTIONS = {
	width:'100%',
	height:'100%',
	position: 'relative'
}
function ensureUnit(val) {
  return val + (isNumber(val) ? 'px' : '');
}
export default class Modeler {
	constructor(options, callback) {
		options = assign({}, DEFAULT_OPTIONS, options)
		this._container = this._createContainer(options)
		this._moddle = this._createModdle(options)
		this._palete = this._createPalete(options)
		
		// console.log(this._container)
		this._init(this._moddle, this._container, options)
	}
	_createModdle =  options => {
		var canvas = new Canvas({
			container: this._container
		})
		return canvas
	}
	_createPalete = options=> {
		return new Palete(this._moddle)
	}
	_createContainer = options => {
		// domify(html, doc) html : 要新建的元素， doc:在doc下新增createElement
		var container = domify('<div class="dg-container"></div>')
		assign(container.style, {

			width: ensureUnit(options.width),
			height: ensureUnit(options.height),
			position: options.position
		})
		return container

	}
	attachTo = parentNode => {
		if(!parentNode) {
			throw new Error('parentNode required')
		}
		// 先清除parentNode里的元素，确保直插入一个
		this.detach();
		if(typeof parentNode === 'string') {
			parentNode = domQuery(parentNode)
		}
		parentNode.appendChild(this._container)
		this._emit('attach', {});

	}
	detach = ()=>{
		var container = this._container, parentNode = container.parentNode;

		if(!parentNode) {return}

		this._emit('detach');
		parentNode.removeChild(container)
	}
	_init = (moddle, container, options)=> {
		if(options && options.container) {
			this.attachTo(options.container)
		}
		
	}
	_emit = (type, event)=> {
		return eventBus.fire(type, event)
	}
}