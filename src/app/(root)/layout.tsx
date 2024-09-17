import AuthSessionProvider from '@/lib/providers/auth-session';
import LayoutModule from '@/modules/layouts';
import React from 'react';
const RootLayout = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <LayoutModule>
      {children}
      <AuthSessionProvider />
    </LayoutModule>
  );
};

export default RootLayout;