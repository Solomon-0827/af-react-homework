import { createContext } from "react";

const defaultTheme = {
    color: 'light',
    toggleColor: (val: string) => {}
};

export const ThemeContext = createContext(defaultTheme);