import React, { useContext, Suspense, lazy, useState, useEffect } from 'react'; // Import lazy and Suspense
import { AppContext } from '../context/AppContext';

// Import components that are always needed immediately
import Viewer from './viewer';
import SearchBox from './SearchBox';
import NavBar from './NavBar';
import PreLoader from './PreLoader'; // PreLoader is for initial loading, keep it loaded
import MobileViewer from './MobileViewer';
import FrontLoader from './FrontLoader';

// Lazy load components that might not be needed on initial render or for all users/devices
const LazySideBar = lazy(() => import('./SideBar'));
const LazyInteractiveMap = lazy(() => import('./InteractiveMap'));
const LazyFooter = lazy(() => import('./Footer'));
const LazyMobileFooter = lazy(() => import('./MobileFooter'));

function Home() {
    const { isMobile, isLoadingImage } = useContext(AppContext);
    const [frontLoading, setFrontLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setFrontLoading(false)
        }, 2000);
    }, [])


    return (
        <div className='home-main'>

            <SearchBox />
            <NavBar />
            {frontLoading && (
                <div className='front-loader-main'>
                    <FrontLoader />
                </div>
            )}
            {isLoadingImage && <PreLoader />}
            <Suspense fallback={<div>Loading viewer...</div>}>
                {isMobile ? <MobileViewer /> : <Viewer />}
            </Suspense>

            {!isMobile && (
                <Suspense fallback={<div>Loading desktop features...</div>}>
                    <LazySideBar />
                    <LazyInteractiveMap />
                    <LazyFooter />
                </Suspense>
            )}

            {isMobile && (
                <Suspense fallback={<div>Loading mobile features...</div>}>
                    <LazyMobileFooter />
                </Suspense>
            )}


        </div>
    );
}

export default Home;