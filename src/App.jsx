import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
const App = () => {
  const name = useRef(null);
  const email = useRef(null);
  const age = useRef(null);
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.users)
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const emailValidate = validateEmail()
  const validate = () => {
     if (name.current.value.trim() < 3) {
      alert("Name is not validate!")
      return false
     }
     
     if (emailValidate) {
      alert("Email is not valid!")
      return false
     }
     if (!Number(age.current.value.trim())) {
      alert("Age is not valid!")
      return false
     }
    return true;
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(name.current.value);
   const isValid = validate();
   if (isValid) {
    const user = {
      name: name.current.value,
      email: email.current.value,
      age: age.current.value,
      id: Date.now()
    }
    dispatch ({type:"ADD_USER", payload:user})
    name.current.value = null
    email.current.value = null
    age.current.value = null
   }
  }
  function handleDelete(id) {
    let isDelete = confirm("Do you won to delete this user")
    if (isDelete) {
      dispatch ({type: "DELETE_USER", payload: id})
    }
    
  }
  return (
    <>
      <div className="w-full ">
        <div className="form-section pt-6">
          <h1 className="text-center text-white font-bold text-2xl mb-2"> About Users </h1>
          <form onSubmit={handleSubmit} className="flex flex-col w-1/2 mx-auto gap-4 border p-4 bg-[#191122]">
            <input
              ref={name}
              type="text"
              className="border text-slate-200 text-xl border-solid-4 px-2 outline-none py-2  bg-transparent rounded"
              placeholder="Enter name"
            />
            <input
              ref={email}
              type="email"
              className="border border-solid-4 px-2 text-slate-200 text-xl outline-none py-2  bg-transparent rounded"
              placeholder="Enter email"
            />
            <input
              ref={age}
              type="number"
              className="border border-solid-4 px-2 outline-none py-2 text-slate-200 text-xl  bg-transparent  rounded"
              placeholder="Enter age"
            />
            <button className="bg-blue-500 cursor-pointer w-2/4 font-bold mx-auto rounded-md py-2 text-slate-100 hover:bg-blue-900 duration-300" >
              Submit
            </button>
          </form>
        </div>
        <div className="table-section pt-4 w-full ">
          <table className="w-1/2 mx-auto bg-[#191122] text-white border align-middle">
            <thead>
              <tr>
                <th className="border">ID</th>
                <th className="border">Name</th>
                <th className="border">Email</th>
                <th className="border">Age</th>
                <th className="border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                users.length > 0 && users.map((user, index) =>{
                  return (
                    <tr key={index}>
                <td className="border text-center">{index + 1}</td>
                <td className="border text-center">{user.name}</td>
                <td className="border text-center">{user.email}</td>
                <td className="border text-center">{user.age}</td>
                <td className="border text-center">
                  <span className="flex gap-4 justify-center">
                    <FaEdit className="cursor-pointer text-blue-600" />
                    <FaTrashAlt onClick={() => {handleDelete(user.id)}} className="cursor-pointer  text-red-600 " />
                  </span>
                </td>
              </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
