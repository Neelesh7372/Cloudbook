import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";

const Signup = (props) => {
  
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({name:"",email:"", password:"",cpassword:"",city:"",state:"",address:"",pin:""});

    const handleSubmit= async (e)=>{
        e.preventDefault();
         //API Call
    const {name,email,password,city,state,address,pin}=credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name,email,password,city,state,address,pin})
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
        //Save the auth token and redirect
        localStorage.setItem('token',json.authtoken);
        navigate('/home');
        props.showAlert("Account Created Successfully","success");
      }
      else{
        props.showAlert("Invalid Credentials","danger");
      }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };    

  return (
    <div className='container mt-3'>
      <h2 className='my-2'>Create an account to use Cloudbook</h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" id="name" onChange={onChange} required/>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" name="email" id="inputEmail4" onChange={onChange} required/>
        </div>
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" id="password" onChange={onChange} required minLength={5}/>
        </div>
        <div className="col-md-6">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange} required minLength={5}/>
        </div>
        <div className="col-12">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" name="address" placeholder="1234 Main St" onChange={onChange} required/>
        </div>
        <div className="col-md-6">
          <label htmlFor="city" className="form-label">City</label>
          <input type="text" className="form-control" id="city" name="city" onChange={onChange} required/>
        </div>
        <div className="col-md-4">
          <label htmlFor="state" className="form-label">State</label>
          <select id="state" name="state" onChange={onChange} className="form-select" required>
              <option>Andhra Pradesh</option>
              <option>Arunachal Pradesh</option>
              <option>Assam</option>	
              <option>Bihar</option>	
              <option>Chhattisgarh</option> 	
              <option>Goa</option>	
              <option>Gujarat</option>	
              <option>Haryana</option>	
              <option>Himachal Pradesh</option>
              <option>Jharkhand</option>
              <option>Karnataka</option>	
              <option>Kerala</option> 
              <option>Madhya Pradesh</option>	
              <option>Maharashtra	</option>          
              <option>Manipur</option>	
              <option>Meghalaya</option>	
              <option>Mizoram</option>	
              <option>Nagaland</option>	
              <option>Odisha</option>	
              <option>Punjab</option>	
              <option>Rajasthan</option>	
              <option>Sikkim</option>	
              <option>Tamil Nadu</option>	
              <option>Telangana</option>	
              <option>Tripura</option>	
              <option>Uttar Pradesh</option>             
              <option>Uttarakhand</option>
              <option>West Bengal</option>      
    </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="pin" className="form-label">Zip</label>
          <input type="text" className="form-control" id="pin" name="pin" onChange={onChange} required/>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="gridCheck"/>
            <label className="form-check-label" htmlFor="gridCheck">
              I agree to the <Link to="/">terms and conditions</Link>
            </label>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </div>
      </form>
  </div>
  )
}

export default Signup