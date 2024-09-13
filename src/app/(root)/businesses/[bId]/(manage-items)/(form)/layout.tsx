import { getStoreById } from '@/lib/services/store.service';
import React from 'react';

const layout = async ({
  params,
  children
}: {
  params: {
    bId: string;
  };
  children: React.ReactNode;
}) => {
  await getStoreById(params.bId);
  return (
    <>{children}</>
  );
};

export default layout;