import { createContext } from "react";

const UserContext = createContext({
  userData: null,
  setUserData: () => {},
});

export default UserContext;
