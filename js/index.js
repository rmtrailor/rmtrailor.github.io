// Navbar setup
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.mobile-nav__link');

navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
  });
});

// Skill Modals Setup
const portfolioModals = document.querySelectorAll('.portfolio-modal');
const portfolioButtons = document.querySelectorAll('.portfolio__item');

portfolioButtons.forEach((portfolioItem) => {
  portfolioItem.addEventListener('click', (event) => {
    const portfolioName = event.target.name;
    const targetModal = document.querySelector(
      `[portfolio-name="${portfolioName}"]`
    );
    targetModal.classList.toggle('modal-open');
  });
});

// Called by the close triggers inside the portfolio modals
function closeModal(portfolioName) {
  const targetModal = document.querySelector(
    `[portfolio-name="${portfolioName}"]`
  );
  targetModal.classList.remove('modal-open');
}
