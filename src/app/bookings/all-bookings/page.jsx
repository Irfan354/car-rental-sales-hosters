"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import BookingCard from "@/app/components/BookingCard";

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await axios.get("/api/bookings"); // replace with your backend API
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    }
    fetchBookings();
  }, []);

  const handleCardClick = (id) => {
    router.push(`/bookings/${id}`); // programmatic navigation
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} onClick={() => handleCardClick(booking.id)}>
              <BookingCard booking={booking} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
