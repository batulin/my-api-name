import { AnyZodObject } from "zod";


export interface requestValidators {
    body?: AnyZodObject,
    params?: AnyZodObject,
    query?: AnyZodObject,
}