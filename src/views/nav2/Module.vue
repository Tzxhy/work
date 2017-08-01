<template>
	<div>
		<div style="text-align:right;margin-bottom: 20px; margin-top: 20px; ">
			<el-button
			type="primary"
			@click="newModule = true">新增模块</el-button>
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
:total="30"></el-pagination>

<el-dialog title="新建模块" :visible.sync="newModule">
  <el-form :model="newData" label-position="left" label-width="80px">
    <el-form-item label="ID">
      <el-input v-model="newData.id" type="number"></el-input>
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
        <el-option label="有效" value="0"></el-option>
        <el-option label="无效" value="1"></el-option>
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
<el-dialog title="编辑" :visible.sync="editModule">
  <el-form :model="editData" label-position="left" label-width="80px">
    <el-form-item label="ID">
      <el-input v-model="editData.id" type="number"></el-input>
    </el-form-item>
    <el-form-item label="名称">
    	<el-input v-model="editData.name"></el-input>
      
    </el-form-item>
    <el-form-item label="父模块ID">
      <el-input v-model="editData.fatherId"></el-input>
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
        <el-option label="有效" value="0"></el-option>
        <el-option label="无效" value="1"></el-option>
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
      <el-input v-model="deleteData.id" readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="请输入密码">
      <el-input v-model="deleteData.fatherId"></el-input>
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
  import util from '../../common/js/util';
	export default {
		data(){
			return {
				tableData: [
				  {id: 'A123', name: 'A12221', fatherId: '12344321', htmlPath: 'www.baidu.com', iconPath: 'www.tupian.com', type: 0, priority: 8, hasSub: '0', }
				],
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
			}
		},
		methods: {
			handleEdit( index, rowData) {
				console.log(index, rowData);
				this.editData = _.clone(rowData);
				this.editModule = true;	
			},
      handleDelete( index, rowData) {
        console.log(index, rowData);
        this.deleteData = _.clone(rowData);
        this.deleteData.password = '';
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
        let Module = {Module: this.newData};
        addModule(Module).then(data=>{
          setTimeout(function(){self.isSaving = false}, 1000);
          setTimeout(function(){self.newModule = false}, 2000);
        });
      },
      handleEditModule(){
        this.isSaving = true;
        let self = this; 
        let Module = {Module: this.editData};
        editModule(Module).then(data=>{
          console.log('data')
          setTimeout(function(){self.editModule = false}, 1000);
          setTimeout(function(){self.isSaving = false}, 2000);
        });
      },
      handleDeleteModule(){
        this.isDeleting = true;
        let self = this; 
        let password = {Module: this.deleteData};
        removeModule(password).then(data=>{
          self.tableData.splice(self.deleteRow, 1);
          setTimeout(function(){self.isDeleting = false}, 1000);
          setTimeout(function(){self.deleteModule = false}, 2000);
        });
      },
      getModules(){
        let self = this;
        getModule().then(function (data) { 
          let receivedData = data.data;
          _.forEach(receivedData, function (value, index) {
            receivedData[index].account = receivedData[index].ModuleName;
            receivedData[index].startDate = util.formatDate.format(new Date(receivedData[index].startTime),'y-M-d h:m:s');
            receivedData[index].endDate = util.formatDate.format(new Date(receivedData[index].endTime),'y-M-d h:m:s');

          })
        self.tableData = receivedData;
      });
      }
		},
    mounted(){
      this.getModules();
    }
	}

</script>

<style scoped>

</style>