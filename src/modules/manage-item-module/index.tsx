'use client';
import React from 'react'
import HeadingModule from '../common/heading-module';
import Combobox from '../common/combobox';
import ManageItemTemplate from './template/manage-item-template';
import TabsItem from './component/tabs-item';

type Props = {}

const ManageItemModule = (props: Props) => {
  return (
    <div className='flex flex-col'>
      <HeadingModule
        title="Manage items"
      />

      <div className='mb-5'>
        <Combobox size={300} />
      </div>
      <TabsItem/>
      <div className="mb-10"></div>
    </div>
  )
}

export default ManageItemModule