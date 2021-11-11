import axios, {AxiosResponse} from 'axios';
import {VT_API_KEY, VT_API_ENDPOINT} from '@env';
import FormData from 'form-data';

const getAxiosInstance = () =>
  axios.create({
    baseURL: VT_API_ENDPOINT,
    headers: {'x-apikey': VT_API_KEY},
    validateStatus: status => status >= 200 && status < 504,
  });

export const checkApkResult = async (apkFile: ApkData) => {
  const axiosInstance = getAxiosInstance();

  const res = await axiosInstance.get(`/files/${apkFile.fileSha256}`);

  console.log('Passing 0', {data: res.data});

  // No Existing report, uploading file
  if (res.status === 404) {
    const result = await uploadApkFile(apkFile);

    return result;
  }

  const resError = checkResponse(res);
  if (resError) {
    throw resError;
  } else {
    return res.data;
  }
};

export const uploadApkFile = async (apkFile: ApkData) => {
  // Checking if file size exceeds 32MB
  const axiosInstance = getAxiosInstance();
  const formData = new FormData();
  formData.append('file', {
    uri: `file://${apkFile.apkDir}`,
    type: 'application/vnd.android.package-archive',
    name: `${apkFile.appName}.apk`,
  });

  let analysisId: Object;

  if (apkFile.size / (1024 * 1024) > 32) {
    const {
      data: {data: uploadUrl},
    } = await axiosInstance.get('/files/upload_url');

    console.log('Passing 1');

    const res = await axios.post(uploadUrl, formData, {
      headers: {'Content-Type': 'multipart/form-data', 'x-apikey': VT_API_KEY},
    });
    console.log('Passing 2');

    analysisId = await requestAnalysisData(res.data.data.id);
  } else {
    const res = await axiosInstance.post('/files', formData, {
      headers: {'Content-Type': 'multipart/form-data', 'x-apikey': VT_API_KEY},
    });
    console.log('Passing 3');

    analysisId = await requestAnalysisData(res.data.data.id);
  }

  return {packageName: apkFile.packageName, pending: true, analysisId};
};

const requestAnalysisData = async (id: string) => {
  const axiosInstance = getAxiosInstance();
  const {data} = await axiosInstance.post(`/files/${id}/analyse`);
  // Getting the new Analysis data

  console.log({data, id});

  console.log('Passing 4');

  return id;
};

export const getAnalysis = async (id: string) => {
  const axiosInstance = getAxiosInstance();
  const {data} = await axiosInstance.get(`/analyses/${id}`);
  console.log('Passing 6');

  return data;
};

// Error Codes
const ERROR_204 =
  'Request rate limit exceeded. You are making more requests than allowed.';
const ERROR_400 =
  'Bad request. Your request was somehow incorrect. This can be caused by missing arguments or arguments with wrong values.';
const ERROR_403 =
  "Forbidden. You don't have enough privileges to make the request. You may be doing a request without providing an API key or you may be making a request to a Private API without having the appropriate privileges.";

const checkResponse = (res: AxiosResponse) => {
  switch (res.status) {
    case 204:
      return new Error(ERROR_204);
    case 400:
      return new Error(ERROR_400);
    case 403:
      return new Error(ERROR_403);
    case 200:
      return null;
    default:
      return new Error(`Unknown error: ${res}`);
  }
};
