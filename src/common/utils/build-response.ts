import { BuildResponseProps } from "../interfaces/build-response.interface";

export function buildResponse<T>({
    key = 'data',
    data,
    message,
    successful = true,
}: BuildResponseProps<T>) {

    const base_response = {
        successful,
        ...(message && { message: message })
    };

    return data !== undefined ? { ...base_response, [key]: data } : base_response;


}
/*
{
    successful: true,
    message: 'updated was successfully',
    data: {

        },
}

{
    successful: true,
    data: {

        },
}

{
    successful: true,
    message: 'removed was successfully',
}
{
    successful: false,
    message: 'an ocurred error',
}

*/