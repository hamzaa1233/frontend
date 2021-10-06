import { render } from '@testing-library/react';
import React from 'react';
import 'tachyons';


class Registraion extends React.Component {


        constructor(props){
            super(props);
            this.state = {
                email : '',
                pass :'',
                name : ''
            }
        }

        onNameChange = (event) =>{
            this.setState({name:event.target.value});
        }

        
        onEmailChange = (event) =>{
            this.setState({email:event.target.value});
        }

        
        onPassChange = (event) =>{
            this.setState({pass:event.target.value});
        }

         onSubmitRegisteration = () =>{
            fetch('https://stark-coast-13024.herokuapp.com/register',{
                method : 'post',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({
                    email:this.state.email,
                    pwd:this.state.pass,
                    name:this.state.name

                })
            }).then(response =>response.json())
            .then(user =>{
                if(user.id){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
        }

    // ({onRouteChange})
   render(){
    return(
       
 
        <article className="br3 ba dark-grey b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className = "pa4 black-80">
                <div className = "measure">

                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                 <legend className="f4 fw6 ph0 mh0">Register</legend>
                 <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                <input onChange = {this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
            </div>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input onChange = {this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
            </div>
            <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input onChange = {this.onPassChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
            </div>
            </fieldset>
            <div className="">
            <input onClick = {this.onSubmitRegisteration} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" type="submit" value="register"/>
            </div>
            <div className="lh-copy mt3">
        
            </div>

                </div>
            </main>
        </article>

);

   }
}


export default Registraion;

// import { returnStatement } from '@babel/types';
// import React from 'react';
// import 'tachyons';


// class Registraion extends React.Component {


//     constructor(props){

//         super(props);

//         this.state={

//             registerName:'',
//             registerEmail:'',
//             registerPwd:''
//         }
//     }

//     onNameChange = (event)=>{

//         this.setState({registerName:event.target.value});
//     }

//     onEmailChange = (event)=>{

//         this.setState({registerEmail:event.target.value});

//     }

//     onPassChange = (event)=>{


//         this.setState({registerPwd:event.target.value});
//     }

//    onSubmitRegister = () =>{

//     fetch('http://localhost:3000/register',{
//         method:'post',
//         headers:{'Content-Type':'application/json'},
//         body:JSON.stringify({

//             name:this.state.registerName,
//             email:this.state.registerEmail,
//             pwd:this.state.registerPwd
//         })
//     }).then(response => response.json());

//     console.log('name :',this.state.registerName);
//     console.log('email :',this.state.registerEmail);
//     console.log('pwd :',this.state.registerPwd);

//    }

//     render(){


//         return(

//         <article className="br3 ba dark-grey b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
//         <main className = "pa4 black-80">
//             <div className = "measure">

//             <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
//              <legend className="f4 fw6 ph0 mh0">Register</legend>
//              <div className="mt3">
//             <label  className="db fw6 lh-copy f6" htmlFor="name">Name</label>
//             <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
//         </div>
//         <div className="mt3">
//             <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
//             <input  onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
//         </div>
//         <div className="mv3">
//             <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
//             <input  onChange={this.onPassChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
//         </div>
//         </fieldset>
//         <div className="">
//         <input onClick = {this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" type="submit" value="register"/>
//         </div>
//         <div className="lh-copy mt3">
    
//         </div>

//             </div>
//         </main>
//     </article>
       
//         );

//     }


// }

// export default Registraion;