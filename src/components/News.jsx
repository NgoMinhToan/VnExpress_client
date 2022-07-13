import React, { useContext } from 'react'
import { NewsContext } from '../context/NewsContext'
import '../css/news.scss'
import { to_time_ago } from '../methods'
import Loading from './Loading'

const News = () => {
    let image_index=0
    const { news: {newsDetail, isLoading} } = useContext(NewsContext)


  return (
    <div>
        <div className="news">
            {isLoading && <Loading />}
            {newsDetail && Object.keys(newsDetail).length != 0 && (
                <div className='container news-container'>
                    <div className="news-header">
                        <p className='news-title'>{newsDetail?.title}</p>
                        <p className='news-datetime'>{to_time_ago(newsDetail?.datetime)}</p>
                        <p className='news-description'>{newsDetail?.detail?.description}</p>
                        <p className='news-location'>{newsDetail?.detail?.location}</p>
                    </div>
                    <div className="news-body">
                        <div>{newsDetail?.detail?.content.map((value, i) => {
                            let html = <p className='news-p'>{value}</p>
                            if (value === '<figure>') {
                                let image = newsDetail?.detail?.media[image_index++]
                                html = <img className='news-img' src={image?.src} loading="lazy" alt={image?.alt} />
                            }
                            return <div key={i}>{html} <br /></ div>
                            
                        })}</div>
                    </div>
                    <div className="news-author">{newsDetail?.detail?.author}</div>
                    <br />
                </div>
            )}
        </div>
        
    </div>
    
  )
}

export default News

