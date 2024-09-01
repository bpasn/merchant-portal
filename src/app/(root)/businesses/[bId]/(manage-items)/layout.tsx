import { Tabs } from "@/components/ui/tabs";
import TabComponent from "@/modules/businesses/manage-item-module/component/tab-component";
import HeadingModule from "@/modules/common/heading-module";
import SwitchBranch from "./component/switch-branch";
import axiosInstance from "@/lib/utils/axios-config";
import TabsClient from "./component/tabs-client";

const ManageItemLayout = async ({
    params,
    children
}: {
    params: { bId: string; };
    children: React.ReactNode;
}) => {
   
    const branch = await axiosInstance.get<{ payload: IBranch[]; }>(`${process.env.NEXT_PUBLIC_APP_URL}/api/store`);
    return (
        <div className='flex flex-col'>
            <HeadingModule
                title="Manage items"
            />
            <div className='mb-5'>
                <SwitchBranch branchs={branch.data.payload} />
            </div>
            <TabsClient>
                {children}
            </TabsClient>
            <div className="mb-10"></div>
        </div>
    );
};

export default ManageItemLayout;