import React from 'react'
import { useEffect, useState } from 'react'

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

function LeaderBoard() {

  const [allUsers, getAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/users');
      const data = await response.json();
      
      if(response.ok) {
        getAllUsers(data[0]);
        // console.log(data)
        // console.log(typeof data)
      }
      if(!response.ok) {
        console.log(data);
      }
    }

    fetchUsers();
    console.log(allUsers)
  }, [])

  return (
    <Container className='mt-5 className="pages"'>
      <Table striped>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Score</th>
            <th>Streak</th>
          </tr>
        </thead>
        <tbody>
        {allUsers.map((user) => (
          <tr key={user._id}>
            <td key="1">{user.username}</td>
            <td key="2">{user.email}</td>
            <td key="3">{user.score}</td>
            <td key="4">{user.streak}</td>
          </tr>
          ))}
        </tbody>
    </Table>
    
    </Container>
  )
}

export default LeaderBoard