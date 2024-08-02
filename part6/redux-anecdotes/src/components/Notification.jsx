import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification.value)
  const dispatch = useDispatch()

  useEffect(() => {
    if (notification !== '' && notification) {
      const timer = setTimeout(() => {
        dispatch(clearNotification())      
      }, 5000)

      // Clear timeout if the component is unmounted before the timeout completes
      return () => clearTimeout(timer)
    }
  }, [notification, dispatch])

  if (!notification) {
    return null;
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification