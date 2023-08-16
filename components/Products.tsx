"use client";
import { Product as ProductType } from "@/types";
import Product from "@/components/Product";
import { cn } from "@/utils/helpers";

export default function Products({ products }: { products: ProductType[] }) {
  return (
    <div className="space-y-10 py-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:flex-col sm:align-center">
        <h1 className="text-4xl text-center font-extrabold text-gray-900 sm:text-center">
          Support Our Mission
        </h1>
        <p className="text-center mt-5 text-lg text-gray-500 sm:text-center">
          By choosing a plan, you’re not just building beautiful landing pages —
          you’re becoming a cherished part of our journey and mission. Fuel our
          work so we can continue empowering your digital dreams. Every credit
          counts!
        </p>
      </div>
      <div className="grid sm:grid-cols-3 gap-6">
        {products
          .sort((a, b) => a.unit_amount - b.unit_amount)
          .map((product, index) => (
            <Product
              className={cn(index === 1 && "scale-110")}
              key={product.id}
              product={product}
            />
          ))}
      </div>
    </div>
  );
}
