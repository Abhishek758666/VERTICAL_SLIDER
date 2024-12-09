const slider = document.querySelector(".slider");
const slides = Array.from(document.querySelectorAll(".slide"));
let startY = 0;
let currentIndex = 2;
const slideHeight = 130;

function updateSlider() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentIndex);
  });
  const translateY = -currentIndex * slideHeight + (500 - slideHeight) / 2;
  slider.style.transform = `translateY(${translateY}px)`;
}

let isDragging = false;
let dragStartY = 0;
let dragTranslateY = 0;

slider.addEventListener("mousedown", (e) => {
  isDragging = true;
  dragStartY = e.clientY;
  dragTranslateY =
    parseInt(slider.style.transform.replace("translateY(", "")) || 0;
  slider.style.transition = "none";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const dragDistance = e.clientY - dragStartY;
  slider.style.transform = `translateY(${dragTranslateY + dragDistance}px)`;
});

document.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  isDragging = false;
  slider.style.transition = "transform 0.3s ease";
  const dragDistance = e.clientY - dragStartY;

  if (dragDistance < -50 && currentIndex < slides.length - 1) {
    currentIndex++;
  } else if (dragDistance > 50 && currentIndex > 0) {
    currentIndex--;
  }

  updateSlider();
});

slider.addEventListener("touchstart", (e) => {
  isDragging = true;
  dragStartY = e.touches[0].clientY;
  dragTranslateY =
    parseInt(slider.style.transform.replace("translateY(", "")) || 0;
  slider.style.transition = "none";
});

document.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const dragDistance = e.touches[0].clientY - dragStartY;
  slider.style.transform = `translateY(${dragTranslateY + dragDistance}px)`;
});

document.addEventListener("touchend", (e) => {
  if (!isDragging) return;
  isDragging = false;
  slider.style.transition = "transform 0.3s ease";
  const dragDistance = e.changedTouches[0].clientY - dragStartY;

  if (dragDistance < -50 && currentIndex < slides.length - 1) {
    currentIndex++;
  } else if (dragDistance > 50 && currentIndex > 0) {
    currentIndex--;
  }

  updateSlider();
});

updateSlider();
