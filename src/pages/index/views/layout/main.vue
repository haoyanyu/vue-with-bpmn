<template>
	<div class="main-container">
		<slot name="sub-page">

		</slot>
	</div>
</template>

<script>
export default {
	
}
</script>

<style lang="less">
.main-container {
	height: calc(100vh - 44px);
	overflow: scroll;
	position: relative;
	padding: 10px;
}
</style>


