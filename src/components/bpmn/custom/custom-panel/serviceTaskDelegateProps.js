import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
var assign = require('lodash/assign');
var map = require('lodash/map');

import {
	is,
	getBusinessObject
} from './../../bpmn-js/lib/util/ModelUtil';

export default function (group, element, bpmnFactory, translate) {
	// template type
	// 详情部分 下拉选择使用
	var DEFAULT_OPTIONS = [{
			value: 'class',
			name: translate('Java类')
		},
		{
			value: 'expression',
			name: translate('表达式')
		},
		{
			value: 'delegateExpression',
			name: translate('代理表达式')
		}
	];
	var selectOptions = DEFAULT_OPTIONS;
	// 默认属性名 用于重新选择时匹配
	var DEFAULT_DELEGATE_PROPS = ['class', 'expression', 'delegateExpression'];
	// 默认的值
	var DELEGATE_PROPS = {
		'camunda:class': undefined,
		'camunda:expression': undefined,
		'camunda:delegateExpression': undefined
	};
	// 获取当前节点的类型
	function getType(element) {
		var bo = getBusinessObject(element);
		var cls = bo.get('camunda:class');
		if (typeof cls !== 'undefined') {
			return 'class';
		}

		var expression = bo.get('camunda:expression');
		if (typeof expression !== 'undefined') {
			return 'expression';
		}

		var delegateExpression = bo.get('camunda:delegateExpression');
		if (typeof delegateExpression !== 'undefined') {
			return 'delegateExpression';
		}
	}

	// 选择implementation后 对应显示后续输入值
	var PROPERTIES = {
		class: 'camunda:class',
		expression: 'camunda:expression',
		delegateExpression: 'camunda:delegateExpression'
	};

	function getDelegationLabel(type) {
		switch (type) {
			case 'class':
				return translate('Java类');
			case 'expression':
				return translate('表达式');
			case 'delegateExpression':
				return translate('代理表达式');
			default:
				return '';
		}
	}
	// Only return an entry, if the currently selected
	// element is a start event.
	if (is(element, 'bpmn:ServiceTask')) {
		group.entries.push(entryFactory.selectBox({
			id: 'implementation',
			label: '实现方式',
			selectOptions: selectOptions,
			modelProperty: 'implType',

			get: function (element, node) {
				return {
					implType: getType(element) || ''
				};
			},

			set: function (element, values, node) {
				var bo = getBusinessObject(element);
				var oldType = getType(element);
				var newType = values.implType;

				var props = assign({}, DELEGATE_PROPS);

				if (DEFAULT_DELEGATE_PROPS.indexOf(newType) !== -1) {

					var newValue = '';
					if (DEFAULT_DELEGATE_PROPS.indexOf(oldType) !== -1) {
						newValue = bo.get('camunda:' + oldType);
					}
					console.log(newValue)
					props['camunda:' + newType] = newValue;
				}


				var commands = [];
				// commands.push(cmdHelper.updateBusinessObject(element, bo, props));
				commands.push({
					cmd: 'properties-panel.update-businessobject',
					context: {
						element: element,
						businessObject: bo,
						properties: props
					}
				});
				console.log(commands)
				return commands;

			}
		}));
		group.entries.push(entryFactory.textField({
			id: 'delegate',
			label: translate('Value'),
			dataValueLabel: 'delegationLabel',
			modelProperty: 'delegate',
			get: function (element, node) {
				var bo = getBusinessObject(element);
				var type = getType(element);
				var attr = PROPERTIES[type];
				var label = getDelegationLabel(type);
				// 实时显示后续值和label名
				return {
					delegate: bo.get(attr),
					delegationLabel: label
				};
			},
			set: function (element, values, node) {
				var bo = getBusinessObject(element);
				var type = getType(element);
				var attr = PROPERTIES[type];
				var prop = {};
				prop[attr] = values.delegate || '';
				return {
					cmd: 'properties-panel.update-businessobject',
					context: {
						element: element,
						businessObject: bo,
						properties: prop
					}
				};
			},
			validate: function (element, values, node) {
				return DEFAULT_DELEGATE_PROPS.indexOf(getType(element)) !== -1 && !values.delegate ? {
					delegate: translate('必填')
				} : {};
			},

			hidden: function (element, node) {
				return !(DEFAULT_DELEGATE_PROPS.indexOf(getType(element)) !== -1);
			}
		}));
		group.entries.push(entryFactory.textField({
			id: 'resultVariable',
			label: translate('结果变量'),
			modelProperty: 'resultVariable',
			get: function (element, node) {
				var bo = getBusinessObject(element);
				return {
					resultVariable: bo.get('camunda:resultVariable')
				};
			},
			set: function (element, values, node) {
				var bo = getBusinessObject(element);

				var resultVariable = values.resultVariable || undefined;

				var props = {
					'camunda:resultVariable': resultVariable
				};

				// if (is(bo, 'camunda:DmnCapable') && !resultVariable) {
				// 	props = assign({
				// 		'camunda:mapDecisionResult': 'resultList'
				// 	}, props);
				// }

				return {
					cmd: 'properties-panel.update-businessobject',
					context: {
						element: element,
						businessObject: bo,
						properties: props
					}
				};
			},
			hidden: function (element, node) {
				return getType(element) !== 'expression';
			}

		}))

	}
}