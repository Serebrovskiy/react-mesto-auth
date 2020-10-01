import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);
  const inputNameRef = React.useRef("");
  const inputLinkRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: name,
      link: link
    });
  }

  function handleCheckValidity() {
    inputNameRef.current.checkValidity() && inputLinkRef.current.checkValidity()
      ?
      setIsDisabled(false) : setIsDisabled(true);
  }

  function handleChangeName(e) {
    setName(e.target.value);
    handleCheckValidity();
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
    handleCheckValidity();
  }

  React.useEffect(() => {
    setName("");
    setLink("");
    setIsDisabled(true);
  }, [isOpen]);

  return (
    <PopupWithForm
      name='add_card'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={isDisabled}
    >
      <input
        id="place-input"
        type="text"
        name="inputCardName"
        placeholder="Название"
        className="popup__input-text popup__input-text_type_place"
        onChange={handleChangeName}
        value={name ? name : ""}
        ref={inputNameRef}
        minLength="2"
        maxLength="30"
        required
      />
      <span id="place-input-error" className="popup__input-error"></span>
      <input
        id="image-input"
        type="url"
        name="inputCardImage"
        placeholder="Ссылка на картинку"
        className="popup__input-text popup__input-text_type_image"
        onChange={handleChangeLink}
        value={link ? link : ""}
        ref={inputLinkRef}
        required
      />
      <span id="image-input-error" className="popup__input-error"></span>
    </ PopupWithForm>
  );
}

export default AddPlacePopup;