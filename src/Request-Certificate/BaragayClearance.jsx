import React, { useState, useEffect } from 'react';
import Logo from '../Images/Logo.png';
import BrgyClearance from '../Images/Certificate-Picture/Barangay Clearance.jpg'
import '../App.css';
import axios from 'axios';

import { MdOutlineContentCopy } from "react-icons/md";

function BarangayClearance() {
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [pickUp, setPickUp] = useState(false);
  const [pickUpDate, setPickupDate] = useState('');  // State for Pickup Date
  const [paymentMethod, setPaymentMethod] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [selectType, setSelectType] = useState('');
  const [trackingCode, setTrackingCode] = useState('');
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showCopyTrackingModal, setShowCopyTrackingModal] = useState(false);
  const [timer, setTimer] = useState(3);

  const handleImageClick = () => {
    setIsImageEnlarged(!isImageEnlarged);
  };

  useEffect(() => {
    const fetchTrackingCode = () => {
      const generatedCode = generateTrackingCode();
      setTrackingCode(generatedCode);
    };

    fetchTrackingCode();
  }, []);

  useEffect(() => {
    let countdown;
    if ((showCopyTrackingModal || showSubmitModal) && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowCopyTrackingModal(false);
      setShowSubmitModal(false);
      setTimer(3);
    }
    return () => clearInterval(countdown);
  }, [showCopyTrackingModal, showSubmitModal, timer]);

  const generateTrackingCode = () => {
    const chars = '0123456789';
    let code = '';
    for (let i = 0; i < 16; i++) {
      if (i > 0 && i % 4 === 0) {
        code += '-';
      }
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(trackingCode).then(() => {
      setShowCopyTrackingModal(true);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleFullName = (event) => {
    const value = event.target.value;
    setFullName(value);
  };

  const handleContactNumber = (event) => {
    const value = event.target.value;
    setContactNumber(value);
  };

  const handleSelectType = (event) => {
    const value = event.target.value;
    setSelectType(value);
    setPickUp(value === 'For-Pickup');
    setPaymentMethod('');
  };

  const handlePickupDateChange = (event) => {
    setPickupDate(event.target.value);  // Bind input to state
    console.log(event.target.value);
  };

  const handlePaymentMethod = (event) => {
    const value = event.target.value;
    setPaymentMethod(value);
  };

  const handleReferenceNoChange = (event) => {
    const value = event.target.value;
    setReferenceNo(value);
  };

  const handlePurposeChange = (event) => {
    const value = event.target.value;
    setSelectedPurpose(value);
  };

  const resetForm = () => {
    setFullName('');
    setContactNumber('');
    setPickUp(false);
    setPickupDate('');  // Reset pickup date
    setPaymentMethod('');
    setReferenceNo('');
    setSelectedPurpose('');
    setSelectType('');
    const newTrackingCode = generateTrackingCode();
    setTrackingCode(newTrackingCode);
  };

  const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (fullName === '') {
      alert('Please enter your full name');
    } else if (!isNaN(fullName)) {
      alert('Please enter a valid name');
    } else if (isNaN(contactNumber)) {
      alert('Please enter a valid contact number');
    } else if (contactNumber.length <= 10 || contactNumber.length > 12) {
      alert('Please enter exact 11 numbers');
    } else if (hasSpecialCharacters.test(fullName)) {
      alert('Please enter a name without special characters');
    } else if (selectType === '') {
      alert('Please select Type');
    } else if (selectType === 'For-Pickup' && !pickUp) {
      alert('Please select a Pickup Date');
    } else if (paymentMethod === 'G-Cash' && !referenceNo) {
      alert('Please enter your Gcash Reference No.');
    } else if (paymentMethod === '') {
      alert('Please select a Payment Method');
    } else if (selectedPurpose === '') {
      alert('Please enter on what purpose you need the certificate');
    } else {
      const newTrackingCode = generateTrackingCode();
      setTrackingCode(newTrackingCode);

      // Include pickupDate in formData
      const formData = {
        certificateType: 'Barangay Clearance',
        certId: '1',
        fullName,
        contactNumber,
        pickUp,
        pickUpDate,  // Add pickup date to form data
        paymentMethod,
        referenceNo,
        selectedPurpose,
        selectType,
        trackingCode: newTrackingCode,
      };

      try {
        const response = await axios.post('http://localhost:5000/submit-request', formData);
        alert(response.data);

        console.log('Form submitted');
        console.log('Form data:', formData);
        resetForm();  // Reset form after successful submission
      } catch (error) {
        console.error('Error submitting the form:', error);
        alert('There was an error submitting the form.');
      }
      console.log('Form submitted');
      resetForm();
      setShowSubmitModal(true);
    }
  };

  return (
    <section className='mt-24 mb-10'>
      <div className='px-5 h-fit flex justify-center flex-wrap gap-10'>
        <div className='w-96 h-fit mt-5 p-5 shadow-lg '>
          <div className='w-full h-96 bg-white '>
            <img src={BrgyClearance} alt="Barangay Clearance" onClick={handleImageClick} className='cursor-pointer w-full h-full object-fit' />
          </div>

          <p className='text-sm flex justify-end font-semibold text-gray-500 italic'>1 to 2 Days Processing</p>

          <div className='my-3 text-gray-600'>
            <p>A Barangay Certificate is an official document issued by the Barangay Captain or authorized Barangay officials.</p>
          </div>

          {isImageEnlarged && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-10 z-50" onClick={handleImageClick}>
              <img src={BrgyClearance} alt="Barangay Clearance" className="w-auto h-auto max-h-full max-w-full " />
            </div>
          )}
        </div>

        <form className="w-full md:w-1/2 h-fit pb-5 bg-white mt-5 rounded" onSubmit={handleSubmit}>
          <p className="text-green-500 bg-gray-100 font-semibold p-3 border">BARANGAY CLEARANCE</p>

          <div className="flex flex-col gap-3">
            <div className="w-full flex flex-col gap-y-1 px-3 py-3">
              <label className="text-green-500 font-semibold">Tracking Code <span className='text-gray-600 font-normal'>(Copy your tracking code)</span></label>

              <div className='relative'>
                {trackingCode && <input type="text" disabled className="p-2 bg-gray-200 w-full" value={trackingCode} />}

                <MdOutlineContentCopy onClick={handleCopyTracking} className='absolute top-3 right-3 text-lg cursor-pointer text-green-500' />
              </div>
            </div>

            <div className="w-full flex flex-col px-3">
              <input type="text" placeholder="Enter Full Name" className="p-2 border border-black outline-green-500 w-full" value={fullName} onChange={handleFullName} />
            </div>

            <div className="w-full flex flex-col px-3">
              <input type="text" placeholder="Enter Contact Number" className="p-2 border border-black outline-green-500 w-full" value={contactNumber} onChange={handleContactNumber} />
            </div>

            <div className="w-full flex flex-col gap-y-1 px-3">
              <select name="" id="" className="p-2 border border-black outline-green-500 w-full" value={selectType} onChange={handleSelectType}>
                <option value="">Select Type</option>
                <option value="For-Delivery">For Delivery</option>
                <option value="For-Pickup">For Pickup (in Barangay)</option>
              </select>
            </div>

            {selectType === 'For-Pickup' && (
              <div className="w-full flex flex-col gap-y-1 px-3">
                <label className="text-green-500">Pickup Date</label>
                <input type="date" name="pickupDate" className="p-2 border border-black outline-green-500 w-full" value={pickUpDate} onChange={handlePickupDateChange} />
              </div>
            )}

            <div className="w-full flex flex-col gap-y-1 px-3">
              <select name="" id="" className="p-2 border border-black outline-green-500 w-full" value={paymentMethod} onChange={handlePaymentMethod}>
                <option value="">Select Payment Method</option>
                {selectType === 'For-Pickup' ? (
                  <>
                    <option value="G-Cash">Pay Online (G-Cash)</option>
                    <option value="COP">Cash on Pickup</option>
                  </>
                ) : (
                  <>
                    <option value="G-Cash">Pay Online (G-Cash)</option>
                    <option value="COD">Cash on Delivery</option>
                  </>
                )}
              </select>
            </div>

            {paymentMethod === 'G-Cash' && (
              <div className="w-full flex flex-col gap-y-1 px-3">
                <label className="text-green-500">Reference No. (Please enter a valid reference number)</label>
                <input type="text" name="reference" placeholder="Enter Gcash Reference No." className="p-2 border w-full" value={referenceNo} onChange={handleReferenceNoChange} />
              </div>
            )}

            <div className="w-full flex flex-col gap-y-1 px-3">
              <textarea name="" id="" rows={6} placeholder="Please state the purpose on what purpose you need the certificate." className="noResize border border-black p-2 outline-green-500 w-full" style={{ resize: 'none' }} value={selectedPurpose} onChange={handlePurposeChange}></textarea>
            </div>

            <div className="px-3 w-full">
              <button className="bg-green-500 text-white w-full p-1 font-semibold hover:bg-green-400">Submit</button>
            </div>
          </div>
        </form>
      </div>

      {showCopyTrackingModal && (
        <div className="fixed right-5 top-5 flex items-center justify-center z-50">
          <div className="bg-green-100 p-5 rounded shadow-lg w-80">
            <p className="text-center text-gray-600 mb-4">Tracking Code copied successfully!</p>
            <div className="h-1 bg-green-500" style={{ width: `${(timer / 3) * 100}%` }}></div>
          </div>
        </div>
      )}

      {showSubmitModal && (
        <div className="fixed right-5 top-5 flex items-center justify-center z-50">
          <div className="bg-green-100 p-5 rounded shadow-lg w-80">
            <p className="text-center text-gray-600 mb-4">Form Submitted Successfully!</p>
            <div className="h-1 bg-green-500" style={{ width: `${(timer / 3) * 100}%` }}></div>
          </div>
        </div>
      )}
    </section>
  );
}

export default BarangayClearance;
