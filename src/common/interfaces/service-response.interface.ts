export interface ServiceResponse<T> {
    successful: boolean
    data?: T,
    message: string
}