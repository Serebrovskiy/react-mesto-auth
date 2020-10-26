import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from './contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('Имя');
  const [description, setDescription] = React.useState('Профессия');
  const [isDisabled, setIsDisabled] = React.useState(false);
  const inputNameRef = React.useRef("");
  const inputAboutRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  function handleCheckValidity() {
    inputNameRef.current.checkValidity() && inputAboutRef.current.checkValidity()
      ?
      setIsDisabled(false) : setIsDisabled(true);
  }

  function handleChangeName(e) {
    setName(e.target.value);
    handleCheckValidity();
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    handleCheckValidity();
  }

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
      setIsDisabled(true);
    }
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={isDisabled}
    >
      <input
        id="name-input"
        type="text"
        name="inputProfileName"
        placeholder="Имя"
        className="popup__input-text popup__input-text_type_name"
        value={name ? name : ""}
        onChange={handleChangeName}
        ref={inputNameRef}
        pattern="^[a-zA-Zа-яА-Я\s-]+$"
        minLength="2"
        maxLength="40"
        required
      />
      <span id="name-input-error" className="popup__input-error"></span>
      <input
        id="profession-input"
        type="text"
        name="inputProfileProfession"
        placeholder="Профессия"
        className="popup__input-text popup__input-text_type_job"
        value={description ? description : ""}
        onChange={handleChangeDescription}
        ref={inputAboutRef}
        minLength="2"
        maxLength="200"
        required
      />
      <span id="profession-input-error" className="popup__input-error"></span>
    </ PopupWithForm>
  );
}

export default EditProfilePopup;