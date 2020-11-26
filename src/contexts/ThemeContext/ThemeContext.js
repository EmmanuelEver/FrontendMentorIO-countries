import React, {createContext, useContext, useState, useEffect} from 'react';

export const ThemeContext = createContext([]);

export const ThemeProvider = ({children}) => {
	const [theme, setTheme] = useState("LIGHT");

	const changeThemeHandler = (theme) => {
		setTheme(theme);
	}	

	useEffect(() => {
		let root = document.documentElement

		if(theme === "LIGHT"){
			root.style.setProperty("--background", "hsl(0, 0%, 98%)");
			root.style.setProperty("--elements", "hsl(0, 0%, 100%)");
			root.style.setProperty("--textColor", "hsl(200, 15%, 8%)");
			root.style.setProperty("--input", "hsl(0, 0%, 52%)");		
		}
		if(theme === "DARK"){
			root.style.setProperty("--background", "hsl(207, 26%, 17%)");
			root.style.setProperty("--elements", "hsl(209, 23%, 22%)");
			root.style.setProperty("--textColor", "hsl(0, 0%, 100%)");
			root.style.setProperty("--input", "hsl(209, 23%, 22%)");
		}
	},[theme])

	return(
		<ThemeContext.Provider value={{theme:theme, setTheme:changeThemeHandler}}>
			{children}
		</ThemeContext.Provider>
	)
}

