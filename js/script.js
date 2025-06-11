// Reveal
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  for (let el of reveals) {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const offset = 150;
    if (elementTop < windowHeight - offset) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  }
}

window.addEventListener("load", revealOnScroll);
window.addEventListener("scroll", revealOnScroll);

// Scroll to top
const scrollBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("feedbackForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = document.getElementById("nama");
    const email = document.getElementById("email");
    const telepon = document.getElementById("telepon");
    const alamat = document.getElementById("alamat");
    const keluhan = document.getElementById("keluhan");

    let isValid = true;

    if (nama.value.trim() === "") {
      nama.classList.add("is-invalid");
      isValid = false;
    } else {
      nama.classList.remove("is-invalid");
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email.value.trim())) {
      email.classList.add("is-invalid");
      isValid = false;
    } else {
      email.classList.remove("is-invalid");
    }

    if (telepon.value.trim() === "") {
      telepon.classList.add("is-invalid");
      isValid = false;
    } else {
      telepon.classList.remove("is-invalid");
    }

    if (alamat.value.trim() === "") {
      alamat.classList.add("is-invalid");
      isValid = false;
    } else {
      alamat.classList.remove("is-invalid");
    }

    if (keluhan.value.trim().length < 3) {
      keluhan.classList.add("is-invalid");
      isValid = false;
    } else {
      keluhan.classList.remove("is-invalid");
    }

    if (isValid) {
      const modal = new bootstrap.Modal(
        document.getElementById("feedbackModal")
      );
      modal.show();

      setTimeout(() => {
        form.reset();
      }, 1000);
    }
  });
});

// Pop up materi selesai
document.addEventListener("DOMContentLoaded", function () {
  const selesaiBtn = document.getElementById("selesaiBtn");
  const selesaiModal = new bootstrap.Modal(
    document.getElementById("selesaiModal")
  );

  selesaiBtn.addEventListener("click", function () {
    selesaiModal.show();
  });
});

// Tandai selesai
const progress = JSON.parse(localStorage.getItem("materiProgress")) || {};

function updateButton(button, isDone) {
  if (isDone) {
    button.innerHTML = "Selesai<i class='bi-check-lg ms-1'></i>";
    button.classList.remove("btn-outline-dark");
    button.classList.add("btn-success", "text-white");
  } else {
    button.textContent = "Tandai selesai";
    button.classList.remove("btn-success", "text-white");
    button.classList.add("btn-outline-dark");
  }
}

const buttons = document.querySelectorAll(".selesai-btn");
buttons.forEach((button, index) => {
  const id = `materi-${index + 1}`;
  const isDone = progress[id] || false;
  updateButton(button, isDone);

  button.addEventListener("click", () => {
    progress[id] = !progress[id];
    localStorage.setItem("materiProgress", JSON.stringify(progress));
    updateButton(button, progress[id]);
  });
});
