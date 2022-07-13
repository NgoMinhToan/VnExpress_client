import React, { useContext, useEffect, useState } from 'react'
import '../css/news_list.scss'
import { Link } from 'react-router-dom';
import { NewsContext } from '../context/NewsContext'
import { to_time_ago } from '../methods'
import Loading from './Loading';

const News_list = () => {
    const { news: {listNews, isLoading}, outOfNews, currentCategoryName, setPage, page } = useContext(NewsContext)
    const [triggleLoad, setTriggleLoad] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!outOfNews && listNews && listNews.length > 0 && !isLoading && window.innerHeight + window.scrollY >= document.body.offsetHeight)
                setTriggleLoad(true)
            else
                setTriggleLoad(false)
        }
        window.addEventListener('scroll', () => handleScroll())

        return () => window.removeEventListener('scroll', () => handleScroll())

    }, [listNews, isLoading, outOfNews])

    // update news when scroll to bottom
    useEffect(() => {
        console.log(triggleLoad)
        if (triggleLoad) {
            setPage(page + 1)
        }
    }, [triggleLoad])

    return (
        <div className="news-list-body">
            <div className="top-body">
                <div className="stiker-top">
                    <h3 className='category-name'>{currentCategoryName}</h3>
                </div>
            </div>
            <div className='container news-container'>
                
                {isLoading && <Loading />}
                {listNews && listNews.length > 0 && listNews.map((item, index) => (
                    <div key={index} className='news-item'>
                        <div className="top-item">
                            <Link to={`/${item.category_param.split('__')[0]}/${item.news_url_param}`} ><p className='news-title'>{item.title}</p></Link>
                            <p className='news-date'>{to_time_ago(item.datetime)}</p>
                        </div>
                        <p className='news-description'>{item.description}</p>
                    </div>
                )) || !isLoading && <p>Page not exist!</p> }
                {isLoading && <Loading /> || (<p> Out of News! </p>)}
            </div>
        </div>
    )
}

export default News_list