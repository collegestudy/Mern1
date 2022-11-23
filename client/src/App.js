import './App.css';
import {useState,useEffect} from 'react';
import Axios from "axios";
function App() {
  const[ListOfUsers, setListOfUsers]=useState([]);
//make api call to backend using useeffect

//create states to hold info sent by user
const[name, setName]= useState("")
const[age, setAge]= useState(0)
const[username, setUsername]= useState("")

useEffect(()=>
{
  Axios.get("http://localhost:3001/getUsers").then((response)=>{
    setListOfUsers(response.data) 
  })
},[]);

const createUser =()=>{
  console.log(name+","+age+","+username);
  Axios.post("http://localhost:3001/createUser",{
    name,age,username}).then((response)=>{
    setListOfUsers([...ListOfUsers,{name,age,username}]);
  });
}; 
  return (
    <div className="App">
      <div className="usersDisplay">
        {ListOfUsers.map((user)=>
        {
          return (
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Username: {user.username}</h1>
              </div>
          );

        })}
      </div>
      <div>
        <input type="text" 
        placeholder="Name..." 
        onChange={(calc)=>{//whenever ther's a change we call calc ftn
          setName(calc.target.value);
        }}/>
        <input type="number" 
        placeholder="Age..."
        onChange={(calc)=>{
          setAge(calc.target.value);
          }}/>
        <input type="text" 
        placeholder="Username..."
        onChange={(calc)=>{
          setUsername(calc.target.value);
          }}/>
        <button onClick={createUser}>Create User</button>
      </div>
     
    </div>
  );
}

export default App;
