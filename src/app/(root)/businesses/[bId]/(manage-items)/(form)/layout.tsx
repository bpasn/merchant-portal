import React from 'react';
import { checkId } from '../action';

const layout = async ({
  params,
  children
}: {
  params: {
    bId: string;
  };
  children: React.ReactNode;
}) => {
  await checkId(params.bId);
  return (
    <>{children}</>
  );
};

export default layout;