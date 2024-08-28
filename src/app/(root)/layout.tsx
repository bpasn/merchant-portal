import LayoutModule from '@/modules/layouts';
import axios from 'axios';
import React from 'react';
const RootLayout = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <LayoutModule>
      {children}
    </LayoutModule>
  );
};

export default RootLayout;