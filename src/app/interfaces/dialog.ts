export interface BookCreate {
  title: string
  author: string
  isbn: string
  plot: string
}

export interface BookUpdate {
  title: string
  author: string
  plot: string
}

export interface BookData {
  title: string
  author: string
  isbn: string
  plot: string
  createdAt: Date
}

export interface BookDetail {
  title: string
  author: string
  isbn: string
  plot: string
  createdAt: Date
}
