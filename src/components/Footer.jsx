import React, { useContext, useEffect, useState } from 'react'
import { MdOutlineFullscreen } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { IoShareSocial } from "react-icons/io5";
import { AppContext } from '../context/AppContext';
import { LuShrink } from "react-icons/lu";

function Footer() {
  const { setShowSearchBox } = useContext(AppContext)
  const [isFullScreen,setIsFullScreen] = useState(false)
  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen()
   
        setIsFullScreen(false)
    } else {
      document.documentElement.requestFullscreen()
       
        setIsFullScreen(true)

    }
  }
 const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (navigator.share) {
      setCanShare(true);
    } else {
     return;
    }
  }, []); 
  const handleShare = async () => {

    const currentUrl = window.location.href;
    const documentTitle = document.title; 

    try {
     
      if (navigator.canShare && !navigator.canShare({ url: currentUrl, title: documentTitle })) {
        return;
      }

      await navigator.share({
        title: documentTitle,
        text: 'Check out this awesome page!', 
        url: currentUrl,
      });

    } catch (error) {
     console.log(error)
    }
  };
  return (
    <div className='footer-main'>
      <div onClick={() => setShowSearchBox(true)}>
        <IoMdSearch />
      </div>
      <div onClick={handleShare}>
        <IoShareSocial />
      </div>
      <div onClick={toggleFullscreen}>
        {isFullScreen ? <LuShrink /> : <MdOutlineFullscreen />}
      </div>
    </div>
  )
}

export default Footer
