import Link from 'next/link'
import styles from "./page.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <main>
      <div className={styles.info}>
        <p>お知らせ</p>
        <ul>
          <li>お知らせお知らせお知らせお知らせ</li>
          <li>お知らせお知らせお知らせお知らせお知らせお知らせお知らせお知らせ</li>
          <li>お知らせお知らせお知らせお知らせ</li>
        </ul>
      </div>
      <Link href="/search">
        <div className={styles.searchButton}>
          <span>書籍を検索</span>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </Link>
      <div className={styles.rentalList}>
        <p>借用リスト</p>
        <ul className={styles.rentalListStyle}>
          <li className={styles.rentalListRow}>
            <p>タイトルタイトル</p>
            <p>2024/12/31</p>
          </li>
          <li className={styles.rentalListRow}>
            <p>タイトルタイトル</p>
            <p>2024/12/31</p>
          </li>
          <li className={styles.rentalListRow}>
            <p>タイトルタイトル</p>
            <p>2024/12/31</p>
          </li>
        </ul>
        <div className={styles.linkButtonArea}>
          <div className={styles.linkButton}>
            <span>more</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
      </div>
      <div className={styles.rentalList}>
        <p>リクエスト</p>
        <ul className={styles.rentalListStyle}>
          <li className={styles.rentalListRow}>
            <p>タイトルタイトル</p>
            <p>2024/12/31</p>
          </li>
          <li className={styles.rentalListRow}>
            <p>タイトルタイトル</p>
            <p>2024/12/31</p>
          </li>
          <li className={styles.rentalListRow}>
            <p>タイトルタイトル</p>
            <p>2024/12/31</p>
          </li>
        </ul>
        <div className={styles.linkButtonArea}>
          <div className={styles.linkButton}>
            <span>more</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
      </div>
    </main>
  );
}
