<template>
	<div>
		<p>Hello, {{name}}</p>
		<slot></slot>
		<button @click="myclick">点击修改</button>
		<button @click="show">点击查看</button>
		<slot name="h1"></slot>
	</div>
	
</template>

<script>
	


	export default {
		props: {
			name: {
				type: String,
				default: "HY"
			},
			word: {
				type: String
			}
		},
		data(){
			return {


			}
		},
		methods: {
			myclick(){
				console.log('clicked in HelloWithName.vue');
				console.log(this);
				this.name = this.word;
				this.$emit('update:name', this.word)
				console.log('changed name into ttt');
				this.$emit('alert');
			},
			show(){
				console.log(this.name);
			}

		},
		computed: {

		}


	}


</script>