interface BuildResponseInterface<T> {
    key?: string
    data?: T
    message?: string
    successful?: boolean
}
export function buildResponse<T>({
    key = 'data',
    data,
    message = 'OK',
    successful = true,
}: BuildResponseInterface<T>) {

    const baseResponse = { successful, message };

    return data !== undefined ? { ...baseResponse, [key]: data } : baseResponse;

}