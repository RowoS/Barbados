'use client';

import { useState, useEffect } from 'react';
import { getOrderReview, submitOrderReview, deleteOrderReview } from '../libs/review-actions';
import { CustomerOrder } from '../types/types';

interface Props {
  order: CustomerOrder;
  onClose: () => void;
  onSubmitted: () => void;
}

export function ReviewModal({ order, onClose, onSubmitted }: Props) {
  const [rating, setRating]       = useState(0);
  const [hovered, setHovered]     = useState(0);
  const [review, setReview]       = useState('');
  const [reviewId, setReviewId]   = useState<string | null>(null);
  const [isLoading, setLoading]   = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError]         = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getOrderReview(order.order_id);
        if (data?.review_id) {
          setReviewId(data.review_id);
          setRating(data.rating ?? 0);
          setReview(data.review ?? '');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [order.order_id]);

  async function handleSubmit() {
    if (rating === 0) { setError('Please select a rating.'); return; }
    setSubmitting(true);
    setError(null);
    try {
      await submitOrderReview({
        order_id:  order.order_id,
        store_id:  order.store_id,
        rating,
        review:    review.trim() || undefined,
      });
      onSubmitted();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!reviewId) return;
    setSubmitting(true);
    try {
      await deleteOrderReview(reviewId);
      onSubmitted();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.45)' }}
      onMouseDown={handleBackdrop}
    >
      <div
        className="bg-white rounded-2xl p-6 flex flex-col gap-4"
        style={{ width: 'min(440px, 100%)', fontFamily: "'DM Sans', sans-serif" }}
      >

        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-stone-800">Rate your experience</p>
            <p className="text-xs text-stone-400 mt-0.5">{order.store_name}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {isLoading ? (
          <p className="text-stone-400 text-sm text-center py-6">Loading...</p>
        ) : (
          <>

            <div className="flex items-center justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <svg
                    width="36" height="36" viewBox="0 0 24 24"
                    fill={(hovered || rating) >= star ? '#f97316' : 'none'}
                    stroke={(hovered || rating) >= star ? '#f97316' : '#d1d5db'}
                    strokeWidth="1.5"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </button>
              ))}
            </div>

            <p className="text-center text-xs text-stone-400 -mt-2">
              {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][hovered || rating] ?? ''}
            </p>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience (optional)..."
              rows={3}
              className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:ring-1 focus:ring-orange-400 resize-none"
            />

            {error && <p className="text-xs text-red-500">{error}</p>}

            <div className="flex items-center justify-between gap-2 pt-1">
              {reviewId && (
                <button
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="text-xs text-red-400 hover:text-red-500 transition-colors"
                >
                  Delete review
                </button>
              )}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-stone-200 text-stone-500 rounded-lg text-xs font-medium hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || rating === 0}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  {isSubmitting ? 'Submitting...' : reviewId ? 'Update Review' : 'Submit Review'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}