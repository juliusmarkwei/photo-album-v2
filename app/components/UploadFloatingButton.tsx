"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import UploadImage from "@/public/2609994_6323.jpg";
import toast from "react-hot-toast";
import { PhotoCategories } from "../constants/categories";

const categories = Object.values(PhotoCategories);

const UploadFloatingButton = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [imageName, setImageName] = useState("");
    const [imageDescription, setImageDescription] = useState("");
    const [category, setCategory] = useState<string>(
        categories[categories.length - 1]
    );

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;
        setFile(selectedFile);
        setShowModal(true);
    };

    const handleSubmit = async () => {
        if (!file || !imageName.trim()) {
            toast.error("Please provide an image name.");
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("name", imageName);
            formData.append("category", category);
            formData.append("description", imageDescription);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                toast.success("Image uploaded successfully!");
                cancleImageUpload();
                window.location.reload();
            } else {
                toast.error("Failed to upload image.");
            }
        } catch (error) {
            console.error("Upload failed:", error);
            toast.error("Upload error occurred.");
        } finally {
            setUploading(false);
        }
    };

    const cancleImageUpload = () => {
        setShowModal(false);
        setFile(null);
        setImageName("");
        setCategory(categories[categories.length - 1]);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div>
            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
            />

            {/* Upload Button */}
            <button
                className="fixed bottom-15 lg:bottom-12 right-7 lg:right-30 bg-white text-black p-2 rounded-full shadow-lg focus:outline-none focus:ring-opacity-50"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
            >
                <Image
                    src={UploadImage}
                    alt="Upload"
                    width={48}
                    height={48}
                    className="w-10 h-10 lg:w-20 lg:h-20 object-contain rounded-full cursor-pointer"
                    title="Upload Photo"
                />
            </button>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 w-full backdrop-blur-sm">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] lg:w-[40%] lg:h-fit flex-col items-center">
                        <h2 className="text-2xl font-semibold mb-4">
                            Provide Image Details
                        </h2>

                        {/* Image Name Input */}
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full h-12 lg:h-16 p-2 lg:px-4 border rounded-md mb-4 lg:text-xl"
                            value={imageName}
                            onChange={(e) => setImageName(e.target.value)}
                        />

                        {/* Image Description Input */}
                        <textarea
                            placeholder="Description"
                            className="w-full h-12 lg:h-16 p-2 lg:px-4 border rounded-md mb-4 lg:text-xl"
                            value={imageDescription}
                            onChange={(e) =>
                                setImageDescription(e.target.value)
                            }
                        />

                        {/* Category Dropdown */}
                        <select
                            className="w-full p-2 lg:px-4 border rounded-md mb-4 h-12 lg:h-16 lg:text-xl"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>

                        {/* Buttons */}
                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-gray-400 text-white font-black px-4 py-2 rounded-md cursor-pointer"
                                onClick={() => cancleImageUpload()}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-[#2c7d7d] text-white font-black px-4 py-2 rounded-md cursor-pointer"
                                onClick={handleSubmit}
                                disabled={uploading}
                            >
                                {uploading ? "Uploading..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadFloatingButton;
