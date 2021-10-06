import './App.css';
import { Component } from 'react';
import Particles  from 'react-particles-js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageBox from './Components/ImageBox/ImageBox';
import SignIn from './Components/SignIn/SignIn';
import Registration from './Components/Registration/Registration';
import Clarifai from 'clarifai';
import Rank from './Components/Rank/Rank';

// const app = new Clarifai.App({apiKey:'f01ebf1672d94fd2af05a1245e663d56'});

const initialSatate = {
  input:'',
  imageUrl:'',
  box:{},
  route:'signIn',
  isSignedIn:false,
  user:[
    {
      id:'',
      name:'',
      email:'',
      pwd:'',
      entries:0,
      joined:''
    }
  ]
}

class App extends Component{

  

  constructor(){
    super();
    this.state = initialSatate;

   
  }

   

  onRouteChange = (route) =>{
    if(route === "signIn"){

      this.setState({isSignedIn:false});
      this.setState(initialSatate);
      
    }
    else if(route === "home"){
      this.setState({isSignedIn:true});
      // this.onSignOut();
    }
    this.setState({route:route});
  }

    displayBox = (box) =>{
        this.setState({box:box});
    }
    // onSignOut = ()=>{

    //     this.setState({imageUrl:''});

    // }

    // onSubmit = () =>{
    //   this.setState({imageUrl:this.state.input});
    //   // a403429f2ddf4b49b307e318f00e528b

    //   app.models.predict('a403429f2ddf4b49b307e318f00e528b',this.state.input)
    //   .then(response =>{
    //     if(response){

    //       fetch('http://localhost:4000/image',{

    //         method : 'put',
    //         headers:{'Content-Type':'application/json'},
    //         body:JSON.stringify({
    //         id:this.state.user.id
    //         })
    
    //       }).then(response => response.json())
    //       .then(count => {
    //         this.setState(Object.assign(this.state.user,{entries:count}))
    //       }).catch(console.log)
    //     }
    //     this.displayBox(this.calFaceLoc(response))
    //   }).catch(err => console.log(err))


    //final
    onSubmit = () =>{
      this.setState({imageUrl:this.state.input});
      // a403429f2ddf4b49b307e318f00e528b

      fetch('https://stark-coast-13024.herokuapp.com/imageurl',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          input:this.state.input
        })
      }).then(response => response.json())
      .then(response =>{
        if(response){

          fetch('https://stark-coast-13024.herokuapp.com/image',{
    
            method : 'put',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
            id:this.state.user.id
            })
    
          }).then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user,{entries:count}))
          }).catch(console.log)
        }

        this.displayBox(this.calFaceLoc(response))
    

      }).catch(err=>console.log(err))

      // app.models.predict("a403429f2ddf4b49b307e318f00e528b",this.state.input).
      //   then(response=>this.displayBox(this.calFaceLoc(response)))
      //   .catch(err => console.log(err))

    }


       onInputChange = (event) =>{

      this.setState({input:event.target.value});
      
    }
    calFaceLoc = (data) =>{
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image =  document.getElementById('imageId');
      const width = Number(image.width);
      const height = Number(image.height);

      return{
        leftCol: clarifaiFace.left_col * width,
        topRow : clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow:height -  (clarifaiFace.bottom_row * height)
      }
    }

    loadUser = (data) =>{
      this.setState({
        user:{
          id:data.id,
          name:data.name,
          email:data.email,
          pwd:data.pwd,
          entries:data.entries,
          joined:data.joined
        }
      })
    }

  render(){

    return (
      <div className="App">
        <Particles className = "Particles"
                params={{
                    particles: {
                        number:{
                          value:150,
                          density:{
                            enable:true,
                            value_area:800
                          }
                        }
                    }
                }} />
              
              <Navigation onRouteChange = {this.onRouteChange}  isSignedIn = {this.state.isSignedIn} onSignOut = {this.onSignOut}/>  
            
             

        {
         this.state.route === 'signIn' 
            ?
            
              <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
             
          
            :(this.state.route === 'home'
                ?
                    <div>
                   
                  
                    <Logo/>
                    <Rank uname = {this.state.user.name} entries = {this.state.user.entries}/>
                    <ImageLinkForm  onInputChange = {this.onInputChange} onSubmit = {this.onSubmit}/>
                    <ImageBox box = {this.state.box} imageUrl = {this.state.imageUrl}/>
                
                  </div>

                  :
                  
                  <Registration loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>

            )
              
         
        }
      </div>
    );
  }

}

export default App;
 