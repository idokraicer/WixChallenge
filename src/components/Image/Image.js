import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Image.scss';

// import render from 'enzyme/src/render';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number,
    copyImage: PropTypes.func
  };


  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.addLikeToList = this.addLikeToList.bind(this)
    this.state = {
      flip: false,
      liked: this.checkIfExistsInSaved(),
      foo: this.props.copyImage,
      size: 200
    };
  }


  calcImageSize() {
    const {galleryWidth} = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = (galleryWidth / imagesPerRow);
    this.setState({
      size
    });
  }

  componentDidMount() {
    this.calcImageSize();
  }

  urlFromDto(dto) {
    // console.log(dto);
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;

  }
  checkIfExistsInSaved()
  {
    if(JSON.parse(localStorage.getItem('favList')) === null) return false;
    let newList = [...JSON.parse(localStorage.getItem('favList'))];
    let flag = false;
    newList.map(obj => {
      if(this.props.dto.id === obj.dto.id) flag = true;
    });
    return flag;
  }
  addLikeToList() {

    let listOfImages = JSON.parse(localStorage.getItem('favList'));
    console.log('LocalStorage before: ', listOfImages)

    if (listOfImages === undefined || listOfImages === null)
    {
      localStorage.setItem('favList', JSON.stringify(this.props));
      console.log('LocalStorage after:', JSON.parse(localStorage.getItem('favList')));
    }
    else
      {
      let flag = this.checkIfExistsInSaved();
      let newList = [...listOfImages];
      console.log('Flag: ', flag)
      if (!flag)
       {
         newList.push(this.props);
         localStorage.setItem('favList', JSON.stringify(newList));
         console.log('LocalStorage after:', JSON.parse(localStorage.getItem('favList')));
       }
    }
    this.setState({liked: this.checkIfExistsInSaved()})
  }

  removeFromList() {
    let images = [...JSON.parse(localStorage.getItem('favList'))];
    let newList = [];
    images.map(obj => {
      if(!(obj.dto.id === this.props.dto.id)) {
        console.log(obj);
        newList = [...newList, obj];
      }
    });
    localStorage.setItem('favList', JSON.stringify(newList));
    this.setState({liked: this.checkIfExistsInSaved()})
  }
  
  


  render() {
    return (
      <div

        className='image-root'
        style={{
          backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
          width: this.state.size + 'px',
          height: this.state.size + 'px',
          transform: this.state.flip ? 'scaleX(-1)' : ''
        }}
        draggable={this.props.draggable}
        onDragStart={this.props.onDragStart }
        onDragOver={ this.props.onDragOver }
        onDragEnd={this.props.onDragEnd}
        // onDrop={this.props.onDrop}
        
        id={this.props.id}
        >
        <div style={{transform: this.state.flip ? 'scaleX(-1)' : ''}}>
          <FontAwesome className='image-icon' onClick={() =>
            this.state.flip ?
              this.setState({flip: false}) : this.setState({flip: true})
          } name="arrows-alt-h" title="flip"
          />
          <FontAwesome className="image-icon" onClick={ this.props.copyImage }
           name="clone" title="clone"
          />
          <FontAwesome className="image-icon" onClick={() =>
          this.setState({size: this.state.size+50})} name="expand" title="expand"/>
          <FontAwesome name={this.state.liked ? 'fas fa-check' : 'far fa-thumbs-up'} className='image-icon' title='favorite' onClick={() => {
            this.checkIfExistsInSaved() ? this.removeFromList() : this.addLikeToList();
            }
          }
            />
        </div>
      </div>

    );
  }
}

export default Image;
Image.propTypes = {
  copyImage: React.PropTypes.func
}
