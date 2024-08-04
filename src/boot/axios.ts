import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import useUserStore from 'src/stores/user';
import Notify from 'src/utils/notify';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

function getAxiosInstance(baseUrl: string, timeout?: number): AxiosInstance {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: timeout && 100000,
    headers: {},
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers['Token'] = useUserStore().getToken();
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.status >= 200 && response.status < 300) {
        // 文件内容写在响应体里
        if (typeof response.data !== 'object') {
          return response.data;
        }
        if (response.data.code === 1) return response.data.data;
        Notify.error(
          `错误信息: ${response.data.msg}`,
          `错误码：${response.data.code}, 请求url: ${response.config.url}, 请求方式: ${response.config.method}`
        );
      }
    },
    (error: AxiosError) => {
      // 登录过期
      if (error.response?.status === 401) {
        Notify.error('登录过期, 请重新登录');
        useUserStore().logout();
        return;
      }
      console.log(error);
      Notify.error(`错误码: ${error.code}`);
      return Promise.reject(error);
    }
  );
  return axiosInstance;
}
export const _axios = getAxiosInstance(process.env.USER_API!);
