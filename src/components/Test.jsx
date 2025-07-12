import React, { use, useState } from 'react'

function Test() {
    const [user,setUser]= useState({
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "admin",
    isActive: true,
    createdAt: "2025-06-01T10:15:00Z"
  }
 )
  function handleUpdate(){
   setUser({...user,name:"hello"})
  }
  console.log(user)
  return (
    <div>
      <button onClick={()=>setUser([...user,{ id: 4, name: "Eve Brown", email: "eve.brown@example.com", role: "user", isActive: true, createdAt: "2025-06-15T16:00:00Z" }])}>
           click
      </button>
      <button onClick={handleUpdate}>update</button>
      {/* {user.map((e)=><div>{e.name}</div>)} */}
    </div>
  )
}

export default Test
