const Persons = ({showFilterArray}) => {
    return (
        <div>
            {showFilterArray.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
        </div>
    )
}

export default Persons