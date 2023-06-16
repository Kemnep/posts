export const getCountPages = (perPage:number, size:number) => {
    return Math.ceil(size / perPage)
}

export const getStartAndLimit = (page:number, perPage:number) => {
    return {
        start : (page - 1) * perPage,
        limit : perPage
    }
}

export const getPagesArray = (length:number) => {
    return new Array(length).fill('').map((_, index) => index + 1)
}