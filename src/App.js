import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import PostForm from './components/PostForm/PostForm';
import ImagePicker from './components/ImagePicker/ImagePicker';
import FinalizePost from './components/FinalizePost/FinalizePost';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import SavedList from './components/SavedList/SavedList';
import Unsplash, { toJson } from 'unsplash-js';
import './App.css';

const Routes = require('./routes.js');
const unsplash = new Unsplash({
  accessKey: 'pu1y33BI7rZUA8OZSzCQkLwZDj95RsWkIRfzduc2-jU',
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      urls: [],
      displayedImageIdx: -1,
      route: Routes.SIGN_IN,
      isSignedIn: false,
      isStateClean: true,
      user: {
        id: '',
        name: '',
        email: '',
        joined: '',
        saved_items: []
      }
    }
  }

  reloadSavedItems = async () => {
    const { user } = this.state
    const updated_items = await fetch('http://localhost:3000/saved_items/' + user.id, {
      method: 'GET'
    }).then(response => response.json());
    this.setState({ user: { ...user, saved_items: updated_items} });
  }

  loadUser = (data) => {
    this.setState(
    {isStateClean: false,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        saved_items: data.saved_items || [],
        joined: data.joined
      }
    })
  }

  displaySavedItem = (text, url) => {
    this.setState({text: text, urls: [url], displayedImageIdx: 0});
    this.onRouteChange(Routes.HOME);
  }

  onFindImage = async(event) => {
    const { text } = this.state;
    // Get the keywords after NLP analysis of text
    const resp = await fetch('http://localhost:3000/keywords', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        text: text
      })
    }).then(data => data.json());
    const query = resp.keywords;
    console.log(query);

    // Query Unsplash
    unsplash.search.photos(query)
    .then(toJson)
    .then(json => {
      const newUrls = json.results.map(img => img.urls.regular);
      this.setState({urls: newUrls, displayedImageIdx: 0}, function () {
        console.log(this.displayedImageIdx);});
      console.log(newUrls)
    });
  }

  setImageIdx = (idx)  => {
    this.setState({displayedImageIdx: idx})
    console.log(idx);
  }

  // Clean home from text and images
  cleanState = () => {
    this.setState({
      text: '',
      urls: [],
      displayedImageIdx: -1,
      isStateClean: true,
    })
  }

  onRouteChange = (route) => {
    const { isStateClean } = this.state;
    const isSignedIn = (route === Routes.SIGN_UP || route === Routes.SIGN_IN) ? false : true
    this.setState({route: route, isSignedIn: isSignedIn});
    if (!isSignedIn && !isStateClean) { // When signing out, clean home
      this.cleanState();
    }
  }

  copyTextToClipboard = () =>  {
    navigator.clipboard.writeText(this.state.text)
  }

  onTextChange = (event) => {
    this.setState({text: event.target.value})
  }

  deleteSavedItem = async (id) => {
    await fetch('http://localhost:3000/saved_items/' + id, {
      method: 'DELETE'
    });
    this.reloadSavedItems();
  }

  renameSavedItem = async (id, name) => {
    await fetch('http://localhost:3000/saved_items/rename', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: id,
        name: name
      })
    });
    this.reloadSavedItems();
  }

  saveNewItem = async () => {
    const { user, text, urls, displayedImageIdx } = this.state
    await fetch('http://localhost:3000/save', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: user.id,
        text: text,
        img_url: urls[displayedImageIdx]
      })
    });
    this.reloadSavedItems();
  }

  downloadImage = () => {
    const { urls, displayedImageIdx } = this.state;
    var element = document.createElement("a");
    var file = new Blob(
      [
        urls[displayedImageIdx]
      ],
      { type: "image/*" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "image.jpg";
    element.click();
  }

  renderRouteSwitch = () => {
    const { route, urls, user, text } = this.state;
    switch(route) {
      case Routes.SIGN_IN:
        return <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>;
      case Routes.SIGN_UP:
        return <Signup onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>;
      case Routes.SAVED_LIST:
        return <SavedList items={user.saved_items} deleteSavedItem={this.deleteSavedItem}
        renameSavedItem={this.renameSavedItem} displaySavedItem={this.displaySavedItem}/>;
      default: //Routes.HOME
        return <div>
                <PostForm onFindImage={this.onFindImage} onTextChange={this.onTextChange} text={text}/>
                <ImagePicker urls={urls} setImageIdx={this.setImageIdx} />
                {urls.length > 0 &&
                  <FinalizePost copyTextToClipboard={this.copyTextToClipboard} saveNewItem={this.saveNewItem}
                  downloadImage={this.downloadImage}/>
                }
              </div>;
    }
  }

  render() {
    const { isSignedIn } = this.state;
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        <Logo onClick={() => {if (isSignedIn) {this.onRouteChange(Routes.HOME);}}}/>
        {this.renderRouteSwitch()}
      </div>
    );
  }
}

export default App;
