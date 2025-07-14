import React, { useRef, useEffect, useContext, useState } from 'react';
import 'aframe';
import { Scene, Entity } from 'aframe-react';
import { AppContext } from '../context/AppContext';
import PreLoader from './PreLoader';

const Viewer = () => {
  const { currentImage, sceneRef, isLoadingImage, setIsLoadingImage, imageData, setCurrentImage, isMobile } = useContext(AppContext);
  const [aframeReady, setAframeReady] = useState(false);

  // useEffect(() => {
  //   const sceneEl = sceneRef.current?.el;

  //   if (!sceneEl) return;

  //   const handleSceneLoaded = () => {
  //     console.log('A-Frame scene is loaded and ready!');
  //     setAframeReady(true);

  //     if (!AFRAME.components['auto-rotate-camera']) {
  //       AFRAME.registerComponent('auto-rotate-camera', {
  //         schema: {
  //           speed: { type: 'number', default: -4 },
  //           enabled: { type: 'boolean', default: true },
  //         },
  //         init: function () {
  //           const stopRotation = () => {
  //             this.data.enabled = false;
  //           };
  //           this.el.sceneEl.addEventListener('mousedown', stopRotation);
  //           this.el.sceneEl.addEventListener('touchstart', stopRotation);
  //         },
  //         tick: function (time, delta) {
  //           if (!this.data.enabled) return;
  //           const rotation = this.el.getAttribute('rotation');
  //           const newRotationY = rotation.y + (this.data.speed * (delta / 1000));
  //           this.el.setAttribute('rotation', {
  //             x: rotation.x,
  //             y: newRotationY,
  //             z: rotation.z
  //           });
  //         }
  //       });
  //     }

  //   };

  //   if (!isMobile) { sceneEl.addEventListener('loaded', handleSceneLoaded); }

  //   return () => {
  //     if (!isMobile) { sceneEl.addEventListener('loaded', handleSceneLoaded); }
  //   };
  // }, []);

  useEffect(() => {
    if (aframeReady && imageData.length > 0 && !currentImage) {
      setCurrentImage(imageData[0]);
      setIsLoadingImage(false);
    }
  }, [aframeReady, imageData, currentImage, setCurrentImage, setIsLoadingImage]);


  return (
    <div className='tsv-main'>
      {isLoadingImage && <PreLoader />}
      {/*      
        // <Scene ref={sceneRef} vr-mode-ui="enabled: true">

        //   <a-assets timeout="30000">
        //     {imageData.map((data) => (
        //       <img key={data.id} id={`img-${data.id}`} src={data.image} alt={data.name} crossOrigin="anonymous" />
        //     ))}
        //   </a-assets>
        //   {aframeReady && currentImage && (
        //     <a-sky src={`#img-${currentImage.id}`}></a-sky>
        //   )}

        //   <Entity auto-rotate-camera="speed: -4">
        //     <a-camera></a-camera>
        //   </Entity>
        // </Scene> */}
      <Scene ref={sceneRef}>
        {/* <a-assets timeout="30000">
          {imageData.map((data) => (
            <img key={data.id} id={`img-${data.id}`} src={data.image} alt={data.name} crossOrigin="anonymous" />
          ))}
        </a-assets> */}
        {currentImage && <a-sky src={currentImage.image}></a-sky>}
        <a-camera user-was-moved="true"></a-camera>
      </Scene>


    </div>
  );
};

export default Viewer;