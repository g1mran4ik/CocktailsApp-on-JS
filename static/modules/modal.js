// Modal

function modal() {
  const bindModal = () => {
    const trigger = document.querySelector(".trigger"),
      modal = document.querySelector(".account_modal"),
      close = document.querySelector(".modal_close");
  
    trigger.addEventListener("click", (e) => {
      e.target && e.preventDefault();
      modal.style.display = "block";
    });
  
    close.addEventListener("click", () => (modal.style.display = "none"));
  
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
      // можно ещё так
      // e.target === modal && (() => {modal.style.display = "none"})()
    });
  };
  
  bindModal();
  // modal ends
}

export default modal;
