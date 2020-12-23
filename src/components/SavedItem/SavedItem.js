import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './SavedItem.css';
import close from './close.png'
import edit from './edit.png'

class CardHeader extends React.Component {

  runDeleteModal = (deleteSavedItem, name) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui shadow-3'>
            <h1>Delete Item</h1>
            <p>Are you sure you want to delete {name}?</p>
            <button className="modalBtn cancelBtn" onClick={onClose}>Cancel</button>
            <button className="modalBtn deleteBtn"
              onClick={() => {
                deleteSavedItem();
                onClose();
              }}>Delete</button>
          </div>
        );
      }
    });
  }

  render() {
    const { image, name, deleteSavedItem } = this.props;
    var style = {
        backgroundImage: 'url(' + image + ')',
    };
    return (
      <div className="container-card-header">
        <header style={style} id={image} className="card-header">
        </header>
        <div className="pointer" style={{ height: 30, width: 30 }}
        onClick={(e) => {e.stopPropagation(); this.runDeleteModal(deleteSavedItem, name)}}>
          <img alt='close' src={close}/>
        </div>
      </div>
    )
  }
}

class CardBody extends React.Component {

  runRenameModal = (renameSavedItem, name) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui shadow-3'>
            <h1>Rename Item</h1>
            <input id="item_rename" className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text"
            aria-describedby="name-desc"
            placeholder={name}/>
            <button className="modalBtn cancelBtn" onClick={onClose}>Cancel</button>
            <button className="modalBtn applyBtn"
              onClick={() => {
                const new_name = document.getElementById("item_rename").value;
                renameSavedItem(new_name);
                onClose();
              }}>Apply</button>
          </div>
        );
      }
    });
  }

  dateToDisplayString = (date_value) => {
    const date = new Date(date_value);
    return [date.getMonth(), date.getDate(), date.getFullYear()].join('/');
  }

  render() {
    const { renameSavedItem, name, updated_at, text, title } = this.props;
    return (
      <div className="card-body">
        <p className="date">{'Last updated at: ' + this.dateToDisplayString(updated_at)}</p>

        <h3>{title}
          <img className="edit-name pointer" alt='edit' src={edit}
          onClick={(e) => {e.stopPropagation(); this.runRenameModal(renameSavedItem, name)}}/>
        </h3>

        <p className="body-content">{text}</p>

      </div>
    )
  }
}

class SavedItem extends React.Component {

  render() {
    const { id, post, name, img_url, updated_at, deleteSavedItem, renameSavedItem, displaySavedItem } = this.props;
    return (
      <article className="card pa2 ma2 dib" onClick={() => displaySavedItem(post, img_url)}>
        <CardHeader image={img_url} name={name}
        deleteSavedItem={() => deleteSavedItem(id)}/>
        <CardBody title={name} text={post} updated_at={updated_at}
        renameSavedItem={(new_name) => renameSavedItem(id, new_name)}
        name={name}/>
      </article>
    )
  }
}

export default SavedItem;
