import { useAuth } from "context/AuthContextProvider";
import { useEffect } from "react";
import { refresh } from "services/auth";
import { authCookie, refreshCookie } from "utils/auth";
import { useNavigateBack } from "./useNavigateBack";

export const useLoggedInRedirect = () => {
  const navigateBack = useNavigateBack();
  const auth = useAuth();

  useEffect(() => {
    async function tryRefresh() {
      if(authCookie()){
        navigateBack();
        return;
      }
      if (!refreshCookie()) {
        return;
      }
      try {
        const response = await refresh();
        if (!response.ok) {
          // do nothing, lol, let the user login again
          return;
        }
        const body = await response.json();
        auth.login(body);
        navigateBack();
      } catch (_) {}
    }

    tryRefresh();
  }, [auth, navigateBack]);
}
