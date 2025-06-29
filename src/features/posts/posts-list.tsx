import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { Card } from '../../components/ui/card'
import { Skeleton } from '../../components/ui/skeleton'
import { useGetPostsQuery } from './posts-api'
import styles from './posts-list.module.css'
import type { TPostSchema } from './posts-schema'

const PostsList = () => {
  const navigate = useNavigate()
  const { data, error, isLoading } = useGetPostsQuery()
  const user = useAppSelector(state => state.auth.user)

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`)
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className={`${styles.card} pulse`} />
          ))}
      </div>
    )
  }

  if (error) {
    return <div className={styles.errorMessage}>Error loading posts</div>
  }

  return (
    <div className={styles.container}>
      {user && <h2 className={styles.welcomeMessage}>Welcome, {user.name}!</h2>}
      <div className={styles.grid}>
        {data?.slice(0, 8).map((post: TPostSchema, index: number) => (
          <Card
            key={post.id}
            className={`${styles.card} fadeIn`}
            onClick={() => handlePostClick(post.id)}
            style={{
              cursor: 'pointer',
              animationDelay: `${index * 0.05}s`,
            }}
          >
            <div className={styles.img} />
            <div className={styles.title}>{post.title}</div>
            <div className={styles.desc}>
              {post.body.substring(0, 100)}
              {post.body.length > 100 ? '...' : ''}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default PostsList
