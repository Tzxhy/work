<template>
	<div>
		<div style="text-align:right;margin-bottom: 20px; margin-top: 20px; ">

      <el-row align="middle" type="flex">
        <el-col :span="3" :offset="7"><el-input icon="search" type="search" 
        v-model="searchId" 
        placeholder="请输入ID"
        ></el-input></el-col>
        <el-col :span="2"  style="text-align:center;"> AND </el-col>
        <el-col :span="5">
          <el-input icon="search" type="search" 
          v-model="searchFatherId" 
          placeholder="请输入父区域Id"
        ></el-input></el-col>
        <el-col :span="2"  style="text-align:center;"> AND </el-col>
        <el-col :span="4">
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
        @click="newArea = true">新增区域</el-button></el-col>
      </el-row>


		</div>
		<el-table
    style="width: 100%"
		:data="tableData">
		<el-table-column
    fixed="left"
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
  fixed="left"
	prop="id"></el-table-column>
  <el-table-column
  label="父区域ID"
  fixed="left"
  width="120"
  prop="fatherId"></el-table-column>
  <el-table-column
  label="区域名称"
  width="120"
  prop="name"></el-table-column>
  <el-table-column
  label="中心点维度"
  width="120"
  prop="centerPointLat"></el-table-column>
  <el-table-column
  label="中心点经度"
  width="120"
  prop="centerPointLng"></el-table-column>
  <el-table-column
  label="区域路径"
  width="120"
  prop="areaPath"></el-table-column>
  <el-table-column
  label="地区级别"
  width="100"
  prop="mapLevel"></el-table-column>
  <el-table-column
  label="站点最大人数"
  width="120"
  prop="maxStationPeople"></el-table-column>
  <el-table-column
  label="当日累计最大人数"
  width="180"
  prop="maxDayNum"></el-table-column>
</el-table>
<el-pagination
layout="prev, pager, next"
:page-size="pageSize"
@current-change="handleCurrentChange"
:total="totalPages"></el-pagination>

<el-dialog title="新建区域" :visible.sync="newArea">
  <el-form :model="newData" label-position="left" label-width="120px">
    <el-form-item label="ID">
      <el-input v-model="newData.id" type="number"></el-input>
    </el-form-item>
    <el-form-item label="父区域ID">
    	<el-input v-model="newData.fatherId" type="number"></el-input>
    </el-form-item>
    <el-form-item label="区域名称">
      <el-input v-model="newData.name"></el-input>
    </el-form-item>
    <el-form-item label="中心点维度">
      <el-input v-model="newData.centerPointLat"></el-input>
    </el-form-item>
    <el-form-item label="中心点经度">
      <el-input v-model="newData.centerPointLng"></el-input>
    </el-form-item>
    <el-form-item label="区域路径">
      <el-input v-model="newData.areaPath"></el-input>
    </el-form-item>
    <el-form-item label="地区级别">
      <el-input v-model="newData.mapLevel" type="number"></el-input>
    </el-form-item>
    <el-form-item label="站点最大人数">
      <el-input v-model="newData.maxStationPeople" type="number"></el-input>
    </el-form-item> 
    <el-form-item label="当日累计最大人数">
      <el-input v-model="newData.maxDayNum" type="number"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="handleCancelnewArea">取 消</el-button>
    <el-button type="primary" @click="handleNewArea"
    :loading="isSaving">确 定</el-button>
  </div>
</el-dialog>
<!-- 编辑 -->
<el-dialog title="编辑区域" :visible.sync="editArea">
  <el-form :model="editData" label-position="left" label-width="120px">
    <el-form-item label="ID">
      <el-input v-model="editData.id" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="父区域ID">
      <el-input v-model="editData.fatherId" type="number"></el-input>
    </el-form-item>
    <el-form-item label="区域名称">
      <el-input v-model="editData.name"></el-input>
    </el-form-item>
    <el-form-item label="中心点维度">
      <el-input v-model="editData.centerPointLat"></el-input>
    </el-form-item>
    <el-form-item label="中心点经度">
      <el-input v-model="editData.centerPointLng"></el-input>
    </el-form-item>
    <el-form-item label="区域路径">
      <el-input v-model="editData.areaPath"></el-input>
    </el-form-item>
    <el-form-item label="地区级别">
      <el-input v-model="editData.mapLevel" type="number"></el-input>
    </el-form-item>
    <el-form-item label="站点最大人数">
      <el-input v-model="editData.maxStationPeople" type="number"></el-input>
    </el-form-item> 
    <el-form-item label="当日累计最大人数">
      <el-input v-model="editData.maxDayNum" type="number"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editArea = false">取 消</el-button>
    <el-button type="primary" @click="handleEditArea"
    :loading="isSaving">确 定</el-button>
  </div>
</el-dialog>

<el-dialog title="删除区域" :visible.sync="deleteArea">
  <el-form :model="deleteData" label-position="left" label-width="100px">
    <el-form-item label="ID">
      <el-input v-model="deleteData.id" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="请输入密码">
      <el-input v-model="deleteData.password"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="deleteArea = false">取 消</el-button>
    <el-button type="primary" @click="handleDeleteArea"
    :loading="isDeleting">确 定</el-button>
  </div>
</el-dialog>

</div>
</template>

<script>
  import { getArea,addArea, removeArea,editArea } from '../../api/api';
  import {validateLogin} from '../../common/js/validateStatus'
	export default {
		data(){
			return {
				tableData: [
				  // {id: '10086', fatherId: '1121', name: '10086基地',centerPointLat:'121.2131',centerPointLng: '24.21',areaPath: '北大街',mapLevel: 13,maxStationPeople:21321312,maxDayNum:234223423422  }
				],
        sourceData: [],
        newData: {
          id: '', fatherId: '', name: '',centerPointLat:'',centerPointLng: '',areaPath: '',mapLevel: '',maxStationPeople:'',maxDayNum:''
        },
        editData: {
        },
        deleteData: {
        },
				newArea: false,
				editArea: false,
        deleteArea:false,
        isSaving: false, 
        isDeleting: false,
        deleteRow: 0,
        totalPages: 1,
        pageSize: 10,
        nowPage: 1,
        searchId: '',
        searchFatherId: '',
        searchName: '',
      }
		},
		methods: {
      queryTableDate(){
        let query = {id:this.searchId, name: this.searchName, fatherId: this.searchFatherId};
        this.getAreas(query);
      },
      handleCurrentChange(val){
        this.tableData = this.sourceData.slice((val-1)*this.pageSize, val*this.pageSize);
        console.log(this.tableData);
      },
			handleEdit( index, rowData) {
				console.log(index, rowData);
				this.editData = _.clone(rowData);
				this.editArea = true;	
			},
      handleDelete( index, rowData) {
        console.log(index, rowData);
        this.deleteData = _.clone(rowData);
        this.deleteData.password = '';
        this.deleteRow = index;
        this.deleteArea = true; 
      },
      handleCancelnewArea(){
        this.newArea = false;
        this.isSaving = false;
      },
      handleNewArea(){
        
        this.isSaving = true;
        let self = this; 
        let Area = {area: this.newData};
        addArea(Area).then(data=>{
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
              self.getAreas();
            }, 1000);
            setTimeout(function(){self.newArea = false}, 2000);
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
      handleEditArea(){
        this.isSaving = true;
        let self = this;
        
        let Area = {area: this.editData };
        editArea(Area).then(data=>{
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
              self.editArea = false;
              self.getAreas();
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
      handleDeleteArea(){
        this.isDeleting = true;
        let self = this;
        this.deleteData.areaId = this.deleteData.id;
        this.deleteData.deletepwd = this.deleteData.password;
        // let password = {Area: this.deleteData};
        removeArea(this.deleteData).then(data=>{
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
              self.getAreas();
            }, 1000);
            setTimeout(function(){self.deleteArea = false}, 2000);
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
      getAreas(param){
        let self = this;
        getArea(param).then(function (data) {
          if(!validateLogin(data.data.result)){
            self.$router.push({ path: '/YDManager/login' });
            return;
          }
          console.log('getArea ',data);
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
      this.getAreas();
    }
	}

</script>

<style scoped>

</style>