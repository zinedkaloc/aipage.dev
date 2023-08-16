"use client";
import { cn, moneyFormat, stripePrice } from "@/utils/helpers";
import { useAuth } from "@/context/AuthContext";
import useSearchParams from "@/hooks/useSearchParams";
import { useState } from "react";
import { Product as ProductType } from "@/types";
import LoadingSpinner from "@/components/loadingSpinner";
import Button from "@/components/Button";

interface ProductProps {
  product: ProductType;
  className?: string;
}
export default function Product({ product, className }: ProductProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { set } = useSearchParams();

  async function getPaymentLink(priceId: string) {
    if (!user) return set("auth", "true");

    try {
      setLoading(true);
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({ priceId }),
      });

      const { url } = await res.json();
      location.href = url;
    } catch (e) {
      setLoading(false);
    }
  }

  return (
    <div
      className={cn(
        "border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200",
        className,
      )}
    >
      <div className="flex h-72 gap-5 flex-col">
        <div className="px-4 pt-4">
          <div className="flex flex-col gap-2 items-center justify-center text-center">
            <p className="text-gray-600 text-xs text-center py-2">
              {product.metadata.description}
            </p>
            <span className="font-display text-4xl font-semibold text-gray-900">
              {moneyFormat(stripePrice(product.unit_amount))}
            </span>
            <span className="text-xs text-gray-500">
              {product.nickname} Credits
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex w-full h-14 items-center justify-center border-b border-t border-gray-200 bg-gray-50">
            <p className="text-gray-600 text-xs text-center">
              {product.metadata.info}
            </p>
          </div>
          <div className="px-4 flex-1 flex items-center w-full justify-center">
            <Button
              disabled={loading}
              className="auth-btn w-full"
              variant="pill"
              onClick={() => getPaymentLink(product.id)}
            >
              {loading ? <LoadingSpinner /> : "Buy"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
