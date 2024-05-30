let slideIndex = 0;
showSlides();

function plusSlides(n) {
  clearInterval(autoSlide); // Stop auto-sliding when manually navigating
  showSlides(slideIndex += n);
  autoSlide = setInterval(showSlides, 3000); // Restart auto-sliding
}

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slide");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "flex";
}

// Auto-slide every 3 seconds
let autoSlide = setInterval(showSlides, 3000);
s