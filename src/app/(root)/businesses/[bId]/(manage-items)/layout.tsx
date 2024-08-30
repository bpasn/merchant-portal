import { Tabs } from "@/components/ui/tabs";
import TabComponent from "@/modules/businesses/manage-item-module/component/tab-component";
import Combobox from "@/modules/common/combobox";
import HeadingModule from "@/modules/common/heading-module";
import axios from "axios";

const ManageItemLayout = async ({
    params,
    children
}: {
    params: { bId: string; };
    children: React.ReactNode;
}) => {
    const itemTabs = [
        {
            label: "Item menu",
            href: `/businesses/${params.bId}/menu`
        },
        {
            label: "Item option",
            href: `/businesses/${params.bId}/menu-option`
        },
        {
            label: "Item group",
            href: `/businesses/${params.bId}/menu-group`
        },
    ];
    const branch = await axios.get<{ payload: IBranch[]; }>("http://localhost:3000/api/store");
    return (
        <div className='flex flex-col'>
            <HeadingModule
                title="Manage items"
            />
            <div className='mb-5'>
                <Combobox items={branch.data.payload.map(e => ({ label: e.name, value: e.id }))} size={300}  />
            </div>
            <Tabs defaultValue={`/businesses/${params.bId}/menu`} className="w-full">
                <TabComponent
                    items={itemTabs}
                />
                {children}
            </Tabs>
            <div className="mb-10"></div>
        </div>
    );
};

export default ManageItemLayout;