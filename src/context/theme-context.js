import { createContext } from 'react';
import { useState } from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
    const [theme, setTheme] = useState('light');

    const themeTogglerHandler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    };

    return (
        <ThemeContext.Provider value={{ themeTogglerHandler, theme }}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
