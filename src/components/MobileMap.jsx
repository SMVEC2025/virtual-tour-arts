import React, { use, useContext, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

function MobileMap() {
    const { imageData, handleSelectImage } = useContext(AppContext)
    const markers = imageData?.filter((e) => e.position)

    const handleClick = (marker) => {
        handleSelectImage(marker);

    };

    return (
        <MapContainer center={[11.9144641,79.6348306]} zoom={20} style={{ height: 'calc(60vh - 60px)', width: '100%' }}>
            {/* --- UPDATED: TileLayer now uses state --- */}
           <TileLayer
        key="satellite"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a> & contributors'
      />
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    position={marker.position}
                    eventHandlers={{
                        click: () => handleClick(marker),
                    }}
                >
                    <Popup>{marker.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default MobileMap
