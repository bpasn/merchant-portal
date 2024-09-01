'use client';

import { useEffect } from 'react';
import useBranchContext from '@/lib/context/branch-context';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/utils/axios-config';

const BusinessesPage = () => {
  const branchContext = useBranchContext();
  const router = useRouter();

  useEffect(() => {
    const handle = async () => {
      try {
        if(branchContext.id !== null){
          router.push(`/businesses/${branchContext.id}/menu`)
        }
        const response = await axiosInstance.get<{ payload: IBranch[] }>(`/api/store`);
        if (response.status === 200 && response.data) {
          const branches = response.data.payload;
          if (branches.length > 0) {
            if (branchContext.id === null) {
              branchContext.setId(branches[0].id);
              // ใช้ useRouter สำหรับการรีไดเร็กต์
              router.push(`/businesses/${branches[0].id}/menu`);
            } else {
              router.push(`/businesses/${branchContext.id}/menu`);
            }
          } else {
            console.error('No branches found');
          }
        } else {
          console.error('Failed to fetch branch data');
        }
      } catch (error) {
        console.error('Error fetching branch data:', error);
      }
    };

    handle();
  }, [branchContext, router]);

  return null;
};

export default BusinessesPage;
