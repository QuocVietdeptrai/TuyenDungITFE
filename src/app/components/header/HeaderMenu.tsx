"use client"

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { useEffect, useState } from "react";

export const HeaderMenu = (props: { showMenu: boolean }) => {
  const { showMenu } = props;
  const { isLogin } = useAuth();

  const [cityList, setCityList] = useState<any[]>([]);
  const [skillList, setSkillList] = useState<any[]>([]);
  const [companyList, setCompanyList] = useState<any[]>([]);

  // Fetch city
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/job-by-city`)
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data.cityList) ? data.cityList : Array.isArray(data) ? data : [];
        setCityList(list);
      })
      .catch(err => console.error("Lỗi khi fetch city list:", err));
  }, []);

  // Fetch skill
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/job-by-skill`)
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data.skillList) ? data.skillList : Array.isArray(data) ? data : [];
        setSkillList(list);
      })
      .catch(err => console.error("Lỗi khi fetch skill list:", err));
  }, []);

  // Fetch company
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/list`)
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data.companyList) ? data.companyList : Array.isArray(data) ? data : [];
        setCompanyList(list);
      })
      .catch(err => console.error("Lỗi khi fetch company list:", err));
  }, []);

  // Thành phố nổi bật
  const featuredCities = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ"];
  const sortedCities = [
    ...featuredCities
      .map(fc => cityList.find((c: any) => c?.name?.toLowerCase().includes(fc.toLowerCase())))
      .filter(Boolean),
    ...cityList.filter(
      (c: any) =>
        !featuredCities.some(fc => c?.name?.toLowerCase().includes(fc.toLowerCase()))
    ),
  ];
  const displayedCities = sortedCities.slice(0, 10);

  // Kỹ năng nổi bật
  const featuredSkills = ["reactjs", "nodejs", "java", "python", "php"];
  const sortedSkills = [
    ...featuredSkills
      .map(fs => skillList.find((s: any) => s?.name?.toLowerCase().includes(fs)))
      .filter(Boolean),
    ...skillList.filter(
      (s: any) => !featuredSkills.some(fs => s?.name?.toLowerCase().includes(fs))
    ),
  ];
  const displayedSkills = sortedSkills.slice(0, 10);

  const menuList = [
    {
      name: "Việc Làm IT",
      link: "#",
      children: [
        {
          name: "Việc làm IT theo kỹ năng",
          link: "#",
          children: skillList.map((skill: any) => ({
            name: skill.name,
            link: `/search?skill=${encodeURIComponent(skill.name)}`,
            children: null,
          })),
        },
        {
          name: "Việc làm IT theo thành phố",
          link: "#",
          children: cityList.map((city: any) => ({
            name: city.name,
            link: `/search?city=${encodeURIComponent(city.name)}`,
            children: null,
          })),
        },
      ],
    },
    {
      name: "Top Công Ty IT",
      link: "/company/list",
      children: companyList.length
        ? companyList.slice(0, 10).map((c: any) => ({
            name: c.companyName,
            link: `/search?company=${encodeURIComponent(c.companyName)}`,
            children: null,
          }))
        : [
            { name: "FPT Software", link: "/search?company=FPT Software", children: null },
            { name: "Techcombank", link: "/search?company=Techcombank", children: null },
            { name: "MB Bank", link: "/search?company=MB Bank", children: null },
            { name: "ABC.LTD", link: "/search?company=ABC.LTD", children: null },
          ],
    },
    {
      name: "Nhà Tuyển Dụng",
      link: "#",
      isLogin: false,
      children: [
        { name: "Đăng Nhập", link: "/company/login", children: null },
        { name: "Đăng Ký", link: "/company/register", children: null },
      ],
    },
  ];

  return (
    <nav
      className={
        "lg:block " +
        (showMenu
          ? "fixed top-0 left-0 w-[280px] h-[100vh] z-[999] bg-[#000056]"
          : "hidden")
      }
    >
      <ul className="flex gap-x-[30px] flex-wrap">
        {menuList.map((menu, index) => (
          <li
            key={index}
            className={
              "inline-flex lg:w-auto w-full lg:justify-start justify-between p-[10px] items-center gap-x-[8px] relative group/sub-1 flex-wrap " +
              (menu.isLogin !== undefined && menu.isLogin !== isLogin ? "hidden" : "")
            }
          >
            <Link href={menu.link} className="text-white font-[600] text-[16px]">
              {menu.name}
            </Link>
            {menu.children && <FaAngleDown className="text-white text-[16px]" />}

            {menu.children && (
              <ul className="lg:absolute relative lg:top-[100%] top-0 left-[0px] lg:w-[280px] w-full bg-gradient-to-r from-[#0a0a0a] via-[#0f172a] to-[#003366] hidden group-hover/sub-1:block z-[999]">
                {menu.children.map((menuSub1, indexSub1) => (
                  <li
                    key={indexSub1}
                    className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2 flex-wrap"
                  >
                    <Link
                      href={menuSub1.link}
                      className="text-white font-[600] text-[16px]"
                    >
                      {menuSub1.name}
                    </Link>

                    {/* Thành phố */}
                    {menuSub1.name === "Việc làm IT theo thành phố" ? (
                      <>
                        <FaAngleRight className="text-white text-[16px]" />
                        <div className="lg:absolute relative top-[0px] lg:left-[100%] left-0 lg:w-[500px] w-full bg-gradient-to-r from-[#0a0a0a] via-[#0f172a] to-[#003366] hidden group-hover/sub-2:block z-[999] p-3">
                          <div className="grid grid-cols-2 gap-2">
                            {displayedCities.map((city: any, idx: number) => (
                              <Link
                                key={idx}
                                href={`/search?city=${encodeURIComponent(city.name)}`}
                                className="block py-2 px-3 rounded hover:bg-[#000096] text-white font-[500] text-[15px]"
                              >
                                {city.name}
                              </Link>
                            ))}
                          </div>
                          {cityList.length > 10 && (
                            <Link
                              href="/job/job-by-city"
                              className="mt-2 block w-full text-center py-2 bg-[#000096] text-white font-[600] rounded"
                            >
                              Xem tất cả ({cityList.length})
                            </Link>
                          )}
                        </div>
                      </>
                    ) : menuSub1.name === "Việc làm IT theo kỹ năng" ? (
                      <>
                        <FaAngleRight className="text-white text-[16px]" />
                        <div className="lg:absolute relative top-[0px] lg:left-[100%] left-0 lg:w-[500px] w-full bg-gradient-to-r from-[#0a0a0a] via-[#0f172a] to-[#003366] hidden group-hover/sub-2:block z-[999] p-3">
                          <div className="grid grid-cols-2 gap-2">
                            {displayedSkills.map((skill: any, idx: number) => (
                              <Link
                                key={idx}
                                href={`/search?language=${encodeURIComponent(skill?.name ?? "")}`}
                                className="block py-2 px-3 rounded hover:bg-[#000096] text-white font-[500] text-[15px]"
                              >
                                {skill?.name ?? "Chưa có tên"}
                              </Link>
                            ))}
                          </div>
                          {skillList.length > 10 && (
                            <Link
                              href="/job/job-by-skill"
                              className="mt-2 block w-full text-center py-2 bg-[#000096] text-white font-[600] rounded"
                            >
                              Xem tất cả ({skillList.length})
                            </Link>
                          )}
                        </div>
                      </>
                    ) : (
                      menuSub1.children && (
                        <>
                          <FaAngleRight className="text-white text-[16px]" />
                          <ul className="lg:absolute relative top-[0px] lg:left-[100%] left-0 lg:w-[280px] w-full bg-gradient-to-r from-[#0a0a0a] via-[#0f172a] to-[#003366] hidden group-hover/sub-2:block z-[999]">
                            {menuSub1.children.map((menuSub2, indexSub2) => (
                              <li
                                key={indexSub2}
                                className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096]"
                              >
                                <Link
                                  href={menuSub2.link}
                                  className="text-white font-[600] text-[16px]"
                                >
                                  {menuSub2.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      )
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
