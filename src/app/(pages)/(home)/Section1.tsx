/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6"

export const Section1 = () => {
  const router = useRouter();

  const [jobList, setJobList] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);

  // Fetch job list
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/job/list`, {
      method: "GET",
      credentials: "include", // Gửi kèm cookie
    })
      .then(res => res.json())
      .then(data => {
        if (data.code === "success") {
          setJobList(data.jobs || []);
        }
      })
      .catch(err => console.error("Lỗi khi fetch job list:", err));
  }, []);

  // Fetch city list
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/job-by-city`)
      .then(res => res.json())
      .then(data => {
        console.log("City API:", data); // Debug xem backend trả gì
        const list = Array.isArray(data.cityList)
          ? data.cityList
          : Array.isArray(data)
          ? data
          : [];
        setCityList(list);
      })
      .catch(err => console.error("Lỗi khi fetch city list:", err));
  }, []);

  const handleSearch = (event: any) => {
    event.preventDefault();
    const city = event.target.city.value;
    const keyword = event.target.keyword.value;

    router.push(`/search?city=${city}&keyword=${keyword}`);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-[#0a0a0a] via-[#0f172a] to-[#003366] text-white pt-12 pb-6 px-6 relative overflow-hidden">
        <div className="container mx-auto px-[16px]">
          <h1 className="text-white font-[700] text-[28px] text-center mb-[30px]">
            {jobList.length} Việc làm IT cho Developer &quot;Chất&quot;
          </h1>

          <form
            onSubmit={handleSearch}
            action=""
            className="flex flex-wrap gap-x-[15px] gap-y-[12px] mb-[30px]"
          >
            <select
              name="city"
              className="bg-white md:w-[240px] w-[100%] h-[56px] rounded-[4px] px-[20px] font-[500] text-[16px] text-[#121212]"
            >
              <option value="">Tất cả thành phố</option>
              {cityList.map((city: any, index: number) => (
                <option key={index} value={city.name || city}>
                  {city.name || city}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="keyword"
              placeholder="Nhập từ khoá..."
              className="md:flex-1 flex-none w-[100%] bg-white h-[56px] rounded-[4px] px-[20px] font-[500] text-[16px]"
            />

            <button className="bg-gradient-to-r from-[#0a0a0a] via-[#0f172a] to-[#003366] md:w-[240px] w-[100%] h-[56px] rounded-[4px] font-[500] text-[16px] text-white inline-flex items-center justify-center">
              <FaMagnifyingGlass className="text-[20px] mr-[10px]" /> Tìm Kiếm
            </button>
          </form>

          <div className="flex flex-wrap gap-x-[12px] gap-y-[15px] items-center">
            <div className="text-[#DEDEDE] font-[500] text-[16px]">
              Mọi người đang tìm kiếm:
            </div>
            <div className="flex flex-wrap gap-[10px]">
              <Link
                href="/search?language=ReactJS"
                className="border border-[#414042] bg-[#121212] hover:bg-[#414042] rounded-[20px] inline-block text-[#DEDEDE] hover:text-white font-[500] text-[16px] py-[8px] px-[22px]"
              >
                ReactJS
              </Link>
              <Link
                href="/search?language=Javascript"
                className="border border-[#414042] bg-[#121212] hover:bg-[#414042] rounded-[20px] inline-block text-[#DEDEDE] hover:text-white font-[500] text-[16px] py-[8px] px-[22px]"
              >
                Javascript
              </Link>
              <Link
                href="/search?language=NodeJS"
                className="border border-[#414042] bg-[#121212] hover:bg-[#414042] rounded-[20px] inline-block text-[#DEDEDE] hover:text-white font-[500] text-[16px] py-[8px] px-[22px]"
              >
                NodeJS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
