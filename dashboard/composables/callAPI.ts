// import { getAPIURL } from "~/configs";
// import type { IAPIResponse } from "~/types";

export const callAPI = async (path: string, method?: string, body?: any): Promise<IAPIResponse> => {
  const token = useCookie('token').value || '';
  const h: any = {
    "Authorization": "Bearer " + token,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (body && body instanceof FormData) {
    delete h["Content-Type"];
  }
  const resp: IAPIResponse = {
    status: 200,
    code: 200,
  };
  const res = await $fetch<any>(getAPIURL(path), {
    headers: h,
    cache: "no-cache",
    //@ts-expect-error
    method: method || "GET",
    body,
    ignoreResponseError: true,
  });
  const { code, error, data, message } = res;
  resp.code = code;
  resp.error = error;
  resp.data = data;
  resp.message = message;
  if (error) {
    resp.status = code >= 500 ? 500 : 400;
  }
  return resp;
};
