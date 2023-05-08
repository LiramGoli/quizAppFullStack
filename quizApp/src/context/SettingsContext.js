import { createContext } from "react";

const SettingsContext = createContext({
  settings: null,
  setSettings: () => {},
});

export default SettingsContext;
