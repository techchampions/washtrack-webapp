import { Button } from "@/components/FormComponents";
import { useDeleteStaff } from "@/hooks/mutations/useStaff";
import { useModal } from "@/store/useModal.store";
import React from "react";
interface Props {
  staff: Staff;
}
const DeleteStaff: React.FC<Props> = ({ staff }) => {
  const { mutate, isPending } = useDeleteStaff();
  const { closeModal } = useModal();
  const handleDelete = () => {
    mutate(staff.id, {
      onSuccess() {
        closeModal();
      },
    });
  };
  return (
    <div>
      <div className="text-left py-8">
        <div className="font-bold text-lg">
          Are you sure you want to delete this staff
        </div>
        <div className="text-gray-500">
          please note that this action is not reversible
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        <Button label="No, go back" onClick={closeModal} />
        <Button
          label="yes, Delete"
          className="bg-red-500"
          onClick={handleDelete}
          isLoading={isPending}
          disabled={isPending}
        />
      </div>
    </div>
  );
};

export default DeleteStaff;
