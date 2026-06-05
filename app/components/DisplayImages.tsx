"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Masonry from "react-masonry-css";
import GalleryImage from "./GalleryImage";
import Pagination from "./Pagination";

interface DisplayImagesProps {
    filteredImages: {
        url: string;
        name: string;
        category: string;
        key: string;
    }[];
    isLoading: boolean;
}

const breakpointColumnsObj = {
    default: 6,
    1200: 5,
    992: 4,
    768: 3,
    500: 2,
};

const pageSize = 48;

const DisplayImages: React.FC<DisplayImagesProps> = ({
    filteredImages,
    isLoading,
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(filteredImages.length / pageSize));

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredImages]);

    const indexOfLastImage = currentPage * pageSize;
    const indexOfFirstImage = indexOfLastImage - pageSize;
    const currentImages = filteredImages.slice(
        indexOfFirstImage,
        indexOfLastImage
    );

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

    const handleDeletePhotoClick = (imageKey: string) => {
        toast(
            (t) => (
                <div className="lg:w-max rounded-lg bg-white p-4 shadow-lg">
                    <p className="mb-2 text-[15px] font-light lg:text-[20px]">
                        Are you sure you want to delete this?
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-2">
                        <button
                            className="cursor-pointer rounded-3xl bg-red-500 px-2 py-1 text-[12px] font-normal text-white lg:px-3 lg:py-2 lg:text-[20px]"
                            onClick={async () => {
                                toast.dismiss(t.id);
                                const deletingToastId =
                                    toast.loading("Deleting photo...");
                                await deletePhotoRequest(imageKey);
                                toast.dismiss(deletingToastId);
                                window.location.reload();
                            }}
                        >
                            Yes, Delete
                        </button>
                        <button
                            className="cursor-pointer rounded-3xl bg-gray-300 px-2 py-1 text-[12px] font-normal text-black lg:px-3 lg:py-2 lg:text-[20px]"
                            onClick={() => toast.dismiss(t.id)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ),
            {
                duration: 5000,
                style: { background: "transparent", boxShadow: "none", padding: 0 },
            }
        );
    };

    if (isLoading) {
        return (
            <section className="flex h-[60vh] w-full items-center justify-center">
                <div className="size-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            </section>
        );
    }

    if (filteredImages.length === 0) {
        return (
            <section className="flex h-[60vh] w-full flex-col items-center justify-center gap-2 text-center">
                <h1 className="text-lg font-medium text-white">No images found</h1>
                <p className="text-sm text-white/50">
                    Try another category or upload a new photo.
                </p>
            </section>
        );
    }

    return (
        <section className="w-full px-1 lg:px-2">
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="-ml-3 flex w-auto lg:-ml-4"
                columnClassName="pl-3 bg-clip-padding lg:pl-4"
            >
                {currentImages.map((image) => (
                    <GalleryImage
                        key={image.key}
                        url={image.url}
                        name={image.name}
                        onDelete={() => handleDeletePhotoClick(image.key)}
                    />
                ))}
            </Masonry>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
                onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            />
        </section>
    );
};

export default DisplayImages;
