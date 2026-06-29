import DeleteBranch from "@/components/Branches/DeleteBranch";
import UpdateBranch from "@/components/Branches/UpdateBranch";
import { Button } from "@/components/FormComponents";
import { useModal } from "@/store/useModal.store";
import { Building2, MapPin, PenBox, Trash2 } from "lucide-react";
import React from "react";
interface Prop {
  branch: Branch;
}
const BranchItem: React.FC<Prop> = ({ branch }) => {
  const { openModal } = useModal();
  const handleEdit = () => {
    openModal(<UpdateBranch branch={branch} />);
  };
  const handleDelete = () => {
    openModal(<DeleteBranch branch={branch} />);
  };
  return (
    <div className="bg-brand-100 cursor-pointer text-[12px] md:text-[16px] p-2 rounded-lg border border-gray-200 flex flex-row justify-between items-start gap-4">
      <div className="flex items-center justify-center w-12 h-12 p-2 rounded-full bg-brand-200">
        <Building2 className="w-full h-full text-quick-action-icon" />
      </div>
      <div className="flex-1 flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-gray-800">
              {branch.store_name}
            </h3>
          </div>
          <div className="text-sm text-left">
            <div className="flex items-start gap-1">
              <div className="flex items-center gap-1">
                <MapPin size={15} />
              </div>
              <span>{`${branch.store_location} ${branch.state}, ${branch.country}`}</span>
            </div>
            {/* <div className="flex items-center gap-1">
              <div className="flex items-center gap-1">
                <Phone size={15} />
              </div>
              <span>{branch.phone}</span>
            </div> */}
          </div>
        </div>

        <div className="text-xs flex flex-col sm:flex-row">
          <Button
            label="Edit"
            onClick={handleEdit}
            icon={<PenBox size={12} />}
            className=" py-1! bg-transparent hover:bg-blue-100 text-blue-700! w-fit! px-2"
          />
          <Button
            label="Delete"
            onClick={handleDelete}
            icon={<Trash2 size={12} />}
            className="py-1! bg-transparent hover:bg-red-100 text-red-500! w-fit! px-2"
          />
        </div>
      </div>
    </div>
  );
};

export default BranchItem;
