import React from 'react';
import { useState } from 'react';
import signSuccess from '../images/signSuccess.svg';
import signClosed from '../images/signClosed.svg';

function InfoTooltip({ isOpen, onClose, loggedIn }) {

  const [signImage, setSignImage] = useState('');
  const [signText, setSignText] = useState('');

  React.useEffect(() => {
    if (loggedIn) {
      setSignImage(signSuccess)
      setSignText('Вы успешно зарегистрировались!');
    } else {
      setSignImage(signClosed);
      setSignText('Что-то пошло не так! Попробуйте ещё раз.');
    }
  }, [isOpen, loggedIn]);

  return (
    <div className={`popup popup_info-tooltip ${isOpen && "popup_opened"}`}>
      <div className="popup__grid">
        <button type="button" className="popup__close-icon" onClick={onClose} />
        <div className="popup__container">
          <img className="popup__image-sign" src={signImage} alt="знак доступа" />
  <h3 className="popup__text-sign">{signText}</h3>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;