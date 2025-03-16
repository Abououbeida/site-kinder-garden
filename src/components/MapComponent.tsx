
import React from 'react';

interface MapComponentProps {
  location: {
    lat: number;
    lng: number;
  };
}

const MapComponent = ({ location }: MapComponentProps) => {
  // Normallement, vous utiliseriez une clé API Google Maps
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${location.lat},${location.lng}&zoom=15`;
  
  return (
    <iframe
      src={mapUrl}
      width="100%"
      height="100%"
      frameBorder="0"
      style={{ border: 0 }}
      allowFullScreen
      aria-hidden="false"
      tabIndex={0}
      title="Google Maps"
    />
  );
};

export default MapComponent;
