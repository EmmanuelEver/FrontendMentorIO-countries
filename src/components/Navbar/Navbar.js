import React, {useContext} from 'react';
import './Navbar.css';
import MoonIcon from '../Icons/MoonIcon'
import {ThemeContext} from '../../contexts/ThemeContext/ThemeContext';

const Navbar = () => {
	const {theme, setTheme} = useContext(ThemeContext)

	const toggleTheme = () => {
		console.log(theme, setTheme)
		if(theme === "DARK"){
			setTheme("LIGHT")
		}else{
			setTheme("DARK")
		}
	}

	const mode = theme === "DARK"? "Light mode" : "Dark mode" 

	return(
		<nav className="navbar">
			<h1 className="navbar__brand">Where in the world?</h1>
			<h4 onClick={toggleTheme} className="navbar__toggleTheme"> 
				<span> <MoonIcon fill={theme === "DARK" ? "#fff" : "black"}/> </span> 
				{mode} 
			</h4>
		</nav>
	)
}

export default Navbar;