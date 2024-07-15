export type GoogleBook = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  publishedDate: string;
  description: string;
  isbn: string;
  imageLink: string;
}

export type GoogleBooksSearchResponse = {
  items: {
    id: string;
    volumeInfo: {
      title: string;
      authors: string[];
      publisher: string;
      publishedDate: string;
      description: string;
      industryIdentifiers: {
        type: string;
        identifier: string;
      }[];
      imageLinks: {
        thumbnail: string;
      }
    }
  }[];
}