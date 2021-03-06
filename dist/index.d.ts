export declare enum Type {
    NUMBER = "number",
    STRING = "string",
    ARRAY = "array",
    BOOLEAN = "boolean",
    JSON = "json"
}
declare type FromType = {
    number: number;
    string: string;
    array: string[];
    boolean: boolean;
    json: object;
    [key: string]: any;
};
export declare type Sanitizer = (value: any) => any;
export declare type IDetailedSpecification = {
    type?: Type;
    name?: string;
    isOptional?: boolean;
    default?: any;
    sanitize?: Sanitizer;
};
export interface Specification {
    [key: string]: IDetailedSpecification | Type | null;
}
export declare type Config = {
    [key: string]: any;
};
declare type IsOptional = {
    isOptional: true;
};
declare type IsRequired = {
    isOptional?: false | undefined;
};
declare type AnyKey = {
    [key: string]: any;
};
declare type ExtractConfigType<T> = T extends IsOptional & AnyKey & {
    sanitize: (...args: any[]) => infer U;
} ? U : T extends IsRequired & AnyKey & {
    sanitize: (...args: any[]) => infer U;
} ? U : T extends IsOptional & AnyKey & {
    type: Type;
} ? FromType[T['type']] | undefined : T extends IsRequired & AnyKey & {
    type: Type;
} ? FromType[T['type']] : T extends AnyKey & {
    default: infer V;
} ? V : T extends AnyKey & {
    isOptional: true;
} ? string | undefined : T extends string ? FromType[T] : string;
export declare type Description<T extends Specification> = {
    [Key in keyof T]: T[Key] extends null ? string : ExtractConfigType<T[Key]>;
};
export declare const describe: <T extends Specification>(specification: T, input?: {
    [key: string]: any;
} | null, defaults?: {
    [key: string]: any;
} | undefined) => Description<T>;
export declare function create<T extends Specification>(specification: T, configRoot?: null): {
    current: Description<T>;
    init: (root?: any) => Description<T>;
};
export {};
