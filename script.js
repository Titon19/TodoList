// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("form");
//   form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     addList();
//   });
// });

// function addList() {
//   const listElement = document.getElementById("listName");
//   const listDateElement = document.getElementById("listDate");
//   const listNoteElement = document.getElementById("listNote");

//   const list = listElement.value;
//   const listDate = listDateElement.value;

//   const innerList = document.createElement("div");
//   innerList.className = "insideList flex justify-between w-full";
//   innerList.innerHTML = `
//   <p>${list}</p>
//   <p>${listDate}</p>
// `;

//   listNoteElement.appendChild(innerList);
//   console.log(listNoteElement);
// }
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const listNote = document.getElementById("listNote");

  const listName = document.getElementById("listName");
  const listDate = document.getElementById("listDate");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    addList();
    listName.value = "";
    listDate.value = "";
  });

  // Fungsi untuk menampilkan list dari LocalStorage
  function displayList() {
    listNote.innerHTML = "<h1 class=text-xl font-bold>List</h1>";

    let todoList = JSON.parse(localStorage.getItem("todoList"));
    if (todoList !== null && todoList.length > 0) {
      todoList.forEach(function (item, index) {
        const innerList = document.createElement("div");
        innerList.className = "insideList flex justify-between w-full";
        innerList.innerHTML = `
          <div class="flex flex-col">
          <p>${item.name}</p>
          <p>${item.date}</p>
          </div>
          <button class="text-red-500 font-bold" onclick="deleteList(${index})">Hapus</button>`;
        listNote.appendChild(innerList);
        console.log(listNote);
      });
    } else {
      const innerList = document.createElement("div");
      innerList.className = "insideList flex justify-between w-full";
      innerList.innerHTML = `
      <p>Belum ada list yang ditambahkan</p>`;
      listNote.appendChild(innerList);
    }
  }

  function addList() {
    // Ambil data dari form
    const listName = document.getElementById("listName").value;
    const listDate = document.getElementById("listDate").value;

    // Ambil data dari LocalStorage
    let todoList = JSON.parse(localStorage.getItem("todoList"));

    // Cek apakah data sudah ada di LocalStorage
    if (todoList === null) {
      todoList = []; // Jika belum ada, buat array kosong
    }

    // Tambahkan data baru ke dalam array
    todoList.push({ name: listName, date: listDate });

    // Simpan kembali ke LocalStorage dengan mengkonversi array menjadi string JSON
    localStorage.setItem("todoList", JSON.stringify(todoList));

    // Tampilkan data
    displayList();
  }

  window.deleteList = function (index) {
    let todoList = JSON.parse(localStorage.getItem("todoList"));

    if (todoList !== null) {
      // Hapus item berdasarkan index
      todoList.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      displayList();
    }
  };

  // Tampilkan list saat halaman dimuat
  displayList();
});
