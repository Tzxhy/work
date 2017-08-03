<template>
	<div>
		<div style="text-align:right;margin-bottom: 20px; margin-top: 20px; ">
      <el-row align="middle" type="flex">
        <el-col :span="3" :offset="5"><el-input icon="search" type="search" 
        v-model="searchId" 
        placeholder="请输入ID"
        ></el-input></el-col>
        <el-col :span="2"  style="text-align:center;"> AND </el-col>
        <el-col :span="4">
          <el-input icon="search" type="search" 
          v-model="searchForeignOne" 
          placeholder="请输入用户ID"
        ></el-input></el-col>
        <el-col :span="2"  style="text-align:center;"> AND </el-col>
        <el-col :span="4">
          <el-input icon="search" type="search" 
          v-model="searchForeignTwo" 
          placeholder="请输入模块ID"
        ></el-input></el-col>
        <el-col :span="2">
        <el-button type="primary"
        @click="queryTableDate">搜索</el-button></el-col>
        <el-col :span="3">
        <el-button
        type="primary"
        @click="newUserModule = true">新增用户关系</el-button></el-col>
      </el-row> 

		</div>
		<el-table
		:data="tableData">
		<el-table-column
		label="操作">
		<template scope="scope">
			<el-button
			icon="edit"
			@click="handleEdit(scope.$index, scope.row)"
			type="text"></el-button>
			<el-button
			icon="delete"
      @click="handleDelete(scope.$index, scope.row)"
			type="text"></el-button>
		</template>
	</el-table-column>
	<el-table-column
	label="ID"
	prop="id"></el-table-column>
	<el-table-column
	label="用户ID"
	prop="foreignOne"></el-table-column>
	<el-table-column
	label="模块ID"
	prop="foreignTwo"></el-table-column>
</el-table>
<el-pagination
layout="prev, pager, next"
:page-size="pageSize"
@current-change="handleCurrentChange"
:total="totalPages"></el-pagination>

<el-dialog title="新建用户-模块" :visible.sync="newUserModule">
  <el-form :model="newData" label-position="left" label-width="80px">
    <el-form-item label="用户ID">
    	<el-input v-model="newData.foreignOne"></el-input>
    </el-form-item>
    <el-form-item label="模块ID">
      <el-input v-model="newData.foreignTwo"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="newUserModule = false">取 消</el-button>
    <el-button type="primary" @click="handleNewUserModule"
    :loading="isSaving">确 定</el-button>
  </div>
</el-dialog>
<!-- 编辑 -->
<el-dialog title="编辑用户-模块" :visible.sync="editUserModule">
  <el-form :model="editData" label-position="left" label-width="80px">
    <el-form-item label="ID">
      <el-input v-model="editData.id" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="用户ID">
    	<el-input v-model="editData.foreignOne"></el-input>
      
    </el-form-item>
    <el-form-item label="模块ID">
      <el-input v-model="editData.foreignTwo"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editUserModule = false">取 消</el-button>
    <el-button type="primary" @click="handleEditUserModule"
    :loading="isSaving">确 定</el-button>
  </div>
</el-dialog>

<el-dialog title="删除用户-模块" :visible.sync="deleteUserModule">
  <el-form :model="deleteData" label-position="left" label-width="100px">
  	<el-form-item label="ID">
      <el-input v-model="deleteData.id" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="请输入密码">
      <el-input v-model="deleteData.password"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="deleteUserModule = false">取 消</el-button>
    <el-button type="primary" @click="handleDeleteUserModule"
    :loading="isDeleting">确 定</el-button>
  </div>
</el-dialog>

</div>
</template>

<script>
  import { getUserModule,addUserModule, removeUserModule,editUserModule } from '../../api/api';
  import {validateLogin} from '../../common/js/validateStatus'
	export default {
		data(){
			return {
				tableData: [
				  // {id: '', foreignOne: '', foreignTwo: ''}
				],
        sourceData: [],
        newData: {
          id:'', foreignOne: '', foreignTwo: ''
        },
        editData: {
        },
        deleteData: {
        },
				newUserModule: false,
				editUserModule: false,
        deleteUserModule:false,
        isSaving: false, 
        isDeleting: false,
        deleteRow: 0,
        totalPages: 1,
        pageSize: 10,
        nowPage: 1,
        searchId: '',
        searchForeignOne: '',
        searchForeignTwo: '',
      }
		},
		methods: {
      queryTableDate(){
        let query = {id:this.searchId, foreignOne: this.searchForeignOne,foreignTwo: this.searchForeignTwo};
        this.getUserModules(query);
      },
      handleCurrentChange(val){
        this.tableData = this.sourceData.slice((val-1)*this.pageSize, val*this.pageSize);
        console.log(this.tableData);
      },
			handleEdit( index, rowData) {
				console.log(index, rowData);
				this.editData = _.clone(rowData);
				this.editUserModule = true;	
			},
      handleDelete( index, rowData) {
        console.log(index, rowData);
        this.deleteData = _.clone(rowData);
        this.deleteData.password = '';
        this.deleteRow = index;
        this.deleteUserModule = true; 
      },
      handleNewUserModule(){
        
        this.isSaving = true;
        let self = this; 
        let UserModule = {userModule: this.newData};
        addUserModule(UserModule).then(data=>{
          if(!validateLogin(data.data.result)){
            self.$router.push({ path: '/YDManager/login' });
            return;
          }
          if (data.data.result === 'success') {
            self.$message({
              type: 'success',
              duration: 2000,
              message: '成功添加一条记录!'
            });
            setTimeout(function(){
              self.isSaving = false;
              self.getUserModules();
            }, 1000);
            setTimeout(function(){self.newUserModule = false}, 2000);
          } else {
            self.$message({
              type: 'error',
              duration: 2000,
              message: data.data.result
            });
            setTimeout(function(){
              self.isSaving = false;
            }, 1000);
          }
        });
      },
      handleEditUserModule(){
        this.isSaving = true;
        let self = this;
        let UserModule = {userModule: this.editData };
        editUserModule(UserModule).then(data=>{
          if(!validateLogin(data.data.result)){
            self.$router.push({ path: '/YDManager/login' });
            return;
          }
          if (data.data.result === 'success') {
            self.$message({
              type: 'success',
              duration: 2000,
              message: '成功修改!'
            });
            setTimeout(function(){
              self.editUserModule = false;
              self.getUserModules();
            }, 1000);
            setTimeout(function(){self.isSaving = false}, 2000);
          } else {
            self.$message({
              type: 'error',
              duration: 2000,
              message: data.data.result
            });
            setTimeout(function(){
              self.editUserModule = false;
            }, 1000);
          }
        });
      },
      handleDeleteUserModule(){
        this.isDeleting = true;
        let self = this;
        this.deleteData.userModuleId = this.deleteData.id;
        this.deleteData.deletepwd = this.deleteData.password;
        removeUserModule(this.deleteData).then(data=>{
          if(!validateLogin(data.data.result)){
            self.$router.push({ path: '/YDManager/login' });
            return;
          }
          if (data.data.result === 'success') {
            self.$message({
              type: 'success',
              duration: 2000,
              message: '成功修改!'
            });
            setTimeout(function(){
              self.isDeleting = false;
              self.getUserModules();
            }, 1000);
            setTimeout(function(){self.deleteUserModule = false}, 2000);
          } else {
            self.$message({
              type: 'error',
              duration: 2000,
              message: data.data.result
            });
            setTimeout(function(){
              self.isDeleting = false;
            }, 1000);
          }
        });
      },
      getUserModules(param){
        let self = this;
        getUserModule(param).then(function (data) {
          if(!validateLogin(data.data.result)){
            self.$router.push({ path: '/YDManager/login' });
            return;
          }
          console.log('getUserModule ',data);
          let receivedData = data.data;
          self.sourceData = receivedData;
          self.totalPages = receivedData.length; //页码
          self.getFirstPage();
        });
      },
      getFirstPage(){
        this.tableData = this.sourceData.slice((this.nowPage-1)*this.pageSize, this.nowPage*this.pageSize);
      },

		},





    mounted(){
      this.getUserModules();
    }
	}

</script>

<style scoped>

</style>