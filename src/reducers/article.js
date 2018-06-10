export default (state = [], payload) => {
    switch(payload.type) {
        case 'add':
            return [...payload.item];
        default:
            return state;
    }
}