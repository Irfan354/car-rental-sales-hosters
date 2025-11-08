export default function VehicleCard({ vehicle }) {
  return (
    <div className="bg-white p-4 shadow rounded hover:shadow-lg transition cursor-pointer">
      <img
        src={vehicle.image}
        alt={vehicle.name}
        className="h-20 w-min rounded mb-4"
      />
      <h2 className="text-lg font-bold">{vehicle.name}</h2>
      <p>Price: ₹{vehicle.price}/day</p>
      <p>
        Status:{" "}
        <span className={`font-semibold ${
            vehicle.status === "Available" ? "text-green-600" : "text-red-600"
          }`}>
            {vehicle.status}
        </span>
      </p>
    </div>
  );
}
