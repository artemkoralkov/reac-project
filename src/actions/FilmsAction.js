export function addFilm(title, director, genre, description, poster) {
    return {
        type: 'ADD_FILM',
        payload: [title, director, genre, description, poster],
    }
}