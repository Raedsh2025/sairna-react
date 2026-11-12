import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Check, ChevronLeft, CircleHelp } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { SearchForm } from "../components/SearchForm";
import { TripCard } from "../components/TripCard";
import { useTrips } from "../hooks/useTrips";
import type { SearchParams, Trip } from "../types/data";

type Props = SearchParams & {
  onSearch: (event?: FormEvent) => void;
  setFrom: (value: string) => void;
  setTo: (value: string) => void;
  setDate: (value: string) => void;
  swap: () => void;
  onBook: (trip: Trip) => void;
  cityOptions?: string[];
};

const EMPTY_TRIPS: Trip[] = [];

export function Results({
  from,
  to,
  date,
  originId,
  destinationId,
  onSearch,
  setFrom,
  setTo,
  setDate,
  swap,
  onBook,
  cityOptions,
}: Props) {
  const [filter, setFilter] = useState("الكل");
  const [searchParams] = useSearchParams();
  const companyFilter = searchParams.get("company");
  const { trips, loading, error, retry } = useTrips({
    from,
    to,
    date,
    originId,
    destinationId,
  });
  const availableTrips = trips.length ? trips : EMPTY_TRIPS;
  const filtered = useMemo(() => {
    const typeFiltered =
      filter === "الكل"
        ? availableTrips
        : availableTrips.filter((_, index) => index !== 1);
    return companyFilter
      ? typeFiltered.filter(
          (trip) =>
            String(trip.companyId ?? trip.company) === companyFilter ||
            trip.company === companyFilter,
        )
      : typeFiltered;
  }, [availableTrips, companyFilter, filter]);
  return (
    <div className="inner-main">
      <section className="page-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">الرئيسية</Link>
            <ChevronLeft size={13} />
            <span>الرحلات المتاحة</span>
          </div>
          <h1>
            رحلات{" "}
            <span>
              {from} ← {to}
            </span>
          </h1>
          <p>
            {date} · {availableTrips.length} رحلة متاحة لتختار منها
          </p>
        </div>
      </section>
      <div className="container results-content">
        <div className="compact-search">
          <SearchForm
            {...{
              onSearch,
              from,
              to,
              date,
              setFrom,
              setTo,
              setDate,
              swap,
              cityOptions,
            }}
          />
        </div>
        <div className="results-heading">
          <div>
            <h2>
              الرحلات المتاحة{" "}
              <span className="count-pill">{filtered.length} رحلة</span>
            </h2>
            <p>
              <Check size={14} /> مواعيد محدثة لحظياً
            </p>
          </div>
          <label className="sort">
            ترتيب حسب{" "}
            <select>
              <option>الأقرب موعداً</option>
              <option>السعر الأقل</option>
            </select>
          </label>
        </div>
        <div className="results-layout">
          <aside className="filters">
            <div className="filter-title">
              <strong>فلترة النتائج</strong>
              <button onClick={() => setFilter("الكل")}>إعادة ضبط</button>
            </div>
            <h4>نوع الرحلة</h4>
            {["الكل", "VIP", "عادية"].map((item) => (
              <label key={item}>
                <input
                  type="radio"
                  checked={filter === item}
                  onChange={() => setFilter(item)}
                />{" "}
                {item}
              </label>
            ))}
            <h4>وقت الانطلاق</h4>
            <label>
              <input type="checkbox" /> صباحاً
            </label>
            <label>
              <input type="checkbox" /> مساءً
            </label>
            <div className="filter-tip">
              <CircleHelp size={17} />
              <span>
                <b>نصيحة</b>
                <br />
                احجز بكير لتحصل على أفضل المقاعد.
              </span>
            </div>
          </aside>
          <div className="trip-list">
            {loading && <p className="api-state">جاري تحميل الرحلات…</p>}
            {error && (
              <div className="api-state error-state">
                تعذر تحميل الرحلات.{" "}
                <button onClick={() => void retry()}>إعادة المحاولة</button>
              </div>
            )}
            {!loading && filtered.length === 0 && !error && (
              <p className="api-state">لا توجد رحلات متاحة لهذا البحث.</p>
            )}
            {!loading &&
              filtered.map((trip) => (
                <TripCard key={trip.id} trip={trip} onBook={onBook} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
