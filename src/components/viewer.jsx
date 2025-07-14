import React, { useRef, useEffect, useContext, useState } from 'react';
import 'aframe';
import { Scene, Entity } from 'aframe-react';
import { AppContext } from '../context/AppContext';
import PreLoader from './PreLoader';

const Viewer = () => {
  const {
    currentImage,
    sceneRef,
    isLoadingImage,
    setIsLoadingImage,
    imageData,
    setCurrentImage,
    isMobile
  } = useContext(AppContext);

  const [aframeReady, setAframeReady] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Register auto-rotate only once globally
  useEffect(() => {
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
            z: rotation.z,
          });
        },
      });
    }
  }, []);

  // Wait until <a-scene> fully loads
  useEffect(() => {
    const sceneEl = sceneRef.current?.el;
    if (!sceneEl || isMobile) return;

    const handleSceneLoaded = () => {
      setAframeReady(true);
    };

    sceneEl.addEventListener('loaded', handleSceneLoaded);

    return () => {
      sceneEl.removeEventListener('loaded', handleSceneLoaded);
    };
  }, [sceneRef, isMobile]);

  // Set first image when scene is ready
  useEffect(() => {
    if (aframeReady && imageData.length > 0 && !currentImage) {
      setIsLoadingImage(true);
      setCurrentImage(imageData[0]);
    }
  }, [aframeReady, imageData, currentImage]);

  // Track current image load
  useEffect(() => {
    if (!currentImage) return;

    const imgEl = document.getElementById(`img-${currentImage.id}`);
    if (!imgEl) return;

    const handleImgLoad = () => {
      setImageLoaded(true);
      setIsLoadingImage(false);
    };

    if (imgEl.complete) {
      handleImgLoad();
    } else {
      imgEl.addEventListener('load', handleImgLoad);
    }

    return () => {
      imgEl?.removeEventListener('load', handleImgLoad);
    };
  }, [currentImage]);

  return (
    <div className="tsv-main">
      {isLoadingImage && <PreLoader />}

      {isMobile ? (
        <Scene ref={sceneRef}>
          {currentImage && <a-sky src={currentImage.image}></a-sky>}
          <a-camera user-was-moved="true"></a-camera>
        </Scene>
      ) : (
        <Scene ref={sceneRef} vr-mode-ui="enabled: true" embedded>
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

          {aframeReady && imageLoaded && currentImage && (
            <>
              <a-sky src={`#img-${currentImage.id}`} rotation="0 -130 0"></a-sky>
              <Entity auto-rotate-camera="speed: -4">
                <a-camera></a-camera>
              </Entity>
            </>
          )}
        </Scene>
      )}
    </div>
  );
};

export default Viewer;
