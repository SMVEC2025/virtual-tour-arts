import React, { useRef, useEffect, useContext, useState } from 'react';
import 'aframe';
import { Scene, Entity } from 'aframe-react';
import { AppContext } from '../context/AppContext';
import PreLoader from './PreLoader';

const MobileViewer = () => {
  const { currentImage, sceneRef, setIsLoadingImage, imageData, handleSelectImage } = useContext(AppContext);

  useEffect(() => {
    try {
      handleSelectImage(imageData[0]);
    } catch (error) {
      setTimeout(() => {
        setIsLoadingImage(false);
      }, 500);
    }
  }, []);

  return (
    <div className='tsv-main'>      
      <Scene ref={sceneRef}>
        {currentImage && <a-sky src={currentImage.image}></a-sky>}
        <a-camera user-was-moved="true"></a-camera>
      </Scene>


    </div>
  );
};

export default MobileViewer;