import type { ApiUrl, IShare } from "@/types";
import { fetchURL, fetchJSON, removePrefix, createURL } from "./utils";

export async function list() {
  return fetchJSON("/api/shares");
}

export async function get(url: ApiUrl) {
  url = removePrefix(url);
  return fetchJSON(`/api/share${url}`);
}

export async function remove(hash: string) {
  await fetchURL(`/api/share/${hash}`, {
    method: "DELETE",
  });
}

export async function create(
  url: ApiUrl,
  password = "",
  expires = "",
  unit = "hours"
) {
  url = removePrefix(url);
  url = `/api/share${url}`;
  if (expires !== "") {
    url += `?expires=${expires}&unit=${unit}`;
  }
  let body = "{}";
  if (password != "" || expires !== "" || unit !== "hours") {
    body = JSON.stringify({
      password: password,
      expires: expires.toString(), // backend expects string not number
      unit: unit,
    });
  }
  return fetchJSON(url, {
    method: "POST",
    body: body,
  });
}

export function getShareURL(share: IShare) {
  return createURL("share/" + share.hash, {}, false);
}