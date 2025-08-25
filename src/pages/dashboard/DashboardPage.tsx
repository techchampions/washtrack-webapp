import React, { useEffect } from 'react';
import {useUserProfile } from "@/hooks/auth/useUserProfile";
import { useAuthStore } from '@/store/auth.store';

const Dashboard = () => {
    const { data } = useUserProfile();
    const {setUser} = useAuthStore();
    
    useEffect(() => {
       if (data?.data.success) {
         console.log("Profile loaded:", data?.data.user);
         setUser(data.data.user);
       }
     }, [data?.data?.user]);

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Add your dashboard components here */}
    </div>
  );
}

export default Dashboard;