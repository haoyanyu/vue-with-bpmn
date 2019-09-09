<template>
	<div>
		<div id="canvas"></div>
	</div>
</template>

<script>
import Modeler from '@bpmn/diagram'
export default {
	name: 'test',
	data(){
		return {

		}
	},
	mounted(){
		this.$nextTick().then(()=> {
			console.log('我准备好啦！')
			var viewer = new Modeler({
				container: '#canvas'
			})
		})
	}
}
</script>
<style lang="less">
#canvas {
	height: 400px;
	width:100%;
}
	
</style>

