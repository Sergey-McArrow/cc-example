import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Card } from '../../components/ui/card'
import { Skeleton } from '../../components/ui/skeleton'
import { useGetCommentsQuery, useGetPostQuery } from './post-details-api'
import styles from './post-details.module.css'

const PostDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const postId = Number(id)

  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = useGetPostQuery(postId)

  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
  } = useGetCommentsQuery(postId)

  useEffect(() => {
    if (postError) {
      toast.error('Failed to load post details')
    }
    if (commentsError) {
      toast.error('Failed to load comments')
    }
  }, [postError, commentsError])

  const handleBack = () => {
    navigate('/')
  }

  if (postLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Skeleton className={`${styles.loading} pulse`} />
        <Skeleton
          className={`${styles.loading} pulse`}
          style={{ height: '100px' }}
        />
      </div>
    )
  }

  if (!post) {
    return (
      <div className={styles.errorContainer}>
        <h3>Post not found</h3>
        <button className={styles.backButton} onClick={handleBack}>
          Return to posts
        </button>
      </div>
    )
  }

  return (
    <div className={styles.postDetails}>
      <div className={styles.navigation}>
        <button onClick={handleBack} className={styles.backButton}>
          ← Back to Posts
        </button>
      </div>

      <Card className={`${styles.card} fadeIn`}>
        <h2 className={styles.title}>{post.title}</h2>
        <div className={styles.desc}>{post.body}</div>
        <div className={styles.userId}>User ID: {post.userId}</div>
      </Card>

      <h3
        className={`${styles.commentsTitle} fadeIn`}
        style={{ animationDelay: '0.2s' }}
      >
        Comments ({comments?.length || 0})
      </h3>

      {commentsLoading ? (
        <Skeleton className={`${styles.loading} pulse`} />
      ) : comments && comments.length > 0 ? (
        <div className={styles.commentsList}>
          {comments.map((comment, index) => (
            <Card
              key={comment.id}
              className={`${styles.commentCard} fadeIn`}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className={styles.name}>{comment.name}</div>
              <div className={styles.email}>{comment.email}</div>
              <div className={styles.body}>{comment.body}</div>
            </Card>
          ))}
        </div>
      ) : (
        <div
          className={`${styles.noComments} fadeIn`}
          style={{ animationDelay: '0.2s' }}
        >
          No comments found for this post.
        </div>
      )}
    </div>
  )
}

export default PostDetails
