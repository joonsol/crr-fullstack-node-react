import { api } from './client'

export const getPosts = async () => {
    const { data } = await api.get('/api/posts')
    return Array.isArray(data) ? data : data.posts ?? []

} 
export const createPosts = async () => {
    const { data } = await api.get('/api/posts')
    return Array.isArray(data) ? data : data.posts ?? []

} 