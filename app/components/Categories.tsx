import React, { useState } from "react";
import { PhotoCategories } from "../constants/categories";

interface CategoriesProps {
    setSelectedCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ setSelectedCategory }) => {
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const imageCategories = Object.values(PhotoCategories);

    return (
        <section className="flex items-center w-dvw overflow-x-scroll gap-2 my-2 lg:my-4">
            {imageCategories.map((cat: string, index: number) => (
                <div
                    key={index}
                    tabIndex={0}
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(null)}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-gray-200 text-[16px] lg:text-[20px] px-4 py-1 font-light lg:font-medium rounded-xl cursor-pointer ${
                        focusedIndex === index
                            ? "text-white bg-gray-600 font-semibold"
                            : ""
                    }`}
                >
                    {cat}
                </div>
            ))}
        </section>
    );
};

export default Categories;
