import React, { useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';

const CreateDonation = () => {
  const { user } = useAuth(); // { name, email, status }
  console.log(user);
  const axios = useAxios();
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientDistrict: '',
    recipientUpazila: '',
    hospitalName: '',
    fullAddress: '',
    bloodGroup: 'A+',
    donationDate: '',
    donationTime: '',
    requestMessage: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user?.status === 'blocked') {
      alert('You are blocked! Cannot create donation request.');
      return;
    }

    const payload = {
      requesterName: user.displayName || user.name,
      requesterEmail: user.email,
      ...formData,
    };

    try {
      const res = await axios.post(
        'http://localhost:5000/donation-request',
        payload
      );

      alert('Donation request created successfully!', res);
      setFormData({
        recipientName: '',
        recipientDistrict: '',
        recipientUpazila: '',
        hospitalName: '',
        fullAddress: '',
        bloodGroup: 'A+',
        donationDate: '',
        donationTime: '',
        requestMessage: '',
      });
    } catch (error) {
      console.error(error);
      alert('Error creating donation request');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-800 text-white rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Create Donation Request</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Requester Name */}
        <input
          type="text"
          value={user?.displayName || ''}
          readOnly
          className="p-2 rounded bg-gray-700"
          placeholder="Requester Name"
        />

        {/* Requester Email */}
        <input
          type="email"
          value={user?.email || ''}
          readOnly
          className="p-2 rounded bg-gray-700"
          placeholder="Requester Email"
        />

        {/* Recipient Name */}
        <input
          type="text"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleChange}
          placeholder="Recipient Name"
          className="p-2 rounded bg-gray-700"
          required
        />

        {/* Blood Group */}
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700"
        >
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        {/* District */}
        <input
          type="text"
          name="recipientDistrict"
          value={formData.recipientDistrict}
          onChange={handleChange}
          placeholder="Recipient District"
          className="p-2 rounded bg-gray-700"
          required
        />

        {/* Upazila */}
        <input
          type="text"
          name="recipientUpazila"
          value={formData.recipientUpazila}
          onChange={handleChange}
          placeholder="Recipient Upazila"
          className="p-2 rounded bg-gray-700"
          required
        />

        {/* Hospital Name */}
        <input
          type="text"
          name="hospitalName"
          value={formData.hospitalName}
          onChange={handleChange}
          placeholder="Hospital Name"
          className="p-2 rounded bg-gray-700"
          required
        />

        {/* Full Address */}
        <input
          type="text"
          name="fullAddress"
          value={formData.fullAddress}
          onChange={handleChange}
          placeholder="Full Address"
          className="p-2 rounded bg-gray-700"
          required
        />

        {/* Donation Date */}
        <input
          type="date"
          name="donationDate"
          value={formData.donationDate}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700"
          required
        />

        {/* Donation Time */}
        <input
          type="time"
          name="donationTime"
          value={formData.donationTime}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700"
          required
        />

        {/* Request Message (Full Width) */}
        <textarea
          name="requestMessage"
          value={formData.requestMessage}
          onChange={handleChange}
          placeholder="Why you need blood?"
          className="p-2 rounded bg-gray-700 md:col-span-2"
          required
        />

        {/* Submit Button (Full Width) */}
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 p-2 rounded font-semibold md:col-span-2"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonation;
