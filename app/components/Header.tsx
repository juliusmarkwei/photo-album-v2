import Image from "next/image";
import React, { FC } from "react";
import { PhotoCategories } from "../constants/categories";

interface HeaderProps {
    setSearchTerm: (term: string) => void;
    setQuery: (query: string) => void;
    query: string;
    setSelectedCategory: (category: string) => void;
}

const Header: FC<HeaderProps> = ({
    setSearchTerm,
    setQuery,
    query,
    setSelectedCategory,
}) => {
    return (
        <div className="flex items-center justify-between lg:justify-between w-full ">
            <input
                type="search"
                placeholder="Type here to search..."
                onChange={(e) => {
                    setSearchTerm("");
                    setQuery(e.target.value);
                }}
                className="h-12 lg:h-14 p-2 text-[22px] text-gray-200 focus:outline-0 w-[70%] overflow-ellipsis"
            />
            <button
                type="button"
                className={`rounded-2xl w-15 p-2 h-10  ${
                    query ? "flex" : "opacity-0"
                } items-center justify-center ${
                    !query ? "cursor-not-allowed" : "cursor-pointer"
                } `}
                onClick={() => {
                    setSearchTerm(query);
                    setSelectedCategory(PhotoCategories.All);
                }}
                disabled={!query}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 text-white"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
            </button>
            <Image
                src="https://i.pinimg.com/736x/43/a2/d3/43a2d3c73edc817e5e518068a0bd0e05.jpg"
                height={50}
                width={50}
                alt="profile"
                className="rounded-full w-10 h-10 lg:w-14 lg:h-14 cursor-pointer mr-1 mt-1 lg:mr-3 lg:mt-2"
            />
        </div>
    );
};

export default Header;
