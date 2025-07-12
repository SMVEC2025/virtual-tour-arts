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
    const { imageData } = useContext(AppContext)
    const [showcontent, setShowContent] = useState('');
    function handleGalleryClick(val) {
       if(expandFooter){
         setExpandFooter(false)
        setShowContent('')
       }else{
         setExpandFooter(true)
        setShowContent(val)
       }
    }
    console.log(imageData)
    return (
        <div className={`mfooter-main ${expandFooter ? "expanded" : ""} `}>
            {showcontent == 'gallery' && (
                <div className='image-items'>
                    {imageData?.map((image, index) =>
                        <div className='con'>
                            <img src={image.thumb} alt="" />
                        </div>
                    )}
                </div>
            )}
            {showcontent == 'map' && (
                <div className='mobile-map'>
                    <MobileMap/>     
                    
                </div>
            )}
            <div className={`container`}>
                <button><FaAngleLeft /></button>
                <button><FaVrCardboard /></button>
                <button onClick={()=>{handleGalleryClick('map')}}><GrMapLocation /></button>
                <button onClick={()=>{handleGalleryClick('gallery')}}><TfiGallery /></button>
                <button><FaAngleRight /></button>
            </div>
        </div>
    )
}

export default MobileFooter
