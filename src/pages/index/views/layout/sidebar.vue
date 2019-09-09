<template>
	<div class="custom-sidebar">
		<h2>智慧营销平台</h2>
		<a-menu mode="inline" :selectedKeys.sync="selectedKeys" @click="goPage">
			<template v-for="menu in menuList">
				<a-menu-item :key="menu.key">
					<i class="iconfont" :class="menu.icon"></i>
					<span>{{menu.title}}</span>
				</a-menu-item>
			</template>
		</a-menu>
	</div>
</template>
<script>
import Menu from 'ant-design-vue/lib/menu'

export default {
	name: 'side-menu',
	components: {
		[Menu.name]: Menu,
		[Menu.Item.name]: Menu.Item,
		[Menu.SubMenu.name]: Menu.SubMenu,
	},
	props:{
		menuList: {
			type: Array,
			required: true
		},
		selectedKeys: {
			type: Array
		}
	},
	data(){
		return {

		}
	},
	computed:{},
	methods:{
		// 页面跳转
		goPage({item, key, keyPath}){
			this.$router.push({name: key})
		}
	}
}
</script>

<style lang="less">
	.custom-sidebar {
		& > h2 {
			text-align: center;
			position: relative;
			line-height: 3em;
			&:after {
				content: '';
				position: absolute;
				height: 1px;
				width: 96%;
				background: linear-gradient(to right, transparent, #E8E8E8 10%,  #E8E8E8 90%, transparent);
				left: 2%;
				bottom:0
			}
		}
	}
</style>

