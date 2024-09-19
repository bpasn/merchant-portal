import { getAllStore } from '@/lib/services/store.service';
import Combobox from '@/modules/common/combobox';

const SwitchBranch = async () => {
    const data = await getAllStore();
    return (
        <Combobox
            items={data.map(e => ({ label: e.storeName, value: e.id }))}
            size={300}
        />
    );
};

export default SwitchBranch;