import React, { useContext } from 'react'
import { MdOutlineFullscreen } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { IoShareSocial } from "react-icons/io5";
import { AppContext } from '../context/AppContext';

function Footer() {
    const {setShowSearchBox} = useContext(AppContext)
  return (
    <div className='footer-main'>
    <div onClick={()=>setShowSearchBox(true)}>
        <IoMdSearch/>
    </div>
    <div>
        <IoShareSocial/>
    </div>
    <div>
       <MdOutlineFullscreen/>
    </div>
    </div>
  )
}

export default Footer
