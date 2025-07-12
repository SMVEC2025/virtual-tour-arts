import React from 'react'
import { FaAngleLeft,FaAngleRight } from "react-icons/fa6";
import { FaVrCardboard } from "react-icons/fa6";

function MobileFooter() {
  return (
    <div className='mfooter-main'>
      <div className='container'>
        <button><FaAngleLeft/></button>
        <button><FaVrCardboard/></button>
        <button><FaAngleRight/></button>
      </div>
    </div>
  )
}

export default MobileFooter
