const Notification = ({message}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  console.log('message inside the notification: ', message)
  if (!message) return null
  
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
