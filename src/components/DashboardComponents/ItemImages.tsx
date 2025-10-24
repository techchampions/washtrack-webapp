import { Button } from "@/components/FormComponents";
import { useModal } from "@/store/useModal.store";
import { AlertCircle } from "lucide-react";
import React from "react";
interface Props {
  item_photos: string;
}
const ItemImages: React.FC<Props> = ({ item_photos }) => {
  const photos = JSON.parse(item_photos);
  const modal = useModal();
  return (
    <div className=" max-w-md">
      <div className=" text-left font-bold text-2xl pb-5">Item Photos</div>
      {photos.length > 0 ? (
        <div className="grid grid-cols-3 gap-2">
          {photos.map((img: string) => (
            <img src={img} alt="" className="max-h-[150px]" />
          ))}
        </div>
      ) : (
        <div className="bg-brand-200 flex items-center gap-2 p-2 rounded-lg text-gray-500">
          <AlertCircle />
          <div className="">This Item has no photos</div>
        </div>
      )}
      <div className="flex justify-end pt-5">
        <Button
          label="Close"
          onClick={modal.closeModal}
          className="!w-fit px-6 bg-gray-700 hover:bg-gray-900 rounded-xl text-sm"
        />
      </div>
    </div>
  );
};

export default ItemImages;
