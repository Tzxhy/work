import axios from 'axios';
// import routes from '../routes';
// import validateLogin from '../common/js/validateStatus';
window.axios = axios;
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
export const requestLogin = params => { return axios.get(`${base}/login`, { params: params }).then(res => res.data); };
export const requestLoginOut = params => { return axios.get(`${base}/logout`).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };


export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/addUser`, { params: params }); };
export const removeUser = params => { return axios.get(`${base}/deleteUser`, { params: params }); };
export const editUser = params => { return axios.get(`${base}/updateUser`, { params: params }); };
export const getUser = params => { return axios.get(`${base}/getUsers`, { params: params }); };

export const addModule = params => { return axios.get(`${base}/addModule`, { params: params }); };
export const removeModule = params => { return axios.get(`${base}/deleteModule`, { params: params }); };
export const editModule = params => { return axios.get(`${base}/updateModule`, { params: params }); };
export const getModule = params => { return axios.get(`${base}/getModules`, { params: params }); };

export const addUserModule = params => { return axios.get(`${base}/addUserModule`, { params: params }); };
export const removeUserModule = params => { return axios.get(`${base}/deleteUserModule`, { params: params }); };
export const editUserModule = params => { return axios.get(`${base}/updateUserModule`, { params: params }); };
export const getUserModule = params => { return axios.get(`${base}/getUserModules`, { params: params }); };

export const addAreaTeam = params => { return axios.get(`${base}/addAreaTeam`, { params: params }); };
export const removeAreaTeam = params => { return axios.get(`${base}/deleteAreaTeam`, { params: params }); };
export const editAreaTeam = params => { return axios.get(`${base}/updateAreaTeam`, { params: params }); };
export const getAreaTeam = params => { return axios.get(`${base}/getAreaTeams`, { params: params }); };

export const addArea = params => { return axios.get(`${base}/addArea`, { params: params }); };
export const removeArea = params => { return axios.get(`${base}/deleteArea`, { params: params }); };
export const editArea = params => { return axios.get(`${base}/updateArea`, { params: params }); };
export const getArea = params => { return axios.get(`${base}/getAreas`, { params: params }); };

export const addRelationAreaTeam = params => { return axios.get(`${base}/addTeamArea`, { params: params }); };
export const removeRelationAreaTeam = params => { return axios.get(`${base}/deleteTeamArea`, { params: params }); };
export const editRelationAreaTeam = params => { return axios.get(`${base}/updateTeamArea`, { params: params }); };
export const getRelationAreaTeam = params => { return axios.get(`${base}/getTeamAreas`, { params: params }); };



export const addUserAreaTeam = params => { return axios.get(`${base}/addUserTeam`, { params: params }); };
export const removeUserAreaTeam = params => { return axios.get(`${base}/deleteUserTeam`, { params: params }); };
export const editUserAreaTeam = params => { return axios.get(`${base}/updateUserTeam`, { params: params }); };
export const getUserAreaTeam = params => { return axios.get(`${base}/getUserTeams`, { params: params }); };


export const addRequest = params => { return axios.get(`${base}/addAction`, { params: params }); };
export const removeRequest = params => { return axios.get(`${base}/deleteAction`, { params: params }); };
export const editRequest = params => { return axios.get(`${base}/updateAction`, { params: params }); };
export const getRequest = params => { return axios.get(`${base}/getActions`, { params: params }); };


export const addModuleAction = params => { return axios.get(`${base}/addModuleAction`, { params: params }); };
export const removeModuleAction = params => { return axios.get(`${base}/deleteModuleAction`, { params: params }); };
export const editModuleAction = params => { return axios.get(`${base}/updateModuleAction`, { params: params }); };
export const getModuleAction = params => { return axios.get(`${base}/getModuleActions`, { params: params }); };
