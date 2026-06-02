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
    <strong>${course.code}</strong
    - ${course.name}
    (${course.progression})
    <a href="${course.syllabus}" target="_blank">
    Kursplan
    </a>
    button data-code="${course.code}">
    Radera
    </button>
    `;

    courseList.appendChild(li);
  });
}