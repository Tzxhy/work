<template>
	<div>
		<div style="text-align:right;margin-bottom: 20px; margin-top: 20px; ">
			<el-button
			type="primary"
			@click="newUser = true">新增用户</el-button>
		</div>
		<el-table
		:data="tableData">
		<el-table-column
		label="操作">
		<template scope="scope">
			<el-button
			icon="edit"
			type="text"></el-button>
			<el-button
			icon="delete"
			type="text"></el-button>
		</template>
	</el-table-column>
	<el-table-column
	label="ID"
	prop="id"></el-table-column>
	<el-table-column
	label="账号"
	prop="account"></el-table-column>
	<el-table-column
	label="密码"
	prop="password"></el-table-column>
	<el-table-column
	label="名字"
	prop="name"></el-table-column>
	<el-table-column
	label="角色"
	prop="role"></el-table-column>
	<el-table-column
	label="开始时间"
	prop="startDate"></el-table-column>
	<el-table-column
	label="结束时间"
	prop="endDate"></el-table-column>
	<el-table-column
	label="状态"
	prop="status"></el-table-column>

</el-table>
<el-pagination
layout="prev, pager, next"
:total="30"></el-pagination>

<el-dialog title="新建用户" :visible.sync="newUser">
  <el-form :model="form" label-position="left" label-width="80px">
    <el-form-item label="ID">
      <el-input v-model="form.id"></el-input>
    </el-form-item>
    <el-form-item label="账号">
    	<el-input v-model="form.account"></el-input>
      
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="名字">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="角色">
      <el-select v-model="form.region" placeholder="请选择角色">
        <el-option label="超级管理员" value="1"></el-option>
        <el-option label="区域管理员" value="2"></el-option>
        <el-option label="普通用户" value="3"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="名字">
      <el-input v-model="form.name"></el-input>
    </el-form-item>



    <el-form-item label="状态">
      <el-select v-model="form.status" placeholder="请选择状态">
        <el-option label="有效" value="0"></el-option>
        <el-option label="无效" value="1"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="newUser = false">取 消</el-button>
    <el-button type="primary" @click="newUser = false">确 定</el-button>
  </div>
</el-dialog>



</div>
</template>

<script>
	export default {
		data(){
			return {
				tableData: [
				{id: 'A123', account: 'A12221', password: '12344321', name: 'guohl', role: 'sysManager', startDate: '2017-7-31 14:23:11', endDate: '2017-7-31 14:23:22', status: 'online'}
				],
				newUser: false,
				form: {
					id:'', account: '', password: '', name: '', role: '', startDate: '', endDate: '',status: ''
				}
			}
		},
		methods: {
			
		}
	}

</script>

<style scoped>

</style>