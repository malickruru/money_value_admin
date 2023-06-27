
//  formate la date et retourne une date en francais
// ex : getMonth('02-2023') = 'février 2023'
export const getMonth = (date) => {

    const month = {
        '01': 'janvier',
        '02': 'février',
        '03': 'mars',
        '04': 'avril',
        '05': 'mai',
        '06': 'juin',
        '07': 'juillet',
        '08': 'août',
        '09': 'septembre',
        '10': 'octobre',
        '11': 'novembre',
        '12': 'décembre'
    };


    return month[date.split('-')[0]] + ' ' + date.split('-')[1]
}