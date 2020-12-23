import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import './ImagePicker.css';


class ImagePicker extends React.Component {

  constructor(props) {
    super(props);
    this.onSlide = this.props.setImageIdx;
  }

  render() {
    const { urls } = this.props;
    if (urls === undefined || urls.length === 0) {
      return null;
    }
    const images = urls.map(url => Object({original: url, thumbnail: url}));
    return (
      <div className='image-div ma4 br3 center'>
        <ImageGallery items={images} showPlayButton={false} onSlide={this.onSlide}
        showThumbnails={(images.length > 1)} showFullscreenButton={false}/>
      </div>
    )
  }
}

export default ImagePicker;
