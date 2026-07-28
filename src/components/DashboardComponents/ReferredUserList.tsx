import ReferredUser from "@/components/DashboardComponents/ReferredUser";
import { Info } from "lucide-react";
import React from "react";
interface Prop {
  referredUsers: ReferredUser[];
}
const ReferredUserList: React.FC<Prop> = ({ referredUsers }) => {
  return (
    <div className="">
      {referredUsers.length < 1 ? (
        <div className="bg-brand p-4 flex items-center gap-2 text-white">
          <Info />
          <span>No referrals yet.</span>
        </div>
      ) : (
        <div className="space-y-3 text-left">
          <div className="grid grid-cols-10 font-bold text-gray-500">
            <div className=""></div>
            <div className="col-span-3">Name</div>
            <div className="col-span-3">Contact</div>
            <div className="col-span-3">Date joined</div>
          </div>

          <div className="space-y-1">
            {referredUsers.map((user) => (
              <ReferredUser key={user.id} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferredUserList;
