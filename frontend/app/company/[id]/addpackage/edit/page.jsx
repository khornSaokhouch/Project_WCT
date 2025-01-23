import React, { useState, useEffect } from 'react';

const EditTourForm = ({ tour, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: tour.name,
    description: tour.description,
    price: tour.price,
    duration: tour.duration,
    startDate: tour.startDate.split('T')[0],
    endDate: tour.endDate.split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-4xl">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Edit Tour
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Package Name</Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Package name"
                  required
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  required
                />
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  min="0"
                  required
                />
              </div>
              <div>
                <Label>Duration</Label>
                <Input
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Duration"
                  min="0"
                  required
                />
              </div>
              <div>
                <Label>Start Date</Label>
                <Input
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditTourForm;