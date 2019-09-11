<template>
	<div style="">
		<div id="js-canvas"></div>
		<div id="js-properties-panel"></div>
		<div>
			<a-button @click="download">保存到本地</a-button>
			<button @click="createNew">新建</button>
		</div>
		<!-- <a-modal></a-modal> -->
	</div>
</template>
<script>
import BpmnModdle from '@bpmn/customPalette';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from './custom-elements';

import diagramXml from '../../../assets/diagram1.bpmn';
import cusomElements from '@bpmn/customPalette/custom-element.json';
import customModdleDescriptor from '@bpmn/customPalette/provider'


export default {
	name: 'bpmn',
	data() {
		return {
			processId: 'test', //流程id
			processName: 'test', //流程name
			viewer: null,
			canvas: null,
			bpmnText: '',
			file: '',
		}
	},
	mounted() {
		this.$nextTick().then(() => {

			this.canvas = document.getElementById('js-canvas')

			this.viewer = new BpmnModdle({
				container: this.canvas,
				keyboard: {
					bindTo: window
				},
				propertiesPanel: {
					parent: '#js-properties-panel'
				},
				additionalModules: [
					propertiesPanelModule,
					// propertiesProviderModule
					customModdleDescriptor
				],
				moddleExtensions: {
					// custom: cusomElements,
					camunda: camundaModdleDescriptor
				}

			})
			this.create()

		})
	},
	methods: {
		download() {

			this.viewer.saveXML({ format: true }, (err, xml) => {
				if (xml) {
					this.bpmnText = xml
					var a = document.createElement('a');
					a.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodeURIComponent(xml)
					a.download = 'diagram.bpmn';
					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);
					a = null;
				}

			})
		},
		create() {
			this.bpmnText = diagramXml
			this.viewer.importXML(diagramXml, err => {
				if (err) {
					throw (err)
				}
				this.viewer.get('canvas').zoom('fit-viewport')
				var eventBus = this.viewer.get('eventBus');

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
		createNew() {
			// this.viewer.createDiagram(this.processId, this.processName, err => {
			// 	if (err) {
			// 		throw (err)
			// 	}
			// 	this.viewer.get('canvas').zoom('fit-viewport')
			// 	var eventBus = this.viewer.get('eventBus');

			// 	var events = [
			// 		'element.click',
			// 		'element.dblclick'
			// 	]
			// 	events.forEach(event => {
			// 		eventBus.on(event, (e) => {
			// 			// console.log(event, 'on', e.element.id)
			// 		})
			// 	})
			// })
			this.viewer.createDiagram(err => {
				if(!err) {
					this.viewer.get('canvas').zoom('fit-viewport')
				}
			})
		},
		
	}
}
</script>

<style lang="less">
#js-canvas {
  height: 600px;
  overflow: scroll;
  background: #fff;
}
#js-properties-panel {
  position: absolute;
  top: 10px;
  right: 14px;
}
</style>

