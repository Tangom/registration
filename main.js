const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  // Очистим ошибку
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('button_inactive');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('button_inactive');
  }
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));

  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector('.form__submit');

  // Вызовем toggleButtonState и передадим ей массив полей и кнопку
  toggleButtonState(inputList, buttonElement);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      // здесь добавим уход надписи вверх !!!!
      // notEmpty(formElement, inputElement)
      //Работа кнопки
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};
// Вызовем функцию
enableValidation();

const thisInput = document.getElementById('name-input');

function full(event) {
  const placeholderElement = document.getElementById('name-input-placeholder');
  if (event.currentTarget.value.length > 0) {
    placeholderElement.classList.add('form__placeholder_filled');
  } else {
    placeholderElement.classList.remove('form__placeholder_filled');
  }
}

thisInput.addEventListener('input', full, false);


// Добавим фиксацию плейсхолдера если строка не пустая
// const notEmpty = (formElement, inputElement) => {
//   const placeholderElement = formElement.querySelector(`#${inputElement.id}-input-placeholder`);
//   if (inputElement.value.trim().length === 0) {
//     // Если поле не пустое добавляем .form__placeholder_is-fixed
//     placeholderElement.classList.remove('form__placeholder_filled');
//   }
//    else {
//      // Если пустое то удаляем
//      placeholderElement.classList.add('form__placeholder_filled');
//    }
// };
// function ctrlButton() {
//   btn.disabled = this.value.trim().length === 0;
// }
//
// text1.addEventListener('input', ctrlButton, false);
// ctrlButton.call(text1);
//
// <input type="text" id="text1">
//   <button id="btn">Button</button>