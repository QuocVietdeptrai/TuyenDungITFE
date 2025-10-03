/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Slider from "react-slick"; // 👈 import react-slick

export const Section1 = () => {
  const router = useRouter();

  const [jobList, setJobList] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);
  const [skillList, setSkillList] = useState<any[]>([]);

  // Fetch job list
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/list`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === "success") {
          setJobList(data.jobs || []);
        }
      })
      .catch((err) => console.error("Lỗi khi fetch job list:", err));
  }, []);

  // Fetch city list
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/job-by-city`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data.cityList)
          ? data.cityList
          : Array.isArray(data)
          ? data
          : [];
        setCityList(list);
      })
      .catch((err) => console.error("Lỗi khi fetch city list:", err));
  }, []);

  // Fetch skill list
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/job-by-skill`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data.skillList)
          ? data.skillList
          : Array.isArray(data)
          ? data
          : [];
        setSkillList(list);
      })
      .catch((err) => console.error("Lỗi khi fetch skill list:", err));
  }, []);

  const handleSearch = (event: any) => {
    event.preventDefault();
    const city = event.target.city.value;
    const keyword = event.target.keyword.value;

    router.push(`/search?city=${city}&keyword=${keyword}`);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 640, // Mobile
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <>
      <div className="bg-gradient-to-r from-[#0a0a0a] via-[#0f172a] to-[#003366] text-white pt-12 pb-6 px-6 relative overflow-hidden">
        <div className="container mx-auto px-[16px]">
          <h1 className="text-white font-[700] text-[28px] text-center mb-[30px]">
            {jobList.length} Việc làm IT cho Developer &quot;Chất&quot;
          </h1>

          {/* Form Search */}
          <form
            onSubmit={handleSearch}
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
              placeholder="Nhập từ khoá tìm kiếm..."
              className="md:flex-1 flex-none w-[100%] bg-white h-[56px] rounded-[4px] px-[20px] font-[500] text-[16px]"
            />

            <button className="bg-gradient-to-r from-[#0a0a0a] via-[#0f172a] to-[#003366] md:w-[240px] w-[100%] h-[56px] rounded-[4px] font-[500] text-[16px] text-white inline-flex items-center justify-center">
              <FaMagnifyingGlass className="text-[20px] mr-[10px]" /> Tìm Kiếm
            </button>
          </form>

          {/* Skill List Carousel */}
          <div className="flex flex-col gap-y-[15px]">
            <div className="text-[#DEDEDE] font-[500] text-[16px] mb-2">
              Mọi người đang tìm kiếm:
            </div>
            <Slider {...sliderSettings}>
              {skillList.map((skill: any, index: number) => (
                <Link
                  key={index}
                  href={`/search?language=${skill.name || skill}`}
                  className="mx-2 bg-[#0f0f0f] border border-[#2a2a2a] 
                            rounded-full inline-block
                            text-[#ffffff] font-[600] text-[15px] 
                            py-[6px] px-[18px]
                            hover:bg-[#1a1a1a] hover:border-[#444]
                            transition-all duration-200 ease-in-out
                            text-center"
                >
                  {skill.name || skill}
                </Link>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};
