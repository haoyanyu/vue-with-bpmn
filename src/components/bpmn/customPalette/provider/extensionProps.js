import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
var Ids = require('ids').default;
import {
	is,
	getBusinessObject
} from './../../bpmn-js/lib/util/ModelUtil';

var assign = require('lodash/assign');
var map = require('lodash/map'),
	forEach = require('lodash/forEach'),
	find = require('lodash/find');

function getPropertiesElement(element) {
	if (!is(element, 'bpmn:ExtensionElements')) {
		return element.properties;
	} else {
		return find(element.values, function (elem) {
			return is(elem, 'camunda:Properties');
		});;
	}
}

function getPropertyValues(parent) {
	var properties = parent && getPropertiesElement(parent);
	if (properties && properties.values) {
		return properties.values;
	}
	return [];
}

function createParent(element, bo, bpmnFactory) {
	var parent = (function () {
		var el = bpmnFactory.create('bpmn:ExtensionElements', {
			values: []
		})
		el.$parent = bo;
		return el
	})()
	var cmd = {
		cmd: 'properties-panel.update-businessobject',
		context: {
			element: element,
			businessObject: bo,
			properties: {
				extensionElements: parent
			}
		}
	}
	return {
		cmd: cmd,
		parent: parent
	};
}
export default function (group, element, bpmnFactory) {

	// Only return an entry, if the currently selected
	// element is a start event.
	if (is(element, 'bpmn:ServiceTask')) {
		var bo = getBusinessObject(element);
		group.entries.push(entryFactory.table({
			id: 'properties',
			description: '',
			labels: ['属性名', '属性值'],
			modelProperties: ['name', 'value'],
			addLabel: '新增',
			getElements: function (element, node) {
				var parent = bo.extensionElements;
				return getPropertyValues(parent);
			},
			addElement: function (element, node) {
				var commands = [],
					parent = bo.extensionElements;
				if (!parent && typeof createParent === 'function') {
					var result = createParent(element, bo, bpmnFactory);
					parent = result.parent;
					commands.push(result.cmd);
				}

				var properties = getPropertiesElement(parent);
				if (!properties) {
					properties = (function () {
						var el = bpmnFactory.create('camunda:Properties', {})
						el.$parent = parent;
						return el
					})()
					if (!is(parent, 'bpmn:ExtensionElements')) {
						commands.push({
							cmd: 'properties-panel.update-businessobject',
							context: {
								element: element,
								businessObject: parent,
								properties: {
									properties: undefined
								}
							}
						});
					} else {
						commands.push({
							cmd: 'properties-panel.update-businessobject-list',
							context: {
								element: element,
								currentObject: parent,
								propertyName: 'values',
								referencePropertyName: 'extensionElements',
								objectsToAdd: [properties],
								objectsToRemove: []
							}
						})
					}
				}

				var propertyProps = {};
				forEach(['name', 'value'], function (prop) {
					propertyProps[prop] = undefined;
				});

				// create id if necessary
				// if (['name', 'value'].indexOf('id') >= 0) {
				// 	var ids = new Ids([32, 32, 1]);
				// 	propertyProps.id = ids.nextPrefixed('Property_');
				// }
				var property = (function () {
					var el = bpmnFactory.create('camunda:Property', propertyProps)
					el.$parent = properties;
					return el
				})()
				commands.push({
					cmd: 'properties-panel.update-businessobject-list',
					context: {
						element: element,
						currentObject: properties,
						propertyName: 'values',
						objectsToAdd: [property]
					}
				});

				return commands;
			},
			updateElement: function (element, value, node, idx) {
				var parent = bo.extensionElements,
					property = getPropertyValues(parent)[idx];

				forEach(['name', 'value'], function (prop) {
					value[prop] = value[prop] || undefined;
				});

				return {
					cmd: 'properties-panel.update-businessobject',
					context: {
						element: element,
						businessObject: property,
						properties: value
					}
				};
			},
			// validate: function (element, value, node, idx) {
			// 	// validate id if necessary
			// 	if (['name', 'value'].indexOf('id') >= 0) {

			// 		var parent = bo.extensionElements,
			// 			properties = getPropertyValues(parent),
			// 			property = properties[idx];

			// 		if (property) {
			// 			// check if id is valid
			// 			var validationError = utils.isIdValid(property, value.id, translate);

			// 			if (validationError) {
			// 				return {
			// 					id: validationError
			// 				};
			// 			}
			// 		}
			// 	}
			// },
			removeElement: function (element, node, idx) {
				var commands = [],
					parent = bo.extensionElements,
					properties = getPropertiesElement(parent),
					propertyValues = getPropertyValues(parent),
					currentProperty = propertyValues[idx];
				commands.push({
					cmd: 'properties-panel.update-businessobject-list',
					context: {
						element: element,
						currentObject: properties,
						propertyName: 'values',
						referencePropertyName: null,
						objectsToRemove: [currentProperty]
					}
				})
				if (propertyValues.length === 1) {
					// remove camunda:properties if the last existing property has been removed
					if (!is(parent, 'bpmn:ExtensionElements')) {
						commands.push({
							cmd: 'properties-panel.update-businessobject',
							context: {
								element: element,
								businessObject: parent,
								properties: {
									properties: undefined
								}
							}
						});
					} else {
						forEach(parent.values, function (value) {
							if (is(value, 'camunda:Properties')) {
								var extensionElements = bo.get('extensionElements');
								if (!extensionElements) {
									commands.push({});
								} else {
									// (element, extensionElements, 'values', 'extensionElements', [value])
									commands.push({
										cmd: 'properties-panel.update-businessobject-list',
										context: {
											element: bo,
											currentObject: element,
											propertyName: 'values',
											referencePropertyName: 'extensionElements',
											objectsToRemove: [value]
										}
									});
								}

								// commands.push(extensionElementsHelper.removeEntry(bo, element, value));
							}
						});
					}
				}

				return commands;
			}
		}));


	}
}