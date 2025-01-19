'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SupplyPartnerForm() {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    businessDescription: '',
    numberOfCompanies: '',
    numberOfActivities: '',
    location: '',
    useReservation: '',
    companyName: '',
    websiteLink: '',
    companyFrom: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreedToTerms: false,
  });

  const handleNext = () => {
    setPage(2);
  };

  const handleBack = () => {
    setPage(1);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        alert('Form submitted successfully!');
        // Reset form or redirect
      } else {
        alert('Failed to submit form: ' + result.message);
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-[800px] flex flex-col">
        {/* Form Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Join Booking Vacation Tour as Supply Partner
          </h2>
        </div>

        {/* Page 1 */}
        {page === 1 && (
          <form className="flex-1" onSubmit={handleSubmit}>
            {/* How do you run your business? */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How do you run your business?
              </label>
              <input
                type="text"
                name="businessDescription"
                value={formData.businessDescription}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your business"
                required
              />
            </div>

            {/* How many companies do you have? */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How many companies do you have?
              </label>
              <div className="flex justify-between">
                {['2-3', '4-10', '10-15', '15-20', '20+'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="numberOfCompanies"
                      value={option}
                      checked={formData.numberOfCompanies === option}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                      required
                    />
                    <span className="text-gray-700 ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* How many activities can you offer? */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How many activities can you offer?
              </label>
              <div className="flex justify-between">
                {['1-5', '5-15', '15-25', '25-30', '30+'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="numberOfActivities"
                      value={option}
                      checked={formData.numberOfActivities === option}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                      required
                    />
                    <span className="text-gray-700 ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Choose Location that you provide */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Choose Location that you provide
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select location</option>
                <option value="location1">Location 1</option>
                <option value="location2">Location 2</option>
                <option value="location3">Location 3</option>
              </select>
            </div>

            {/* Do you want to use a reservation? */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Do you want to use a reservation?
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="useReservation"
                    value="yes"
                    checked={formData.useReservation === 'yes'}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-blue-600"
                    required
                  />
                  <span className="text-gray-700 ml-2">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="useReservation"
                    value="no"
                    checked={formData.useReservation === 'no'}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-blue-600"
                    required
                  />
                  <span className="text-gray-700 ml-2">No</span>
                </label>
              </div>
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Next
            </button>

            {/* Login Link */}
            <div className="mt-4 text-center">
              <span className="text-gray-600">Already have an account? </span>
              <Link href="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </div>
          </form>
        )}

        {/* Page 2 */}
        {page === 2 && (
          <form className="flex-1" onSubmit={handleSubmit}>
            {/* Company Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your company's name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Company Name"
                required
              />
            </div>

            {/* Website Link */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your company’s website link
              </label>
              <input
                type="url"
                name="websiteLink"
                value={formData.websiteLink}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://www.website.com"
                required
              />
            </div>

            {/* Location Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Choose Location that you provide
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select location</option>
                <option value="location1">Location 1</option>
                <option value="location2">Location 2</option>
                <option value="location3">Location 3</option>
              </select>
            </div>

            {/* Company From */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company from?
              </label>
              <select
                name="companyFrom"
                value={formData.companyFrom}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select company</option>
                <option value="company1">Company 1</option>
                <option value="company2">Company 2</option>
                <option value="company3">Company 3</option>
              </select>
            </div>

            {/* First and Last Name */}
            <div className="mb-4 flex space-x-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="**********"
                required
              />
            </div>

            {/* Terms and Conditions */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-blue-600"
                required
              />
              <span className="ml-2 text-sm text-gray-600">
                I have read and agree with the{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Term and condition
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  privacy policy
                </Link>
                .
              </span>
            </div>

            {/* Back and Confirm Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Confirm
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}