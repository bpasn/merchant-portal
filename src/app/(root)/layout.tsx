import LayoutModule from '@/modules/layouts';
import React from 'react';
const RootLayout = ({
  children
}:{
  children:React.ReactNode;
}) => {
  return (
    <LayoutModule>
      {children}
    </LayoutModule>
  );
};

export default RootLayout;