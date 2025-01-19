"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import usePolicyStore from "@/store/policyStore";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons

const InviteCard = () => {
  const { id } = useParams(); // Get sub-admin ID from URL params
  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const [title, setTitle] = useState(""); // State for policy title
  const [description, setDescription] = useState(""); // State for policy description
  const [effectiveDate, setEffectiveDate] = useState(""); // State for effective date
  const [selectedPolicyId, setSelectedPolicyId] = useState(null); // State to track selected policy ID
  const [isActiveFilter, setIsActiveFilter] = useState(null); // State for isActive filter
  const [editingPolicy, setEditingPolicy] = useState(null); // State to track policy being edited

  // Zustand store functions and state
  const {
    policies,
    policy,
    loading,
    error,
    createPolicy,
    fetchPolicies,
    fetchPolicyById,
    updatePolicy,
    deletePolicy,
  } = usePolicyStore();

  // Fetch all policies on component mount or when isActiveFilter changes
  useEffect(() => {
    fetchPolicies(id, isActiveFilter);
  }, [id, isActiveFilter, fetchPolicies]);

  // Fetch a single policy when selectedPolicyId changes
  useEffect(() => {
    if (selectedPolicyId) {
      fetchPolicyById(id, selectedPolicyId);
    }
  }, [selectedPolicyId, id, fetchPolicyById]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingPolicy) {
      // Update existing policy
      await updatePolicy(id, editingPolicy._id, { title, description, effectiveDate });
    } else {
      // Create new policy
      await createPolicy(id, { title, description, effectiveDate });
    }
    setShowForm(false); // Hide the form after submission
    setTitle(""); // Reset form fields
    setDescription("");
    setEffectiveDate("");
    setEditingPolicy(null); // Reset editing state
  };

  // Handle form cancellation
  const handleCancel = () => {
    setShowForm(false); // Hide the form
    setTitle(""); // Reset form fields
    setDescription("");
    setEffectiveDate("");
    setEditingPolicy(null); // Reset editing state
  };

  // Handle "View" button click
  const handleViewPolicy = (policyId) => {
    setSelectedPolicyId(policyId); // Set the selected policy ID
  };

  // Handle "Edit" button click
  const handleEditPolicy = (policy) => {
    setEditingPolicy(policy); // Set the policy being edited
    setTitle(policy.title); // Populate form fields
    setDescription(policy.description);
    setEffectiveDate(policy.effectiveDate.split("T")[0]); // Format date for input
    setShowForm(true); // Show the form
  };

  // Handle "Delete" button click
  const handleDeletePolicy = async (policyId) => {
    if (window.confirm("Are you sure you want to delete this policy?")) {
      await deletePolicy(id, policyId);
    }
  };

  // Handle isActive filter change
  const handleFilterChange = (value) => {
    setIsActiveFilter(value); // Update the isActive filter
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      {/* Add New Policy Button */}
      <button
        onClick={() => setShowForm(true)}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg mb-6"
      >
        Add new policy
      </button>

      {/* Filter by isActive */}
      <div className="mb-6">
        <label className="block mb-1">Filter by Status:</label>
        <select
          value={isActiveFilter ?? ""}
          onChange={(e) => handleFilterChange(e.target.value || null)}
          className="w-full p-2 border rounded"
        >
          <option value="">All</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      {/* Policy Form (Conditionally Rendered) */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingPolicy ? "Edit Policy" : "Add New Policy"}
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Policy Title */}
              <div className="mb-4">
                <label className="block mb-1">Policy Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter policy title"
                  required
                />
              </div>

              {/* Policy Description */}
              <div className="mb-4">
                <label className="block mb-1">Policy Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter policy description"
                  required
                />
              </div>

              {/* Effective Date */}
              <div className="mb-4">
                <label className="block mb-1">Effective Date</label>
                <input
                  type="date"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded"
                >
                  {editingPolicy ? "Update Policy" : "Submit Policy"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full bg-gray-500 text-white py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Display Policy Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map((policy) => (
          <div key={policy._id} className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold">{policy.title}</h2>
              <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                {policy.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">{policy.description}</p>
            </div>
            <div className="mb-4">
              <p className="text-md font-medium">
                Effective Date: {new Date(policy.effectiveDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => handleViewPolicy(policy._id)}
                className="w-full bg-blue-500 text-white py-2 rounded mr-2"
              >
                View
              </button>
              <button
                onClick={() => handleEditPolicy(policy)}
                className="p-2 bg-yellow-500 text-white rounded"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeletePolicy(policy._id)}
                className="p-2 bg-red-500 text-white rounded"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Display Selected Policy Details */}
      {selectedPolicyId && policy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Policy Details</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">{policy.title}</h3>
              <p className="text-sm text-gray-600">{policy.description}</p>
            </div>
            <div className="mb-4">
              <p className="text-md font-medium">
                Effective Date: {new Date(policy.effectiveDate).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => setSelectedPolicyId(null)}
              className="w-full bg-gray-500 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InviteCard;