<template>
	<div >
		<transition name="fade">
			<div v-show="show" class="task-modal">
				tankaung 
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'task-modal',
	props:{
		show: {
			type: Boolean,
			default: false
		},
		data:{
			type: Object,
			default: {}
		}
	}
}
</script>

<style lang="less">
.task-modal {
position: fixed;
top:0;
right:0;
width: 200px;
height:200px;
background: red;
}
</style>


