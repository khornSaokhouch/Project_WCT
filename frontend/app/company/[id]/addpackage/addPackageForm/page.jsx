"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
// import {
//   Button,
//   Input,
//   Label,
//   Textarea,
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
//   Card,
//   CardContent,
// } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

import { useLocationStore } from "../../../../../store/locationStore";
import { useCategoryStore } from "../../../../../store/categoryStore";
import { useTourStore } from "../../../../../store/package";

export default function AddPackageForm({tour}) {
   const { id } = useParams();
  const [name, setName] = useState(tour ? tour.name : "");
  const [location, setLocation] = useState(tour ? tour.location : "");
  const [description, setDescription] = useState(tour ? tour.description : "");
  const [packageDescription, setPackageDescription] = useState(
    tour ? tour.packageDescription : ""
  );
  const [category, setCategory] = useState(tour ? tour.category : "");
  const [duration, setDuration] = useState(tour ? tour.duration : "");
  const [startDate, setStartDate] = useState(
    tour ? tour.startDate?.split("T")[0] : ""
  );
  const [endDate, setEndDate] = useState(
    tour ? tour.endDate?.split("T")[0] : ""
  );
  const [status, setStatus] = useState(tour ? tour.status : "");
  const [price, setPrice] = useState(tour ? tour.price : "");
  const [files, setFiles] = useState(tour ? tour.images : []);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(
    tour ? tour.categories : []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);

  const { locations, fetchLocations } = useLocationStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { createTour, updateTour, deleteTour } = useTourStore();

  // Fetch locations and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingLocations(true);
      try {
        await Promise.all([fetchLocations(), fetchCategories()]);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data. Please try again.");
      } finally {
        setIsLoadingLocations(false);
      }
    };
    fetchData();
  }, [fetchLocations, fetchCategories]);

  // Filter locations based on search term
  const filteredLocations = locations.filter((location) =>
    (location.nameLocation || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Handle category selection
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value)
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const tourData = {
      name,
      location,
      description,
      packageDescription,
      category,
      duration,
      startDate,
      endDate,
      status,
      price,
      images: files.map((file) => URL.createObjectURL(file)),
      categories: selectedCategories,
    };

    try {
      if (tour) {
        await updateTour(tour._id, tourData);
      } else {
        await createTour(id, tourData);
      }
      onClose();
    } catch (error) {
      console.error("Error submitting tour:", error);
      alert("Failed to submit tour. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle tour deletion
  const handleDeleteTour = async () => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      setIsLoading(true);
      try {
        await deleteTour(tour._id);
        onClose();
      } catch (error) {
        console.error("Error deleting tour:", error);
        alert("Failed to delete tour. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">
          {tour ? "Edit Tour" : "Add New Package"}
        </h1>
        {/* <Button
          variant="outline"
          size="sm"
          className="text-green-500"
          onClick={onClose}
        >
          Cancel
        </Button> */}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="packageName" className="text-lg">
                  Package name
                </Label>
                <Input
                  id="packageName"
                  placeholder="Package name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <select
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Select a location
                    </option>
                    {filteredLocations.length > 0 ? (
                      filteredLocations.map((location) => (
                        <option key={location._id} value={location._id}>
                          {location.nameLocation || "Unnamed Location"}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No locations found
                      </option>
                    )}
                  </select>

                  {isLoadingLocations && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg
                        className="animate-spin h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  )}
                </div>

                {!isLoadingLocations &&
                  filteredLocations.length === 0 &&
                  searchTerm && (
                    <p className="text-sm text-red-500 mt-1">
                      No locations match your search.
                    </p>
                  )}
              </div>

              <div>
                <Label htmlFor="description" className="text-lg">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter description"
                  className="h-32"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="packageDescription" className="text-lg">
                  Package Plan Description
                </Label>
                <Textarea
                  id="packageDescription"
                  placeholder="Please describe your plan in list."
                  className="h-32"
                  value={packageDescription}
                  onChange={(e) => setPackageDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Categories</Label>
                <div className="grid grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <div
                      key={category._id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={category._id}
                        value={category._id}
                        checked={selectedCategories.includes(category._id)}
                        onChange={handleCategoryChange}
                      />
                      <label htmlFor={category._id}>
                        {category.categoryname}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="days" className="text-lg">
                  Days
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    id="days"
                    placeholder=""
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                  <span className="text-sm text-gray-500">d</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate" className="text-lg">
                    Start Date
                  </Label>
                  <Input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate" className="text-lg">
                    End Date
                  </Label>
                  <Input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status" className="text-lg">
                  Status
                </Label>
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    type="number"
                    id="price"
                    placeholder="35"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Payment</span>
                    <span className="font-semibold">${price}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          {tour && (
            <Button
              variant="destructive"
              onClick={handleDeleteTour}
              disabled={isLoading}
            >
              Delete
            </Button>
          )}
          <Link href={`/company/${id}/addpackage`}>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : tour ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}