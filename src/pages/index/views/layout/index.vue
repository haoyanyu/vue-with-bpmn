<template>
	<div class="layout-page">
		<a-layout>
			<a-layout-sider class="my-sider">
				<my-sidebar :menu-list="menuList" :selectedKeys="selectedKeys"></my-sidebar>
			</a-layout-sider>
			<a-layout>
				<a-layout-header style="background:transparent; height: 44px;line-height:44px">
					<my-header>
						heade
					</my-header>
				</a-layout-header>
				<a-layout-content>
					<my-main>
						<div slot="sub-page">
							<router-view></router-view>
						</div>
					</my-main>
				</a-layout-content>
			</a-layout>
		</a-layout>

	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import  Layout  from 'ant-design-vue/lib/layout'

import MyHeader from './top'
import MySidebar from './sidebar'
import MyMain from './main'

export default {
	name: 'main-layout',
	components: {
		[Layout.name]: Layout,
		[Layout.Header.name]: Layout.Header,
		[Layout.Sider.name]: Layout.Sider,
		[Layout.Content.name]: Layout.Content,
		MyHeader,
		MyMain,
		MySidebar
	},
	data(){
		return {
			defaultOpenKeys:[], //初始展开的 SubMenu 菜单项 key 数组
			defaultSelectedKeys:[], //初始选中的菜单项 key 数组
			openKeys:[], //当前展开subMenu菜单项
			selectedKeys:[],
		}
	},
	computed:{
		...mapGetters(['menuList'])
	},
	created(){
		this.selectedKeys = [this.$route.name]
	},
	watch:{
		'$route':{
			handler:function(val, old) {
				this.selectedKeys = [val.name]
			},
			deep: true
		}
	}
}
</script>

<style lang="less">
	.my-sider {
		background: #fff !important;
		box-shadow: 1px 0 8px rgba(211,211,211, .7), 8px 0 15px rgba(211,211,211, .5)
	}
</style>

