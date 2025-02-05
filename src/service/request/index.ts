import axios from "axios";
import type { HYRequestConfig } from "./type";
import type { AxiosInstance, AxiosResponse } from "axios";

class HYRequest {
    instance: AxiosInstance

    constructor(config: HYRequestConfig) {
        this.instance = axios.create(config)

        // 全局拦截器
        this.instance.interceptors.request.use(
            (config) => {
                // console.log('全局请求成功的拦截')
                return config
            },
            (err) => {
                // console.log('全局请求失败的拦截')
                return err
            }
        )

        this.instance.interceptors.response.use(
            (res) => {
                // console.log('全局响应成功的拦截')
                return res.data
            },
            (err) => {
                // console.log('全局响应失败的拦截')
                return err
            }
        )

        // 实例拦截器
        this.instance.interceptors.request.use(
            config.interceptors?.requestSuccessFn,
            config.interceptors?.requestFailureFn
        )

        this.instance.interceptors.response.use(
            config.interceptors?.responseSuccessFn,
            config.interceptors?.responseFailureFn
        )
    }

    request<T = any>(config: HYRequestConfig<T>) {
        // 单独处理请求拦截器
        if (config.interceptors?.requestSuccessFn) {
            // 类型断言确保config符合InternalAxiosRequestConfig类型
            config = config.interceptors.requestSuccessFn(config as any)
        }

        return new Promise<T>((resolve, reject) => {
            this.instance.request<any, AxiosResponse<T>>(config as any).then(res => {
                if (config.interceptors?.responseSuccessFn) {
                    res = config.interceptors.responseSuccessFn(res)
                }
                resolve(res as any)
            }).catch(err => {
                reject(err)
            })
        })
    }

    get<T = any>(config: HYRequestConfig<T>) {
        return this.request<T>({ ...config, method: 'GET' })
    }

    post<T = any>(config: HYRequestConfig<T>) {
        return this.request<T>({ ...config, method: 'POST' })
    }

    delete<T = any>(config: HYRequestConfig<T>) {
        return this.request<T>({ ...config, method: 'DELETE' })
    }

    patch<T = any>(config: HYRequestConfig<T>) {
        return this.request<T>({ ...config, method: 'PATCH' })
    }


}

export default HYRequest
