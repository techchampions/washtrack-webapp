import BranchItem from "@/components/Branches/BranchItem";
import CreateBranch from "@/components/Branches/CreateBranch";
import { Header, RightSideBar } from "@/components/DashboardComponents";
import ItemSkeleton from "@/components/DashboardComponents/LoadingComponents/ItemSkeleton";
import { Button } from "@/components/FormComponents";
import { useGetAllBranches } from "@/hooks/query/useBranch";
import { useAuthStore } from "@/store/auth.store";
import { useModal } from "@/store/useModal.store";
import React from "react";

const Branches = () => {
  // Sample branches data
  const { user } = useAuthStore();
  const {
    data: branchesResponse,
    isLoading,
    isError,
  } = useGetAllBranches(user?.store_id);
  const branches = branchesResponse?.data || [];
  const { openModal } = useModal();
  const handleAddBranch = () => {
    openModal(<CreateBranch />);
  };
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full lg:w-2/3">
          <div className="">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Branches</h2>
              <Button
                onClick={handleAddBranch}
                label="Add New Branch"
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
                {branches.map((branch, i) => (
                  <BranchItem key={i} branch={branch} />
                ))}
              </div>
            )}

            {/* Empty State (optional) */}
            {branches.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No branches found. Click "Add Branch" to create one.
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

export default Branches;
