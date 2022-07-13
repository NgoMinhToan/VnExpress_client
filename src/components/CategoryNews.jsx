import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NewsContext } from '../context/NewsContext'
import News_list from './News_list'
import News from './News'
import '../css/category.scss'

const CategoryNews = () => {
    const { category_param, news_url_param } = useParams()
    const { news: {listNews, newsDetail, isLoading}, error, setCurrentCategoryParam, setCurrentNewsUrlParam } = useContext(NewsContext)
    
    useEffect(() => {
        setCurrentNewsUrlParam(news_url_param===undefined?'':news_url_param)
        setCurrentCategoryParam(category_param===undefined?'':category_param)
    }, [category_param, news_url_param])
    // useEffect(() => {
    //     console.log(isLoading)
    //     console.log(error)
    //     console.log(newsDetail)

    // }, [isLoading])
    return (
        <div className='category-news'>
            {news_url_param!==undefined ? 
                ( <News /> ) || isLoading && ( <p>Loading...</p> ) || ( <p> Page not exist! </p> )
                : 
                ( <News_list /> ) || isLoading && ( <p>Loading...</p> ) || ( <p> Page not exist! </p> )}

        </div>
    )
}

export default CategoryNews