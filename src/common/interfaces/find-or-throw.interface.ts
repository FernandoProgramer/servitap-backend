export interface FindOrThrowProps<T> {
    finder: () => Promise<T | null | undefined>
    entityName: string
    details?: string
}