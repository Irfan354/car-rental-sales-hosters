// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { AiOutlineDashboard, AiOutlineCar, AiOutlineSchedule, AiOutlineWallet, AiOutlineUser, AiOutlineCustomerService } from "react-icons/ai";

// const menuItems = [
//   { name: "Dashboard", href: "/", icon: AiOutlineDashboard },
//   { name: "Vehicles", href: "/vehicles", icon: AiOutlineCar },
//   { name: "Bookings", href: "/bookings", icon: AiOutlineSchedule },
//   { name: "Earnings", href: "/earnings", icon: AiOutlineWallet },
//   { name: "Profile", href: "/profile", icon: AiOutlineUser },
//   { name: "Support", href: "/support", icon: AiOutlineCustomerService },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();

//   return (
//     <aside className="w-64 bg-white shadow-lg h-screen p-6 flex flex-col">
//       <h2 className="text-2xl font-bold mb-8 text-blue-600">CarGo Hoster</h2> <br />
//       <nav className="flex-1">
//         <ul className="space-y-4">
//           {menuItems.map((item) => {
//             const isActive = pathname === item.href;
//             const Icon = item.icon;
//             return (
//               <li key={item.href}>
//                 <Link
//                   href={item.href}
//                   className={`flex items-center p-3 rounded-lg hover:bg-blue-100 transition ${
//                     isActive ? "bg-blue-100 font-semibold text-blue-600" : "text-gray-700"
//                   }`}
//                 >
//                   <Icon className="mr-3 text-lg" />
//                   {item.name}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>
//       <div className="mt-auto">
//         <button className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
//           Logout
//         </button>
//       </div>
//     </aside>
//   );
// }
  