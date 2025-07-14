import React, { useRef, useEffect, useContext, useState } from 'react';
import 'aframe';
import { Scene, Entity } from 'aframe-react';
import { AppContext } from '../context/AppContext';
import PreLoader from './PreLoader';

const Viewer = () => {
  const { currentImage, sceneRef, isLoadingImage, setIsLoadingImage, imageData, setCurrentImage, isMobile } = useContext(AppContext);
  const [aframeReady, setAframeReady] = useState(false);

  useEffect(() => {
    // Set the initial image when imageData is available
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
  }, [imageData, currentImage, setCurrentImage, setIsLoadingImage]); // Depend on imageData, currentImage, etc.

  useEffect(() => {
    const sceneEl = sceneRef.current?.el;

    if (!sceneEl) return;

    const handleSceneLoaded = () => {
      console.log('A-Frame scene is loaded and ready!');
      setAframeReady(true);
    };

    // Add event listener once
    sceneEl.addEventListener('loaded', handleSceneLoaded);

    // Register auto-rotate component only if not mobile
    if (!isMobile && !AFRAME.components['auto-rotate-camera']) {
      AFRAME.registerComponent('auto-rotate-camera', {
        schema: {
          speed: { type: 'number', default: -4 },
          enabled: { type: 'boolean', default: true },
        },
        init: function () {
          const stopRotation = () => {
            this.data.enabled = false;
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
        }
      });
    }

    return () => {
      // Clean up event listener
      sceneEl.removeEventListener('loaded', handleSceneLoaded);
    };
  }, [isMobile]); // Re-run if isMobile changes

  return (
    <div className='tsv-main'>
      {isLoadingImage && <PreLoader />}

      <Scene ref={sceneRef} vr-mode-ui="enabled: true">
        <a-assets timeout="30000">
          {imageData.map((data) => (
            <img key={data.id} id={`img-${data.id}`} src={data.image} alt={data.name} crossOrigin="anonymous" />
          ))}
        </a-assets>

        {aframeReady && currentImage && (
          <a-sky src={`#img-${currentImage.id}`}></a-sky>
        )}

        {/* Conditionally render auto-rotate camera */}
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