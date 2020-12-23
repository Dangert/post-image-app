import React from 'react';

class PostForm extends React.Component {

  render(){
    const { onFindImage, onTextChange, text } = this.props
    return (
      <div>
        <p className='f3'>
          {"What's on your mind?"}
        </p>
        <div className='pa4 br3 shadow-1 center w-50'>
          <textarea id="comment" name="comment" className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2 center" aria-describedby="comment-desc" onChange={onTextChange} value={text}></textarea>
          <button className='w-15 grow f5 link ph3 pv2 br2 bg-light-blue' onClick={onFindImage}>Find me an image</button>
        </div>
      </div>
    )
  }
}

export default PostForm;
