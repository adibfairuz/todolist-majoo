export const itemsSelector = (state) => {
    return state?.crud?.items?.data;
}

export const itemSelector = (state) => {
    return state?.crud?.item;
}