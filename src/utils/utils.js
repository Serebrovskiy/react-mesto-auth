import Api from './Api';

export const formValidationOptions = {
  formProfileSelector: '.popup__container',
  formCardSelector: '.popup__container_add_card',
  formAvatarSelector: '.popup__container_avatar',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '14553299-9691-455d-8f0e-78b62284ce7d',
    'Content-Type': 'application/json'
  }
});

export const cards = document.querySelector('.cards');

export const avatarLoad = "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80";


