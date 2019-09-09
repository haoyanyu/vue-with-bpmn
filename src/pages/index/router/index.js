import appRoute from './base'

import Vue from 'vue';
import Router from 'vue-router';
import ErrorPage from '@/errorPage/index.vue'
import MainPage from '@/pages/index/views/layout'

Vue.use(Router)

const RouterConfig = {
	routes: [
		{
			path: '*',
			redirect: '/error',
		},
		{
			path:'/error',
			component: resolve => require(['@/errorPage/index.vue'], resolve)
		},
		{
			path: '/',
			component: MainPage,
			redirect: '/main',
			children: [
				{
					path:'main',
					component: resolve => require(['@index/views/index'], resolve)
				},
				...appRoute
			]
		},
		
		
	],
	scrollBehavior (to, from, savedPosition) {
		
	},
	mode: 'hash'
}



export const router = new Router(RouterConfig)
router.beforeEach((to, from, next)=>{
	next()
})
router.afterEach(route => {})