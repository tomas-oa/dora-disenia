/**
 * Make argument nil (`null | undefined`).
 * @example
 * function example(input: Maybe<string>) {};
 */
export type Maybe<T> = T | null | undefined;

export type Nullable<T> = T | null;

export type MaybeRecord<T> = {
  [P in keyof T]?: Maybe<T[P]>;
};
