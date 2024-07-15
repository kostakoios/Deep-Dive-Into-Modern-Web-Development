const Notification = ({ message, classname }) => {
    console.log('now I am inside notificaiton')
    if (message === null) {
        return null
    }
    const styles = {
        message: {
            "color": classname === 'error' ? "red" : "green", 
            "background": "lightgrey",
            "fontSize": "20px",
            "borderStyle": "solid",
            "borderRadius": "5px",
            "borderColor": classname === 'error' ? "red" : "green", 
            "padding": "10px",
            "marginBottom": "10px"
        }
    }
  
    return (
        <div style={styles.message}>
            {message}
        </div>
    )
}

export default Notification
