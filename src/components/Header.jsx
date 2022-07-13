import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavLink  } from 'react-router-dom'
import logo from './../logo.svg'
import { NewsContext } from '../context/NewsContext'
import SearchForm from './SearchForm'
const Header = () => {
    const { news: { currentCategoryParam }, category } = useContext(NewsContext)
    const [navLink, setNavLink] = useState([])
    const [lastScroll, setLastScroll] = useState(window.scrollY);
    const navBar = useRef(null)

    useEffect(() => {
        if (category.length > 0 && navLink.length === 0) {
            let temp = []
            for(let i = 0; i < 3; i++){
                temp.push([category[i].name.split('_')[0], category[i].param_name.split('__')[0]])
            }
            setNavLink(temp)
        }
        console.log(currentCategoryParam)
    }, [category])

    useEffect(() => {
        if (currentCategoryParam !== undefined) {
            if (!navLink.reduce((a,b) => a+b[1], '').includes(currentCategoryParam)){
                for(let i=0; i<category.length; i++){
                    if (category[i].param_name.startsWith(currentCategoryParam)){
                        let temp = navLink.slice(0, 2)
                        temp.unshift([category[i].name.split('_')[0], category[i].param_name.split('__')[0]])
                        setNavLink(temp)
                    }
                }
            }
            console.log(navLink)
        }
    }, [category, currentCategoryParam])

    useEffect(() => {
        const onScroll = () => {
            let currentTop = Number(navBar.current.style.top.replace('px', ''))
            let offset = 5
            let top = Math.min(0, Math.max(offset-navBar.current.offsetHeight, lastScroll - window.scrollY + currentTop))
            navBar.current.style.top = `${top}px`
            setLastScroll(window.scrollY)
        }
        document.addEventListener("scroll", onScroll);
        return () => document.removeEventListener("scroll", onScroll);
    }, [navBar, lastScroll])

    return (
        <div className="stiker-wrap" ref={navBar}>
            <div id='header'>
                <div className="container">
                    <NavLink to='/'><img id='logo' src={logo} alt="logo" /></NavLink>
                    <ul id='navbar'>
                        <li><NavLink to='/tin-moi'>Tin mới</NavLink></li>
                        {navLink.map((item, index) => (
                            <li key={index}>
                                <NavLink 
                                    // className={isActive =>"nav-link" + (isActive ? " active" : "")}
                                    to={`/${item[1]}`}
                                >
                                    {item[0]}
                            </NavLink>
                            </li>
                        ))}
                    </ul>
                    <SearchForm />
                </div>
            </div>
        </div>
)
}

export default Header