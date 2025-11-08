"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

export default function EditVehiclePage() {
  const { id } = useParams();
  const router = useRouter();
  const [vehicle, setVehicle] = useState({
    name: "",
    price: "",
    status: "Available",
    image: null,
  });

  const statusOptions = [
    { label: "Available", value: "Available" },
    { label: "Booked", value: "Booked" },
  ];

  useEffect(() => {
    async function fetchVehicle() {
      try {
        const res = await axios.get(`/api/vehicles/${id}`);
        setVehicle(res.data);
      } catch (err) {
        console.error("Error fetching vehicle:", err);
      }
    }
    fetchVehicle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") setVehicle({ ...vehicle, image: files[0] });
    else setVehicle({ ...vehicle, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", vehicle.name);
      formData.append("price", vehicle.price);
      formData.append("status", vehicle.status);
      if (vehicle.image instanceof File) formData.append("image", vehicle.image);

      await axios.put(`/api/vehicles/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      router.push("/vehicles");
    } catch (err) {
      console.error("Error updating vehicle:", err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Vehicle</h1>
      <form onSubmit={handleUpdate} className="bg-white p-6 shadow rounded max-w-lg">
        <div className="mb-4">
          <label className="block font-semibold mb-1">Vehicle Name</label>
          <InputText
            name="name"
            value={vehicle.name}
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Price per Day (₹)</label>
          <InputText
            name="price"
            type="number"
            value={vehicle.price}
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Status</label>
          <Dropdown
            value={vehicle.status}
            options={statusOptions}
            onChange={(e) => setVehicle({ ...vehicle, status: e.value })}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Vehicle Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          {vehicle.image && !(vehicle.image instanceof File) && (
            <img src={vehicle.image} alt="Vehicle" className="h-40 w-full object-cover mt-2 rounded" />
          )}
        </div>

        <Button label="Update Vehicle" type="submit" className="mt-4" />
      </form>
    </div>
  );
}
