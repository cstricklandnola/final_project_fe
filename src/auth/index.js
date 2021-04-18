export const storeToken = (token) => {
    localStorage.setItem('token', JSON.stringify(token))
}

export const getToken = () => {
    return localStorage.getItem('token')
}

export const clearToken = () => {
    localStorage.removeItem('token')

}   