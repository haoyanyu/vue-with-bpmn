import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const state = {
	menu: [{
			key: 'bpmn-list',
			title: '流程列表',
			path: 'bpmn-list',
			icon: 'icon-liucheng'
		},
		{
			key: 'bpmn',
			title: '新建流程',
			path: 'bpmn',
			icon: 'icon-fangkuai'
		},
		{
			key: 'bpmn-test',
			title: '新建',
			path: 'bpmn-test',
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