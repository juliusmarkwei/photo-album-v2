"use client";

import Header from "./components/Header";
import Categories from "./components/Categories";
import UploadFloatingButton from "./components/UploadFloatingButton";
import Footer from "./components/Footer";
import DisplayImages from "./components/DisplayImages";
import { useEffect, useState } from "react";
import { PhotoCategories } from "./constants/categories";
import { shuffle } from "./utils/shuffelList";

type Image = {
    url: string;
    name: string;
    category: string;
    key: string;
};

export default function Home() {
    const [images, setImages] = useState<Image[]>([]);
    const [filteredImages, setFilteredImages] = useState<Image[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState<string>(
        PhotoCategories.All
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch("/api/photos");
                const data = await response.json();
                setImages(data.images);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchImages();
    }, []);

    // Filter images by category and search term
    useEffect(() => {
        const lastShuffleTime = parseInt(
            localStorage.getItem("lastShuffleTime") || "0",
            10
        );

        const _filteredImages = images.filter(
            (img) =>
                (selectedCategory === PhotoCategories.All ||
                    img.category === selectedCategory) &&
                (!searchTerm ||
                    img.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        const currentTime = Date.now();
        if (currentTime - lastShuffleTime > 10000) {
            shuffle(_filteredImages);
            localStorage.setItem("lastShuffleTime", currentTime.toString());
        }

        setFilteredImages(_filteredImages);
    }, [images, selectedCategory, searchTerm]);

    return (
        <div className="relative min-h-dvh w-full bg-black pb-24 font-[family-name:var(--font-geist-sans)]">
            <div className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/80 px-3 backdrop-blur-md lg:px-5">
                <Header
                    setSearchTerm={setSearchTerm}
                    setQuery={setQuery}
                    query={query}
                    count={images.length}
                />
                <Categories
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </div>

            <div className="px-3 pt-[140px] lg:px-5">
                <DisplayImages
                    filteredImages={filteredImages}
                    isLoading={isLoading}
                />
                <UploadFloatingButton />
                <Footer />
            </div>
        </div>
    );
}
