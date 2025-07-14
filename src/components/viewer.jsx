import React, { useRef, useEffect, useContext, useState } from 'react';
import 'aframe'; // Ensure A-Frame is imported first
import { Scene, Entity } from 'aframe-react';
import { AppContext } from '../context/AppContext';
import PreLoader from './PreLoader';

// IMPORTANT: Register A-Frame components OUTSIDE of React components.
// This ensures they are registered only once globally when A-Frame loads.
if (typeof window !== 'undefined' && window.AFRAME && !AFRAME.components['auto-rotate-camera']) {
  AFRAME.registerComponent('auto-rotate-camera', {
    schema: {
      speed: { type: 'number', default: -4 },
      enabled: { type: 'boolean', default: true },
    },
    init: function () {
      // Ensure element and sceneEl exist before adding listeners
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
    // Optional: Add a remove method for cleanup if specific resources need disposal
    remove: function() {
        // Example: If you added custom geometries or materials, dispose them here
        // console.log('auto-rotate-camera component removed.');
    }
  });
}


const Viewer = () => {
  const { currentImage, sceneRef, isLoadingImage, setIsLoadingImage, imageData, setCurrentImage, isMobile } = useContext(AppContext);
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


  // useEffect to handle A-Frame scene loading and setup
  useEffect(() => {
    const sceneEl = sceneRef.current?.el; // Get the A-Frame scene element

    if (!sceneEl) {
        // If sceneEl is not available yet, log and return.
        // This useEffect might run before the A-Frame Scene element is fully mounted.
        console.warn("A-Frame scene element not found yet.");
        return;
    }

    const handleSceneLoaded = () => {
      setAframeReady(true);
      // Once the scene is loaded, we can potentially hide the global preloader
      // if it's based on aframeReady.
      setIsLoadingImage(false); // Assume image loading is complete when scene is ready
    };

    // Add event listener for A-Frame scene 'loaded' event
    sceneEl.addEventListener('loaded', handleSceneLoaded);

    // Cleanup function: remove the event listener when the component unmounts
    return () => {
      // IMPORTANT: Check if sceneEl still exists before trying to remove listener
      if (sceneEl) {
        sceneEl.removeEventListener('loaded', handleSceneLoaded);
      }
    };
  }, []); // Empty dependency array means this runs once on mount/unmount

  // Handle image loading state specifically if currentImage changes
  useEffect(() => {
    if (currentImage) {
      setIsLoadingImage(true); // Show preloader when a new image is about to load
      // A-Frame's a-assets timeout handles asset loading.
      // We can use a small timeout to simulate loading completion after image is set
      // or ideally listen to an A-Frame event for texture loaded.
      const timer = setTimeout(() => {
          // This is a heuristic. A more robust solution would be to
          // listen for the actual texture load event on a-sky if possible,
          // but A-Frame often handles this internally.
          setIsLoadingImage(false);
      }, 500); // Give a brief moment for A-Frame to render the new sky

      return () => clearTimeout(timer);
    }
  }, [currentImage, setIsLoadingImage]);


  return (
    <div className='tsv-main'>
      {isLoadingImage && <PreLoader />}

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