import Part from './Part'

const Content = ({ parts }) => {
    console.log('parts: ', parts)

    let total = 0
    parts.map(part => total += part.exercises)
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part}/>)}
            <strong>Total of {total} exercises</strong>
        </div>
    )
}

export default Content