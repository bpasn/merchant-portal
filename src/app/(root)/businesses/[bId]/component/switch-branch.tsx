import { getAllStore } from '@/lib/services/store.service';
import Combobox from '@/modules/common/combobox';
import { redirect } from 'next/navigation';

const SwitchBranch = async () => {
    const data = await getAllStore();
    if (!data.length) {
        redirect('/businesses/menu');
    }
    return (
        <>
            <Combobox
                items={data.map(e => ({ label: e.storeName, value: e.id }))}
                size={300}
            />
        </>
    );
};

export default SwitchBranch;