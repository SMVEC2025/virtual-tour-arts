import React from 'react'
import Viewer from './viewer'
import SideBar from './SideBar'
import InteractiveMap from './InteractiveMap'
import NavBar from './NavBar'
import Footer from './Footer'
import SearchBox from './SearchBox'
import PreLoader from './PreLoader'

function Home() {
    return (
        <div className='home-main'>
            <SearchBox/>
            <NavBar />
            <Viewer />
            <SideBar />
            <InteractiveMap />
            <Footer/>
            
        </div>
    )
}

export default Home
