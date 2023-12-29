/**
 * Used for Spring pagination
 * - list: Fetched list of entities
 * - num: The count of all entities existing in repository (this is not the number of fetched entites!)
 */
export interface PageConverter<T> {
  list: Array<T>,
  num: number
}

/**
 *  Used to build HTTP Parameters for GET requests that return a collection of elements.
 * - page: page number
 * - num : number of elements to fetch
 * - sort: field to sort and sort direction (e.g. "name asc / surname desc")
 * - keyword: keyword used for filtering
 */
export interface FetchParams {
  page: number,
  num: number,
  sort: string,
  keyword: string,
}
