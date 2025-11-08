export default function BookingCard({ booking }) {
  return (
    <div className="bg-white p-4 shadow rounded hover:shadow-lg transition cursor-pointer">
      <h2 className="text-lg font-bold mb-1">{booking.vehicleName}</h2>
      <p>Customer: {booking.customerName}</p>
      <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
      <p>Status: <span className={`${booking.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>{booking.status}</span></p>
      <p>Total: ₹{booking.total}</p>
    </div>
  );
}
