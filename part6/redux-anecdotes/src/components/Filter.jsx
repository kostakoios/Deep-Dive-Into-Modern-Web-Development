import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        event.preventDefault()
        const filterContent = event.target.value
        dispatch(filterChange(filterContent))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter