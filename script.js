const teacherPassword = "teacher123"; // Пароль викладача
const studentPassword = "student123"; // Пароль студента
let currentUser = null; // Поточний користувач (студент або викладач)
let tables = {
    "algorithms1": { // Алгоритмізація І підгрупа
        students: ["Антонюк Анна", "Антонян Давид", "Банзерук Тетяна", "Бойко Павло"],
        sessions: [],
        scores: []
    },
    "algorithms2": { // Алгоритмізація ІІ підгрупа
        students: ["Квач Валерія", "Кулюк Ганна", "Карпович Олександр"],
        sessions: [],
        scores: []
    },
    // Додати інші предмети...
};

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (password === teacherPassword) {
        currentUser = "teacher";
        alert("Вітаємо, викладачу!");
        showMainContent();
    } else if (password === studentPassword) {
        currentUser = "student";
        alert("Вітаємо, студенте!");
        showMainContent();
    } else {
        alert("Невірний пароль");
    }
}

function showMainContent() {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    showTable('algorithms1'); // Початково показуємо таблицю "Алгоритмізація І підгрупа"
}

function showTable(subject) {
    const tableContainer = document.getElementById("table-container");
    tableContainer.innerHTML = ""; // Очищаємо контейнер перед новим виведенням таблиці

    const table = document.createElement("table");

    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `<th>Студент</th><th>Оцінка 1</th><th>Оцінка 2</th><th>Оцінка 3</th><th>Оцінка 4</th><th>Сума</th>`;
    table.appendChild(headerRow);

    const subjectData = tables[subject];

    subjectData.students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${student}</td>`;
        
        // Оцінки
        subjectData.scores[index] = subjectData.scores[index] || [];
        for (let i = 0; i < subjectData.scores[index].length; i++) {
            row.innerHTML += `<td><input type="number" value="${subjectData.scores[index][i]}" onchange="saveScore('${subject}', ${index}, ${i}, this.value)"></td>`;
        }

        // Сума
        const sum = subjectData.scores[index].reduce((acc, val) => acc + parseFloat(val || 0), 0);
        row.innerHTML += `<td>${sum}</td>`;
        table.appendChild(row);
    });

    tableContainer.appendChild(table);
}

function saveScore(subject, studentIndex, sessionIndex, score) {
    tables[subject].scores[studentIndex][sessionIndex] = score;
    saveData();
}

function openAddSessionForm() {
    if (currentUser !== "teacher") {
        alert("Тільки викладач може додавати заняття.");
        return;
    }
    document.getElementById("add-session-form").style.display = "block";
}

function addSession() {
    const date = document.getElementById("session-date").value;
    if (!date) {
        alert("Будь ласка, введіть дату заняття.");
        return;
    }

    // Додаємо нове заняття до кожної таблиці
    for (let subject in tables) {
        tables[subject].sessions.push(date);
        tables[subject].scores.forEach(studentScores => studentScores.push(0)); // Додаємо 0 для всіх студентів
    }

    document.getElementById("add-session-form").style.display = "none";
    showTable('algorithms1'); // Перемикаємося на Алгоритмізація І підгрупа (або інший предмет)
    saveData();
}

function cancelAddSession() {
    document.getElementById("add-session-form").style.display = "none";
}

function saveData() {
    localStorage.setItem("tables", JSON.stringify(tables));
}

function loadData() {
    const savedData = localStorage.getItem("tables");
    if (savedData) {
        tables = JSON.parse(savedData);
    }
}

// Завантаження даних при старті
loadData();
