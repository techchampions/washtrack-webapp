import React from 'react'
import { useOnboardingStore } from '../../store/AppStore'

const SignupComplete = () => {
    const {setStep} = useOnboardingStore()
  return (
    <div className='w-full flex flex-col justify-center'>
        <div className="w-[160px] h-[170px] mx-auto">
            <img src="./images/1171275266.png" className='w-full h-full' alt="" />
        </div>
        <div className="text-center mt-[20px] flex flex-col justify-center">
            <div className="text-[24px] text-brand">
                Hi Business Name !
            </div>
            <h2 className="text-[28px] font-bold text-black">Welcome to WashTrack</h2>
            <p className='max-w-[320px] text-black text-center mx-auto'>Would you like to continue with your store, setup to get started</p>
        </div>
        <button className="rounded-full w-full overflow-hidden gap-2 mt-8 bg-brand p-2 text-center" onClick={()=> setStep("setup store")}>
            Continue Setup
        </button>

    </div>
  )
}

export default SignupComplete