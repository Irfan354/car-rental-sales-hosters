"use client";

import React from "react";
import { Menubar } from "primereact/menubar";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => router.push("/"),
    },
    // vehicles
    {
      label: "Vehicles",
      icon: "pi pi-car",
      items: [
        {
          label: "All Vehicles",
          icon: "pi pi-list",
          command: () => router.push("/vehicles/vehicles-list"),
        },
        {
          label: "Add Vehicle",
          icon: "pi pi-plus",
          command: () => router.push("/vehicles/add-vehicle"),
        },
      ],
    },
    // bookings
    {
      label: "Bookings",
      icon: "pi pi-calendar",
      items: [
        {
          label: "All Bookings",
          icon: "pi pi-book",
          command: () => router.push("/bookings/all-bookings"),
        },
        {
          label: "Booking Details",
          icon: "pi pi-info-circle",
          command: () => router.push("/bookings/booking-details"),
        },
      ],
    },
    // earnings
    {
      label: "Earnings",
      icon: "pi pi-chart-line",
      command: () => router.push("/earning"),
    },
        {
      label: "Support",
      icon: "pi pi-wrench",
      command: () => router.push("/support"),
    },
    // profile
    {
      label: "Profile",
      icon: "pi pi-user",
      items: [
        {
          label: "Profile Info",
          icon: "pi pi-id-card",
          command: () => router.push("/profile"),
        },
        {
          label: "Documents",
          icon: "pi pi-file",
          command: () => router.push("/profile/documents"),
        },
      ],
    },
    {
      label : "Logout",
      icon : "pi pi-power-off",
      command: () => router.push("/auth/login")
    }

    // {
    //   label: "Auth",
    //   icon: "pi pi-key",
    //   items: [
    //     {
    //       label: "Login",
    //       icon: "pi pi-sign-in",
    //       command: () => router.push("/auth/login"),
    //     },
    //     {
    //       label: "Register",
    //       icon: "pi pi-user-plus",
    //       command: () => router.push("/auth/register"),
    //     },
    //   ],
    // },
  ];

  return (
    <div className="card w-full">
      <Menubar model={items} />
    </div>
  );
}
