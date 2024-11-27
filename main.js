document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("mainContent");
    const teacherControls = document.getElementById("teacherControls");

    const login = () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Попередньо задані логіни і паролі
        const users = {
            teacher: "teacherpassword", // Пароль для викладача
            student: "studentpassword"  // Пароль для студента
        };

        if (username === "teacher" && password === users.teacher) {
            alert("Ласкаво просимо, викладач!");
            mainContent.style.display = "block";
            teacherControls.style.display = "block"; // Показуємо кнопки викладача
        } else if (username === "student" && password === users.student) {
            alert("Ласкаво просимо, студент!");
            mainContent.style.display = "block";
            teacherControls.style.display = "none"; // Студенти не мають доступу до кнопок викладача
        } else {
            alert("Неправильний логін або пароль.");
        }
    };

    window.login = login; // Робимо функцію доступною глобально
});
