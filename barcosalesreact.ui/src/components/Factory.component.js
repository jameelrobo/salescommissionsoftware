// import React, { Component } from "react";
// export default class Factory extends Component {
//   render() {
//     return <h2>You are in Factory page</h2>;
//   }
// }

import React, {Component} from 'react';
import axios from 'axios';

export default class Factory extends  Component{

    handleSubmit = e => {
        e.preventDefault();
        const data={
          FactoryName:this.factoryName,
          FactoryCategory:this. factoryCategory,
          PrincCode:this.princCode,
          CommissionRate:this.commissionRate,
          

        };
        console.log(data);
        axios.post("factory",data).then(
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
                    <h3>Add Factory</h3>

                    <div className='form-group'>
                        <label>Factory Name</label>
                        <input type='text' className='form-control' placeholder='Factory Name'
                        onChange={e=>this.factoryName=e.target.value} />
                    </div>

                    <div className='form-group'>
                        <label>Factory Category</label>
                        <input type='text' className='form-control' placeholder='Factory Category'
                        onChange={e=>this.fctoryCategory=e.target.value} />
                    </div>

                    
                    <div className='form-group'>
                        <label>Princ Code</label>
                        <input type='text' className='form-control' placeholder='Princ Code'
                        onChange={e=>this.princCode=e.target.value} />
                    </div>

                    <div className='form-group'>
                        <label>Commission Rate</label>
                        <input type='text' className='form-control' placeholder='Commission Rate'
                        onChange={e=>this.commissionRate=e.target.value} />
                    </div>
 

                    <label> </label>
                    
                    <div className="d-grid gap-2">

                    <button className="btn btn-primary" type="submit" >Sign Up</button>
                    </div>

                </form>
        )


        
    }
}