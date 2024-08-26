'use client';
import Combobox from '../common/combobox';
import HeadingModule from '../common/heading-module';
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