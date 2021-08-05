const options = {
    baseURL: 'http://192.168.1.3:3020'
}

function updateOptions (key, value) {
    options[key] = value
}

export { options, updateOptions }
