import React, { useContext, Suspense, lazy } from 'react'; // Import lazy and Suspense
import { AppContext } from '../context/AppContext';

// Import components that are always needed immediately
import Viewer from './viewer';
import SearchBox from './SearchBox';
import NavBar from './NavBar';
import PreLoader from './PreLoader'; // PreLoader is for initial loading, keep it loaded

// Lazy load components that might not be needed on initial render or for all users/devices
const LazySideBar = lazy(() => import('./SideBar'));
const LazyInteractiveMap = lazy(() => import('./InteractiveMap'));
const LazyFooter = lazy(() => import('./Footer'));
const LazyMobileFooter = lazy(() => import('./MobileFooter'));

function Home() {
    const { isMobile, isLoadingImage } = useContext(AppContext);

    // Consider if PreLoader should wrap the whole content, or just the Viewer
    // For now, keeping it as per your original Viewer's internal logic.
    // If you want the ENTIRE app to wait, you could put PreLoader here.

    return (
        <div className='home-main'>
            <SearchBox />
            <NavBar />
            <Viewer />

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