const appRoute = [
	{
		path: 'bpmn',
		name: 'bpmn',
		title: '流程图',
		component: resolve => require(['@/pages/index/views/index.vue'], resolve)
	},
	{
		path: 'bpmn-list',
		name: 'bpmn-list',
		title: '流程图',
		component: resolve => require(['@/pages/index/views/index-list.vue'], resolve)
	},
	{
		path: 'bpmn-test',
		name: 'bpmn-test',
		title: '流程图',
		component: resolve => require(['@/pages/index/views/bpmn-test.vue'], resolve)
	},
]

export default appRoute