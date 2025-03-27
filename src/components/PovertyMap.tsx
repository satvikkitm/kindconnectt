import React, { useEffect, useRef } from 'react';
import * as atlas from 'azure-maps-control';

const PovertyMap = () => {
  const mapRef = useRef<atlas.Map | null>(null);

  useEffect(() => {
    const map = new atlas.Map('mapContainer', {
      center: [78.9629, 20.5937], // Center of India
      zoom: 5,
      style: 'satellite_road_labels', // Modern hybrid look
      view: 'Auto',
      authOptions: {
        authType: atlas.AuthenticationType.subscriptionKey,
        subscriptionKey: 'CCfKqgFQrISgrT5xKarI5anBEfk8ABhxryqGzYeZllq7DQxoyKROJQQJ99BCACYeBjFIAPbaAAAgAZMPaYX6',
      },
    });

    map.events.add('ready', () => {
      mapRef.current = map;

      // ✅ Restrict the map to India's boundaries
      const indiaBounds = new atlas.data.BoundingBox(
        [68.7, 7.9],  // Southwest corner
        [97.25, 35.5] // Northeast corner
      );

      map.setCamera({
        bounds: indiaBounds,
        padding: 20
      });

      // ✅ Hide default UI controls
      map.controls.remove(map.controls.getControls());

      // 🔥 Heatmap Data - Poverty Levels (Dummy Data for Now)
      const povertyData = [
        { coordinates: [77.1025, 28.7041], intensity: 5 }, // Delhi
        { coordinates: [88.3639, 22.5726], intensity: 7 }, // Kolkata
        { coordinates: [78.4867, 17.3850], intensity: 6 }, // Hyderabad
        { coordinates: [72.8777, 19.0760], intensity: 8 }, // Mumbai
        { coordinates: [80.2707, 13.0827], intensity: 4 }, // Chennai
      ];

      // ✅ Heatmap Source
      const heatmapSource = new atlas.source.DataSource();
      map.sources.add(heatmapSource);

      // Add Heatmap Layer
      const heatmapLayer = new atlas.layer.HeatMapLayer(heatmapSource, undefined, {
        radius: 30, // Controls how large each point is
        intensity: ['get', 'intensity'],
        opacity: 0.8,
        color: [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(0, 255, 0, 0)',
          0.2, 'yellow',
          0.4, 'orange',
          0.6, 'red',
          1, 'darkred'
        ]
      });

      map.layers.add(heatmapLayer);
      heatmapSource.add(povertyData.map(p => new atlas.data.Feature(new atlas.data.Point(p.coordinates), { intensity: p.intensity })));

      // 📍 Add Red Location Pins
      povertyData.forEach((data) => {
        const marker = new atlas.HtmlMarker({
          position: data.coordinates,
          color: 'red'
        });
        map.markers.add(marker);
      });

    });

    return () => map.dispose();
  }, []);

  return <div id="mapContainer" className="w-full h-[500px] rounded-lg shadow-lg overflow-hidden" />;
};

export default PovertyMap;
