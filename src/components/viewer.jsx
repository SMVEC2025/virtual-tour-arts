import React, { useRef, useEffect, useContext, useState } from 'react'; // Import useState
import 'aframe'; // Keep this import, but recognize its asynchronous nature
import { Scene, Entity } from 'aframe-react';
import { AppContext } from '../context/AppContext';
import PreLoader from './PreLoader';

const Viewer = () => {
  const { currentImage, sceneRef, isLoadingImage, setIsLoadingImage, imageData,setCurrentImage } = useContext(AppContext);
  const [aframeReady, setAframeReady] = useState(false); // New state to track A-Frame's readiness

  useEffect(() => {
    const sceneEl = sceneRef.current?.el; // Get the A-Frame scene DOM element

    if (!sceneEl) return; // Exit if scene element is not yet available

    const handleSceneLoaded = () => {
      console.log('A-Frame scene is loaded and ready!');
      setAframeReady(true); // Set A-Frame as ready

      // Register custom component *only after* A-Frame is ready
      if (!AFRAME.components['auto-rotate-camera']) {
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
      // You can hide your initial preloader here if needed,
      // or handle it in AppContext's `handleAssetsLoaded` from the previous suggestion.
      // setIsLoadingImage(false); // If you want to hide loader immediately after A-Frame is ready
    };

    // Add event listener for A-Frame scene loaded event
    sceneEl.addEventListener('loaded', handleSceneLoaded);

    // Clean up the event listener when the component unmounts
    return () => {
      sceneEl.removeEventListener('loaded', handleSceneLoaded);
    };
  }, []); // Run this effect once on mount

  // Combine the A-Frame readiness with your asset loading logic
  // The assetsLoaded state (from previous suggestion) will be important here.
  // For now, let's assume assets are ready when aframeReady is true
  // and we also have an initial currentImage set.
  useEffect(() => {
    if (aframeReady && imageData.length > 0 && !currentImage) {
      // Set the first image when A-Frame is ready and no image is currently set
      setCurrentImage(imageData[0]);
      setIsLoadingImage(false); // Hide the loader for initial display
    }
  }, [aframeReady, imageData, currentImage, setCurrentImage, setIsLoadingImage]);


  return (
    <div className='tsv-main'>
      {isLoadingImage && <PreLoader />}
      <Scene ref={sceneRef} vr-mode-ui="enabled: true">
        {/* Assets must be available before they can be referenced by a-sky */}
        {/* Make sure imageData is available when this maps */}
        <a-assets timeout="30000"> {/* Increased timeout */}
          {imageData.map((data) => (
            <img key={data.id} id={`img-${data.id}`} src={data.image} alt={data.name} crossOrigin="anonymous" />
          ))}
        </a-assets>

        {/* The 360-degree background image - reference by ID */}
        {/* Only render a-sky if aframeReady is true AND currentImage is set */}
        {aframeReady && currentImage && (
          <a-sky src={`#img-${currentImage.id}`}></a-sky>
        )}

        <Entity auto-rotate-camera="speed: -4">
          <a-camera></a-camera>
        </Entity>
      </Scene>
    </div>
  );
};

export default Viewer;