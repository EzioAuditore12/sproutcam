import * as s from "standard-parse";
import { env } from "@/env";
import type { BaseAuthenticatedFetchProps, TypedAuthenticatedFetchProps } from "./type";

import { buildQueryParams } from "../../fetch/utils";
import { fetch } from "../../fetch";

export const executeAuthenticatedRequest = async ({
  baseUrl = env.SERVER_URL,
  url,
  headers,
  responseStatus = 401,
  body,
  query,
  method,
  ...props
}: BaseAuthenticatedFetchProps) => {
  const isFormData = body instanceof FormData;

  const authHeaders: Record<string, string> = {
    ...((headers as Record<string, string>) || {}),
  };

  if (!isFormData && !authHeaders["Content-Type"]) authHeaders["Content-Type"] = "application/json";

  const paramsValues = buildQueryParams(query);

  if (paramsValues) url = url + (url.includes("?") ? "&" : "?") + paramsValues;

  const requestOptions = {
    method,
    body: isFormData ? (body as FormData) : body ? JSON.stringify(body) : undefined,
  };

  const apiUrl = `${baseUrl}/${url}`;

  // On Web, native browser fetch sends credentials implicitly if configured
  const response = await fetch(apiUrl, {
    ...requestOptions,
    headers: authHeaders,
    credentials: "include",
    ...props,
  });

  return response;
};

export const executeStreamingAuthenticatedRequest = async (props: BaseAuthenticatedFetchProps) => {
  return executeAuthenticatedRequest({
    ...props,
    // @ts-ignore
    stream: true,
  });
};

export const authenticatedTypedFetch = async <S extends s.StandardSchemaV1>({
  schema,
  ...props
}: TypedAuthenticatedFetchProps<S>): Promise<s.StandardSchemaV1.InferOutput<S>> => {
  const response = await executeAuthenticatedRequest(props);

  const json = await response.json();

  const result = s.safeParse(schema, json);

  if (result.issues) throw new Error(JSON.stringify(result.issues));

  return result.value;
};
