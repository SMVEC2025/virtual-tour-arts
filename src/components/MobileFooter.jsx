import React, { useContext, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaVrCardboard } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { TfiGallery } from "react-icons/tfi";
import { AppContext } from '../context/AppContext';
import InteractiveMap from './InteractiveMap';
import MobileMap from './MobileMap';

function MobileFooter() {
    const [expandFooter, setExpandFooter] = useState(false);
    const { imageData, handleSelectImage, handelRightClick, handelLeftClick, sceneRef } = useContext(AppContext)
    const [showcontent, setShowContent] = useState('');
    function handleGalleryClick(val) {
        if (showcontent == val) {
            setExpandFooter(false)
            setShowContent('')
        } else {
            setExpandFooter(true)
            setShowContent(val)
        }
    }

    function handleNavigation(val) {
        setExpandFooter(false)
        if (val == 'left') {
            handelLeftClick()
        }
        if (val == 'right') {
            handelRightClick()
        }
    }

    const handleEnterVR = () => {
        try {
          sceneRef.current.el.enterVR()  
        } catch (error) {
            console.log(error)
        }
    };
    const handlePopupClick = (e) => {
        e.stopPropagation(); // Prevent overlay click from closing popup
    };
    const openPopup = () => {
        setExpandFooter(false);
        setShowContent('');
    };
    return (
        <div className={`mfooter-god ${expandFooter ? "expanded" : ""} `} onClick={openPopup}>
            <div className={`mfooter-main ${expandFooter ? "expanded" : ""} `} onClick={handlePopupClick}>
                {showcontent == 'gallery' && (
                    <div className='image-items'>
                        {imageData?.map((image, index) =>
                            <div className='con' onClick={() => handleSelectImage(image)}>
                                <img src={image.thumb} alt="" />
                            </div>
                        )}
                    </div>
                )}
                {showcontent == 'map' && (
                    <div className='mobile-map'>
                        <MobileMap />
                    </div>
                )}
                <div className={`container`}>
                    <button onClick={() => { handleNavigation('left') }}><FaAngleLeft /></button>
                    <button onClick={() => { handleEnterVR() }}><FaVrCardboard /></button>
                    <button onClick={() => { handleGalleryClick('map') }}><GrMapLocation /></button>
                    <button onClick={() => { handleGalleryClick('gallery') }}><TfiGallery /></button>
                    <button onClick={() => { handleNavigation('right') }}><FaAngleRight /></button>
                </div>
            </div>

        </div>
    )
}

export default MobileFooter
