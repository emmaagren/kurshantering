import './style.css'
import { CourseInfo } from './interfaces'

let courses: CourseInfo[] = [];

//LocalStorage

function loadCourses(): void {

  const storedCourses: string | null =
    localStorage.getItem("courses");

  if (storedCourses) {
    courses = JSON.parse(storedCourses);
  }
}

function saveCourses(): void {
  localStorage.setItem(
    "courses",
    JSON.stringify(courses)
  );
}


//Visa kurser

function renderCourses(): void {

  const courseList =
    document.getElementById("courseList") as HTMLUListElement;

  courseList.innerHTML = "";

  courses.forEach((course: CourseInfo) => {

    const li: HTMLLIElement =
      document.createElement("li");

    li.innerHTML = `
    <strong>${course.code}</strong>
    - ${course.name}
    (${course.progression})
    <a href="${course.syllabus}" target="_blank">
    Kursplan
    </a>
    <button data-code="${course.code}">
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
  document.getElementById("courseForm")
as: HTMLFormElement;

form.addEventListener("submit",
  (event: SubmitEvent) => {

    event.preventDefault();

    const code =
     (document.getElementById("code") as HTMLInputElement).value;

  const name =
  (document.getElementById("name") as HTMLInputElement).value;

const progression =
  (document.getElementById("progression") as HTMLInputElement).value as "A" | "B" | "C";

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