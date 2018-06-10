export default (state={}, item) => {
    switch(item.type) {
        case 'ADD':
            return {data: item.data}
        case 'ERR':
            return {err: item.data}
        default:
            return state
    }
}