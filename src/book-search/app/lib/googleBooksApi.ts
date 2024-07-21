import axios from "axios"
import { useCallback, useState } from "react";
import { GoogleBook, GoogleBooksSearchResponse } from "./types/googleBooks";

const baseUrl = 'https://www.googleapis.com/books/v1/volumes';

const maxResult = 30;

const lang = 'ja';

const bookOnly = 'books';

const ISBN10 = 'ISBN_10';
const ISBN13 = 'ISBN_13';
const OTHER = 'OTHER';

export const useSearchByKeyword = () => {
  const [books, setBooks] = useState<GoogleBook[]>([])

  const [loading, setLoading] = useState(false);

  const execSearch = useCallback((keyword: string, index :number) => {
    setLoading(true);
    const url = new URL(baseUrl);
    url.searchParams.set('q', keyword);
    url.searchParams.set('startIndex', String(index * maxResult));
    url.searchParams.set('maxResults', String(maxResult));
    url.searchParams.set('langRestrict', lang);
    // url.searchParams.set('printType', bookOnly);

    axios
      .get<GoogleBooksSearchResponse>(url.href)
      .then((res) => {
        if (res.data.items.length) {
          const books = res.data.items.filter((b) => {
            const isbn10 = b.volumeInfo.industryIdentifiers?.find((i) => i.type === ISBN10);
            if (isbn10) {
              return true
            }
            const isbn13 = b.volumeInfo.industryIdentifiers?.find((i) => i.type === ISBN13);
            return isbn13 !== undefined;
          }).map((b) => {
            const isbn10 = b.volumeInfo.industryIdentifiers?.find((i) => i.type === ISBN10);
            const isbn13 = b.volumeInfo.industryIdentifiers?.find((i) => i.type === ISBN13);
            const isbn = isbn10
              ? isbn10.identifier
              : isbn13
                ? isbn13.identifier
                : ''
            return {
              id: b.id,
              title: b.volumeInfo.title,
              author: b.volumeInfo.authors?.join(', '),
              publisher: b.volumeInfo.publisher,
              publishedDate: b.volumeInfo.publishedDate,
              description: b.volumeInfo.description,
              isbn,
              imageLink: b.volumeInfo.imageLinks.thumbnail,
            }
          });
          setBooks(books);
        }
      })
      .catch((e) => console.log('Failed GoogleBooksAPI exec search', e))
      .finally(() => setLoading(false));
  }, []);
  
  return { execSearch, loading, books };
}

export const useSearchByIsbn = () => {
  const [book, setBook] = useState({} as GoogleBook);

  const [loading, setLoading] = useState(true);

  const execSearch = useCallback((isbn: string) => {
    setLoading(true);
    const url = new URL(baseUrl);
    url.searchParams.set('q', `isbn:${isbn}`);

    axios
      .get<GoogleBooksSearchResponse>(url.href)
      .then((res) => {
        if (res.data.items.length) {
          const tmpBook = res.data.items[0];
          const book = {} as GoogleBook;
          book.id = tmpBook.id;
          book.title = tmpBook.volumeInfo.title;
          book.author = tmpBook.volumeInfo.authors?.join(', ');
          book.publisher = tmpBook.volumeInfo.publisher;
          book.publishedDate = tmpBook.volumeInfo.publishedDate;
          book.description = tmpBook.volumeInfo.description;
          book.imageLink = tmpBook.volumeInfo.imageLinks.thumbnail;
          setBook(book);
        }
      })
      .catch((e) => console.log('Failed GoogleBooksAPI exec search', e))
      .finally(() => setLoading(false));
  }, []);

  return { execSearch, loading, book };
}