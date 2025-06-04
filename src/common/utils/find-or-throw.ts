import { NotFoundException } from "@nestjs/common";

interface FindOrThrowInterface<T> {
    finder: () => Promise<T | null | undefined>
    entityName: string
    details?: string
}
export async function FindOrThrow<T>({
    finder,
    entityName,
    details,
}: FindOrThrowInterface<T>): Promise<T> {

    const result = await finder();

    if (!result) {
        const message = details
            ? `Not found ${entityName} ${details}`
            : `Not found ${entityName}`
        throw new NotFoundException(message);
    }

    return result;
}