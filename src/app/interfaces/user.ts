export interface UserCreate {
  name: string
  surname: string
  email: string
}

export interface UserUpdate {
  name: string
  surname: string
}

export interface UserData {
  id: number
  name: string
  surname: string
  email: string
  createdAt: Date
  bookCount: number
  totalReadCount: number
}
export interface UserDetail {
  id: number
  name: string
  surname: string
  email: string
  createdAt: Date
  bookCount: number
  totalReadCount: number
  books: { [key: string]: number }
}
