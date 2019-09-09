import {
	assign
} from 'min-dash';


/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */
export default function PaletteProvider(bpmnFactory, palette, create, elementFactory, spaceTool, lassoTool) {

	this.bpmnFactory = bpmnFactory;
	this._create = create;
	this._elementFactory = elementFactory;
	this._spaceTool = spaceTool;
	this._lassoTool = lassoTool;

	palette.registerProvider(this);
}

PaletteProvider.$inject = [
	'bpmnFactory',
	'palette',
	'create',
	'elementFactory',
	'spaceTool',
	'lassoTool'
];


PaletteProvider.prototype.getPaletteEntries = function (element) {

	var actions = {},
		create = this._create,
		elementFactory = this._elementFactory,
		spaceTool = this._spaceTool,
		lassoTool = this._lassoTool,
		bpmnFactory = this.bpmnFactory;


	function createAction(type, group, className, title, idfixed, options = {}) {


		function createListener(event) {
			const businessObject = bpmnFactory.create(type, {}, idfixed);
			
			var shape = elementFactory.createShape(assign({
				type: type,
				businessObject
			}, options));
			if (options) {
				shape.businessObject.di.isExpanded = options.isExpanded;
			}

			create.start(event, shape);
		}

		var shortType = type.replace(/^bpmn:/, '');

		return {
			group: group,
			className: className,
			title: title || 'Create ' + shortType,
			action: {
				dragstart: createListener,
				click: createListener
			}
		};
	}

	function createParticipant(event, collapsed) {
		create.start(event, elementFactory.createParticipantShape(collapsed));
	}

	assign(actions, {

		'create.start-event': createAction(
			'bpmn:StartEvent', 'event', 'iconfont icon-kaishi end', '开始'
		),
		'create.end-event': createAction(
			'bpmn:EndEvent', 'event', 'iconfont icon-jieshu end', '结束'
		),
		'event-separator': {
			group: 'event',
			separator: true
		},
		'create.exclusive-gateway': createAction(
			'bpmn:ExclusiveGateway', 'gateway', 'bpmn-icon-gateway-xor green', '互斥网关'
		),
		'create.parallel-gateway': createAction(
			'bpmn:ParallelGateway', 'gateway', 'bpmn-icon-gateway-parallel green', '并行网关'
		),
		'gateway-separator': {
			group: 'gateway',
			separator: true
		},
		'create.shortMessageDelegate': createAction(
			'bpmn:ServiceTask', 'activity', 'iconfont icon-icon-test message', '发送短信', 'shortMessageDelegate', {
				// tasktype: 'shortMessageDelegate',
				// 
			}
		),
		'create.appPushDelegate': createAction(
			'bpmn:ServiceTask', 'activity', 'iconfont icon-xiaoxi2 pushapp', 'APP推送', 'appPushDelegate', {
				// tasktype: 'appPushDelegate',
				// 
			}
		),
		'create.tagDelegate': createAction(
			'bpmn:ServiceTask', 'activity', 'iconfont icon-biaoqian addtag', '添加标签', 'tagDelegate', {
				// tasktype: 'tagDelegate',
				// color: ''
			}
		),
		'create.unTagDelegate': createAction(
			'bpmn:ServiceTask', 'activity', 'iconfont icon-xinxinicon removetag', '移除标签', 'unTagDelegate', {
				// tasktype: 'unTagDelegate',
				// color: ''
			}
		),
		// 'create.subprocess-expanded': createAction(
		//   'bpmn:SubProcess', 'activity', 'bpmn-icon-subprocess-expanded', 'Create expanded SubProcess',
		//   { isExpanded: true }
		// ),
		// 'create.participant-expanded': {
		//   group: 'collaboration',
		//   className: 'bpmn-icon-participant',
		//   title: 'Create Pool/Participant',
		//   action: {
		//     dragstart: createParticipant,
		//     click: createParticipant
		//   }
		// }
	});
	return actions;
};