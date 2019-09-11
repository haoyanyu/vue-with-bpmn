import {
	is,
	getBusinessObject
} from './../../bpmn-js/lib/util/ModelUtil';
var domQuery = require('min-dom').query;
const scriptImplementation = require('bpmn-js-properties-panel/lib/provider/camunda/parts/implementation/Script');

export default function (group, element, bpmnFactory, translate) {
	var bo = getBusinessObject(element),
		eventDefinition = null;
	if (!bo) {
		return;
	}
	// 判断节点类型
	if (bo.eventDefinitions) {
		forEach(bo.eventDefinitions, function (event) {
			if (is(event, 'bpmn:ConditionalEventDefinition')) {
				eventDefinition = event;
			}
		});
	}
	// 条件枚举
	var CONDITIONAL_SOURCES = [
		'bpmn:Activity',
		'bpmn:ExclusiveGateway',
		'bpmn:InclusiveGateway',
		'bpmn:ComplexGateway'
	];

	if (!(is(element, 'bpmn:SequenceFlow') && CONDITIONAL_SOURCES.indexOf(element.source.type) > -1) &&
		!eventDefinition) {
		return;
	}
	var script = scriptImplementation('language', 'body', true, translate);
	
	group.entries.push({
		id: 'condition',
		label: '判断条件',
		html: '<div class="bpp-row">' +
			'<label for="cam-condition-type">条件类型</label>' +
			'<div class="bpp-field-wrapper">' +
			'<select id="cam-condition-type" name="conditionType" data-value>' +
			'<option value="expression">表达式</option>' +
			'<option value="script">脚本</option>' +
			'<option value="" selected></option>' +
			'</select>' +
			'</div>' +
			'</div>' +

			// expression
			'<div class="bpp-row">' +
			'<label for="cam-condition" data-show="isExpression">表达式</label>' +
			'<div class="bpp-field-wrapper" data-show="isExpression">' +
			'<input id="cam-condition" type="text" name="condition" />' +
			'<button class="clear" data-action="clear" data-show="canClear">' +
			'<span>X</span>' +
			'</button>' +
			'</div>' +
			'<div data-show="isScript">' +
			script.template +
			'</div>' +
			'</div>',
		get: function (element, propertyName) {
			var conditionExpression = eventDefinition ? eventDefinition.condition : bo.conditionExpression;
			var values = {},
				conditionType = '';

			if (conditionExpression) {
				var conditionLanguage = conditionExpression.language;
				if (typeof conditionLanguage !== 'undefined') {
					conditionType = 'script'
					values = script.get(element, conditionExpression);
				} else {
					conditionType = 'expression';
					values.condition = conditionExpression.get('body');
				}
			}
			values.conditionType = conditionType;

			return values;
		},
		set: function (element, values, containerElement) {
			var conditionType = values.conditionType;
			var commands = [];

			var conditionProps = {
				body: undefined
			};
			if (conditionType === 'script') {
				conditionProps = script.set(element, values, containerElement);
			} else {
				var condition = values.condition;

				conditionProps.body = condition;
			}
			var conditionOrConditionExpression;
			if (conditionType) {
				var element = bpmnFactory.create('bpmn:FormalExpression', conditionProps);
				element.$parent = eventDefinition || bo;
				conditionOrConditionExpression = element;

				var source = element.source;
				if (source && source.businessObject.default === bo) {
					commands.push({
						cmd: 'element.updateProperties',
						context: {
							element: source,
							properties: {
								'default': undefined
							}
						}
					})
				}
			}

			var update = eventDefinition ? {
				condition: conditionOrConditionExpression
			} : {
				conditionExpression: conditionOrConditionExpression
			}

			commands.push({
				cmd: 'properties-panel.update-businessobject',
				context: {
					element: element,
					businessObject: eventDefinition || bo,
					properties: update
				}
			})
			return commands
		},
		validate: function (element, values) {
			var validationResult = {};

			if (!values.condition && values.conditionType === 'expression') {
				validationResult.condition = '必填项';
			} else if (values.conditionType === 'script') {
				validationResult = script.validate(element, values);
			}

			return validationResult;
		},
		isExpression: function (element, inputNode) {
			var conditionType = domQuery('select[name=conditionType]', inputNode);
			if (conditionType.selectedIndex >= 0) {
				return conditionType.options[conditionType.selectedIndex].value === 'expression';
			}
		},

		isScript: function (element, inputNode) {
			var conditionType = domQuery('select[name=conditionType]', inputNode);
			if (conditionType.selectedIndex >= 0) {
				return conditionType.options[conditionType.selectedIndex].value === 'script';
			}
		},

		clear: function (element, inputNode) {
			// clear text input
			domQuery('input[name=condition]', inputNode).value = '';

			return true;
		},

		canClear: function (element, inputNode) {
			var input = domQuery('input[name=condition]', inputNode);

			return input.value !== '';
		},

		script: script,

		cssClasses: ['bpp-textfield']

	})
}