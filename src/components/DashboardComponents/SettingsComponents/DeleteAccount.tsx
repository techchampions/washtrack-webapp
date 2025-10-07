import { Button } from "@/components/FormComponents";
import React from "react";

const DeleteAccount = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Delete Account</h2>
      <p>Are you sure ?.</p>
      <div className="flex gap-4 items-center mt-5">
        <Button
          label="No, Cancel"
          className="bg-green-500 hover:bg-green-700 rounded-xl"
        />
        <Button
          label="Yes, Delete"
          className="bg-red-500 hover:bg-red-700 rounded-xl"
        />
      </div>
    </div>
  );
};

export default DeleteAccount;
