export declare const mutable: <T extends readonly any[] | Record<string, unknown>>(val: T) => Mutable<T>;
export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
export type HTMLElementCustomized<T> = HTMLElement & T;
/**
 * @deprecated stop to use null
 * @see {@link https://github.com/sindresorhus/meta/discussions/7}
 */
export type Nullable<T> = T | null;
export type Arrayable<T> = T | T[];
export type Awaitable<T> = Promise<T> | T;
