export const FE_ROUTES = {
  ROOT: "/",
  LOGIN: "/login",
  HOME: "/home",
  FILE_DATA: "/file-data",
};

export const BE_ROUTES = {
  GET_PRE_SIGNED_URL: "/pre-signed-url/{fileName}",
  UPDATE_USER_URL: "/update-user",
  ADD_FILE_URL: "/add-file",
  GET_FILES_URL: "/get-files",
  GET_FILE_DATA_URL: "/get-file-data/{fileId}",
};

export enum ROLES {
  ADMIN = "ADMIN",
  ORG_USER = "ORG_USER",
  USER = "USER",
}

export const RBAC = {
  [ROLES.USER]: [ROLES.USER, ROLES.ORG_USER, ROLES.ADMIN],
  [ROLES.ORG_USER]: [ROLES.ORG_USER, ROLES.ADMIN],
  [ROLES.ADMIN]: [ROLES.ADMIN],
};

export type Route = {
  icon: string;
  path: string;
  title: string;
  role: ROLES;
  customClick?: boolean;
  badge?: number;
};

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
  OPTIONS = "OPTIONS",
  HEAD = "HEAD",
}
