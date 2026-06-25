"use client";

import Image from "next/image";
import styles from "./SearchInput.module.scss";
import SearchIcon from "../../../../../public/icons/SearchIcon.svg";

interface SearchInputProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

export default function SearchInput({ keyword, setKeyword }: SearchInputProps) {
  return (
    <label className={styles.searchLabel}>
      <input
        type="text"
        placeholder="Start searching"
        className={styles.searchLabel__input}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Image
        src={SearchIcon}
        alt="SearchIcon"
        width={12}
        height={12}
        className={styles.searchLabel__icon}
      />
    </label>
  );
}
