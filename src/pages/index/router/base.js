const appRoute = [
	{
		path: 'bpmn',
		name: 'bpmn',
		title: '流程图',
		component: resolve => require(['@/pages/index/views/index.vue'], resolve)
	},
	{
		path: 'bpmn-color',
		name: 'bpmn-color',
		title: '流程图',
		component: resolve => require(['@/pages/index/views/index-color.vue'], resolve)
	},
	{
		path: 'bpmn-shape',
		name: 'bpmn-shape',
		title: '流程图',
		component: resolve => require(['@/pages/index/views/bpmn-shape.vue'], resolve)
	},
	{
		path: 'bpmn-properties',
		name: 'bpmn-properties',
		title: '流程图',
		component: resolve => require(['@/pages/index/views/bpmn-properties.vue'], resolve)
	},
	{
		path: 'custom-properties',
		name: 'custom-properties',
		title: '流程图',
		component: resolve => require(['@/pages/index/views/bpmn-properties2.vue'], resolve)
	},
]

export default appRoute