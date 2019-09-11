<template>
	<div>
		<a-modal :visible="show" @ok="handleOk" @cancel="handleCancel">
			<div class="content" v-show="data.extensionData">
				<a-row style="margin-top: 20px;">
					<a-col :span="8">
						标签名称
					</a-col>
					<a-col :span="16">
						<a-input v-model="data.name"></a-input>
					</a-col>
				</a-row>
				<a-row style="margin-top: 30px;">
					<a-col :span="8">属性名</a-col>
					<a-col :span="16">属性值</a-col>
				</a-row>
				<a-row style="margin-top: 10px;" v-for="attr in data.extensionData" :key="attr.name">
					<a-col :span="8">{{attr.name}}</a-col>
					<a-col :span="16"><a-input v-model="attr.value"></a-input></a-col>
				</a-row>
			</div>
		</a-modal>
	</div>
</template>

<script>
import Input from 'ant-design-vue/lib/input'
import Row from 'ant-design-vue/lib/row'
import Col from 'ant-design-vue/lib/col'
import Divider from 'ant-design-vue/lib/divider'
export default {
	name: 'task-modal',
	components:{
		[Input.name]: Input,
		[Row.name]: Row,
		[Col.name]: Col,
		[Divider.name]: Divider,
	},
	props:{
		show: {
			type: Boolean,
			default: false
		},
		data:{
			type: [Object,Array]
		}
	},
	methods:{
		handleOk(){
			this.$emit('handleOk', this.data)
		},
		handleCancel(){
			this.$emit('handleCancel')
		},
	}
}
</script>

<style lang="less">

</style>


