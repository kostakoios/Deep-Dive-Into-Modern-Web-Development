import React from 'react'

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
                                <td>{user.name}</td>
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
