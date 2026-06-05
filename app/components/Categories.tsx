import React from "react";
import { PhotoCategories } from "../constants/categories";

interface CategoriesProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const imageCategories = Object.values(PhotoCategories);

const Categories: React.FC<CategoriesProps> = ({
    selectedCategory,
    setSelectedCategory,
}) => {
    return (
        <section className="flex items-center w-full overflow-x-auto gap-2 py-1">
            {imageCategories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`shrink-0 rounded-full px-4 py-1.5 text-sm lg:text-base font-medium transition-colors ${
                            active
                                ? "bg-white text-black"
                                : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                        {cat}
                    </button>
                );
            })}
        </section>
    );
};

export default Categories;
