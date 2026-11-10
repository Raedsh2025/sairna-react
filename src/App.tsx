import { useEffect } from "react";
import type { FormEvent } from "react";
import { Check } from "lucide-react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { Auth } from "./pages/Auth";
import { Booking } from "./pages/Booking";
import { Home } from "./pages/Home";
import { Results } from "./pages/Results";
import { Tracking } from "./pages/Tracking";
import { AdminAuth } from "./pages/AdminAuth";
import { Companies } from "./pages/Companies";
import { getCurrentUser, WEBSITE_TOKEN_KEY } from "./api/client";
import { useCities } from "./hooks/useCities";
import { useAppStore } from "./store/appStore";
import type { Trip, View } from "./types/data";
import { pathToView, viewPaths } from "./routing";

function App() {
  const routerNavigate = useNavigate();
  const location = useLocation();
  const {
    dark,
    from,
    to,
    date,
    selectedTrip,
    toast,
    setDark,
    setFrom,
    setTo,
    setDate,
    selectTrip,
    notify,
    clearToast,
    isAuthenticated,
    userName,
    setUserName,
    logout,
  } = useAppStore();
  const { cities } = useCities();
  const view = pathToView(location.pathname);
  const navigate = (next: View) => {
    routerNavigate(viewPaths[next]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);
  useEffect(() => {
    if (!from && cities[0]) setFrom(cities[0].name);
    if (!to && cities[1]) setTo(cities[1].name);
  }, [cities, from, setFrom, setTo, to]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(clearToast, 2800);
    return () => window.clearTimeout(timer);
  }, [toast, clearToast]);
  useEffect(() => {
    if (!isAuthenticated || userName || !localStorage.getItem(WEBSITE_TOKEN_KEY)) return;
    void getCurrentUser()
      .then((user) => setUserName(user.name))
      .catch((reason) => {
        if (reason?.status === 401) logout();
      });
  }, [isAuthenticated, logout, setUserName, userName]);

  const search = (event?: FormEvent) => {
    event?.preventDefault();
    if (!originId || !destinationId) {
      notify("جاري تحميل المدن، حاول البحث بعد لحظات");
      return;
    }
    if (from === to) return notify("اختار مدينتين مختلفتين للرحلة");
    navigate("results");
  };
  const book = (trip: Trip) => {
    selectTrip(trip);
    navigate("booking");
  };
  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const cityNames = cities.length ? cities.map((city) => city.name) : undefined;
  const originId = cities.find((city) => city.name === from)?.id;
  const destinationId = cities.find((city) => city.name === to)?.id;
  const commonProps = {
    from,
    to,
    date,
    setFrom,
    setTo,
    setDate,
    swap,
    navigate,
  };
  return (
    <div className="app-root motion-safe:animate-fade-in">
      {view !== "admin-login" && (
        <SiteHeader
          view={view}
          dark={dark}
          onTheme={() => setDark(!dark)}
          navigate={navigate}
        />
      )}
      <main>
        <Routes>
          <Route
            path={viewPaths.home}
            element={
              <Home
                {...{ onSearch: search }}
                {...commonProps}
                cityOptions={cityNames}
              />
            }
          />
          <Route
            path={viewPaths.results}
            element={
              <Results
                {...{ originId, destinationId, onSearch: search, onBook: book }}
                {...commonProps}
                cityOptions={cityNames}
              />
            }
          />
          <Route
            path={viewPaths.booking}
            element={selectedTrip ? (
              <Booking
                trip={selectedTrip}
                {...{ notify }}
                {...commonProps}
              />
            ) : <Navigate to={viewPaths.results} replace />}
          />
          <Route path={viewPaths.companies} element={<Companies />} />
          <Route
            path={viewPaths.tracking}
            element={<Tracking notify={notify} />}
          />
          <Route
            path={viewPaths.auth}
            element={<Auth {...{ notify, navigate }} />}
          />
          <Route
            path={viewPaths["admin-login"]}
            element={<AdminAuth {...{ notify, navigate }} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {view !== "auth" && view !== "admin-login" && (
        <SiteFooter navigate={navigate} />
      )}
      {toast && (
        <div className="toast motion-safe:animate-pop">
          <Check size={17} /> {toast}
        </div>
      )}
    </div>
  );
}

export default App;
