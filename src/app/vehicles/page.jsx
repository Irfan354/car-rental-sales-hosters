"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import VehicleCard from "../components/VehicleCard";

export default function VehiclesPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const res = await axios.get("/api/vehicles"); // placeholder API
        setVehicles(res.data);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        // For now, use dummy data
        setVehicles([
          { id: 1, name: "Toyota Innova", price: 2000, status: "Available", image: "/vehicle/innova.jpg" },
          { id: 2, name: "Honda City", price: 1800, status: "Booked", image: "/vehicle/hondacity.jpg" },
          { id: 3, name: "Mahindra XUV", price: 2200, status: "Available", image: "/vehicle/xuv.jpg" },
        ]);
      }
    }
    fetchVehicles();
  }, []);

  const handleAddVehicle = () => {
    router.push("/vehicles/add");
  };

  const handleEditVehicle = (id) => {
    router.push(`/vehicles/${id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Vehicles</h1>
        <button
          onClick={handleAddVehicle}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Vehicle
        </button>
      </div>

      {vehicles.length === 0 ? (
        <p>No vehicles added yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} onClick={() => handleEditVehicle(vehicle.id)}>
              <VehicleCard vehicle={vehicle} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
