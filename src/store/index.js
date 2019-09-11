import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const state = {
	menu: [
		{
			key: 'bpmn',
			title: '初始流程图',
			path: 'bpmn',
			icon: 'icon-fangkuai'
		},
		{
			key: 'bpmn-color',
			title: '自定义颜色',
			path: 'bpmn-color',
			icon: 'icon-liucheng'
		},
		
		{
			key: 'bpmn-shape',
			title: '自定义形状',
			path: 'bpmn-shape',
			icon: 'icon-fangkuai'
		},
		{
			key: 'bpmn-properties',
			title: '自定义属性面板',
			path: 'bpmn-properties',
			icon: 'icon-fangkuai'
		},
		{
			key: 'custom-properties',
			title: '自定义属性面板pro',
			path: 'custom-properties',
			icon: 'icon-fangkuai'
		}
	]
};

const mutations = {};

const actions = {};

const getters = {
	menuList: state => state.menu
};

export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})