"use client";

import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Masonry from "react-masonry-css";

interface DisplayImagesProps {
    filteredImages: {
        url: string;
        name: string;
        category: string;
        key: string;
    }[];
    isLoading: boolean;
}

const DisplayImages: React.FC<DisplayImagesProps> = ({
    filteredImages,
    isLoading,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 48;

    const breakpointColumnsObj = {
        default: 6,
        1200: 5,
        992: 4,
        768: 3,
        500: 2,
    };

    const indexOfLastImage = currentPage * pageSize;
    const indexOfFirstImage = indexOfLastImage - pageSize;
    const currentImages = filteredImages.slice(
        indexOfFirstImage,
        indexOfLastImage
    );

    const nextPage = () => {
        if (indexOfLastImage < filteredImages.length)
            setCurrentPage((prev) => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleDeletePhotoClick = async (imageKey: string) => {
        toast(
            (t) => (
                <div className="lg:w-max bg-white rounded-lg shadow-lg p-4">
                    <p className="text-[15px] lg:text-[20px] font-light mb-2">
                        Are you sure you want to delete this?
                    </p>
                    <div className="flex gap-2 mt-2 items-center justify-center">
                        <button
                            className="bg-red-500 text-white text-[12px] lg:text-[20px] px-2 py-1 lg:px-3 lg:py-2 font-normal rounded-3xl cursor-pointer"
                            onClick={async () => {
                                toast.dismiss(t.id);

                                const deletingToastId =
                                    toast.loading("Deleting photo...");

                                await deletePhotoRequest(imageKey);

                                toast.dismiss(deletingToastId); // Remove "Deleting photo..."
                                window.location.reload();
                            }}
                        >
                            Yes, Delete
                        </button>
                        <button
                            className="bg-gray-300 text-black text-[12px] lg:text-[20px] px-2 py-1 lg:px-3 lg:py-2 font-normal rounded-3xl cursor-pointer"
                            onClick={() => toast.dismiss(t.id)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ),
            {
                duration: 5000,
                style: {
                    background: "transparent",
                    boxShadow: "none",
                    padding: 0,
                },
            }
        );
    };

    const deletePhotoRequest = async (imageKey: string) => {
        try {
            const encodedKey = encodeURIComponent(imageKey);
            const response = await fetch(`/api/photos?key=${encodedKey}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (data.success) {
                toast.success("Photo deleted successfully");
            } else {
                toast.error("Failed to delete photo");
            }
        } catch (error) {
            console.error("Error deleting photo:", error);
        }
    };

    return (
        <section className="h-full w-dvw mt-2">
            {!isLoading && filteredImages.length === 0 && (
                <div className="flex justify-center items-center w-full h-full my-auto">
                    <h1 className="text- font-medium text-white">
                        No images found
                    </h1>
                </div>
            )}

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex  gap-x-2 lg:gap-y-8 lg:gap-x-4 lg:px-2"
                columnClassName="flex flex-col"
            >
                {currentImages.map((image, index) => (
                    <div key={index} className="relative mb-4 group">
                        <Image
                            src={image.url}
                            alt={image.name}
                            width={300}
                            height={500}
                            className="object-cover rounded-lg transition duration-200 group-hover:blur-xs"
                            priority
                        />

                        {/* large devices */}
                        <span
                            className="hidden absolute bottom-2 lg:text-xl lg:font-semibold text-gray-950 px-2 py-1 rounded-2xl bg-gray-300 group-hover:lg:block"
                            title={image.name}
                        >
                            {image.name.length < 24
                                ? image.name
                                : image.name.slice(0, 24) + "..."}
                        </span>

                        {/* small devices */}
                        <span className="hidden absolute bottom-2 left-2 font-bold text-[12px] text-gray-950 px-2 py-1 rounded-2xl bg-gray-300 group-hover:block group-hover:lg:hidden">
                            {image.name.length < 20
                                ? image.name
                                : image.name.slice(0, 20) + "..."}
                        </span>

                        {/* love icon */}
                        <span className="hidden absolute top-2 right-4 bg-black cursor-pointer rounded-3xl group-hover:block">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                tabIndex={0}
                                className="size-10 text-white p-2 focus:bg-pink-500 transition-colors duration-200"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                />
                            </svg>
                        </span>

                        {/* delete icon */}
                        <span className="hidden absolute top-14 right-4 bg-red-500 cursor-pointer rounded-3xl group-hover:block">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-10 text-white p-2 focus:bg-red-500 transition-colors duration-200"
                                xlinkTitle="Delete"
                                onClick={() =>
                                    handleDeletePhotoClick(image.key)
                                }
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                />
                            </svg>
                        </span>
                    </div>
                ))}
            </Masonry>

            {isLoading && (
                <div className="flex justify-center items-center w-full h-full my-auto z-30">
                    <h3 className="text- font-medium text-white">Loading...</h3>
                </div>
            )}

            <div className="fixed bottom-2 w-full flex justify-center items-center gap-4 mt-6">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`h-10 w-14 lg:h-12 lg:w-16 flex items-center justify-center rounded-lg ${
                        currentPage === 1
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-white text-black hover:bg-gray-200"
                    }`}
                    title="Previous"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5 p-2 w-full h-full"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5 8.25 12l7.5-7.5"
                        />
                    </svg>
                </button>

                <button
                    onClick={nextPage}
                    disabled={indexOfLastImage >= filteredImages.length}
                    className={`h-10 w-14 lg:h-12 lg:w-16 flex items-center justify-center rounded-lg ${
                        indexOfLastImage >= filteredImages.length
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-white text-black hover:bg-gray-200"
                    }`}
                    title="Next"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5 p-2 w-full h-full"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default DisplayImages;
