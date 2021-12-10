'use strict';

var modal = document.querySelector('.modal');
var modalText = document.querySelector('.model_content');


//open and close modal functions
const openModal = (value) => {
  modal.classList.remove('hidden');
  modalText.innerText = (value)
};
const closeModal = () => {
  modal.classList.add('hidden');
};
// click to open the modal
// btnOpenModal[i].addEventListener('click', openModal);


// // click to close the modal
// btnCloseModal.addEventListener('click', closeModal);

// click escape to close the modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
