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
          v-model="searchUserName" 
          placeholder="请输入账号"
        ></el-input></el-col>
        <el-col :span="2">
        <el-button type="primary"
        @click="queryTableDate">搜索</el-button></el-col>
        <el-col :span="3">
        <el-button
        type="primary"
        @click="newUser = true">新增用户</el-button></el-col>
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
	label="账号"
	prop="userName"></el-table-column>
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
:page-size="pageSize"
:current-page.sync="nowPage"
@current-change="handleCurrentChange"
:total="totalPages"></el-pagination>

<el-dialog title="新建用户" :visible.sync="newUser">
  <el-form :model="newData" label-position="left" label-width="80px" :rules="rule">
    <el-form-item label="用户ID" prop="id">
      <el-input v-model.number="newData.id"></el-input>
    </el-form-item>
    <el-form-item label="账号" prop="userName">
    	<el-input v-model="newData.userName"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-col :span="10">
        <el-input v-model="newData.password"></el-input>
      </el-col>
      <el-col :span="4" :offset="3"> 是否加密</el-col>
      <el-col :span="5" :offset="1">
        <el-switch
          v-model="newData.needEnc">
        </el-switch>
      </el-col>
    </el-form-item>
    <el-form-item label="名字" prop="name">
      <el-input v-model="newData.name"></el-input>
    </el-form-item>
    <el-form-item label="角色" prop="role">
      <el-select v-model="newData.role" placeholder="请选择角色">
        <el-option label="超级管理员" value="1"></el-option>
        <el-option label="区域管理员" value="2"></el-option>
        <el-option label="普通用户" value="3"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="开始时间" >
      <el-date-picker
      v-model="newData.startDate"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
    </el-form-item>
		<el-form-item label="结束时间" >
      <el-date-picker
      v-model="newData.endDate"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-select v-model="newData.status" placeholder="请选择状态">
        <el-option label="有效" value="0"></el-option>
        <el-option label="无效" value="1"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="handleCancelNewUser">取 消</el-button>
    <el-button type="primary" @click="handleNewUser"
    :loading="isSaving">确 定</el-button>
  </div>
</el-dialog>
<!-- 编辑 -->
<el-dialog title="编辑" :visible.sync="editUser">
  <el-form :model="editData" label-position="left" label-width="80px" :rules="rule">
    <el-form-item label="ID">
      <el-input v-model.number="editData.id" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="账号" prop="userName">
    	<el-input v-model="editData.userName"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-col :span="10">
        <el-input v-model="editData.password"></el-input>
      </el-col>
      <el-col :span="4" :offset="3"> 是否加密</el-col>
      <el-col :span="5" :offset="1">
        <el-switch
          v-model="editData.needEnc">
        </el-switch>
      </el-col>
    </el-form-item>
    <el-form-item label="名字" prop="name">
      <el-input v-model="editData.name"></el-input>
    </el-form-item>
    <el-form-item label="角色" prop="role">
      <el-select v-model="editData.role" placeholder="请选择角色">
        <el-option label="超级管理员" value="1"></el-option>
        <el-option label="区域管理员" value="2"></el-option>
        <el-option label="普通用户" value="3"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="开始时间" prop="startDate">
      <el-date-picker
      v-model="editData.startDate"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
    </el-form-item>
		<el-form-item label="结束时间" prop="endDate">
      <el-date-picker
      v-model="editData.endDate"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-select v-model="editData.status" placeholder="请选择状态">
        <el-option label="有效" value="0"></el-option>
        <el-option label="无效" value="1"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editUser = false">取 消</el-button>
    <el-button type="primary" @click="handleEditUser"
    :loading="isSaving">确 定</el-button>
  </div>
</el-dialog>

<el-dialog title="删除用户" :visible.sync="deleteUser">
  <el-form :model="deleteData" label-position="left" label-width="100px">
    <el-form-item label="用户ID">
      <el-input v-model="deleteData.id" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="请输入密码">
      <el-input v-model="deleteData.password"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="deleteUser = false">取 消</el-button>
    <el-button type="primary" @click="handleDeleteUser"
    :loading="isDeleting">确 定</el-button>
  </div>
</el-dialog>

</div>
</template>

<script>
  import { getUser,addUser, removeUser,editUser } from '../../api/api';
  import util from '../../common/js/util';
  import {validateLogin} from '../../common/js/validateStatus'
  import {strEnc,key1, key2, key3} from '../../common/js/des'
  console.log(util);
	export default {
		data(){
			return {
				tableData: [
				  // {id: '', name: '', password: '', userName: '', role: '', startDate: '', endDate: '', status: ''}
				],
        sourceData: [],
        newData: {
          id:'', name: '', password: '', userName: '', role: '', startDate: '', endDate: '',status: '',needEnc: false
        },
        editData: {
        },
        deleteData: {
        },
        rule: {
          id: [
            {required: true,type: 'number', message: '请填入数字!',trigger: 'blur'}
          ],
          name: [
            { required: true, message: '请输入账号!', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码!', trigger: 'blur' },
          ],
          userName: [
            { required: true, message: '请输入用户名!', trigger: 'blur' },
          ],
          role: [
            { required: true, message: '请选择!', trigger: 'change' },
          ],
          startDate: [
            { required: true, message: '请选择开始日期!', trigger: 'blur' },
          ],
          endDate: [
            { required: true, message: '请选择结束日期!', trigger: 'blur' },
          ],
          status: [
            { required: true, message: '请选择状态!', trigger: 'change' },
          ]

        },
				newUser: false,
				editUser: false,
        deleteUser:false,
        isSaving: false, 
        isDeleting: false,
        deleteRow: 0,
        totalPages: 1,
        pageSize: 10,
        nowPage: 1,
        searchId: '',
        searchUserName: '',
      }
		},
		methods: {
      queryTableDate(){
        let query = {id:this.searchId, userName: this.searchUserName};
        this.getUsers(query);
      },
      handleCurrentChange(val){
        this.tableData = this.sourceData.slice((val-1)*this.pageSize, val*this.pageSize);
        console.log(this.tableData);
      },
			handleEdit( index, rowData) {
				console.log(index, rowData);
        this.editData = _.clone(rowData);
				// this.editData.needEnc = false;  这句不会生效
        this.$set(this.editData, 'needEnc', false)
				this.editUser = true;	
			},
      handleDelete( index, rowData) {
        console.log(index, rowData);
        this.deleteData = _.clone(rowData);
        this.deleteData.password = '';
        this.deleteRow = index;
        this.deleteUser = true; 
      },
      handleCancelNewUser(){
        this.newUser = false;
        this.isSaving = false;
      },
      handleNewUser(){
        
        this.isSaving = true;
        let self = this; 
        let data = this.newData;
        let sdate = new Date(data.startDate);
        let startTime = util.formatDate.format(sdate, 'yyyy-MM-dd hh:mm:ss');
        let edate = new Date(data.endDate);
        let endTime = util.formatDate.format(edate, 'yyyy-MM-dd hh:mm:ss');
        if (this.newData.needEnc) {
          var password = strEnc(this.newData.password, key1, key2, key3);
        }
        this.newData = {...data, startTime, endTime,password};
        let user = {user: this.newData};
        addUser(user).then(data=>{
          console.log('data',data);
              console.log('typeof data',typeof data.data);
              console.log('data.data', data.data);
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
              self.getUsers();
            }, 1000);
            setTimeout(function(){self.newUser = false}, 2000);
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
      handleEditUser(){
        this.isSaving = true;
        let self = this;
        var password = this.editData.password;
        if (this.editData.needEnc) {
          var password = strEnc(this.editData.password, key1, key2, key3);
        }
        let startTime = this.editData.startDate;
        let endTime = this.editData.endDate;
        let data = {...this.editData, startTime, endTime,password}
        let user = {user: data };
        editUser(user).then(data=>{
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
              self.editUser = false;
              self.getUsers();
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
      handleDeleteUser(){
        this.isDeleting = true;
        let self = this;
        this.deleteData.userId = this.deleteData.id;
        this.deleteData.deletepwd = this.deleteData.password;
        // let password = {user: this.deleteData};
        removeUser(this.deleteData).then(data=>{
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
              self.getUsers();
            }, 1000);
            setTimeout(function(){self.deleteUser = false}, 2000);
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
      getUsers(param){
        let self = this;
        getUser(param).then(function (data) {
          if(!validateLogin(data.data.result)){
            self.$router.push({ path: '/YDManager/login' });
            return;
          }
          console.log('getUser ',data);
          let receivedData = data.data;
          _.forEach(receivedData, function (value, index) {
            receivedData[index].account = receivedData[index].userName;
            receivedData[index].startDate = util.formatDate.format(new Date(receivedData[index].startTime),'yyyy-MM-dd hh:mm:ss');
            receivedData[index].endDate = util.formatDate.format(new Date(receivedData[index].endTime),'yyyy-MM-dd hh:mm:ss');

          })
          self.sourceData = receivedData;
          self.totalPages = receivedData.length; //页码
          // self.getFirstPage();
          self.nowPage = 1;
          self.handleCurrentChange(1);
          
        });
      },
      getFirstPage(){
        this.tableData = this.sourceData.slice(0, this.pageSize);
      },

		},





    mounted(){
      this.getUsers();
    }
	}

</script>

<style scoped>

</style>