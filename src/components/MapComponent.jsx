'use client';

import dynamic from 'next/dynamic';

const DynamicMap = dynamic(
  () => import('./DynamicMap'),
  { ssr: false }
);

const MapComponent = ({ lampadaires, route }) => {
  return <DynamicMap lampadaires={lampadaires} route={route} />;
};

export default MapComponent;