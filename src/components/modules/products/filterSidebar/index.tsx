"use client"
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const FilterSidebar = () => {
  const [price, setPrice] = useState([0, 1000]);

  return (
    <div className="w-64 bg-white p-4 rounded-xl shadow-md">
      {/* Filter by Price */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Filter By Price</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 border p-2 rounded"
          />
        </div>
        <Slider
          defaultValue={price}
          min={0}
          max={1000}
          step={10}
          className="mt-3"
          onValueChange={(val) => setPrice(val)}
        />
        <p className="text-sm mt-1">${price[0]} - ${price[1]}</p>
      </div>

      {/* Product Types */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Product Types</h3>
        {[
          "Laptop & Accessories",
          "Computers-PC",
          "Speakers & Headset",
          "Keyboards & Mouse",
          "Camera",
          "Video Recording",
          "Tablets",
          "Table Lights",
        ].map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <Checkbox id={type} />
            <label htmlFor={type} className="text-sm">
              {type}
            </label>
          </div>
        ))}
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Brands</h3>
        {[
          { name: "HP", count: 15 },
          { name: "Apple", count: 58 },
          { name: "Dell", count: 64 },
          { name: "Asus", count: 11 },
          { name: "Camera", count: 20 },
        ].map((brand) => (
          <div key={brand.name} className="flex items-center space-x-2">
            <Checkbox id={brand.name} />
            <label htmlFor={brand.name} className="text-sm">
              {brand.name} ({brand.count})
            </label>
          </div>
        ))}
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Rating</h3>
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center space-x-2">
            <Checkbox id={`rating-${rating}`} />
            <label htmlFor={`rating-${rating}`} className="flex text-sm">
              {[...Array(rating)].map((_, i) => (
                <span key={i} className="text-yellow-500">★</span>
              ))}
              {[...Array(5 - rating)].map((_, i) => (
                <span key={i} className="text-gray-300">★</span>
              ))}
            </label>
          </div>
        ))}
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Availability</h3>
        {["In Stock", "Pre Order", "Upcoming"].map((status) => (
          <div key={status} className="flex items-center space-x-2">
            <Checkbox id={status} />
            <label htmlFor={status} className="text-sm">
              {status}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
