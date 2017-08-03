<template>
	<div>
		<div style="text-align:right;margin-bottom: 20px; margin-top: 20px; ">



      <el-row align="middle" type="flex">
        <el-col :span="3" :offset="10"><el-input icon="search" type="search" 
        v-model="searchId" 
        placeholder="请输入ID"
        ></el-input></el-col>
        <el-col :span="2"  style="text-align:center;"> AND </el-col>
        <el-col :span="3">
          <el-input icon="search" type="search" 
          v-model="searchName" 
          placeholder="请输入名称"
        ></el-input></el-col>
        <el-col :span="2">
        <el-button type="primary"
        @click="queryTableDate">搜索</el-button></el-col>
        <el-col :span="3">
        <el-button
        type="primary"
        @click="newAreaTeam = true">新增区域组</el-button></el-col>
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
	label="区域组名称"
	prop="name"></el-table-column>
</el-table>
<el-pagination
layout="prev, pager, next"
:page-size="pageSize"
@current-change="handleCurrentChange"
:total="totalPages"></el-pagination>

<el-dialog title="新建区域组" :visible.sync="newAreaTeam">
  <el-form :model="newData" label-position="left" label-width="80px">
    <el-form-item label="ID">
      <el-input v-model="newData.id"></el-input>
    </el-form-item>
    <el-form-item label="区域组名称">
    	<el-input v-model="newData.name"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="handleCancelnewAreaTeam">取 消</el-button>
    <el-button type="primary" @click="handleNewAreaTeam"
    :loading="isSaving">确 定</el-button>
  </div>
</el-dialog>
<!-- 编辑 -->
<el-dialog title="编辑区域组" :visible.sync="editAreaTeam">
  <el-form :model="editData" label-position="left" label-width="80px">
    <el-form-item label="ID">
      <el-input v-model="editData.id" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="区域组名称">
    	<el-input v-model="editData.name"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editAreaTeam = false">取 消</el-button>
    <el-button type="primary" @click="handleEditAreaTeam"
    :loading="isSaving">确 定</el-button>
  </div>
</el-dialog>

<el-dialog title="删除区域组" :visible.sync="deleteAreaTeam">
  <el-form :model="deleteData" label-position="left" label-width="100px">
    <el-form-item label="用户ID">
      <el-input v-model="deleteData.id" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="请输入密码">
      <el-input v-model="deleteData.password"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="deleteAreaTeam = false">取 消</el-button>
    <el-button type="primary" @click="handleDeleteAreaTeam"
    :loading="isDeleting">确 定</el-button>
  </div>
</el-dialog>

</div>
</template>

<script>
  import { getAreaTeam,addAreaTeam, removeAreaTeam,editAreaTeam } from '../../api/api';
  import {validateLogin} from '../../common/js/validateStatus'
	export default {
		data(){
			return {
				tableData: [
				  // {id: '10086', name: '10086客服'}
				],
        sourceData: [],
        newData: {
          id:'', name: ''
        },
        editData: {
        },
        deleteData: {
        },
				newAreaTeam: false,
				editAreaTeam: false,
        deleteAreaTeam:false,
        isSaving: false, 
        isDeleting: false,
        deleteRow: 0,
        totalPages: 1,
        pageSize: 10,
        nowPage: 1,
        searchId: '',
        searchName: '',
      }
		},
		methods: {
      queryTableDate(){
        let query = {id:this.searchId, name: this.searchName};
        this.getAreaTeams(query);
      },
      handleCurrentChange(val){
        this.tableData = this.sourceData.slice((val-1)*this.pageSize, val*this.pageSize);
        console.log(this.tableData);
      },
			handleEdit( index, rowData) {
				console.log(index, rowData);
				this.editData = _.clone(rowData);
				this.editAreaTeam = true;	
			},
      handleDelete( index, rowData) {
        console.log(index, rowData);
        this.deleteData = _.clone(rowData);
        this.deleteData.password = '';
        this.deleteRow = index;
        this.deleteAreaTeam = true; 
      },
      handleCancelnewAreaTeam(){
        this.newAreaTeam = false;
        this.isSaving = false;
      },
      handleNewAreaTeam(){
        
        this.isSaving = true;
        let self = this; 
        let AreaTeam = {areaTeam: this.newData};
        addAreaTeam(AreaTeam).then(data=>{
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
              self.getAreaTeams();
            }, 1000);
            setTimeout(function(){self.newAreaTeam = false}, 2000);
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
      handleEditAreaTeam(){
        this.isSaving = true;
        let self = this;
        
        let AreaTeam = {areaTeam: this.editData };
        editAreaTeam(AreaTeam).then(data=>{
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
              self.editAreaTeam = false;
              self.getAreaTeams();
            }, 1000);
            setTimeout(function(){self.isSaving = false}, 2000);
          } else {
            self.$message({
              type: 'error',
              duration: 2000,
              message: data.data.result
            });
            setTimeout(function(){
              self.isSaving = false
            }, 1000);
          }
        });
      },
      handleDeleteAreaTeam(){
        this.isDeleting = true;
        let self = this;
        this.deleteData.areaTeamId = this.deleteData.id;
        this.deleteData.deletepwd = this.deleteData.password;
        // let password = {AreaTeam: this.deleteData};
        removeAreaTeam(this.deleteData).then(data=>{
          if(!validateLogin(data.data.result)){
            self.$router.push({ path: '/YDManager/login' });
            return;
          }
          if (data.data.result === 'success') {
            self.$message({
              type: 'success',
              duration: 2000,
              message: '成功删除!'
            });
            setTimeout(function(){
              self.isDeleting = false;
              self.getAreaTeams();
            }, 1000);
            setTimeout(function(){self.deleteAreaTeam = false}, 2000);
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
      getAreaTeams(param){
        let self = this;
        getAreaTeam(param).then(function (data) {
          if(!validateLogin(data.data.result)){
            self.$router.push({ path: '/YDManager/login' });
            return;
          }
          console.log('getAreaTeam ',data);
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
      this.getAreaTeams();
    }
	}

</script>

<style scoped>

</style>