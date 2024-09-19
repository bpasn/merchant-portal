import AuthSessionProvider from '@/lib/providers/auth-session';
import ProgressProvider from '@/lib/providers/progress-provider';
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
      <ProgressProvider />
    </LayoutModule>
  );
};

export default RootLayout;