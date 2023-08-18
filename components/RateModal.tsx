"use client";
import useSearchParams from "@/hooks/useSearchParams";
import Modal from "@/components/Modal";
import { Rating as ReactRating } from "@smastrom/react-rating";
import { FormEvent, useState } from "react";
import Button from "@/components/Button";
import { Star } from "@smastrom/react-rating";
import LoadingSpinner from "@/components/loadingSpinner";

export default function RateModal({ show }: { show: boolean }) {
  const { deleteByKey, has } = useSearchParams();
  const [rating, setRating] = useState(0);
  const [ratingText, setRatingText] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  function close() {
    deleteByKey("rateModal");
    setRating(0);
    setRatingText("");
  }

  async function submitHandler(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setHasError(false);
    try {
      const res = await fetch("/api/message", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          ratingText,
        }),
      });
      if (res.ok) close();
      else {
        setHasError(true);
      }
    } catch (e) {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      close={close}
      isOpen={has("rateModal")}
      className="p-0 sm:w-[500px] w-[96%]"
    >
      <form onSubmit={submitHandler}>
        <div className="p-4 space-y-4">
          <h2 className="text-2xl font-medium text-center pt-6">
            <span className="text-6xl pb-3 block">🎉</span>
            Rate your experience
          </h2>
          <div className="flex items-center justify-center">
            <ReactRating
              itemStyles={{
                itemShapes: Star,
                activeFillColor: "#ffdc17",
                activeBoxBorderColor: "#faaf00",
                itemStrokeWidth: 1,
                activeStrokeColor: "transparent",
                inactiveFillColor: "#d7d7d7",
                inactiveStrokeColor: "transparent",
              }}
              className="!w-3/5 mb-1"
              value={rating}
              onChange={setRating}
            />
          </div>
        </div>
        <div className="bg-gray-50 p-4 border-t space-y-4">
          <p className="text-sm text-gray-500">
            Your feedback matters! Let us know how your experience was while
            crafting your landing page with AI
          </p>
          <textarea
            rows={3}
            name="feedback"
            value={ratingText}
            onChange={(e) => setRatingText(e.target.value)}
            className="w-full p-2 border !border-gray-200 resize-none rounded !outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Tell us more about your experience..."
          />
          {hasError && (
            <h2 className="text-red-500 text-center text-sm">
              There was an error submitting your feedback. Please try again
              later.
            </h2>
          )}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="light" onClick={close}>
              Cancel
            </Button>
            <Button
              className="gap-2"
              type="submit"
              disabled={loading}
              variant="default"
            >
              {loading && <LoadingSpinner className="h-4 w-4" />}
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
