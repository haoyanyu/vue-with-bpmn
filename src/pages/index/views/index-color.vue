<template>
<div>
	<div style="position: relative;width:100%;height:300px">
		<div id="js-canvas"></div>
	</div>
	<div style="position: relative;width:100%;height:300px">
		<div id="js-canvas2"></div>
	</div>
</div>
	
</template>
<script>
import BpmnModdle from '@bpmn/bpmn-js/lib/Modeler';

import BpmnModdler from 'bpmn-js/lib/Modeler';
import camundaModdleDescriptor from './custom-elements';

import diagramXml from '../../../assets/diagram1.bpmn';


export default {
	name: 'bpmn',
	data() {
		return {
			viewer: null,
			canvas: null,
			viewer2: null,
			canvas2: null,
			bpmnText: '',
			file: '',
		}
	},
	mounted() {
		// 
		this.$nextTick().then(() => {
			
			this.canvas = document.getElementById('js-canvas')
			this.viewer = new BpmnModdler({
				container: this.canvas,
				keyboard: {
					bindTo: window
				},
			})
			this.create()

			// 修改源码的
			this.canvas2 = document.getElementById('js-canvas2')
			this.viewer2 = new BpmnModdle({
				container: this.canvas2,
				keyboard: {
					bindTo: window
				},
			})
			this.create2()

		})
	},
	methods: {
		create() {
			this.viewer.importXML(diagramXml, err => {
				if (err) {
					throw (err)
				}
				var overlays = this.viewer.get('overlays'),
					canvas = this.viewer.get('canvas'),
					elementRegistry = this.viewer.get('elementRegistry'),
					modeling = this.viewer.get('modeling');
				
				this.viewer.get('canvas').zoom('fit-viewport')

				var elementToColor = elementRegistry.get('ServiceTask_appPushDelegate_0wulpvm');

				modeling.setColor([ elementToColor], {
					stroke: 'green',
					fill: 'rgba(0, 80, 0, 0.4)'
				});
			})

		},
		// 修改源码
		create2() {
			this.viewer2.importXML(diagramXml, err => {
				if (err) {
					throw (err)
				}
				this.viewer2.get('canvas').zoom('fit-viewport')
				var eventBus = this.viewer2.get('eventBus');

				var events = [
					'element.click',
					'element.dblclick'
				]
				events.forEach(event => {
					eventBus.on(event, (e) => {
					})
				})
			})

		},
		
	}
}
</script>

<style lang="less">
#js-canvas {
  height: 400px;
  overflow: scroll;
  background: #fff;
}
#js-canvas2 {
  height: 400px;
  overflow: scroll;
  background: #fff;
  margin-top: 100px;
}
.highlight-overlay {
	background: green;
	position: absolute;
}
</style>

