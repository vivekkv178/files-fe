import { RBAC, ROLES, Route } from "./../../lib/constants";
import { useEffect, useState } from "react";
import { onLoginSuccess, onLogout } from "@/lib/reducers/auth";
import { FE_ROUTES } from "@/lib/constants";
import { routes } from "@/lib/routes";

import { getUserInfo, logout } from "@vivekkv178/library";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";

const useAppLayoutState = () => {
  const authState = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [appRoutes, setAppRoutes] = useState<Route[]>([]);

  const getUserRole = () => {
    const email = authState?.user?.email;
    if (email === "admin@test.com") {
      return ROLES.ADMIN;
    } else if (
      email === "orgadmin@test.com" ||
      email === "org2admin@test.com"
    ) {
      return ROLES.ORG_USER;
    } else {
      return ROLES.USER;
    }
  };

  const filterRoutes = () => {
    const userRole = getUserRole();
    // Use the userRole only if it's defined
    if (userRole) {
      const appRoutes: Route[] = routes.filter((route) => {
        return RBAC[route.role].includes(userRole);
      });
      setAppRoutes(appRoutes);
    }
  };

  useEffect(() => {
    filterRoutes();
  }, [authState?.user]);

  const handleLogout = async () => {
    await logout();
    dispatch(onLogout());
    router.push(FE_ROUTES.LOGIN);
  };

  const checkUser = async () => {
    const user = await getUserInfo();
    if (user) dispatch(onLoginSuccess(user));
    else router.push(FE_ROUTES.LOGIN);
  };

  useEffect(() => {
    checkUser();
  }, []);

  const providerData = authState?.user?.providerData
    ? authState?.user?.providerData[0]
    : null;

  return {
    appRoutes,
    providerData,
    handleLogout,
  };
};

export default useAppLayoutState;
