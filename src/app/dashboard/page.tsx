"use client";

import { useState, useEffect, useMemo } from "react";
import debounce from "debounce";
import SearchInput from "../components/Inputs/SearchInput/SearchInput";
import CountryInput from "../components/Inputs/CountryInput/CountryInput";
import EventCard, { EventItem, EventCardSkeleton } from "../components/Card/Card";
import styles from "./page.module.scss";

const API_KEY = "w3FH1BQO5lCqAh3eiT9RxTwR4I3QrFdE";

export default function DashboardPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [keyword, setKeyword] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = useMemo(
    () =>
      debounce(async (keyWord: string, countryCode: string) => {
        setIsLoading(true);
        if (!keyWord.trim() && !countryCode.trim()) {
          setEvents([]);
          setIsLoading(false);
          return;
        }
        try {
          let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}`;
          if (keyWord.trim()) url += `&keyword=${keyWord.trim()}`;
          if (countryCode.trim()) url += `&countryCode=${countryCode.trim()}`;

          const response = await fetch(url);
          const data = await response.json();
          const embeddedEv = data._embedded?.events || [];
          setEvents(embeddedEv);
        } catch (error) {
          console.error(error);
          setEvents([]);
        } finally {
          setIsLoading(false);
        }
      }, 400),
    [],
  );

  useEffect(() => {
    fetchEvents(keyword, countryCode);
  }, [keyword, countryCode, fetchEvents]);

  return (
    <div className={styles.dashboardPage}>
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            FIND BEST EVENTS
            <br />
            AROUND THE WORLD
          </h1>
          <div className={styles.heroInputs}>
            <SearchInput keyword={keyword} setKeyword={setKeyword} />
            <CountryInput setCountryCode={setCountryCode} />
          </div>
        </div>
      </section>

      <section className={styles.cardsSection}>
        <ul className={styles.cardsGrid}>
          {isLoading
            ? [...Array(6)].map((_, i) => <EventCardSkeleton key={i} />)
            : events.map((event) => (
                <EventCard key={event.id} item={event} />
              ))}
        </ul>
      </section>
    </div>
  );
}
