import axios from 'axios';

let base = '/YDManager';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

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
