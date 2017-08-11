
<template>
	<div>
		<p>Hello, {{hanya}}</p>
		<button @click="showName">查看hanya名称</button>
		<HelloWithName name="hanya" @alert="alert" word="ttt"><slot name="h1">ttttt</slot></HelloWithName>
		<HelloWithName :name.sync="hanya" @alert="alert" word="hhh"><slot name="h1">ttttt</slot></HelloWithName>
	</div>
</template>

<script>
	


	export default {
		prop: {

		},
		data(){
			return {
				hanya: 'hanyahanya'

			}
		},
		methods: {
			alert(){
				// console.log('alert in parentNode');
				// alert('alert')
			},
			showName(){
				console.log(this.hanya);
			}

		},
		computed: {

		},
		components: {
			HelloWithName: require('./HelloWithName.vue'),
		}


	}


</script>