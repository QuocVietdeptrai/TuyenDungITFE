"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Item {
  _id: string;
  name: string;
}

export default function FormList({ type }: { type: "city" | "skill" }) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    let url = "";
    if (type === "city") {
      url = `${process.env.NEXT_PUBLIC_API_URL}/job/job-by-city`;
    } else if (type === "skill") {
      url = `${process.env.NEXT_PUBLIC_API_URL}/job/job-by-skill`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (type === "city") {
          setItems(data.cityList ?? []);
        } else {
          setItems(data.skillList ?? []);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [type]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        {type === "city"
          ? `Jobs By City (${items.length})`
          : `Jobs By Skill (${items.length})`}
      </h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {items.map((item) => (
          <li key={item._id}>
            <Link
              href={
                type === "city"
                  ? `/search?city=${encodeURIComponent(item.name)}`
                  : `/search?skill=${encodeURIComponent(item.name)}`
              }
              className="block p-2 border rounded hover:bg-gray-100 cursor-pointer"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
