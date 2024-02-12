import { ReactElement, ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
};
export type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};

export type TUserPath = {
  name: string;
  path: string;
  element?: ReactNode;
  children?: TUserPath[];
};
export type TAdminPaths = {
  name: string;
  path: string;
  element: ReactElement;
  children?: TAdminPaths[];
};
