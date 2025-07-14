import React, { useEffect, useRef, useState, useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { MdDragIndicator } from "react-icons/md";
import { RiExpandHorizontalSLine } from "react-icons/ri";
import { LuArrowLeft } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { GrGallery } from "react-icons/gr";

function SideBar() {
    const sidebarRef = useRef(null);
    const { imageData, handleSelectImage } = useContext(AppContext);
    const [isResizing, setIsResizing] = useState(false);
    const [width, setWidth] = useState(310);
    const [entered, setEntered] = useState(false);
    const [widthAnimation, setWidthAnimation] = useState(false);



    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizing) return;
            const newWidth = e.clientX;
            if (newWidth > 310 && newWidth < 920) {
                setWidth(newWidth);
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);
    function handleClose() {
        if (isResizing) {
            return
        }
        else {
            setEntered(false)
            setWidth(310)
        }
    } 
    const handleExpand = () => {
        setWidthAnimation(true)
        setWidth(920)
        setTimeout(() => {
            setWidthAnimation(false)
        }, 1000);
    }
    const handleDepand = () => {
        setWidthAnimation(true)
        setWidth(310)
        setTimeout(() => {
            setWidthAnimation(false)
        }, 1000);
    }

    return (
        <div className={`sidebar-god ${entered ? 'active' : ''}`} onMouseEnter={() => { setEntered(true) }} >
            <div className='side-btn'>
                <GrGallery/>
            </div>
            <div
                onClick={(e) => e.stopPropagation()}
                ref={sidebarRef}
                className={`sidebar-main ${widthAnimation ? 'animate' : 'unimate'}`}
                style={{ width: `${width}px` }}
            >
                <div className='sidebar-header'>
                    <h1>SMVEC</h1>
                    <div className='right'>
                        {width < 350 ? (
                            <button onClick={handleExpand}>
                                <RiExpandHorizontalSLine />

                            </button>
                        ) : (
                            <button onClick={handleDepand}>
                                <LuArrowLeft />

                            </button>
                        )}

                    </div>
                </div>
                <div className="main-content">
                    {imageData?.map((image,index) => (
                        <div key={index} className='container'
                            style={{ backgroundImage: `url(${image.thumb})` }}
                            onClick={() => { handleSelectImage(image)}}>
                            <div className='layer'>
                                <p>{image.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    className={`resizer ${isResizing ? 'active' : ''}`}
                    onMouseDown={() => setIsResizing(true)}
                >
                    <span>
                        <MdDragIndicator />
                    </span>
                </div>
                <div className={`close-btn ${entered ? "active" : ""}`}>
                    <button onClick={handleClose}>
                        <IoMdClose />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default SideBar
