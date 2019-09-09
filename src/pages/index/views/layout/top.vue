<template>
	<div class="top-user">
		<div class="user-items">
			<span>
			<a-icon type="bars" />
		</span>
		<span>
			<a-icon type="bell" />
		</span>
		<span>
			<i class="iconfont icon-kehu"></i>
		</span>
		</div>
		
	</div>
</template>

<script>
// import {}
export default {
	name:'top'
}
</script>

<style lang="less">
.top-user {
	width: 130px;
	position: absolute;
	right:80px;
	height: 100%;
	top: 0;
	bottom:0;
	.user-items {
		display: flex;
		span {
			flex:1;
			margin: 0 5px;
			font-size: 20px;
		}
	}
	
}
</style>


