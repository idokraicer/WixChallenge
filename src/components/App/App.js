import React from 'react';
import './App.scss';
import Gallery from '../Gallery';
import FontAwesome from 'react-fontawesome';
import Image from 'components/Image';
// import "../../../node_modules/react-image-gallery/styles/scss/image-gallery.scss";
// import "react-image-gallery/styles/css/image-gallery.css";

class App extends React.Component {
   static propTypes = {
   };

  constructor() {
    super();
    this.state = {
      tag: 'sea',
      trigger: false,
      size: '0'
    };
    // this.size = '0';
    this.infiniteScroll = JSON.parse(localStorage.getItem('InfScrollToggle')) === true;
    this.sideBar={
      
    }
    JSON.parse(localStorage.getItem('favList')) === null ? localStorage.setItem('favList', JSON.stringify([])) : '';
    
  }

  handleSidebarClick() {
    if(!this.state.trigger)
    {
      this.setState({size: '25%',
    trigger: !this.state.trigger})
    }
    else
    {
      this.setState({size: '0',
    trigger: !this.state.trigger})
    }
    
    console.log(this.state.trigger)
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  removeFromList(anObject) {
    let images = [...JSON.parse(localStorage.getItem('favList'))];
    let newList = [];
    console.log("Removing ",anObject ," from favorites.");
    images.map(obj => {
      if(!(obj.dto.id === anObject.dto.id)) {
        
        newList = [...newList, obj];
      }
    });
    localStorage.setItem('favList', JSON.stringify(newList));
  }

  fullScreen(anObject){
    window.open(this.urlFromDto(anObject.dto))
  }


  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }


  handleScroll = e => {
    let element = e.target.scrollingElement;
    if( (element.scrollHeight - element.scrollTop - element.clientHeight === 0) && this.infiniteScroll) {
      console.log("Reached bottom App");
      this.setState({tag: this.state.tag});
    }
  }
  
  


  render() {

  

    return (

      <div className="app-root">
        
        <div id='sideBar' className='sidebar' style={{
          width: this.state.size
        }} >
          
          <h1 style={{color: 'white'}}><div style={{top: 0, left: 0}}>
          <FontAwesome name='far fa-arrow-alt-circle-left' className='image-icon' title='close list' onClick={() => this.handleSidebarClick()} 
          />
          </div> Favorite Pics </h1>
          {
            JSON.parse(localStorage.getItem('favList')).map((obj => {
              return (
                <div className='image-root' key={obj.dto.id} style={{
                  backgroundImage: 'url(' + this.urlFromDto(obj.dto) + ')',
                  height: '20%',
                  weight: '15%',
                  display: 'block'
                }}>
                  <div>
                    <FontAwesome name='fas fa-check' className='image-icon' title='remove like' onClick={() => {
                      this.removeFromList(obj);
                    }}/>
                    <FontAwesome name='fas fa-expand-arrows-alt' className='image-icon' title='fullscreen' onClick={() => {
                      this.fullScreen(obj);
                    }}/>
                  </div>
                </div>

              );
            }))
          }

        </div>
        

        <div className="app-header" onScroll={this.handleScroll}>
          <h2> Flickr Gallery </h2>
          
        
          <FontAwesome className='sidebarButton' name="fas fa-bars" style={{float: 'left'}} title="Open Your Favorite Gallery" onClick={() => {
            this.handleSidebarClick();
          }} />
          <input className="app-input" value={this.state.tag} onChange={event => 
          this.setState({
            tag: event.target.value
          })
          } />
          <br />
          <span>Infinite scrolling?</span>
          <label className="switch">
            
          <input type="checkbox" defaultChecked={this.infiniteScroll} onClick={() => {
            this.infiniteScroll = !this.infiniteScroll;
            localStorage.setItem('InfScrollToggle', JSON.stringify(this.infiniteScroll));
          }} />
        <span className="slider round"></span>
        </label>
        </div>
        <div >
        <Gallery tag={this.state.tag}  />
        </div>
      </div>
    );
  }
}



export default App;
