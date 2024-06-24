

export function createTableColumns<T>(data: any[]) {
    return data.reduce((acc, item) => {
        for(let key in item) {
            if(acc[key]) {
                acc[key].push(item[key])
            }
            else {
                acc[key] = [item[key]]
            }
        }
        return acc
    }, {})
}