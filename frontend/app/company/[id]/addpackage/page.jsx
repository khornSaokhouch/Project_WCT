"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  MoreHorizontal,
  Edit2,
  Eye,
  Search,
  Plus,
  Calendar,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTourStore } from "../../../../store/package";
import Link from "next/link";

export default function TravelPackages() {
  const { id } = useParams();
  const { tours, loading, error, fetchTours, deleteTour } = useTourStore();

  useEffect(() => {
    fetchTours(id);
  }, [id, fetchTours]);

  const handleDeleteTour = async (tourId) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      await deleteTour(tourId);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">View All Tours</h1>
        <Link href={`/company/${id}/addpackage/addPackageForm`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Tour
          </Button>
        </Link>
      </div>

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by ID" className="pl-9" />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by tour name" className="pl-9" />
        </div>
        <Select>
          <SelectTrigger>
            <Calendar className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sort by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="all">All Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table Section */}
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Package name</TableHead>
              <TableHead>Where to</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tours.map((tour, index) => (
              <TableRow key={tour._id || index}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {tour.mainImage ? (
                      <div className="h-16 w-16 overflow-hidden rounded-lg">
                        <Image
                          src={tour.mainImage}
                          alt={tour.name || "Tour Image"}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
                        <span className="text-xs text-gray-500">No Image</span>
                      </div>
                    )}
                    <span className="font-medium">
                      {tour.name || "Unnamed Tour"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{tour.location?.nameLocation || "N/A"}</TableCell>
                <TableCell>{tour.category?.categoryname || "N/A"}</TableCell>
                <TableCell>
                  {tour.startDate ? tour.startDate.split("T")[0] : "N/A"}
                </TableCell>
                <TableCell>{tour.duration || "N/A"}</TableCell>
                <TableCell>{tour.price || "N/A"}$</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {tour.status || "N/A"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTour(tour._id)}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
