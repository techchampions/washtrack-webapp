import React from "react";

// const Badge = () => {
//   return (
//     <span className="bg-white p-2 flex justify-center items-center rounded-full h-1 w-1 text-[10px] text-red-700">
//       4
//     </span>
//   );
// };

const Badge = ({ count = 0 }: { count?: number }) => (
  <span className="bg-white px-2 py-1 rounded-full text-xs text-red-700">
    {count}
  </span>
);
export default Badge;
