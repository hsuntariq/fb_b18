import React from 'react'
import Navbar from '../home/Navbar'
import VideoSidebar from './VideoSidebar'
import GetVideos from './GetVideos'

const Videos = () => {
  return (
    <>
    <div className='h-[100vh] overflow-y-scroll'>
     <Navbar/> 
     <div className="grid  grid-cols-12">
      <div className='col-span-3'>
        <VideoSidebar/>
      </div>
      <div className='col-span-9'>
        <GetVideos/>
      </div>
     </div>
    </div>
    </>
  )
}

export default Videos
