import React from 'react'
import { FaAngleLeft,FaAngleRight } from "react-icons/fa6";
import { FaVrCardboard } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { TfiGallery } from "react-icons/tfi";

function MobileFooter() {
  return (
    <div className='mfooter-main'>
      <div className='container'>
        <button><FaAngleLeft/></button>
        <button><FaVrCardboard/></button>
        <button><GrMapLocation/></button>
        <button><TfiGallery/></button>
        <button><FaAngleRight/></button>
      </div>
    </div>
  )
}

export default MobileFooter
