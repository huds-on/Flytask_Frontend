export function baseUrl() {
    const env = process.env.NODE_ENV || 'development'
    let baseURL = 'http://192.168.100.186:4000';
    if (env === 'production') {
        baseURL = process.env.API_URL || 'http://192.168.100.34:4000' // 'https://fse-le-maisonier.herokuapp.com/api';
    }
    else if (env === 'test') {

    }
    
    return baseURL;
}

export function apiUrl(url) {
    return `${baseUrl()}/api${url || ''}`;
}