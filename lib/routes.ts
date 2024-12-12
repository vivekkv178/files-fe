import { FE_ROUTES, ROLES, Route } from "./constants";

export const routes: Route[] = [
  {
    customClick: true,
    icon: "lucide:home",
    path: FE_ROUTES.HOME,
    title: "Home",
    role: ROLES.USER,
  },
];
