import * as s from "standard-parse";

export type HttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface BaseAuthenticatedFetchProps extends Omit<RequestInit, "body" | "method"> {
  baseUrl?: string;

  url: string;

  responseStatus?: number;

  method: HttpMethods;

  body?: object | FormData;

  query?: object;
}

export interface TypedAuthenticatedFetchProps<
  S extends s.StandardSchemaV1,
> extends BaseAuthenticatedFetchProps {
  schema: S;
}
