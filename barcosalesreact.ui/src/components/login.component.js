import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        const data={
           
            Email:this.email,
            Password:this.password,
          

        };
        console.log(data);
        axios.post("login",data).then(
            res=>{
                console.log(res);
            }
        ).catch(
            err=>{
                console.log(err);

            }
        )
        
    };

    render(){

        return(

        
            <form onSubmit={this.handleSubmit}>
              <h3>Login</h3>
  
              <div className='form-group'>
                  <label>Email</label>
                  <input type='Email' className='form-control' placeholder='Email'
                  onChange={e=>this.email=e.target.value} />
              </div>

              <div className='form-group'>
                  <label>Password</label>
                  <input type='Password' className='form-control' placeholder='Password'
                  onChange={e=>this.password=e.target.value} />
              </div>

              <label> </label>
              
              <div className="d-grid gap-2">

              <button className="btn btn-primary" type="submit" >Login</button>
              </div>

            </form>
        )


        
    }
}