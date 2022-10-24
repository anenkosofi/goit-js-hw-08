import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('textarea'),
  input: document.querySelector('input'),
};

let savedFormData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

refs.form.addEventListener('input', throttle(onFormInput, 500));
populateFormData();
refs.form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  if (!savedFormData) {
    const formData = {};
    formData[e.target.name] = e.target.value;

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
  } else {
    const formData = { ...savedFormData };
    formData[e.target.name] = e.target.value;

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
  }
}

function onFormSubmit(e) {
  e.preventDefault();

  try {
    console.log(savedFormData);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }

  localStorage.removeItem(LOCAL_STORAGE_KEY);
  savedFormData = '';

  e.target.reset();
}

function populateFormData() {
  if (savedFormData) {
    refs.input.value = savedFormData.email || '';
    refs.textarea.value = savedFormData.message || '';
  }
}
