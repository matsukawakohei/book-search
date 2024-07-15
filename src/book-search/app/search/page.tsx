"use client";

import { ChangeEvent, useCallback, useState } from "react"
import { useSearchByKeyword } from "../lib/googleBooksApi";
import { GoogleBook } from "../lib/types/googleBooks";
import Image from "next/image";
import styles from "./page.module.css";
import { quaggaStart } from "../lib/quaggaApi";

export default function Search() {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const { execSearch, loading, books } = useSearchByKeyword();

  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const onClickExecSearch = () => {
    if (keyword) {
      execSearch(keyword, page);
    }
    console.log(books);
  }

  const onClickCodeSearch = () => {
    quaggaStart('a', 'aa');
  }
  return (
    <>
      <div>
        <input placeholder="書籍名・著者" value={keyword} onChange={onChangeKeyword} />
        <button type="button" onClick={onClickExecSearch}>検索</button>
        <button type="button" onClick={onClickCodeSearch}>バーコード検索</button>
      </div>
      <div>
        {
          loading
            ? (<p>検索中</p>)
            : (
              books.map((book) => (
                <div className={styles.bookArea} key={book.id}>
                  <div className={styles.bookImageArea}>
                    <Image
                      src={book.imageLink}
                      fill={true}
                      sizes="100%"
                      quality={100}
                      alt="Picture of the author"
                    />
                  </div>
                  <div className={styles.bookInfoArea}>
                    <p>タイトル: {book.title}</p>
                    <p>著者: {book.author}</p>
                    <p>出版社: {book.publisher}</p>
                    <p>出版日: {book.publishedDate}</p>
                    <p>貸し出し: </p>
                    <p>詳細</p>
                  </div>
                </div>
              ))
            )
        }
      </div>
      <div id="interactive" className="viewport"></div>
    </>
  )
}