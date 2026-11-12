import { ArrowLeft, BusFront, Users } from "lucide-react";
import type { Trip } from "../types/data";

export function TripCard({
  trip,
  onBook,
}: {
  trip: Trip;
  onBook: (trip: Trip) => void;
}) {
  return (
    <article className="trip-card">
      <div className="trip-head">
        <div className="company">
          <span
            className="company-logo"
            style={{ background: `${trip.color}18`, color: trip.color }}
          >
            {trip.logo}
          </span>
          <span>
            <b>{trip.company}</b>
            <small>★ 4.8 · موثوقة</small>
          </span>
        </div>
        <span className="trip-type">
          <BusFront size={14} /> VIP
        </span>
      </div>
      <div className="trip-body">
        <div className="timing">
          <span>
            <b>{trip.time}</b>
            <small>{trip.originName}</small>
          </span>
          <div className="route-line">
            <small>{trip.duration}</small>
            <i />
            <BusFront size={18} />
            <i />
            <small>مباشرة</small>
          </div>
          <span>
            <b>{trip.arrival}</b>
            <small>{trip.destinationName}</small>
          </span>
        </div>
        <div className="booking-price">
          <small>ابتداءً من</small>
          <b>
            {trip.price} <em>ل.س</em>
          </b>
          <small className="seats">
            <Users size={13} /> {trip.seats} مقاعد متبقية
          </small>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onBook(trip)}
          >
            اختار الرحلة <ArrowLeft size={14} />
          </button>
        </div>
      </div>
      <div className="trip-foot">
        <span>✓ واي فاي</span>
        <span>✓ تكييف</span>
        <span>✓ شحن USB</span>
        <small>رحلة مريحة وآمنة</small>
      </div>
    </article>
  );
}
