"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function BookingDetail() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await axios.get(`/api/bookings/${id}`);
        setBooking(res.data);
      } catch (err) {
        console.error("Error fetching booking:", err);
      }
    }
    fetchBooking();
  }, [id]);

  if (!booking) return <p>Loading booking details...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Booking Details</h1>
      <div className="bg-white p-6 shadow rounded">
        <h2 className="text-xl font-bold mb-2">{booking.vehicleName}</h2>
        <p><strong>Customer:</strong> {booking.customerName}</p>
        <p><strong>Phone:</strong> {booking.customerPhone}</p>
        <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
        <p><strong>Pickup Location:</strong> {booking.pickupLocation}</p>
        <p><strong>Drop Location:</strong> {booking.dropLocation}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Total Amount:</strong> ₹{booking.total}</p>
      </div>
    </div>
  );
}
