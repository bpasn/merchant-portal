import CreateOrUpdateFrom from '@/modules/manage-item-module/template/create-or-update-form';
import React from 'react';

interface CreateOrUpdatePageProps {
    params: {
        id: string;
    };
};

const CreateOrUpdatePage = ({ params }: CreateOrUpdatePageProps) => {
    console.log(params.id);
    return (
        <CreateOrUpdateFrom />
    );
};

export default CreateOrUpdatePage;