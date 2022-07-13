import React from 'react'

import loading from './../loading.svg'
import '../css/global.scss'


const Loading = () => {
  return (
    <div className='loading-view'>
        <img className='loading' src={loading} alt="loading" />
    </div>
  )
}

export default Loading