const student_list = JSON.parse(localStorage.getItem("student-list")) || [];

const present_btn = document.querySelector(".present-btn");
const absent_btn = document.querySelector(".absent-btn");

const ins_name = document.querySelector("#ins-name");
const ins_roll = document.querySelector("#ins-roll");

const recheck_sec = document.querySelector(".recheck-sec");
const present_len = document.querySelector(".present-len");
const present_list = document.querySelector(".present-list");
const absent_len = document.querySelector(".absent-len");
const absent_list = document.querySelector(".absent-list");
const confirm_btn = document.querySelector(".confirm-btn");

const thank_sec = document.querySelector(".thank-sec");

const no_stud_warn = document.querySelector(".no-stud-warn");
if (student_list.length == 0) {
  no_stud_warn.style.display = "flex";
}

let absenties = [];
let presenties = [];

let pick = 0;

let current_stud = student_list[pick];
ins_name.innerText = current_stud;
ins_roll.innerText = pick + 1;

const getFormattedDate = () => {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear()).slice(-2);

  return `${day}.${month}.${year}`;
};

const update_recheck_screen = () => {
  present_list.innerHTML = "";
  absent_list.innerHTML = "";

  presenties.sort();
  absenties.sort();

  present_len.innerText = presenties.length;
  presenties.forEach((stud, idx) => {
    present_list.innerHTML += `<li>${stud}</li>`;
  });

  absent_len.innerText = absenties.length;
  absenties.forEach((stud, idx) => {
    absent_list.innerHTML += `<li>${stud}</li>`;
  });
};

const checkDone = () => {
  if (pick >= student_list.length) {
    update_recheck_screen();
    recheck_sec.style.display = "flex";
  }
};

const next_stud = () => {
  pick++;
  checkDone();

  if (pick < student_list.length) {
    current_stud = student_list[pick];
    ins_name.innerHTML = current_stud;
    ins_roll.innerText = pick + 1;
  }
};

present_list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const name = e.target.innerText.toLowerCase();

    presenties = presenties.filter((stud) => stud !== name);
    absenties.push(name);
    absenties.sort();

    update_recheck_screen();
  }
});

absent_list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const name = e.target.innerText.toLowerCase();

    absenties = absenties.filter((stud) => stud !== name);
    presenties.push(name);
    presenties.sort();

    update_recheck_screen();
  }
});

present_btn.addEventListener("click", () => {
  presenties.push(current_stud);
  next_stud();
});

absent_btn.addEventListener("click", () => {
  absenties.push(current_stud);
  next_stud();
});

const capitalizeWords = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

confirm_btn.addEventListener("click", () => {
  text = `PRESENT STUDENTS (${presenties.length}/${student_list.length})\n`;
  text += `Date: *${getFormattedDate()}*\n`;
  presenties.forEach((stud, idx) => {
    text += `\n  ${idx + 1}. ${capitalizeWords(stud)}`;
  });
  text +=
    "\n\n----------------------------\n Made by codr_kishanx17 (IG),\n Follow for updates & stay connected :) \n web: https://kishan16.vercel.app/";
  console.log(text);
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Copied!");
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
      alert("failed to copy!! : \n", err);
    });

  // console.log(thank_sec.style);
  // thank_sec.style.visibility = "visible";
  // console.log(thank_sec.style);
  alert(
    "Kishan Said: Thankyou Sir! for using this tool, no manual writing or typing, attendance has been copied :)",
  );
  // console.log(thank_sec);
  // const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  // window.open(url, "_blank");
});
