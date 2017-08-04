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
          v-model="searchName" 
          placeholder="请输入名称"
        ></el-input></el-col>
        <el-col :span="2"  style="text-align:center;"> AND </el-col>
        <el-col :span="4">
          <el-input icon="search" type="search" 
          v-model="searchFatherId" 
          placeholder="请输入父模块ID"
        ></el-input></el-col>
        <el-col :span="2">
        <el-button type="primary"
        @click="queryTableDate">搜索</el-button></el-col>
        <el-col :span="3">
        <el-button
        type="primary"
        @click="newModule = true">新增模块</el-button></el-col>
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
	label="名称"
	prop="name"></el-table-column>
	<el-table-column
	label="父模块ID"
	prop="fatherId"></el-table-column>
	<el-table-column
	label="页面路径"
	prop="htmlPath"></el-table-column>
	<el-table-column
	label="图标路径"
	prop="iconPath"></el-table-column>
	<el-table-column
	label="类型"
	prop="type"></el-table-column>
	<el-table-column
	label="优先级"
	prop="priority"></el-table-column>
	<el-table-column
	label="是否有子模块"
	prop="hasSub"></el-table-column>

</el-table>
<el-pagination
layout="prev, pager, next"
:page-size="pageSize"
:current-page.sync="nowPage"
@current-change="handleCurrentChange"
:total="totalPages"></el-pagination>

<el-dialog title="新建模块" :visible.sync="newModule">
  <el-form :model="newData" label-position="left" label-width="80px">
    <el-form-item label="ID">
      <el-input v-model="newData.id"></el-input>
    </el-form-item>
    <el-form-item label="名称">
    	<el-input v-model="newData.name"></el-input>
    </el-form-item>
    <el-form-item label="父模块ID">
      <el-input v-model="newData.fatherId"></el-input>
    </el-form-item>
    <el-form-item label="页面路径">
      <el-input v-model="newData.htmlPath"></el-input>
    </el-form-item>
    <el-form-item label="图标路径">
    	<el-input v-model="newData.iconPath"></el-input>
    </el-form-item>
    <el-form-item label="类型">
    	<el-select v-model="newData.type" placeholder="请选择">
        <el-option label="有效" value="0"></el-option>
        <el-option label="无效" value="1"></el-option>
      </el-select>
    </el-form-item>
    </el-form-item>
		<el-form-item label="优先级">
			<el-input v-model="newData.priority" type="number"></el-input>
    </el-form-item>
    <el-form-item label="是否有子模块">
      <el-select v-model="newData.hasSub" placeholder="请选择">
        <el-option label="有" value="0"></el-option>
        <el-option label="无" value="1"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="newModule = false">取 消</el-button>
    <el-button type="primary" @click="handleNewModule"
    :loading="isSaving">确 定</el-button>
  </div>
</el-dialog>
<!-- 编辑 -->
<el-dialog title="编辑模块" :visible.sync="editModule">
  <el-form :model="editData" label-position="left" label-width="80px">
    <el-form-item label="ID">
      <el-input v-model="editData.id" :readonly="true" ></el-input>
    </el-form-item>
    <el-form-item label="名称">
    	<el-input v-model="editData.name"></el-input>
      
    </el-form-item>
    <el-form-item label="父模块ID">
      <el-input v-model="editData.fatherId" type="number"></el-input>
    </el-form-item>
    <el-form-item label="页面路径">
      <el-input v-model="editData.htmlPath"></el-input>
    </el-form-item>
    <el-form-item label="图标路径">
    	<el-input v-model="editData.iconPath"></el-input>
      
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="editData.type" placeholder="请选择">
        <el-option label="有效" value="0"></el-option>
        <el-option label="无效" value="1"></el-option>
      </el-select>
    </el-form-item>
		<el-form-item label="优先级">
      <el-input v-model="editData.priority" type="number"></el-input>
    </el-form-item>
    <el-form-item label="是否有子模块">
      <el-select v-model="editData.hasSub" placeholder="请选择">
        <el-option label="有" value="0"></el-option>
        <el-option label="无" value="1"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editModule = false">取 消</el-button>
    <el-button type="primary" @click="handleEditModule"
    :loading="isSaving">确 定</el-button>
  </div>
</el-dialog>

<el-dialog title="删除模块" :visible.sync="deleteModule">
  <el-form :model="deleteData" label-position="left" label-width="100px">
    <el-form-item label="ID">
      <el-input v-model="deleteData.id" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="请输入密码">
      <el-input v-model="deleteData.password"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="deleteModule = false">取 消</el-button>
    <el-button type="primary" @click="handleDeleteModule"
    :loading="isDeleting">确 定</el-button>
  </div>
</el-dialog>

</div>
</template> 

<script>
  import { getModule,addModule, removeModule,editModule } from '../../api/api';
  import {validateLogin} from '../../common/js/validateStatus'
	export default {
		data(){
			return {
				tableData: [
				  // {id: '', name: '', fatherId: '', htmlPath: '', iconPath: '', type: '', priority: '', hasSub: '', }
				],
        sourceData: [],
        newData: {
          id:'', name: '', fatherId: '', htmlPath: '', iconPath: '', type: '', priority: '',hasSub: ''
        },
        editData: {
        },
        deleteData: {
        },
				newModule: false,
				editModule: false,
        deleteModule:false,
        isSaving: false, 
        isDeleting: false,
        deleteRow: 0,
        totalPages: 1,
        pageSize: 10,
        nowPage: 1,
        searchId: '',
        searchName: '',
        searchFatherId: ''

			}
		},
		methods: {
      queryTableDate(){
        let query = {id:this.searchId, name: this.searchName, fatherId: this.searchFatherId};
        this.getModules(query);
      },
      handleCurrentChange(val){
        this.tableData = this.sourceData.slice((val-1)*this.pageSize, val*this.pageSize);
        console.log(this.tableData);
        this.nowPage = val;
      },
			handleEdit( index, rowData) {
				console.log(index, rowData);
				this.editData = _.clone(rowData);
				this.editModule = true;	
			},
      handleDelete( index, rowData) {
        console.log(index, rowData);
        this.deleteData = _.clone(rowData);
        this.$set(this.deleteData, 'password','');
        this.deleteRow = index;
        this.deleteModule = true; 
      },
      handleNewModule(){
        
        this.isSaving = true;
        let self = this; 
        let data = this.newData;
        let sdate = new Date(data.startDate);
        console.log(sdate);
        let startDate = `${sdate.getFullYear()}-${sdate.getMonth()}-${sdate.getDay()} ${sdate.getHours()}:${sdate.getMinutes()}:${sdate.getSeconds()}`;
        let edate = new Date(data.endDate);
        let endDate = `${edate.getFullYear()}-${edate.getMonth()}-${edate.getDay()} ${edate.getHours()}:${edate.getMinutes()}:${edate.getSeconds()}`
        this.newData = {...data, startDate, endDate};
        let Module = {module: this.newData};
        addModule(Module).then(data=>{
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
              self.getModules();
            }, 1000);
            setTimeout(function(){self.newModule = false}, 2000);
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
      handleEditModule(){
        this.isSaving = true;
        let self = this; 
        let Module = {module: this.editData};
        editModule(Module).then(data=>{
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
              self.editModule = false;
              self.getModules();
            }, 1000);
            setTimeout(function(){self.isSaving = false}, 2000);
          } else {
            self.$message({
              type: 'error',
              duration: 2000,
              message: data.data.result
            });
            setTimeout(function(){
              self.editModule = false;
            }, 1000);
          }
        });
      },
      handleDeleteModule(){
        this.isDeleting = true;
        let self = this; 
        let password = {moduleId: this.deleteData.id, deletepwd: this.deleteData.password };
        removeModule(password).then(data=>{
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
              self.getModules();
            }, 1000);
            setTimeout(function(){self.deleteModule = false}, 2000);
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
      getModules(param){
        let self = this;
        getModule(param).then(function (data) { 
          if(!validateLogin(data.data.result)){
            self.$router.push({ path: '/YDManager/login' });
            return;
          }
          let receivedData = data.data;
          self.sourceData = receivedData;
          self.totalPages = receivedData.length; //页码
          self.handleCurrentChange(self.nowPage);
        });
      },
      getFirstPage(){
        this.tableData = this.sourceData.slice((this.nowPage-1)*this.pageSize, this.nowPage*this.pageSize);
      },
		},
    mounted(){
      this.getModules();
    }
	}

</script>

<style scoped>

</style>