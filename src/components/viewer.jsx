import React, { useRef, useEffect, useContext, useState } from 'react';
import 'aframe'; // Ensure A-Frame is imported first
import { Scene, Entity } from 'aframe-react';
import { AppContext } from '../context/AppContext';
import PreLoader from './PreLoader';
import { FaArrowRight,FaArrowLeft } from "react-icons/fa6";

if (typeof window !== 'undefined' && window.AFRAME && !AFRAME.components['auto-rotate-camera']) {
  AFRAME.registerComponent('auto-rotate-camera', {
    schema: {
      speed: { type: 'number', default: -4 },
      enabled: { type: 'boolean', default: true },
    },
    init: function () {
      if (!this.el || !this.el.sceneEl) {
        console.warn('auto-rotate-camera: Element or scene element not available during init.');
        return;
      }
      const stopRotation = () => {
        this.data.enabled = false;
        // Optionally, remove the event listeners after they've done their job
        this.el.sceneEl.removeEventListener('mousedown', stopRotation);
        this.el.sceneEl.removeEventListener('touchstart', stopRotation);
      };
      this.el.sceneEl.addEventListener('mousedown', stopRotation);
      this.el.sceneEl.addEventListener('touchstart', stopRotation);
    },
    tick: function (time, delta) {
      if (!this.data.enabled) return;
      const rotation = this.el.getAttribute('rotation');
      const newRotationY = rotation.y + (this.data.speed * (delta / 1000));
      this.el.setAttribute('rotation', {
        x: rotation.x,
        y: newRotationY,
        z: rotation.z
      });
    },
    remove: function() {
  
    }
  });
}


const Viewer = () => {
  const { currentImage, sceneRef, isLoadingImage, setIsLoadingImage, imageData, setCurrentImage, isMobile,handelRightClick,handelLeftClick } = useContext(AppContext);
  const [aframeReady, setAframeReady] = useState(false);

  // useEffect to set the initial image
  useEffect(() => {
    if (imageData && imageData.length > 0 && !currentImage) {
      try {
        setCurrentImage(imageData[0]);
      } catch (error) {
        console.error("Error setting initial image:", error);
        setTimeout(() => {
          setIsLoadingImage(false);
        }, 500);
      }
    }
  }, [imageData, currentImage, setCurrentImage, setIsLoadingImage]);


  useEffect(() => {
    const sceneEl = sceneRef.current?.el; 

    if (!sceneEl) {
        console.warn("A-Frame scene element not found yet.");
        return;
    }

    const handleSceneLoaded = () => {
      setAframeReady(true);
      setIsLoadingImage(false); 
    };

    sceneEl.addEventListener('loaded', handleSceneLoaded);

    return () => {
      if (sceneEl) {
        sceneEl.removeEventListener('loaded', handleSceneLoaded);
      }
    };
  }, []); 

  useEffect(() => {
    if (currentImage) {
      setIsLoadingImage(true); 
     
      const timer = setTimeout(() => {
        
          setIsLoadingImage(false);
      }, 500); 

      return () => clearTimeout(timer);
    }
  }, [currentImage, setIsLoadingImage]);

 
  return (
    <div className='tsv-main'>
      {isLoadingImage && <PreLoader />}
      <div className='navigation-keys'>
        <button onClick={handelLeftClick}><FaArrowLeft/></button>
        <button onClick={handelRightClick}><FaArrowRight/></button>
      </div>
      <Scene ref={sceneRef} vr-mode-ui="enabled: true">
        <a-assets timeout="30000">
          {imageData.map((data) => (
            <img
              key={data.id}
              id={`img-${data.id}`}
              src={data.image}
              alt={data.name}
              crossOrigin="anonymous"
            />
          ))}
        </a-assets>

        {aframeReady && currentImage && (
          <a-sky src={`#img-${currentImage.id}`}></a-sky>
        )}

        {/* Conditionally render auto-rotate camera based on isMobile */}
        {!isMobile ? (
          <Entity auto-rotate-camera="speed: -4">
            <a-camera></a-camera>
          </Entity>
        ) : (
          <Entity>
            <a-camera></a-camera>
          </Entity>
        )}
      </Scene>
    </div>
  );
};

export default Viewer;