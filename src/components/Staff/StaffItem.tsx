import { Button } from "@/components/FormComponents";
import DeleteStaff from "@/components/Staff/DeleteStaff";
import UpdateStaff from "@/components/Staff/UpdateStaff";
import { useModal } from "@/store/useModal.store";
import { Mail, PenBox, Phone, Trash2, UserCircle } from "lucide-react";
import React from "react";
interface Prop {
  staff: Staff;
}
const StaffItem: React.FC<Prop> = ({ staff }) => {
  const roleMap: Record<number, StaffRole> = {
    1: "user",
    2: "vendor",
    3: "editor",
    4: "staff",
  };

  const { openModal } = useModal();
  const handleEdit = () => {
    openModal(<UpdateStaff staff={staff} />);
  };
  const handleDelete = () => {
    openModal(<DeleteStaff staff={staff} />);
  };
  return (
    <div className="bg-brand-100 cursor-pointer text-[12px] md:text-[16px] p-2 rounded-lg border border-gray-200 flex flex-row justify-between items-start gap-4">
      <div className="flex items-center justify-center w-12 h-12 p-2 rounded-full bg-brand-200">
        <UserCircle className="w-full h-full text-quick-action-icon" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-gray-800">{staff.fullname}</h3>
        </div>
        <div className="flex items-end justify-between">
          <div className="text-sm">
            <div className="flex items-center gap-1 capitalize">
              <div className="flex items-center gap-1">Role:</div>
              <span>{roleMap[staff.user_type]}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1">
                <Phone size={15} />
              </div>
              <span>{staff.phone_num}</span>
            </div>

            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1">
                <Mail size={15} />
              </div>
              <span>{staff.email}</span>
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
    </div>
  );
};

export default StaffItem;
