import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'

interface HYInterceptors<T = any> {
    requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
    requestFailureFn?: (err: any) => any
    responseSuccessFn?: (res: AxiosResponse<T>) => AxiosResponse<T>
    responseFailureFn?: (err: any) => any
}

export interface HYRequestConfig<T = any> extends Omit<InternalAxiosRequestConfig, 'headers'> {
    headers?: InternalAxiosRequestConfig['headers']
    interceptors?: HYInterceptors<T>
}

