
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CaretUp, List, X } from "phosphor-react";
import Link from "next/link";

import Image from "next/image";

import Sidebar from "./_components/Sidebar";
import { Suspense } from "react";
import Navbar from "./_components/Navbar";
import empty from "../../public/suggestions/icon-suggestions.svg";
import commentIcon from "../../public/shared/icon-comments.svg";
import mobilebg from '../../public/suggestions/mobile/background-header.png'

const Page = () => {
  const router = useRouter();
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [filteredData, setFilteredData] = useState([]);
 const [dropDown, setDropDown] = useState(false);
 // const filteredPosts = selectedCategory === 'All' ? feedbacks : feedbacks.filter((feedback) => feedback.category === selectedCategory )
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("./data.json");
        const data = await response.json();
        setPosts(data);
        setFilteredData(data.productRequests);
        setUserData(data.currentUser || {});
      } catch (error) {
        console.error("error fetching data", error);
      }
    }
    fetchData();
    setSelectedCategory("All");
  }, []);

  const handleCategoryFilter = (category) => {
    if (category === "All") {
      setFilteredData(posts.productRequests);
    } else {
      const filtered = posts.productRequests.filter(
        (request) => request.category === category
      );
      setFilteredData(filtered);
    }
    setSelectedCategory(category);
  };

 
    const popOut = () => {
      setDropDown(true);
    };
    const popIn = () => {
      setDropDown(false);
    }

  return ( 
      <div className="flex lg:flex-row sm:flex-col gap-x-8 sm:w-full sm:h-full">
        <div className=" sm:w-full h-16 relative sm:fixed lg:hidden z-[9999]">
          <Image
            src={mobilebg}
            alt=" mobile Background"
            objectFit=""
            className="w-full h-full object-cover   "
          />
          <div className=" inset-0 absolute pt-2 pl-4 flex flex-row justify-between pr-4">
            <div className="flex flex-col">
              <h1 className=" font-semibold text-white">Rahman's space</h1>
              <h2 className="text-gray-200 text-sm">Feedback Board</h2>
            </div>
           { !dropDown ? ( <List onClick={popOut} size={20} className="text-white mt-4 font-bold" /> ) : (
            <button onClick={popIn} className="h-8 text-white font-bold">
              <X size={20} />
            </button>)}
          </div>
        </div>
        <Navbar datalength={filteredData.length} />
        <div className="sm:hidden lg:flex">
          <Sidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        {dropDown && <Sidebar popIn={popIn} />}
        <Suspense fallback={"loading ur fucking data"}>
          <div className="flex flex-col gap-y-8 lg:mt-28 ml-8">
            {filteredData.length > 0 ? (
              filteredData.map((post) => {
              
                return (
                  <div
                    key={post._id}
                    className="flex flex-col items-center justify-center sm:w-auto"
                  >
                    <Link
                      href={`/login`}
                      className="border-2 border-blue-700 cursor-pointer flex flex-row justify-between gap-x-8 lg:w-[65rem] sm:w-[22.8rem] md:w-[43rem] sm:-ml-7 lg:p-4 sm:p-1 rounded-md bg-gray-100 sm:mt-4 lg:mt-0"
                    >
                      <div className="flex flex-row gap-x-8">
                        <button
                         
                          className={`flex lg:flex-col sm:flex-row sm:text-sm font-semibold  p-2  lg:h-12 sm:h-10 rounded-md`}
                        >
                          <CaretUp size={12} className="lg:ml-1" />{" "}
                          {post.upvotes}
                        </button>

                        <div className="flex flex-col gap-y-2">
                          <p className="text-black font-bold sm:text-sm">
                            {post.title}
                          </p>
                          <p className="text-blue-900 text-[0.8rem]">
                            {post.description}
                          </p>
                          <div className="rounded-md text-blue-900 font-bold bg-gray-200 p-2">
                            <p className="text-[0.7rem]"> {post.category}</p>
                          </div>
                        </div>
                      </div>
                      <p className="mr-16 flex flex-row gap-x-1 ">
                        <Image
                          src={commentIcon}
                          alt="comment icon"
                          className="lg:w-6 lg:h-5 sm:w-8 sm:h-4 sm:mt-1"
                        />
                        <span className="font-bold">
                          {post.comments?.length || 0}
                        </span>
                      </p>
                    </Link>
                  </div>
                );
              })
            ) : (
              <Image src={empty} alt="empty" className="ml-12 w-24 h-24" />
            )}
          </div>
        </Suspense>
      </div>
    
  );
};

export default Page;
