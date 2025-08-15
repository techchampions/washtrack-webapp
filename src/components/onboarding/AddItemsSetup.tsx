import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddItemsSetup = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-cyan-400 mb-2">Add your Item types</h2>
                    <p className="text-gray-600 text-sm">
                        Add in the items you deal with below to complete<br />your store setup
                    </p>
                </div>

                <button
                    className="w-full bg-cyan-400 text-white font-semibold py-4 rounded-2xl mb-8 hover:bg-cyan-500 transition-colors"
                >
                    Add a service
                </button>

                <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                        <div>
                            <h3 className="font-semibold text-gray-800">Suits</h3>
                            <p className="text-sm text-gray-600">Wash, Iron</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                        <div>
                            <h3 className="font-semibold text-gray-800">Shirts</h3>
                            <p className="text-sm text-gray-600">Wash, Iron</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                </div>

                <button
                    onClick={() => navigate('congratulations')}
                    className="w-full bg-cyan-400 text-white font-semibold py-4 rounded-2xl hover:bg-cyan-500 transition-colors"
                >
                    Next
                </button>
            </div>
        </div>
    );
}



export default AddItemsSetup;