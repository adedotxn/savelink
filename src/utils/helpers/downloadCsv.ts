
const arrayToCsv = (headers: any[], data: any[]) => {
    const csvRows = []
    const headerValues = headers.map(header => header.label);

    csvRows.push(headerValues.join(''))
    for(const row of data) {
        const rowValues = headers.map(header => {
            const escaped = ('' + row[header.key]).replace(/"/g, '\\"');
            return `${escaped}`
        })
        csvRows.push(rowValues.join(','))
    }
    return csvRows.join('\n')
}


export const header = [
    {label : "Identifier", key:"identifier"},
    {label : "Category", key:"category"},
    {label : "Title", key:"title"},
    {label : "Url", key:"url"},
    {label : "Bookmarked", key:"bookmarked"},
]

const download = (data: BlobPart, fileName = "savelink_data") => {
    const blob = new Blob([data], {type : 'text/csv'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url
    link.setAttribute('download', fileName + '.csv');
    link.click()
}

export const generateCSV = (header: any[], data: any[], fileName: string) => {
    const csvData = arrayToCsv(header, data)
    download(csvData, fileName)
}