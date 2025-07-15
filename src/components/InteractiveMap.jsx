import React, { use, useContext, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { IoResizeSharp } from "react-icons/io5";
import { CgCompressRight } from "react-icons/cg";

// Import marker images for Vite/ESM compatibility
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { AppContext } from '../context/AppContext';

// Fix for default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetinaUrl,
    iconUrl: iconUrl,
    shadowUrl: shadowUrl,
});



const InteractiveMap = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [isLarge, setIsLarge] = useState(false);
    const { imageData, handleSelectImage } = useContext(AppContext)


    const markers = imageData?.filter((e) => e.position)

    const handleClick = (marker) => {
        handleSelectImage(marker);

    };

    return (
        <div className={`imap-main ${isLarge ? "large" : ""}`}>
            {isLarge ? (

                <div className='enlarge-btn' onClick={() => setIsLarge(false)}>
                    <i><CgCompressRight /></i>
                </div>
            ) : (
                <div className='enlarge-btn' onClick={() => setIsLarge(true)}>
                    <i><IoResizeSharp /></i>
                </div>
            )}
            <div className='imap-container'>
                <MapContainer center={[11.9143839, 79.635082]} zoom={20} style={{ height: '100%', width: '100%' }}>
                    {/* --- UPDATED: TileLayer now uses state --- */}
                    <TileLayer
                        key='satelite' // Important: forces re-render on style change
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={marker.position}
                            eventHandlers={{
                                click: () => handleClick(marker),
                                mouseover: (e) => {
                                    e.target.openPopup();
                                },
                                mouseout: (e) => {
                                    e.target.closePopup();
                                }
                            }}
                        >
                            <Popup>{marker.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>


            </div>
        </div>
    );
};

export default InteractiveMap;