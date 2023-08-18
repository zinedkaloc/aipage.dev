"use client";
import { Rating, Star } from "@smastrom/react-rating";

interface ShowRateProps {
  rate: number;
}
export default function ShowRate({ rate }: ShowRateProps) {
  return (
    <Rating
      itemStyles={{
        itemShapes: Star,
        activeFillColor: "#faaf00",
        activeBoxBorderColor: "#faaf00",
        itemStrokeWidth: 1,
        activeStrokeColor: "transparent",
        inactiveStrokeColor: "#faaf00",
      }}
      readOnly
      className="!w-1/3 grid grid-cols-5"
      value={rate}
    />
  );
}
