let students = JSON.parse(localStorage.getItem("jspiders")) || [];
let filter = "all",
    search = "",
    sort = "";

function save() {
    localStorage.setItem("jspiders", JSON.stringify(students));
}
function stats() {
    total.innerText = students.length;
    completed.innerText = students.filter((s) => s.placed).length;
    pending.innerText = students.filter((s) => !s.placed).length;
}

function render() {
    let data = [...students];
    if (filter === "pending") data = data.filter((s) => !s.placed);
    if (filter === "completed") data = data.filter((s) => s.placed);
    if (search) {
        let key = search.toLowerCase();
        data = data.filter(
            (s) =>
                s.name.toLowerCase().includes(key) ||
                s.course.toLowerCase().includes(key) ||
                s.batch.toLowerCase().includes(key)
        );
    }
    if (sort === "course")
        data.sort((a, b) => a.course.localeCompare(b.course));
   

    list.innerHTML = "";
    data.forEach((s) => {
        const d = document.createElement("div");
        d.className = `batch ${s.placed ? "completed" : ""}`;
        d.innerHTML = `<div>
<div class="name">${s.name}
<span class="badge ${s.course}">${s.course.toUpperCase()}</span>
</div>
<div class="meta">${s.batch} | Joined: ${s.join || "N/A"}</div>
</div>
<div class="actions">
<button class="done" onclick="toggle(${s.id})">✔</button>
<button class="edit" onclick="edit(${s.id})">✎</button>
<button class="delete" onclick="del(${s.id})">✖</button>
</div>`;
        list.appendChild(d);
    });
    stats();
}

function addStudent() {
    if (!nameInput.value.trim()) return;
    students.unshift({
        id: Date.now(),
        name: nameInput.value,
        course: course.value,
        batch: batch.value,
        join: join.value,
        placed: false,
    });
    nameInput.value = "";
    join.value = "";
    save();
    render();
}

nameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addStudent();
});

function toggle(id) {
    students = students.map((s) =>
        s.id === id ? { ...s, placed: !s.placed } : s
    );
    save();
    render();
}
function edit(id) {
    const s = students.find((x) => x.id === id);
    const n = prompt("Edit student name", s.name);
    if (n) {
        s.name = n;
        save();
        render();
    }
}
function del(id) {
    if (confirm("Delete student?")) {
        students = students.filter((s) => s.id !== id);
        save();
        render();
    }
}
function setFilter(f, btn) {
    filter = f;
    document
        .querySelectorAll(".filters button")
        .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    render();
}
function clearPlaced() {
    students = students.filter((s) => !s.placed);
    save();
    render();
}

render();