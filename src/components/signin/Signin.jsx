import React from 'react'
import { useState } from 'react'
import ParticlesBg from 'particles-bg'

const Signin = ({onRouteChange, loadUser}) => {
  const [emaill, setEmaill] = useState('');
  const [passwordd, setPasswordd] = useState('');
  
  let onEmailChange = (event)=>{
    setEmaill(event.target.value);
  }

  let onPasswordChange = (event)=>{
    setPasswordd(event.target.value);
  }

  let onSubmit = ()=>{
    fetch('https://agile-brushlands-26873.herokuapp.com/signin',{
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        email: emaill,
        password: passwordd
      })
    })
      .then(res => res.json())
      .then(user => {
        if(user.id){
          loadUser(user);
          onRouteChange('home');
        }
      })
  }

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={onSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p onClick={()=>onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
            </div>
          </div>
        </main>
        <ParticlesBg type="polygon" bg={true} />
      </article>
  )
}

export default Signin
