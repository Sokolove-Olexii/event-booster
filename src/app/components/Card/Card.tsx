"use client";

import { useState } from "react";
import styles from "./Card.module.scss";
import Modal from "../modal/Modal";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import LocationIcon from "../../../../public/icons/LocationIcon.svg";

export interface EventItem {
  id: string;
  name: string;
  images?: { url: string }[];
  dates?: { start?: { localDate: string; localTime: string } };
  _embedded?: { venues?: { name: string }[]; attractions?: { name: string }[] };
  info?: string;
  description?: string;
  pleaseNote?: string;
  priceRanges?: { type: string; min: number; max: number; currency: string }[];
  url?: string;
}

export function EventCardSkeleton() {
  return (
    <li className={styles.card}>
      <div className={styles.card__imgContainer}>
        <Skeleton
          height="100%"
          borderRadius="50px 0px 50px 0px"
          baseColor="#2a2a2a"
          highlightColor="#404040"
        />
        <div className={styles.card__pink}></div>
      </div>
      <div className={styles.card__body}>
        <h2 className={styles.card__title}>
          <Skeleton width="80%" baseColor="#2a2a2a" highlightColor="#404040" />
        </h2>
        <p className={styles.card__startDate}>
          <Skeleton width="60%" baseColor="#2a2a2a" highlightColor="#404040" />
        </p>
        <p className={styles.card__venues} style={{ display: "block" }}>
          <Skeleton width="70%" baseColor="#2a2a2a" highlightColor="#404040" />
        </p>
      </div>
    </li>
  );
}

export default function EventCard({ item }: { item: EventItem }) {
  const imageUrl = item.images?.[0]?.url || "";
  const venueName = item._embedded?.venues?.[0]?.name || "Unknown Venue";
  const startDate = item.dates?.start?.localDate || "TBA";
  const infoText =
    item.info || item.description || item.pleaseNote || "No info available";
  const authorName = item._embedded?.attractions?.[0]?.name || item.name;
  const price = item.priceRanges?.[0]
    ? `${item.priceRanges[0].min}-${item.priceRanges[0].max} ${item.priceRanges[0].currency}`
    : "Price TBA";
  const ticketUrl = item.url || "#";
  const startTime = item.dates?.start?.localTime || "TBA";

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <li className={styles.card} onClick={() => setIsOpen(true)}>
        <div
          className={styles.card__imgContainer}
          style={{ backgroundImage: `url('${imageUrl}')` }}
        >
          <div className={styles.card__pink}></div>
        </div>
        <div className={styles.card__body}>
          <h2 className={styles.card__title}>{item.name}</h2>
          <p className={styles.card__startDate}>{startDate}</p>
          <div className={styles.card__venuesPosition}>
            <Image
              src={LocationIcon}
              alt="Location-icon"
              width={7}
              height={10}
            />
            <p className={styles.card__venues}>{venueName}</p>
          </div>
        </div>
      </li>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        imageUrl={imageUrl}
        venueName={venueName}
        startDate={startDate}
        infoText={infoText}
        authorName={authorName}
        price={price}
        ticketUrl={ticketUrl}
        startTime={startTime}
      />
    </>
  );
}
