const Persons = ({showFilterArray, deletePerson}) => {
    return (
        <div>
            {showFilterArray.map(person => (
            <div key={person.id}>
                <p>
                {person.name} {person.number}
                </p>
                <button onClick={() => deletePerson(person.id)}>delete</button>
            </div>        
            ))}
        </div>
    )
}

export default Persons