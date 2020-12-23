import React from 'react';
const Routes = require('../../routes.js');

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInName: '',
      signInEmail: '',
      signInPassword: ''
    }
  }

  onNameChange = (event) => {
    this.setState({signInName: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignup = () => {
    const { signInName, signInEmail, signInPassword } = this.state;
    const { loadUser, onRouteChange } = this.props;
    fetch('http://localhost:3000/signup', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: signInName,
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          loadUser(user);
          onRouteChange(Routes.HOME);
        }
      })
  }

  render() {
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={this.onNameChange}/>
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={this.onEmailChange}/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={this.onPasswordChange}/>
              </div>
            </fieldset>
            <div className="">
              <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={this.onSubmitSignup}/>
            </div>
          </div>
        </main>
      </article>
    )
  }
}

export default Signup;
