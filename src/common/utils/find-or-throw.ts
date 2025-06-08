import { NotFoundException } from "@nestjs/common";
import { FindOrThrowProps } from "../interfaces/find-or-throw.interface";


export async function FindOrThrow<T>({
    finder,
    entityName,
    details,
}: FindOrThrowProps<T>): Promise<T> {

    const result = await finder();

    if (!result) {
        const message = details
            ? `Not found ${entityName} ${details}`
            : `Not found ${entityName}`
        throw new NotFoundException(message);
    }

    return result;
}