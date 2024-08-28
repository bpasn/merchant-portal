import React, { Suspense } from 'react';
import LoadingRoot from './loading';

type Props = {};

const layout = async ({
  children
}: {
  children: React.ReactNode;
}) => {
 
  return (
    <div>
      <Suspense fallback={<LoadingRoot/>}>
        {children}
      </Suspense>
    </div>
  );
};

export default layout;