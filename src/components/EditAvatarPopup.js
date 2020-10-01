import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputAvatarRef = React.useRef("");
  const [link, setLink] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputAvatarRef.current.value
    });
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
    inputAvatarRef.current.checkValidity()
      ?
      setIsDisabled(false) : setIsDisabled(true);
  }

  React.useEffect(() => {
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={isDisabled}
    >
      <input
        id="avatar-input"
        type="url"
        name="inputAvatar"
        placeholder="Ссылка на аватар"
        className="popup__input-text popup__input-text_type_avatar"
        ref={inputAvatarRef}
        onChange={handleChangeLink}
        value={link ? link : ""}
        required
      />
      <span id="avatar-input-error" className="popup__input-error"></span>
    </ PopupWithForm>
  );
}

export default EditAvatarPopup;