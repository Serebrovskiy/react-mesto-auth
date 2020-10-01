import React from 'react';

function PopupWithImage({card, onClose}) {

  return (
    <div className={`popup popup_view-image ${card ? "popup_opened" : ""}`}>
      <div className="popup__grid popup__grid_image">
        <button type="button" className="popup__close-icon popup__close-icon_image" onClick={onClose} />
        <figure className="popup__figure">
        <img className="popup__image"    src={card?.link} alt=""  />
          <figcaption className="popup__caption">{card?.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default PopupWithImage;