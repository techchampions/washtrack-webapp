import { Header, RightSideBar } from "@/components/DashboardComponents";
import ItemSkeleton from "@/components/DashboardComponents/LoadingComponents/ItemSkeleton";
import { Button } from "@/components/FormComponents";
import CreateStaff from "@/components/Staff/CreateStaff";
import StaffItem from "@/components/Staff/StaffItem";
import { useGetAllStaff } from "@/hooks/query/useBranch";
import { useModal } from "@/store/useModal.store";
import React from "react";

const Staffs = () => {
  // Sample branches data
  const { data, isLoading, isError } = useGetAllStaff();
  const staffs = data?.data || [];
  const { openModal } = useModal();
  const handleCreate = () => {
    openModal(<CreateStaff />);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full lg:w-2/3">
          <div className="">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Staffs</h2>
              <Button
                label="Add New Staff"
                onClick={handleCreate}
                className="w-fit! px-10"
              />
            </div>

            {/* Branches List */}
            {isLoading || isError ? (
              <div className="space-y-2">
                <ItemSkeleton />
                <ItemSkeleton />
                <ItemSkeleton />
                <ItemSkeleton />
              </div>
            ) : (
              <div className="space-y-1.5">
                {staffs.map((staff, i) => (
                  <StaffItem key={i} staff={staff} />
                ))}
              </div>
            )}

            {/* Empty State (optional) */}
            {staffs.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-500">
                  No Staff found. Click "Add Staff" to create one.
                </p>
              </div>
            )}
          </div>
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default Staffs;
