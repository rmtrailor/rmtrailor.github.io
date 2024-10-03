// Find all the elements that have the fade in style and style an element to fade in
// if that element is in the viewport.
function checkFadeInLocations() {
  const elemsToFadeIn = document.querySelectorAll(".to-fade-in");
  const windowScrollLocation = window.innerHeight + window.scrollY;

  elemsToFadeIn.forEach((elem) => {
    if (windowScrollLocation >= elem.getBoundingClientRect().top) {
      elem.classList.add("fade-in");
    } else {
      if (elem.classList.contains("fade-in")) {
        elem.classList.remove("fade-in");
      }
    }
  });
}

checkFadeInLocations();

document.addEventListener("scroll", (e) => {
  e.preventDefault();
  checkFadeInLocations();
});

// Carousel functionality
const carouselContainer = document.querySelector(".carousel");
const slideWrapper = document.querySelector(".carousel-slides");
const slides = document.querySelectorAll(".carousel-slide");
const navdotWrapper = document.querySelector(".carousel-navdots");
const navdots = document.querySelectorAll(".carousel-navdots button");

const numSlides = slides.length;
const numSlidesCloned = 1;
let slideWidth = slides[0].offsetWidth;
let spaceBtwSlides = Number(
  window
    .getComputedStyle(slideWrapper)
    .getPropertyValue("grid-column-gap")
    .slice(0, -2)
);
function indexSlideCurrent() {
  return Math.round(
    slideWrapper.scrollLeft / (slideWidth + spaceBtwSlides) - numSlidesCloned
  );
}

function goto(index) {
  slideWrapper.scrollTo(
    (slideWidth + spaceBtwSlides) * (index + numSlidesCloned),
    0
  );
}

for (let i = 0; i < numSlides; i++) {
  navdots[i].addEventListener("click", () => goto(i));
}

function markNavdot(index) {
  navdots[index].classList.add("is-active");
}

function uppdateNavdot() {
  const currentSlideIndex = indexSlideCurrent();
  if (currentSlideIndex < 0 || currentSlideIndex >= numSlides) return;
  markNavdot(currentSlideIndex);
}

// Append a clone of the first slide to the right of the last slide so we
// can create an illusion of infinite-scrolling back instantly scrolling backwards
// to the first slide.
const firstSlideClone = slides[0].cloneNode(true);
slideWrapper.append(firstSlideClone);
// Same logic for the first slide with the last slide being on its left.
const lastSlideClone = slides[numSlides - 1].cloneNode(true);
slideWrapper.prepend(lastSlideClone);

// Smooth scroll needs to be disabled so we can instantly scroll. We then need to add
// it back to the wrapper.
function rewind() {
  slideWrapper.classList.remove("smooth-scroll");
  setTimeout(() => {
    // wait for smooth scroll to be disabled
    slideWrapper.scrollTo((slideWidth + spaceBtwSlides) * numSlidesCloned, 0);
    slideWrapper.classList.add("smooth-scroll");
  }, 100);
}

function forward() {
  slideWrapper.classList.remove("smooth-scroll");
  setTimeout(() => {
    // wait for smooth scroll to be disabled
    slideWrapper.scrollTo(
      (slideWidth + spaceBtwSlides) * (numSlidesCloned - 1 + numSlidesCloned),
      0
    );
    slideWrapper.classList.add("smooth-scroll");
  }, 100);
}

function next() {
  goto(indexSlideCurrent() + 1);
}

const pause = 2500;
let interval;

function play() {
  // early return if the user has reduced motion enabled
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  clearInterval(interval);
  interval = setInterval(next, pause);
}

// Stop the autoplay animation if the user is scrolling through the carousel
function stop() {
  clearInterval(interval);
}

const observer = new IntersectionObserver(callback, { threshold: 0.99 });
function callback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      play();
    } else {
      stop();
    }
  });
}

observer.observe(carouselContainer);

// Toggle autoplay for mouse users
carouselContainer.addEventListener("pointerenter", () => stop());
carouselContainer.addEventListener("pointerleave", () => play());

// Toggle autoplay for mobile users
carouselContainer.addEventListener("touchstart", () => stop());

// Handle scroll events
let scrollTimer;

slideWrapper.addEventListener("scroll", () => {
  // reset
  navdots.forEach((navdot) => {
    navdot.classList.remove("is-active");
  });

  if (scrollTimer) clearTimeout(scrollTimer); // cancel if scrolling continues
  scrollTimer = setTimeout(() => {
    if (
      slideWrapper.scrollLeft <
      (slideWidth + spaceBtwSlides) * (numSlidesCloned - 1 / 2)
    ) {
      forward();
    }
    if (
      slideWrapper.scrollLeft >
      (slideWidth + spaceBtwSlides) * (numSlides - 1 + numSlidesCloned) + 1 / 2
    ) {
      rewind();
    }
  }, 100);

  // mark the navdot
  uppdateNavdot();
});

let resizeTimer;
window.addEventListener("resize", () => {
  // update parameters
  slideWidth = slides[0].offsetWidth;
  spaceBtwSlides = Number(
    window
      .getComputedStyle(slideWrapper)
      .getPropertyValue("grid-column-gap")
      .slice(0, -2)
  );

  // stop autoplay animation if window is resizing to avoid visual glitches
  if (resizeTimer) clearTimeout(resizeTimer);
  stop();
  resizeTimer = setTimeout(() => {
    play();
  }, 400);
});

// Initilization
goto(0);
markNavdot(0);
// Give slide wrapper smooth scroll class at time of page load. This way we can
// turn off smooth scrolling programmatically for the purpose of making the
// carousel infinitely-scrolling.
slideWrapper.classList.add("smooth-scroll");

// Navbar setup
// const navToggle = document.querySelector('.nav-toggle');
// const navLinks = document.querySelectorAll('.mobile-nav__link');

// navToggle.addEventListener('click', () => {
//   document.body.classList.toggle('nav-open');
// });

// navLinks.forEach((link) => {
//   link.addEventListener('click', () => {
//     document.body.classList.remove('nav-open');
//   });
// });

// // Skill Modals Setup
// const portfolioModals = document.querySelectorAll('.portfolio-modal');
// const portfolioButtons = document.querySelectorAll('.portfolio__item');

// portfolioButtons.forEach((portfolioItem) => {
//   portfolioItem.addEventListener('click', (event) => {
//     const portfolioName = event.target.name;
//     const targetModal = document.querySelector(
//       `[portfolio-name="${portfolioName}"]`
//     );
//     targetModal.classList.toggle('modal-open');
//   });
// });

// // Called by the close triggers inside the portfolio modals
// function closeModal(portfolioName) {
//   const targetModal = document.querySelector(
//     `[portfolio-name="${portfolioName}"]`
//   );
//   targetModal.classList.remove('modal-open');
// }
