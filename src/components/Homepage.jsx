import React, { useState, useEffect, useContext } from 'react'
import '../css/homepage.scss'
import { NewsContext } from '../context/NewsContext'
import News_list from './News_list'

const Homepage = () => {
    const { news: {listNews, isLoading}, setCurrentCategoryParam, setCurrentNewsUrlParam } = useContext(NewsContext)

    useEffect(() => {
        setCurrentCategoryParam('')
        setCurrentNewsUrlParam('')
        
    }, [])

    
    return (
        <div className="homepage">
            <News_list />

        </div>
    )
}

export default Homepage
