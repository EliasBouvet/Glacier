import React, {useEffect, useState} from "react";
import Slider from '@material-ui/core/Slider';

export default function Turbine(){

  const [turbines,setTurbines] = useState([])
  const [value, setValue] = useState(0);
  const [current, setCurrent] = useState(null);



  var count = 0; 
  var output = "";
  const headers = {
    "GroupId": "Gruppe 16",
    "GroupKey": "iIw0LHgoTE6K/blLE5fv3g==",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": 
    "GET, POST, PUT, DELETE, OPTIONS, UPDATE",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  }

function get(){
  fetch("https://innafjord.azurewebsites.net/api/Turbines",{headers: headers})
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data)
      setTurbines(data)
    })
}
  
function put(id, capacity){
  return fetch("https://innafjord.azurewebsites.net/api/Turbines/" + id + "?capacityUsage=" + capacity ,{headers: headers , method : "fetch"})
    .then((data) => {
      console.log(data)
      setTurbines(data)
    })
}

const handleChange = (newValue, turbine) => {
    newValue = newValue/100;
    put(turbine.id, newValue).then(()=>{get()})
    console.log(newValue, turbine);

  };

  useEffect(() => {
    get()
  },[]);
  output =(
    turbines.map((turbine) => (
      // display a <div> element with the user.name and user.type
      // parent element needs to have a unique key
      <div key={turbine.id}>
        
        <p>Turbin-Nr: {count =count+1} </p>
        <p>Status: {(turbine.capacityUsage*100).toFixed(2)}%</p>
        <Slider  value={turbine.capacityUsage*100}  aria-labelledby="continuous-slider" onChangeCommitted={(e, newValue) =>handleChange(newValue, turbine)}
        
        
         max={100} 
        />
        
      </div>
    ),
    ))

return (
  
<div>
 {output}

</div>
)
}

