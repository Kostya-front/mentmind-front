export interface IColumn {
    name: string,
    required?: boolean,
    label: string,
    align: 'left' | 'center' | 'right',
    field: string,
    sortable?: boolean
}

export interface IPagination {
    sortBy: string,
    descending: boolean,
    page: number,
    rowsPerPage: number,
    rowsNumber: number
}

export interface ISearchQueryParams {
    skip: number
    take: number
    name: string
}

export interface IRequestParam {
    filter: string
    pagination: {
        page:number
        rowsNumber:number
        rowsPerPage: number
    }
}