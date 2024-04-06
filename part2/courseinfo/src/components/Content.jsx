import Part from './Part'

const Content = ({ parts }) => {
    console.log('parts: ', parts)

    const total = parts.reduce((s, p) => s + p.exercises, 0)
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part}/>)}
            <strong>Total of {total} exercises</strong>
        </div>
    )
}

export default Content