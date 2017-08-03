import axios from 'axios';
// import routes from '../routes';
// import validateLogin from '../common/js/validateStatus';

let base = '/YDManager';
// axios.interceptors.response.use(function (res) {
//     console.log('拦截到响应!!登录验证中---若失败,则跳转至登录界面!!!');
//     if (_.get(res,'data.result') && !validateLogin(_.get(res,'data.result'))){
//     	routes.push({ path: '/YDManager/login' });
//     }
//     return res;
//   }, function (error) {
//     console.log("拦截错误");
//     return Promise.reject(error);
//   });
export const requestLogin = params => { return axios.get(`${base}/login.do`, { params: params }).then(res => res.data); };
export const requestLoginOut = params => { return axios.get(`${base}/logout.do`).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };


export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/addUser.do`, { params: params }); };
export const removeUser = params => { return axios.get(`${base}/deleteUser.do`, { params: params }); };
export const editUser = params => { return axios.get(`${base}/updateUser.do`, { params: params }); };
export const getUser = params => { return axios.get(`${base}/getUsers.do`, { params: params }); };

export const addModule = params => { return axios.get(`${base}/addModule.do`, { params: params }); };
export const removeModule = params => { return axios.get(`${base}/deleteModule.do`, { params: params }); };
export const editModule = params => { return axios.get(`${base}/updateModule.do`, { params: params }); };
export const getModule = params => { return axios.get(`${base}/getModules.do`, { params: params }); };

export const addUserModule = params => { return axios.get(`${base}/addUserModule.do`, { params: params }); };
export const removeUserModule = params => { return axios.get(`${base}/deleteUserModule.do`, { params: params }); };
export const editUserModule = params => { return axios.get(`${base}/updateUserModule.do`, { params: params }); };
export const getUserModule = params => { return axios.get(`${base}/getUserModules.do`, { params: params }); };

export const addAreaTeam = params => { return axios.get(`${base}/addAreaTeam.do`, { params: params }); };
export const removeAreaTeam = params => { return axios.get(`${base}/deleteAreaTeam.do`, { params: params }); };
export const editAreaTeam = params => { return axios.get(`${base}/updateAreaTeam.do`, { params: params }); };
export const getAreaTeam = params => { return axios.get(`${base}/getAreaTeams.do`, { params: params }); };

export const addArea = params => { return axios.get(`${base}/addArea.do`, { params: params }); };
export const removeArea = params => { return axios.get(`${base}/deleteArea.do`, { params: params }); };
export const editArea = params => { return axios.get(`${base}/updateArea.do`, { params: params }); };
export const getArea = params => { return axios.get(`${base}/getAreas.do`, { params: params }); };

export const addRelationAreaTeam = params => { return axios.get(`${base}/addTeamArea.do`, { params: params }); };
export const removeRelationAreaTeam = params => { return axios.get(`${base}/deleteTeamArea.do`, { params: params }); };
export const editRelationAreaTeam = params => { return axios.get(`${base}/updateTeamArea.do`, { params: params }); };
export const getRelationAreaTeam = params => { return axios.get(`${base}/getTeamAreas.do`, { params: params }); };



export const addUserAreaTeam = params => { return axios.get(`${base}/addUserTeam.do`, { params: params }); };
export const removeUserAreaTeam = params => { return axios.get(`${base}/deleteUserTeam.do`, { params: params }); };
export const editUserAreaTeam = params => { return axios.get(`${base}/updateUserTeam.do`, { params: params }); };
export const getUserAreaTeam = params => { return axios.get(`${base}/getUserTeams.do`, { params: params }); };


export const addRequest = params => { return axios.get(`${base}/addAction.do`, { params: params }); };
export const removeRequest = params => { return axios.get(`${base}/deleteAction.do`, { params: params }); };
export const editRequest = params => { return axios.get(`${base}/updateAction.do`, { params: params }); };
export const getRequest = params => { return axios.get(`${base}/getActions.do`, { params: params }); };


export const addModuleAction = params => { return axios.get(`${base}/addModuleAction.do`, { params: params }); };
export const removeModuleAction = params => { return axios.get(`${base}/deleteModuleAction.do`, { params: params }); };
export const editModuleAction = params => { return axios.get(`${base}/updateModuleAction.do`, { params: params }); };
export const getModuleAction = params => { return axios.get(`${base}/getModuleActions.do`, { params: params }); };
