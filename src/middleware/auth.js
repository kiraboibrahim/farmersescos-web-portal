import { authApi, removeAuth, saveAuth } from "../services/auth";

export default function auth({ getState }) {
  return (next) => (action) => {
    const result = next(action);
    if (authApi.endpoints.signin.matchFulfilled(action)) {
      const { auth } = getState();
      saveAuth(auth);
    }
    if (action.type === "auth/logout") {
      removeAuth();
    }
    return result;
  };
}
