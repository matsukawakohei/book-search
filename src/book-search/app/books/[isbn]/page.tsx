"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useSearchByIsbn } from "@/app/lib/googleBooksApi";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BookDetail() {
  const router = useRouter();
  const pathParams =  useParams();
  

  // TODO: isbnが取得できなかった場合の処理(undefinedが返ってくる)

  // TODO: isbnの書式がおかしい場合の処理
  
  const isbn = String(pathParams.isbn);
  const {execSearch, loading, book} = useSearchByIsbn();

  // TODO: これはAPIから取ってくるようにする
  const storedIsbnArray = [
    '9784010349175',
  ];

  /** 戻るボタン押下アクション */
  const onClickBackButton = () => {
    router.push('/search');
  }


  useEffect(() => {
    execSearch(isbn);
  }, [execSearch, isbn]);

  return (
    <div>
      <div>
        {
          loading
            ? (<p>検索中</p>)
            : book.id === undefined
              ? (<p>検索結果なし</p>)
              : (
                <div className={styles.bookArea}>
                  <div className={styles.bookImageArea}>
                    <Image
                      src={book.imageLink}
                      fill={true}
                      sizes="100%"
                      quality={100}
                      objectFit="contain"
                      priority={true}
                      alt="Picture of the author"
                    />
                  </div>
                  <div>
                    {
                      storedIsbnArray.includes(isbn)
                        ? (
                          <div className={styles.searchButton}>
                            <span>借りる</span>
                          </div>
                        )
                        : (
                          <div className={styles.searchButton}>
                            <span>リクエスト</span>
                          </div>
                        )
                    }
                  </div>
                  <div className={styles.bookInfoArea}>
                    <div className={styles.bookInfoRow}>
                      <div className={styles.bookInfoHeader}>タイトル</div>
                      <div className={styles.bookInfoBody}>{book.title}</div>
                    </div>
                    <div className={styles.bookInfoRow}>
                      <div className={styles.bookInfoHeader}>著者</div>
                      <div className={styles.bookInfoBody}>{book.author}</div>
                    </div>
                    <div className={styles.bookInfoRow}>
                      <div className={styles.bookInfoHeader}>出版社</div>
                      <div className={styles.bookInfoBody}>{book.publisher}</div>
                    </div>
                    <div className={styles.bookInfoRow}>
                      <div className={styles.bookInfoHeader}>出版日</div>
                      <div className={styles.bookInfoBody}>{book.publishedDate}</div>
                    </div>
                  </div>
                  <div className={styles.bookDescriptionArea}>
                    {book.description}
                  </div>
                </div>
              )
        }
      </div>
      <button type="button" onClick={onClickBackButton}>戻る</button>
    </div>
  )
}