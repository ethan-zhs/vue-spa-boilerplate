import { callApi } from './callApi';
import { getApiBaseName } from './server';

// 刷新缓存
export const refreshCache = (data) => callApi(getApiBaseName.api + 'v1/refreshAppBranchConfig', 'GET', data);

// branch配置信息
export const getBranchConfigItemStaus = (data) => callApi(getApiBaseName.api + 'v1/appBranchConfigItemStaus', 'GET', data);

export const getBranchConfigByBranch = (data) => callApi(getApiBaseName.api + 'v1/appBranchConfig/byBranchName', 'GET', data);

export const getBranchConfig = (data) => callApi(getApiBaseName.api + 'v1/appBranchConfig', 'GET', data);

export const addBranchConfig = (data) => callApi(getApiBaseName.api + 'v1/appBranchConfig', 'POST', data);

export const updateBranchConfig = (data) => callApi(getApiBaseName.api + 'v1/appBranchConfig', 'PUT', data);

export const deleteBranchConfig = (data) => callApi(getApiBaseName.api + `v1/appBranchConfig/${data.pk}`, 'DELETE');


// 平台配置信息
export const getPlatformById = (data) => callApi(getApiBaseName.api + `v1/platform/${data.pk}`, 'GET', data);

export const getPlatform = (data) => callApi(getApiBaseName.api + 'v1/platform', 'GET', data);

export const addPlatform = (data) => callApi(getApiBaseName.api + 'v1/platform', 'POST', data);

export const updatePlatform = (data) => callApi(getApiBaseName.api + 'v1/platform', 'PUT', data);

export const deletePlatform = (data) => callApi(getApiBaseName.api + `v1/platform/${data.pk}`, 'DELETE');
