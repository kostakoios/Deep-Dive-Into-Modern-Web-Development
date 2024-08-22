import React from 'react'
import { Link } from 'react-router-dom'

const ShowUsersGeneralInfo = ({allUsersData}) => {
    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blgos created</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        allUsersData && allUsersData.map(user => {
                            return <tr key={user.id}>
                                <td>
                                <Link to={`/users/${user.id}`} >
                                {user.name}
                                </Link>
                                </td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        })
                    }
                </tbody>

            </table>

        </div>
    )
}

export default ShowUsersGeneralInfo
