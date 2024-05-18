import React from 'react'
import { useState } from 'react'

const EditProfile = ({handleEdit}) => {
    var uData = JSON.parse(localStorage.getItem("userData"));
    var oldName = uData.name;
    var oldEmail = uData.email;
    const [values ,setValues] = useState({
        name: oldName,
        email: oldEmail, 
    }
    )
    
  return (
    <div>
        <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="font-semibold text-2xl">Edit Profile</h1>
        <form
          action="/profile"
          className="flex flex-col justify-center items-center gap-8"
          method="POST"
          onSubmit={(e) => handleEdit(e)}
        >
            <input
            type="text"
            id="name"
            name="name"
            placeholder="Username"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            className="input"
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            className="input"
          />
          <button type="submit" className="button bg-darkblue w-full">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile