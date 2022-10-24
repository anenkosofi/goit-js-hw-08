import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('textarea'),
  input: document.querySelector('input'),
};
const formData = {};

const savedFormData = localStorage.getItem(LOCAL_STORAGE_KEY);
const parsedFormData = JSON.parse(savedFormData);

refs.form.addEventListener('input', throttle(onFormInput, 500));
populateFormData();
refs.form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  try {
    console.log(parsedFormData);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }

  e.target.reset();

  localStorage.removeItem(LOCAL_STORAGE_KEY);
}
function populateFormData() {
  if (savedFormData) {
    refs.input.value = parsedFormData.email || '';
    refs.textarea.value = parsedFormData.message || '';
  }
}
