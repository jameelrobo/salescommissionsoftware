import React, {Component} from 'react';
import axios from 'axios';

export default class Register extends  Component{

    handleSubmit = e => {
        e.preventDefault();
        const data={
            FirstName:this.firstName,
            LastName:this.lastName,
            Email:this.email,
            Password:this.password,
            ConfirmPassword:this.confirmPassword

        };
        console.log(data);
        axios.post("register",data).then(
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
                    <h3>Sign Up</h3>

                    <div className='form-group'>
                        <label>First Name</label>
                        <input type='text' className='form-control' placeholder='First Name'
                        onChange={e=>this.firstName=e.target.value} />
                    </div>

                    <div className='form-group'>
                        <label>Last Name</label>
                        <input type='text' className='form-control' placeholder='Last Name'
                        onChange={e=>this.lastName=e.target.value} />
                    </div>
        
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

                    <div className='form-group'>
                        <label>Confirm Password</label>
                        <input type='Password' className='form-control' placeholder='Confirm Password'
                        onChange={e=>this.confirmPassword=e.target.value} />
                    </div>

                    <label> </label>
                    
                    <div className="d-grid gap-2">

                    <button className="btn btn-primary" type="submit" >Sign Up</button>
                    </div>

                </form>
        )


        
    }
}