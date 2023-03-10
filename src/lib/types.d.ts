interface Post {
    id: number,
    title: string,
    body: string,
    author: string,
    created_at: Date,
    upvotes: Upvote[],
    downvotes: Downvote[],
}

interface Upvote {
    id: number,
    author: string
}

interface Downvote {
    id: number,
    author: string
}