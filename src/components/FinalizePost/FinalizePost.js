import React from 'react';


class FinalizePost extends React.Component {
  render () {
    const { copyTextToClipboard, saveNewItem, downloadImage } = this.props;
    return (
      <div className="mb4">
        <div className='ma1 mt0 center'>
          <button className='grow f5 link ph3 pv2 br2 bg-light-blue ma1' style={{ width: 200 }}
          onClick={downloadImage}>Download image</button>
          <button className='grow f5 link ph3 pv2 br2 bg-light-blue ma1' style={{ width: 200 }}
          onClick={copyTextToClipboard}>Copy text to clipboard</button>
        </div>
        <div className='ma1 mt0 center'>
          <button className='grow f5 link ph3 pv2 br2 bg-light-green' style={{ width: 200, background: '#c8fae4'}}
          onClick={saveNewItem}>Save for later</button>
        </div>
      </div>
    )
  }
}

export default FinalizePost;
