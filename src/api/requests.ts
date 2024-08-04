import { _axios } from 'src/boot/axios';
import { StringIndexedObject } from 'src/models/common';

export const request = {
  get: (url: string, params: any) => _axios.get<any, any>(url, { params }),

  post: (url: string, data: any) =>
    _axios.post<any, any>(url, data, {
      headers: { 'Content-Type': 'application/json' },
    }),

  postPath: (url: string, pathParams: string, data: any) =>
    _axios.post<any, any>(`${url}/${pathParams}`, data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }),

  postFormData: (url: string, data: any) => {
    const formData = new FormData();
    for (const key in data as StringIndexedObject) {
      formData.append(key, data[key]);
    }
    return _axios.post<any, any>(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  put: (url: string, data: any) =>
    _axios.put<any, any>(url, data, {
      headers: { 'Content-Type': 'application/json' },
    }),

  delete: (url: string, data: any) => _axios.delete<any, any>(url, data),
};
