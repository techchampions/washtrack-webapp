import React, {useEffect, useState } from 'react';
import {  Edit2, Trash2, } from 'lucide-react';
import landingBannerImage from "@/assets/images/landing-banner-image.png";
import { FormField } from '../forms/FormField';
import { Form, Formik } from 'formik';
import { Button } from '../common/Button';
import * as Yup from "yup";
import { FaEdit } from "react-icons/fa";


const ServicesList = ({handleEdit, handleDelete, name, price, estimated_hours, index, id}) => {

  return (
    <div className="relative mt-3">
     

      <div className="grid grid-cols-4 bg-[#EBF7FC] border-none rounder-lg gap-4 items-center py-2 px-2 border-b border-gray-100">
        <div className="text-[#232323]">{name}</div>
        <div className="text-[#232323]"> ₦{price?.toLocaleString()} </div>
        <div className="text-[#232323]"> {estimated_hours} hours </div>
        <div className="flex space-x-3 justify-end items-center  w-18 border-none">
          <button className="text-brand hover:text-brand-dark"
                     onClick={() => handleEdit(index)}
          >
            <FaEdit
           className="text-blue-500 w-6 h-6  hover:text-blue-700 cursor-pointer"
                                             />
          </button>
          <button className="text-red-500 hover:text-red-700"
          onClick={() => handleDelete(id) } >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

const AddServicesSetup = ({handleSubmit, services, editIndex, showForm, toggleFormDisplay, setEditIndex, handleEdit, handleDelete}) => {
  

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Service name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required"),
    estimated_hours: Yup.number()
      .typeError("Estimated hours must be a number")
      .required("Estimated hours are required"),
  });



  return (
    <div
      className="min-h-screen min-w-screen md:min-h-0 overflow-hidden flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${landingBannerImage})` }}
    >
      <div className="bg-white  relative  rounded-3xl overflow-hidden  shadow-lg p-8 max-w-md md:max-w-lg  w-[90%] text-center">
        <h2 className="text-[#00BCFF] text-3xl font-bold">Add your services</h2>
        <p className="text-gray-500 mt-2 text-sm">
          Add the services you render below to complete your store setup
        </p>

        <button
          onClick={toggleFormDisplay}
          className="mt-6 w-full rounded-full bg-[#00BCFF] py-3 text-white font-medium hover:bg-[#00A8E4] transition"
        >
          Add a service
        </button>

        <div className=" min-h-[35vh]">

          {services.length > 0  && (
            <>
              <div className="grid grid-cols-4 mt-8  bg-[#F8F8F8] py-2 rounded-xl  gap-4 text-sm font-bold tex-lg mb-4 px-2">
                <div className='text-lg text-[#232323] '>Services</div>
                <div className='text-lg text-[#232323] '>Price</div>
                <div className='text-lg text-[#232323] '>Est. Hours</div>
                <div className='text-lg text-[#232323] '>Actions</div>
              </div>

              {services.map((service, index) => (
                <ServicesList 
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  index={index}
                  name={service.name}
                  price={service.price}
                  estimated_hours={service.estimated_hours}
                  id={service.id}
                />

              ))

              }
            </>

          )}


        </div>

        {/* Info */}
        <p className="text-gray-400 mt-6 text-xs">
          Click the “Add a service” button to add the type of services you render in your laundry store
        </p>


        <button
          disabled={services.length === 0}
          onClick={() => console.log('next step')}
          className={`${services.length === 0 ? " bg-[#00BCFF]/30  cursor-not-allowed" : "bg-brand cursor-pointer"} mt-4 w-full rounded-full py-3 text-white font-medium`}>
          Next
        </button>

        {showForm && (
          <div className="absolute inset-0 bg-black/40"></div>
        )}

      { showForm && (
        <div className={`bg-white z-10 ${showForm ? 'block' : 'hidden'}  absolute inset-0  rounded-tl-4xl rounded-tr-4xl  top-50 max-w-md md:max-w-lg  w-[100%] h-[70%]`}>

          <div className='flex-1 flex-col'>

            <h3 className='text-[#3F3F3F] px-5 py-4 font-bold text-3xl  text-left  leading-tight'>Add new services </h3> 

            <div>
              <Formik
                initialValues={
                editIndex !== null
                  ? services[editIndex]
                  : { name: "", price: "", estimated_hours: "" }
              }
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
                >
                {
                  () => (
                    <Form className="space-y-6  h-[100vh]">
                      <div className="space-y-5 px-4  w-100  mb-2">
                        <FormField
                          name="name"
                          type="text"
                          style={{boxShadow: 'none'}}
                          placeholder="Service name e.g iron" 
                          inputClassName="text-[#090A0A] shadow-none placeholder:text-gray-400  bg-white border border-gray-300  text-lg placeholder:text-lg  font-medium  rounded-lg block w-full px-2.5   outline-none resize-none"
                        />
                        <FormField
                          type='number'
                          name='price'
                          placeholder='Enter price'
                          style={{boxShadow: 'none'}}
                          inputClassName="text-[#090A0A] shadow-none placeholder:text-gray-400   bg-white border border-gray-300  text-lg  placeholder:text-lg  rounded-lg block w-full px-2.5   outline-none resize-none" />
                        <FormField
                          type='text'
                          name='estimated_hours'
                          placeholder='Estimated hours'
                          style={{boxShadow: 'none'}}
                          inputClassName=" bg-white border text-[#090A0A] shadow-none placeholder:text-gray-400   border-gray-300  text-lg  placeholder:text-lg  rounded-lg block w-full px-2.5   outline-none resize-none"                      />
                      </div>

                      <div className=' px-7 pb-3 flex flex-col  h-[200px] justify-center  items-center'>
                        <Button
                          style={{ "borderRadius": "40px" }}
                          type="submit"
                          className="w-full p-0 m-0"
                          size="lg" >
                          
                            {`${ editIndex !== null ? "Update service" : "Add service"}`}
                        </Button>
                      </div>
                    </Form>
                  )
                } 
              </Formik> 
            </div>
        
          </div>
    
        </div>
        )}
      </div>
    </div>
  );
};



export default AddServicesSetup;
