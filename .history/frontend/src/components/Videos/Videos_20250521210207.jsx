import React from 'react'
import Navbar from '../home/Navbar'
import VideoSidebar from './VideoSidebar'
import GetVideos from './GetVideos'

const Videos = () => {
  return (
    <>
     <Navbar/> 
     <div className="grid h-[93vh] overflow-y-scroll grid-cols-12">
      <div className='col-span-3'>
        <VideoSidebar/>
      </div>
      <div className='col-span-9'>
        <GetVideos/>
      </div>
     </div>
    </>
  )
}

export default Videos
