import React, { useState, useRef } from 'react';
import { universities, states } from '../Constants/Universities'; 
import { useNavigate, useParams } from 'react-router-dom'; 
import Select from 'react-select';
import { ColorRing  } from 'react-loader-spinner'
import axios from 'axios';
import { MdAccountCircle } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Signedinmodal } from "../Modals/Forms"

const EmploymentForm = () => {
  const [signin, setSignin] = useState(false);
  const [selectedImages, setSelectedImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const productFormRef = useRef(null); // Added productFormRef

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  

  const openLoading = () => {
    setLoading(true);
  };

  const closeLoading = () => {
    setLoading(false);
  };
  
  const openSignin = () => {
    setSignin(true);
  };

  const closeSignin = () => {
    setSignin(false);
  };

  const CREATE_EMPLOYEE_API_KEY = 'https://campusbuy-backend-nkmx.onrender.com/createemployee';  
  const CREATE_AVATAR_API_KEY = 'https://campusbuy-backend-nkmx.onrender.com/uploadprofileimage';

  const moveForward = async (e) => {
    e.preventDefault();
  
    try {
      openLoading();
  
      const formData = new FormData(productFormRef.current);            
      const userData = {};
      formData.forEach((value, key) => {
        userData[key] = value;
      });
     
      const createEmployee = await axios.post(CREATE_EMPLOYEE_API_KEY, userData);
      if (createEmployee.status === 200) {
        console.log('Employee created successfully');
        console.log('Employee:', createEmployee.data);
        const employeeId = createEmployee.data._id;

        // Loop through each image in selectedImages and append to formData
        selectedImages.forEach((image) => {
          formData.append('images', image);
        });
  
        // Log the FormData object
        console.log("FormData:");
        for (const [key, value] of formData.entries()) {
          console.log(key, value);
        }
        const response = await axios.put(`${CREATE_AVATAR_API_KEY}/${employeeId}`, formData);
  
        console.log("Response:", response.data);
        openSignin()
        setTimeout(()=>{
          closeSignin()
        }, 3000)
      } else {
        console.log('Employee not created');
      }
    } catch (error) {
      if (error) {
        console.error('Error creating your product:', error);
      } 
    } finally {
      closeLoading();
    }
  };

  const handleAvatarChange = (e) => {
    const newSelectedImages = Array.from(e.target.files);
    setSelectedImages((prevImages) => [...(prevImages || []), ...newSelectedImages]);
  };
  
  
  const sexOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];
  const employmentOptions = [
    { value: 'student', label: 'Student' },
    { value: 'employed', label: 'Employed' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'others', label: 'Others' },
  ];
  const maritalOptions = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' },
    { value: 'other', label: 'Other' },
  ];
  const employmentTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'voluntary', label: 'Voluntary' },
    { value: 'contract', label: 'Contract' },
    { value: 'others', label: 'Others' },
  ];

  return (
    <div className='w-full'>
      <div className='max-lg:hidden p-4'>
        <form onSubmit={moveForward} ref={productFormRef}> {/* Added ref */}
          <div className='flex justify-between'>
            <div className=''>
              <div className="flex justify-center relative">
                <>
                  {selectedImages && selectedImages[0] ? (
                    <>
                      <img src={selectedImages[0]} alt="Avatar" width={20} height={15} className="w-[20%] h-[15%]" />
                    </>
                  ) : (
                    <>
                      <MdAccountCircle className="w-[20%] h-[15%]" />
                      <MdModeEdit
                        className="mb-2 mr-2 w-[20%] h-[20%]"
                        style={{ color: 'orange', zIndex: 500, position: 'absolute', bottom: '3%', right: '35%' }}
                      />
                    </>
                  )}
                </>
              </div>
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
            <div className=''>
              <div className="flex justify-center relative">
                <>
                  {selectedImages && selectedImages[0] ? (
                    <>
                      <img src={selectedImages[0]} alt="Avatar" width={20} height={15} className="w-[20%] h-[15%]" />
                    </>
                  ) : (
                    <div className='p-4 border-2'></div>
                  )}
                </>
              </div>
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          <div className='flex flex-col gap-4 m-2 p-2 border border-gray-400 rounded-[10px]  max-lg:m-0 max-lg:p-0'>
            <input type='text' placeholder='Firstname' required name='firstname' className='p-2 m-2  border border-gray-400'/>
            <input type='text' placeholder='Lastname' required name='lastname' className='p-2 m-2  border border-gray-400'/>
            <input type='text' placeholder='Email address' required name='email' className='p-2 m-2  border border-gray-400'/>
            <input type='text' placeholder='Main Phone Number' required name='mobile' className='p-2 m-2  border border-gray-400'/>
            <input type='text' placeholder='Second Phone Number' required name='mobile2' className='p-2 m-2  border border-gray-400'/>
            <input type='text' placeholder='position' required name='position' className='p-2 m-2  border border-gray-400'/>
            <div>
              <strong className='text-[10px] text-red-700'>No space in between:your role(promoter,manager,developer...) in small letters,year of birth and 2024</strong>
              <input type='text' required name='uniqueId' placeholder='ID' className='p-2 mx-2  mb-2  w-full inline-block border border-gray-400'/>
            </div>
            <input type='text' required name='accountName' placeholder='Account Name' className='p-2 m-2  w-full inline-block border border-gray-400'/>
            <input type='text' required name='accountNumber' placeholder='Account Number' className='p-2 m-2  w-full inline-block border border-gray-400'/>
            <input type='text' required name='bank' placeholder='Bank' className='p-2 m-2  w-full inline-block border border-gray-400'/>
            <input type='text' required name='address' placeholder='Address' className='p-2 m-2  w-full inline-block border border-gray-400'/>
            <div className='flex justify-between'>
              <div className="w-[100%]">
                <Select           
                  name='university' 
                  className="form-control p-2 m-2 border max-lg:m-0 max-lg:p-0 border-gray-400"
                  value={selectedOption}
                  onChange={handleChange}
                  options={universities.map((university) => ({
                    value: university.title,
                    label: university.title,
                  }))}
                  placeholder="Search for your School..."
                  isClearable
                />
              </div>
              <div className="w-[100%]">
                <Select
                  name='state'
                  className="form-control p-2 m-2 border max-lg:m-0 max-lg:p-0 border-gray-400"
                  options={states.map((state) => ({
                    value: state.title,
                    label: state.title,
                  }))}
                  required
                  placeholder="What state is your School"
                  isClearable
                />
              </div>
              <div className="input-group mb-3">
                <Select
                  name='sex' 
                  className="form-control p-2 m-2 border max-lg:m-0 max-lg:p-0 border-gray-400"
                  options={sexOptions}
                  placeholder='Select Gender'
                  isClearable
                />
              </div>
              <div className="input-group mb-3">
                <Select
                  name='employmentStatus' 
                  className="form-control p-2 m-2 border max-lg:m-0 max-lg:p-0 border-gray-400"
                  options={employmentOptions}
                  placeholder='Are you employed?'
                  isClearable
                />
              </div>
              <div className="input-group mb-3">
                <Select
                  name='maritalStatus' 
                  className="form-control p-2 m-2 border max-lg:m-0 max-lg:p-0 border-gray-400"
                  options={maritalOptions}
                  placeholder='Marital Status'
                  isClearable
                />
              </div>
              <div className="input-group mb-3">
                <Select
                  name='employmentType' 
                  className="form-control p-2 m-2 border max-lg:m-0 max-lg:p-0 border-gray-400"
                  options={employmentTypeOptions}
                  placeholder='Type of Employment'
                  isClearable
                />
              </div>
            </div>
            <div>
              <button className='p-2 m-2 btn-success border rounded-md  max-lg:m-0 max-lg:p-0'>Create</button>
            </div>
          </div>
        </form>
      </div>




      <div className='hidden max-lg:block w-[100%] py-4 px-1 m-2'>
        <form onSubmit={moveForward} ref={productFormRef}> {/* Added ref */}
          <div className=''>
            <div className=''>
              <div className="flex justify-center relative">
                <>
                  {selectedImages && selectedImages[0] ? (
                    <>
                      <img src={selectedImages[0]} alt="Avatar" width={20} height={15} className="w-[20%] h-[15%]" />
                    </>
                  ) : (
                    <>
                      <MdAccountCircle className="w-[20%] h-[15%]" />
                      <MdModeEdit
                        className="mb-2 mr-2 w-[20%] h-[20%]"
                        style={{ color: 'orange', zIndex: 500, position: 'absolute', bottom: '3%', right: '35%' }}
                      />
                    </>
                  )}
                </>
              </div>
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
            <strong className='text-red-700'>Please add your passport photograph</strong>
          </div>

          <div className='flex flex-col gap-4 m-2 p-2 border border-gray-400 rounded-[10px]  max-lg:m-0 max-lg:p-0'>
            <input type='text' placeholder='Firstname' required name='firstname' className='p-2 m-2  border border-gray-400'/>
            <input type='text' placeholder='Lastname' required name='lastname' className='p-2 m-2  border border-gray-400'/>
            <input type='text' placeholder='Email address' required name='email' className='p-2 m-2  border border-gray-400'/>
            <input type='text' placeholder='Main Phone Number' required name='mobile' className='p-2 m-2  border border-gray-400'/>
            <input type='text' placeholder='Second Phone Number' required name='mobile2' className='p-2 m-2  border border-gray-400'/>
            <input type='text' placeholder='position' required name='position' className='p-2 m-2  border border-gray-400'/>
            <div>
              <strong className='text-[10px] text-red-700'>No space in between:your role(promoter,manager,developer...) in small letters,year of birth and 2024</strong>
              <input type='text' required name='uniqueId' placeholder='ID' className='p-2 mx-2  mb-2  w-full inline-block border border-gray-400'/>
            </div>
            <input type='text' required name='accountName' placeholder='Account Name' className='p-2 m-2  w-full inline-block border border-gray-400'/>
            <input type='text' required name='accountNumber' placeholder='Account Number' className='p-2 m-2  w-full inline-block border border-gray-400'/>
            <input type='text' required name='bank' placeholder='Bank' className='p-2 m-2  w-full inline-block border border-gray-400'/>
            <input type='text' required name='address' placeholder='Address' className='p-2 m-2  w-full inline-block border border-gray-400'/>
            <div className='flex flex-col gap-4 '>
              <div className="w-[100%]">
                <Select           
                  name='university' 
                  className="form-control p-2 m-2 border max-lg:m-0 max-lg:p-0 border-gray-400"
                  value={selectedOption}
                  onChange={handleChange}
                  options={universities.map((university) => ({
                    value: university.title,
                    label: university.title,
                  }))}
                  placeholder="Search for your School..."
                  isClearable
                />
              </div>
              <div className="w-[100%]">
                <Select
                  name='state'
                  className="form-control p-2 m-2 border max-lg:m-0 max-lg:p-0 border-gray-400"
                  options={states.map((state) => ({
                    value: state.title,
                    label: state.title,
                  }))}
                  required
                  placeholder="What state is your School"
                  isClearable
                />
              </div>
              <div className="input-group mb-3">
                <Select
                  name='sex' 
                  className="form-control p-2 m-2 border max-lg:m-0 max-lg:p-0 border-gray-400"
                  options={sexOptions}
                  placeholder='Select Gender'
                  isClearable
                />
              </div>
              <div className="input-group mb-3">
                <Select
                  name='employmentStatus' 
                  className="form-control p-2 m-2 border max-lg:m-0 max-lg:p-0 border-gray-400"
                  options={employmentOptions}
                  placeholder='Are you employed?'
                  isClearable
                />
              </div>
              <div className="input-group mb-3">
                <Select
                  name='maritalStatus' 
                  className="form-control p-2 m-2 border max-lg:m-0 max-lg:p-0 border-gray-400"
                  options={maritalOptions}
                  placeholder='Marital Status'
                  isClearable
                />
              </div>
              <div className="input-group mb-3">
                <Select
                  name='employmentType' 
                  className="form-control p-2 m-2 border max-lg:m-0 max-lg:p-0 border-gray-400"
                  options={employmentTypeOptions}
                  placeholder='Type of Employment'
                  isClearable
                />
              </div>
            </div>
            <div>
             <div className=''>
              <div className="flex justify-center relative">
                <>
                  {selectedImages && selectedImages[0] ? (
                    <>
                      <img src={selectedImages[0]} alt="Avatar" width={20} height={15} className="w-[20%] h-[15%]" />
                    </>
                  ) : (
                    <div className=''></div>
                  )}
                </>
              </div>
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
             <strong className='text-red-700'>Please add your signature image</strong>
            </div>
            <div>
              <button className='p-2 m-2 btn-success border rounded-md  max-lg:m-0 max-lg:p-0'>Create</button>
            </div>
          </div>
        </form>
      </div>






      <div className='  border p-4'>{signin && <Signedinmodal/>}</div>
      <div  style={{position: "fixed", top: "50%", left:"50%"}}>
        {loading && <div className='loading-modal flex flex-col justify-center items-center'><ColorRing 
          visible={true}
          height="80"
          width="80"
          ariaLabel="loading..."
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
        <p style={{ color: 'white', marginTop: '10px' }}>Please wait...</p>
      </div>}
    </div>
  </div>  
  )
}

export default EmploymentForm;









// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { Createaccount, Login, Postproduct, Changeschool } from '../Modals/Guides';

// export const Useguide = () => {
//     const [selectedGuide, setSelectedGuide] = useState(null);

//     const openGuide = (selectedGuide) => {
//         setSelectedGuide(selectedGuide);
//     };

//     const closeGuide = () => {
//         setSelectedGuide(null);
//     };

//     // Render the selected guide based on the selectedGuide state
//     const renderSelectedGuide = () => {
//         switch (selectedGuide) {
//             case 'createaccount':
//                 return <Createaccount closeGuide={closeGuide} />;
//             case 'login':
//                 return <Login closeGuide={closeGuide} />;
//             case 'postproduct':
//                 return <Postproduct closeGuide={closeGuide} />;
//             case 'changeschool':
//                 return <Changeschool closeGuide={closeGuide} />;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div>
//             <div className="text-center flex flex-col gap-4 m-4  max-lg:m-2 max-lg:p-2">
//                 <h1 className='text-2xl'><strong>User Testing Guide</strong></h1>
//                 <div className="flex gap-4 justify-center items-center">
//                     <p>Click the link to start </p> <a className="text-blue-500 underline" href="https://campusify.net" target="_blank">https://campusify.net</a>
//                 </div>

//                 <div className="list-heading flex flex-col gap-4 justify-center items-center">
//                     <strong>Try any of these tasks below</strong>
//                     <div className="flex flex-col gap-3 w-[50%]">
//                         {/* List of steps with NavLink */}
//                         <NavLink onClick={() => { openGuide('createaccount') }}>Create account</NavLink>
//                         <NavLink onClick={() => { openGuide('login') }}>Login</NavLink>
//                         <NavLink onClick={() => { openGuide('postproduct') }}>Post a product</NavLink>
//                         <NavLink onClick={() => { openGuide('changeschool') }}>Change your school</NavLink>
//                     </div>
//                 </div>

//                 {/* Render the selected guide */}
//                 <div className='guidesvideos w-[40%] max-lg:hidden p-3 top-[35%] left-[50%]'>
//                     {renderSelectedGuide()}
//                 </div>
//                 <div className='guidesvideos hidden max-lg:block w-[100%] p-3 max-lg:top-[15%] left-[0]'>
//                     {renderSelectedGuide()}
//                 </div>
//             </div>
//         </div>
//     )
// }
