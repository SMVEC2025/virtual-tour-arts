import React, { useContext } from 'react'
import Viewer from './viewer'
import SideBar from './SideBar'
import InteractiveMap from './InteractiveMap'
import NavBar from './NavBar'
import Footer from './Footer'
import SearchBox from './SearchBox'
import PreLoader from './PreLoader'
import { AppContext } from '../context/AppContext'
import MobileFooter from './MobileFooter'

function Home() {
    const{ isMobile } = useContext(AppContext)
    return (
        <div className='home-main'>
            <SearchBox/>
            <NavBar />
            <Viewer />
            <SideBar />
            {!isMobile && <InteractiveMap />}
            
            {isMobile?(<MobileFooter/>):(<Footer/>)}
        </div>
    )
}

export default Home
