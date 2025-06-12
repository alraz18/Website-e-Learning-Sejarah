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

// Quiz singkat
const answerKey = {
  "materi-1": ["b", "c", "c"],
  "materi-2": ["c", "d", "c"],
  "materi-3": ["c", "b", "c"],
  "materi-4": ["c", "c", "c"],
};

function showProgressInfo(materiId, score, total, percentage) {
  const progressInfo = document.querySelector(
    `[data-materi="${materiId}"] #progressInfo`
  );
  if (progressInfo) {
    progressInfo.innerText = `Score: ${score}/${total} (${percentage}%)`;
  }
}

function checkAnswers() {
  const quizContainer = document.getElementById("materiQuiz");
  const materiId = quizContainer.getAttribute("data-materi");
  const correctAnswers = answerKey[materiId];

  const resultBox = document.getElementById("resultBox");
  const progressBar = document.getElementById("progressBar");
  const progressSection = document.getElementById("progressSection");

  let score = 0;
  correctAnswers.forEach((answer, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === answer) {
      score++;
    }
  });

  const total = correctAnswers.length;
  const percentage = Math.round((score / total) * 100);

  resultBox.classList.remove("d-none", "alert-success", "alert-danger");
  resultBox.innerText = `Kamu menjawab ${score} dari ${total} soal dengan benar.`;
  resultBox.classList.add(score === total ? "alert-success" : "alert-danger");

  progressSection.classList.remove("d-none");
  progressBar.style.width = percentage + "%";
  progressBar.innerText = percentage + "%";
  progressBar.classList.remove("bg-success", "bg-warning", "bg-danger");

  if (percentage === 100) {
    progressBar.classList.add("bg-success");
  } else if (percentage >= 50) {
    progressBar.classList.add("bg-warning");
  } else {
    progressBar.classList.add("bg-danger");
  }

  localStorage.setItem(
    `progress-${materiId}`,
    JSON.stringify({ score, total, percentage })
  );


  showProgressInfo(materiId, score, total, percentage);
}

document.addEventListener("DOMContentLoaded", () => {
  // Cek dan tampilkan progress untuk quiz halaman ini (jika ada)
  const quizContainer = document.getElementById("materiQuiz");
  if (quizContainer) {
    const materiId = quizContainer.getAttribute("data-materi");
    const saved = localStorage.getItem(`progress-${materiId}`);
    if (saved) {
      const { score, total, percentage } = JSON.parse(saved);

      const resultBox = document.getElementById("resultBox");
      const progressBar = document.getElementById("progressBar");
      const progressSection = document.getElementById("progressSection");

      resultBox.classList.remove("d-none", "alert-success", "alert-danger");
      resultBox.innerText = `Terakhir kamu menjawab ${score} dari ${total} soal dengan benar.`;
      resultBox.classList.add(
        percentage === 100 ? "alert-success" : "alert-danger"
      );

      progressSection.classList.remove("d-none");
      progressBar.style.width = percentage + "%";
      progressBar.innerText = percentage + "%";
      progressBar.classList.add(
        percentage === 100
          ? "bg-success"
          : percentage >= 50
          ? "bg-warning"
          : "bg-danger"
      );

      showProgressInfo(materiId, score, total, percentage);
    }
  }

  // Tampilkan semua progress di halaman daftar materi (jika ada)
  document.querySelectorAll("[data-materi]").forEach((el) => {
    const materiId = el.getAttribute("data-materi");
    const saved = localStorage.getItem(`progress-${materiId}`);
    if (saved) {
      const { score, total, percentage } = JSON.parse(saved);
      showProgressInfo(materiId, score, total, percentage);
    }
  });
});
