import {
	isFunction,
	isArray,
	isNumber,
	bind,
	assign
} from 'min-dash';

const DEFAULT_PRIORITY = 1000
export default class EventBus {
	constructor() {
		this._listeners = {};

		// 清空
		this.on('diagram.destory', 1, this._destory, this);
	}
	/**
	 * @param {String|Array<String>} events
	 * @param {Number} [priority=1000] the priority in which this listener is called, larger is higher
	 * @param {Function} callback
	 * @param {Object} [that] Pass context (`this`) to the callback
	 */
	on = (events, priority, callback, that) => {
		events = Array.isArray(events) ? events : [events]

		if (typeof priority === 'function') {
			that = callback;
			callback = priority;
			priority = DEFAULT_PRIORITY
		}

		if (!isNumber(priority)) {
			throw new Error('priority must be a number')
		}

		var actualCallback = callback;
		if (that) {
			actualCallback = bind(callback, this)
			actualCallback['__fn'] = callback
		}

		var self = this;
		// 依次添加事件监听
		events.forEach(e => {
			self._addListener(e, {
				priority: priority,
				callback: actualCallback,
				next: null
			})
		})
	}
	createEvent = (data) => {
		var event = new InternalEvent();

		event.init(data);
		return event
	}
	// 触发事件
	/**
	 * Fires a named event.
	 *
	 * @example
	 *
	 * // fire event by name
	 * events.fire('foo');
	 *
	 * // fire event object with nested type
	 * var event = { type: 'foo' };
	 * events.fire(event);
	 *
	 * // fire event with explicit type
	 * var event = { x: 10, y: 20 };
	 * events.fire('element.moved', event);
	 *
	 * // pass additional arguments to the event
	 * events.on('foo', function(event, bar) {
	 *   alert(bar);
	 * });
	 *
	 * events.fire({ type: 'foo' }, 'I am bar!');
	 *
	 * @param {String} [name] the optional event name
	 * @param {Object} [event] the event object
	 * @param {...Object} additional arguments to be passed to the callback functions
	 *
	 * @return {Boolean} the events return value, if specified or false if the
	 *                   default action was prevented by listeners
	 */
	fire = (type, data) => {
		console.log(type)
		var event, firstListener, returnValue, args;

		args = [type, data];

		if (typeof type === 'object') {
			event = type,
				type = event.type
		}
		if (!type) {
			throw new Error('no event type')
		}

		firstListener = this._listeners[type]; //获取事件回调
		if (!firstListener) return;

		if (data instanceof InternalEvent) {
			event = data;
		} else {
			event = this.createEvent(data) //data里的属性添加到InternalEvent实例上
		}
		args[0] = event;

		var originalType = event.type;
		if (type !== originalType) {
			event.type = type
		}

		try {
			returnValue = this._invokeListeners(event, args, firstListener)
		} finally {
			// reset event type after delegation
			if (type !== originalType) {
				event.type = originalType;
			}
		}
		// set the return value to false if the event default
		// got prevented and no other return value exists
		if (returnValue === undefined && event.defaultPrevented) {
			returnValue = false;
		}

		return returnValue;
	}
	_destory = ()=> {
		this._listeners = {}
	}
	_addListener = (event, newListener) => {
		var listener = this._getListeners(event),
			previousListener;

		if (!listener) {
			this._setListeners(event, newListener)
			return
		}

		while (listener) {
			if (listener.prority < newListener.prority) {
				newListener.next = listener

				if (previousListener) {
					previousListener.next = newListener
				} else {
					this._setListeners(event, newListener)
				}
				return
			}
			previousListener = listener;
			listener = listener.next
		}
	}
	_getListeners = event => {
		return this._listeners[event]
	}
	_setListeners = (event, listener) => {
		this._listeners[event] = listener
	}
	// 触发事件回调
	_invokeListeners = (event, args, listener)=> {
		var returnValue;
		while(listener) {
			if(event.cancelBubble) {
				break;
			}
			returnValue = this._invokeListener(event, args, listener)
			listener = listener.next
		}
		return returnValue
	}
	_invokeListener=(event, args, listener) => {
		var returnValue;
		try {
			// 获取运行返回值
			var fn = listener.callback
			returnValue = fn.apply(null, args);
			// 返回true
			if(returnValue !== undefined) {
				event.returnValue = returnValue
				event.stopPropagation()
			}
			// 返回false
			if(returnValue === false) {
				event.preventDefault()
			}

		} catch(e) {
			throw e;
		}
		return returnValue
	}
}

function InternalEvent() {};

InternalEvent.prototype.stopPropagation = function () {
	this.cancelBubble = true;
};

InternalEvent.prototype.preventDefault = function () {
	this.defaultPrevented = true;
};

InternalEvent.prototype.init = function (data) {
	assign(this, data || {});
};