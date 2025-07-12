import React, { useRef, useEffect, useContext } from 'react';
import 'aframe';
import { Scene, Entity } from 'aframe-react';
import { AppContext } from '../context/AppContext';
import PreLoader from './PreLoader';

const Viewer = () => {
  const { currentImage, sceneRef, isLoadingImage } = useContext(AppContext);

  useEffect(() => {
    // Register custom component only once
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
  }, []); // Empty dependency to ensure it runs only once on mount

  return (
    <div className='tsv-main'>
      {isLoadingImage && <PreLoader />}
      <Scene ref={sceneRef}>
        {/* The 360-degree background image */}
        {currentImage && <a-sky src={currentImage.image}></a-sky>}
        <Entity auto-rotate-camera="speed: -4">
          <a-camera></a-camera>
        </Entity>
      </Scene>
    </div>
  );
};

export default Viewer;
