import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import { useState } from 'react';
import Clarifai from 'clarifai'
import Signin from './components/signin/Signin';
import Register from './components/register/Register';
import ParticlesBg from 'particles-bg'

function App() {
  const [input,setInput] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [box, setBox] = useState({
    leftCol: 0,
    topRow: 0,
    rightCol: 0,
    bottomRow: 0
  });
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  })

  const app = new Clarifai.App({
    apiKey: '3aa21a5505aa44d192266420debe9bb2'
   });

  function calculateCoordinates(data){
    const image = document.getElementById('image');
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const height = Number(image.height);
    const width = Number(image.width);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

   function createBox(object){
    setBox((prevState)=>({
      ...prevState,
      ...object
    }));
  }

  let onInputChange = (event)=>{
    setInput(event.target.value);
  }

  let onSubmit = ()=>{
    setImageURL(input);
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      input)
    .then(response => {
      if(response){
        fetch('https://agile-brushlands-26873.herokuapp.com/image',{
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
          },
          body: JSON.stringify({
            id: user.id
          })
        })
          .then(response => response.json())
          .then(user=>{
            setUser((prev)=>({
              ...prev,
              entries: user.entries
            }))
          })
          .catch(err => console.log('server error'));
      }
      createBox(calculateCoordinates(response))
    })
    .catch(err => console.log(err));
  }

  let onRouteChange = (route)=>{
    if(route==='home'){
      setIsSignedIn(true);
    }
    else{
      setImageURL('');
      setIsSignedIn(false);
    }
    setRoute(route);
  }

  let loadUser = (data)=>{
    const {id,email,name,joined,entries} = data;
    setUser((prevState)=>({
      ...prevState,
        id: id,
        name: name,
        email: email,
        entries: entries,
        joined: joined
    }))
  }

  return (
    <div className="App">
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn}/>
      {
      route==='home'
      ?<div>
        <Logo/>
        <Rank name={user.name} entries={user.entries}/>
        <ImageLinkForm
         onInputChange={onInputChange}
         onSubmit={onSubmit}
         />
         <FaceRecognition imageURL={imageURL} box={box}/>
       </div>
       :(
         route==='signin'
         ?<Signin loadUser={loadUser} onRouteChange={onRouteChange}/>
         :<Register onRouteChange={onRouteChange} loadUser={loadUser}/>
        ) 
      }
      <ParticlesBg type="polygon" bg={true} />
    </div>
  );
}

export default App;
