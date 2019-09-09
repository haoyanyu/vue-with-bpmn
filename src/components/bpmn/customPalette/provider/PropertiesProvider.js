import inherits from 'inherits';

import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator';

// Require all properties you need from existing providers.
// In this case all available bpmn relevant properties without camunda extensions.
import processProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps';
import eventProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps';
import linkProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps';
import documentationProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/DocumentationProps';
import idProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps';
import nameProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps';


// import serviceTaskDelegateProps from 'bpmn-js-properties-panel/lib/provider/camunda/parts/serviceTaskDelegateProps';
// import conditionalProps from 'bpmn-js-properties-panel/lib/provider/camunda/parts/ConditionalProps';
import serviceTaskDelegateProps from './serviceTaskDelegateProps';
import extensionProps from './extensionProps';
import conditionalProps from './conditionalProps';

function createGeneralTabGroups(element, bpmnFactory, canvas, elementRegistry, translate) {
	var generalGroup = {
		id: 'general',
		label: '基本信息',
		entries: []
	};
	idProps(generalGroup, element, translate,{
		description: '',
		disabled: ()=> {return true}
	});
	nameProps(generalGroup, element, bpmnFactory, canvas, translate,{
		description: '名称'
	});
	processProps(generalGroup, element, translate);

	var detailsGroup = {
		id: 'details',
		label: '详细信息',
		entries: []
	};
	serviceTaskDelegateProps(detailsGroup, element, bpmnFactory, translate);
	linkProps(detailsGroup, element, translate);
	eventProps(detailsGroup, element, bpmnFactory, elementRegistry, translate);
	conditionalProps(detailsGroup, element, bpmnFactory,translate);
	// console.log(detailsGroup)
	// var documentationGroup = {
	// 	id: 'documentation',
	// 	label: '文本信息',
	// 	entries: []
	// };

	// documentationProps(documentationGroup, element, bpmnFactory, translate);

	return [
		generalGroup,
		detailsGroup,
		// documentationGroup
	];
}

function createExtensionElementsGroups(element, bpmnFactory, elementRegistry, translate) {
	var propertiesGroup = {
		id: 'extensionElements-properties',
		label: '属性',
		entries: []
	};

	// Add the spell props to the black magic group.
	extensionProps(propertiesGroup, element,bpmnFactory);

	return [
		propertiesGroup
	];
}

export default function CustomPropertiesProvider(eventBus, bpmnFactory, canvas, elementRegistry, translate) {

	PropertiesActivator.call(this, eventBus);

	this.getTabs = function (element) {

		var generalTab = {
			id: 'general',
			label: '基本信息',
			groups: createGeneralTabGroups(element, bpmnFactory, canvas, elementRegistry, translate)
		};

		var extensionsTab = {
			id: 'extensionElements',
			label: '扩展',
			groups: createExtensionElementsGroups(element, bpmnFactory, elementRegistry, translate)
		};

		// Show general + "magic" tab
		return [
			generalTab,
			extensionsTab
		];
	};
}

inherits(CustomPropertiesProvider, PropertiesActivator)