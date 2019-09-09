<template>
	<div class="page page-list bpmn-list">
		<div class="search-form">
			<a-form :form="search_form">
				<a-row>
					<a-col :span="8">
						<a-form-item label="流程id">
							<a-input v-decorator="['flowId', {initialValue: search_items.flowId}]" placeholder="输入流程id"></a-input>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
			<a-button @click="getlist()" type="primary">查询</a-button>
			<a-button @click="reset">重置</a-button>
		</div>
		<div class="table-container">

		</div>
		<div class="action-container">
			<div id="canvas"></div>
		</div>
	</div>
</template>
<script>
// import Modal from 'ant-design-vue/lib/modal'
import BpmnModdle from '@bpmn/customPalette';
import camundaModdleDescriptor from './custom-elements';

export default {
	name: 'bpmn-list',
	data() {
		return {
			viewer: null,
			search_items: {
				flowId: sessionStorage.getItem('flow-id')
			},
			search_form: this.$form.createForm(this)
		}
	},
	methods: {
		getlist(options) {
			var formItems = this.search_form.getFieldsValue()
			console.log(formItems)
			// 192.168.8.53:41119/engine-rest/process-definition/key/Process_0h9a6y7/xml
			this.$axios.get('/flow-api/engine-rest/process-definition/'+formItems.flowId+'/xml').then(res => {
				console.log(res)
				this.renderFlow(res.bpmn20Xml)
			})
		},
		renderFlow(xml) {
			this.viewer = new BpmnModdle({
				container: '#canvas',
				keyboard: {
					bindTo: window
				}
			})
			this.viewer.importXML(xml, err => {
				if (err) {
					this.$message.error('流程图渲染出错了，稍后再试！')
				}
				this.viewer.get('canvas').zoom('fit-viewport')

			})
		},
		reset() {
			this.search_form.resetFields();
		}
	}
}
</script>

<style lang="less">
.bpmn-list {
  .action-container {
    position: relative;
    #canvas {
      width: 100%;
      height: 400px;
      overflow: scroll;
    }
  }
}
</style>

