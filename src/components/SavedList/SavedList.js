import React from 'react';
import SavedItem from '../SavedItem/SavedItem'

const SavedList = ({ items, deleteSavedItem, renameSavedItem, displaySavedItem }) => {
  return (
    <div>
      {
        items.map((item, i) => {
          return (
            <SavedItem
              key={i}
              id={item.id}
              img_url={item.img_url}
              name={item.name}
              post={item.post}
              updated_at={item.updated_at}
              deleteSavedItem={deleteSavedItem}
              renameSavedItem={renameSavedItem}
              displaySavedItem={displaySavedItem}
              />
          );
        })
      }
    </div>
  );
}

export default SavedList;
