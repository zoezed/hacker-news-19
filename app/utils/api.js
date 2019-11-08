const api = `https://hacker-news.firebaseio.com/v0`
const json = `.json?print=pretty`

function removeDeleted(posts) {
    return posts.filter(({deleted}) => deleted !== true)
}

function commentsOnly(posts) {
    return posts.filter(({ type }) => type === 'comment')
}

function postsOnly(posts) {
    return posts.filter(({ type }) => type === 'story')
}

export function getNews(item) {
    return fetch(`${api}/${item}${json}`)
        .then((res) => res.json())
        .then((ids) => {
            return ids.slice(0,50)
        })
        .then((ids) => Promise.all(ids.map(fetchItem)))
        .then((posts) => removeDeleted(posts))
}

export function fetchComments(ids) {
    return Promise.all(ids.map(fetchItem))
        .then((comments) => removeDeleted(commentsOnly(comments)))
}

export function fetchItem(id) {
    return fetch(`${api}/item/${id}${json}`)
        .then((res) => res.json())
        
}

export function fetchPosts(ids) {
    return Promise.all(ids.map((item) => fetchItem(item)))
        .then((posts) => removeDeleted(postsOnly(posts)))
}

export function fetchUser(id) {
    return fetch(`${api}/user/${id}${json}`)
        .then((res) => res.json())
}
