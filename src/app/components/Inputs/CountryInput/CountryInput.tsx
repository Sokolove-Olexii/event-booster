"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./CountryInput.module.scss";
import DropdownIcon from "../../../../../public/icons/DropdownIcon.svg";
import countryMap from "../../../../data/countriesData/countriesData.json";

interface CountryInputProps {
  setCountryCode: (code: string) => void;
}

const countries = countryMap
  .filter((item) => item.country !== "Select a country")
  .sort((a, b) => a.country.localeCompare(b.country));

export default function CountryInput({ setCountryCode }: CountryInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [filter, setFilter] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = countries.filter((item) =>
    item.country.toLowerCase().includes(filter.toLowerCase()),
  );

  const handleSelect = (country: string, code: string) => {
    setSelected(country);
    setCountryCode(code);
    setFilter("");
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelected("");
    setFilter("");
    setCountryCode("");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setFilter("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.countryDropdown} ref={containerRef}>
      <button
        type="button"
        className={`${styles.countryDropdown__trigger} ${isOpen ? styles["countryDropdown__trigger--open"] : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span
          className={
            selected
              ? styles["countryDropdown__value--selected"]
              : styles.countryDropdown__placeholder
          }
        >
          {selected || "Choose country"}
        </span>
        <Image
          src={DropdownIcon}
          alt="DropdownIcon"
          width={15}
          height={10}
          className={`${styles.countryDropdown__icon} ${isOpen ? styles["countryDropdown__icon--open"] : ""}`}
        />
      </button>

      <div
        className={`${styles.countryDropdown__panel} ${isOpen ? styles["countryDropdown__panel--open"] : ""}`}
      >
        <div className={styles.countryDropdown__search}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.countryDropdown__searchInput}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            autoFocus={isOpen}
          />
        </div>

        <ul className={styles.countryDropdown__list}>
          {selected && (
            <li
              className={`${styles.countryDropdown__item} ${styles["countryDropdown__item--clear"]}`}
              onClick={handleClear}
            >
              ✕ Clear selection
            </li>
          )}
          {filtered.length > 0 ? (
            filtered.map((item, i) => (
              <li
                key={i}
                className={`${styles.countryDropdown__item} ${selected === item.country ? styles["countryDropdown__item--active"] : ""}`}
                onClick={() => handleSelect(item.country, item.countryCode)}
              >
                {item.country}
              </li>
            ))
          ) : (
            <li className={styles.countryDropdown__empty}>No results</li>
          )}
        </ul>
      </div>
    </div>
  );
}
