import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Image from '../Image';
import './Gallery.scss';



class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.copyImage = this.copyImage.bind(this);
    this.state = {
      images: [],
      copiedImages: [],
      galleryWidth: this.getGalleryWidth(),
      trigger: false,
      count: 1,
      oldTag: this.props.tag
    };
  }

  getGalleryWidth(){
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }
  getImages(tag) {
    tag === this.state.oldTag ? '' : this.setState({
      count: 1,
      oldTag: tag
    });
    let getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&page=` + this.state.count + `&format=json&safe_search=1&nojsoncallback=1`;
    const baseUrl = 'https://api.flickr.com/';
    axios({
      url: getImagesUrl,
      baseURL: baseUrl,
      method: 'GET'
    })
      .then(res => res.data)
      .then(res => {
        if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0
        ) {

          
          
          if(this.state.trigger) {
            let newData = this.arrayUnique(this.state.images.concat(res.photos.photo));
            this.state.copiedImages.map(index =>
              {
                newData.splice(index.imagesIndex, 0, index);
              })
            this.setState({
              images: newData,
              trigger: false
            })
          }
          else {
            let newData = this.arrayUnique(res.photos.photo);
            this.state.copiedImages.map(index =>
              {
                newData.splice(index.imagesIndex, 0, index);
              })
            this.setState({
              images: newData
            })
          }
        }
      });
  }
  arrayUnique(array) {
    let a = array.concat();
    for(let i=0; i<a.length; ++i) {
      for(let j=i+1; j<a.length; ++j) {
        if(a[i] === a[j])
          a.splice(j--, 1);
      }
    }

    return a;
  }
  componentDidMount() {
    this.getImages(this.props.tag);
    this.setState({
      galleryWidth: document.body.clientWidth
    });
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(props) {
    this.getImages(props.tag);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }


  copyImage = (img, idx) => {
    let imageClicked = this.state.images[img];
    imageClicked.imagesIndex=img;
    let imagesArr = [...this.state.images]
    imagesArr.splice(img, 0, imageClicked);
    this.setState({
      copiedImages: this.state.copiedImages.concat(imageClicked),
      images: imagesArr
    });
    console.log(img, this.state.images[img]);
  }

  handleScroll = e => {
    let element = e.target.scrollingElement;
    if( element.scrollHeight - element.scrollTop - element.clientHeight === 0 && JSON.parse(localStorage.getItem('InfScrollToggle')) === true)
      this.setState({count: this.state.count + 1,
      trigger: true});
      console.log("Reached bottom ",this.state.count);
  }

  dragStart = (e, idx) => {
    // e.stopPropagation(); 
    // e.preventDefault();
    this.draggedItem = this.state.images[idx];
    // e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
    e.dataTransfer.setDragImage(e.target, 20, 20);
  }

  dragOver = index => {
    const draggedOverItem = this.state.images[index];
    if(this.draggedItem === draggedOverItem) {
      return;
    }
    let images = this.state.images.filter(image => image !== this.draggedItem);
    images.splice(index, 0, this.draggedItem);
    this.setState({images: images});
  }
  dragEnd = () =>
  {
    this.draggedItem = null;
  }

  render() {
    
    return (
      <div className='gallery-root'  onScroll={this.handleScroll}>

        {this.state.images.map((dto, idx) => {
          return <Image
            copyImage={this.copyImage.bind(this, idx)}
            id={idx}
            key={'image-' + dto.id +idx}
            dto={dto}
            galleryWidth={this.state.galleryWidth}
            onDragOver={() => this.dragOver(idx) }
            draggable='true'
            onDragEnd={ this.dragEnd}
            onDragStart={e => this.dragStart(e, idx)}
          />;
        })}
        <div>Loading page number {this.state.count}</div>
        <div>Number of images loaded: {this.state.images.length}</div>
      </div>

    );
  }

}


export default Gallery;
Image.propTypes = {
  copyImage: React.PropTypes.func

}
