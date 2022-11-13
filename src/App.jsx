import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    var data = JSON.stringify({
      query: `query Query($first: Int) {
        userCollection(first: $first) {
          edges {
            node {
              id
              name
              gender
            }
          }
        }
      }`,
      variables: {
        "first": 5
      }
    });

    var config = {
      method: 'post',
      url: import.meta.env.VITE_BASEURI,
      headers: {
        'x-api-key': import.meta.env.VITE_HEADER_VAL,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        setUsers(response.data.data.userCollection.edges)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  const UserData = ({ user }) => {
    return <form className='card'>
      <div>
        <label>
          ID:
        </label>
        <input type="text" defaultValue={user?.node?.id} />
      </div>
      <div >
        <label>
          Name:
        </label>
        <input type="text" defaultValue={user?.node?.name} />
      </div>
      <div>
        <label>
        Gender:
        </label>
        <input type="text" defaultValue={user?.node?.gender} />
      </div>
    </form>
  }

  return (
    <>
      {users.map(user => {
        return <UserData user={user} key={user.node.id} />
      })}

    </>
  )
}

export default App
