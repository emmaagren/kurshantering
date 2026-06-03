import './style.css';
import type { CourseInfo } from './interfaces';

let courses: CourseInfo[] = [];

//LocalStorage

function loadCourses(): void {

  const storedCourses: string | null =
    localStorage.getItem("courses");

  if (storedCourses) {
    courses = JSON.parse(storedCourses) as CourseInfo[];
  }
}

function saveCourses(): void {
  localStorage.setItem("courses", JSON.stringify(courses));
}


//Visa kurser

function renderCourses(): void {

  const courseList =
    document.getElementById("courseList") as HTMLUListElement;

  courseList.innerHTML = "";

  if (courses.length === 0) {
    courseList.innerHTML = "<li class='empty'>Inga kurser tillagda ännu.</li>";
    return;
  }

  courses.forEach((course: CourseInfo) => {

    const li: HTMLLIElement =
      document.createElement("li");

    li.innerHTML = `
    <div>
    <strong>${course.code}</strong>
    <p>${course.name}</p>
    <p>Progression: (${course.progression})</p>
    <a href="${course.syllabus}" target="_blank">Visa kursplan</a>
    </div>

    <button class="delete-btn" data-code="${course.code}">
    Radera
    </button>
    `;

    courseList.appendChild(li);
  });
}

//Lägg till kurs.

function addCourse(course: CourseInfo): void {

  const exists: boolean =
    courses.some(
      (c: CourseInfo) => c.code === course.code
    );

  if (exists) {
    alert("Kurskoden finns redan.");
    return;
  }

  courses.push(course);

  saveCourses();
  renderCourses();
}

//Radera kurs.

function deleteCourse(code: string): void {

  courses = courses.filter(
    (course: CourseInfo) => course.code !== code
  );

  saveCourses();
  renderCourses();
}

//Formulär.

const form =
  document.getElementById("courseForm") as HTMLFormElement;

form.addEventListener("submit",
  (event: SubmitEvent) => {

    event.preventDefault();

    const code =
     (document.getElementById("code") as HTMLInputElement).value;

  const name =
  (document.getElementById("name") as HTMLInputElement).value;

const progression =
  (document.getElementById("progression") as HTMLSelectElement).value as "A" | "B" | "C";

const syllabus =
(document.getElementById("syllabus") as HTMLInputElement).value;

const newCourse: CourseInfo = {
  code,
  name,
  progression,
  syllabus
};

addCourse(newCourse);

form.reset();

  });

  //Klick på radera.

  document.addEventListener("click",
    (event: MouseEvent) => {

      const target = event.target as HTMLElement;

      if (target.tagName === "BUTTON") {

        const code =
        target.getAttribute("data-code");

        if(code) {
          deleteCourse(code);
        }
      }
    });

//Starta appen

loadCourses();
renderCourses();