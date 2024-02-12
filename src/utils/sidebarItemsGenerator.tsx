import { TSidebarItem, TUserPath } from "../types";
import { NavLink } from "react-router-dom";
export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      const children = item.children
        .filter((child) => child.name)
        .map((child) => ({
          key: child.name!,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        }));

      if (children.length > 0) {
        acc.push({
          key: item.name,
          label: item.name,
          children,
        });
      }
    }

    return acc;
  }, []);

  return sidebarItems;
};
