export const formartSchedule = (e) => {
    if (e === 1) {
        return 'Mañana'
    } else if (e === 2) {
        return 'Tarde'
    } else {
        return 'Unica'
    } 
}