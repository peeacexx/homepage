const host = "http://127.0.0.1:80";
const todosContainer = document.querySelector(".todos-container");

// todosContainer를 초기화하고, todos 데이터를 받아와서 렌더링하는 함수
function getTodos() {
  axios
    .get(`${host}/todo`)
    .then((response) => {
      console.log(response.data);
      renderTodos(response.data.todos);
    })
    .catch((error) => {
      console.error("Error fetching todos:", error);
    });
}

// todosContainer에 todos 데이터를 렌더링하는 함수
function renderTodos(todos) {
  todosContainer.innerHTML = ""; // todosContainer 초기화

  const itemCount = todos.length;
  let itemWidth, itemHeight, fontSize;

  if (itemCount <= 6) {
    itemWidth = "30%";
    itemHeight = "46%";
    fontSize = "20px";
  } else if (itemCount <= 8) {
    itemWidth = "21%";
    itemHeight = "36%";
    fontSize = "17px";
  } else if (itemCount <= 12) {
    itemWidth = "20%";
    itemHeight = "25%";
    fontSize = "14px";
  }

  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");
    todoDiv.style.width = itemWidth;
    todoDiv.style.height = itemHeight;
    todoDiv.style.fontSize = fontSize; // 폰트 사이즈 설정
    todoDiv.style.important = "important"; // CSS 우선순위 높이기
    const timestamp = new Date(todo.timestamp).toLocaleString(); // 날짜 포맷
    todoDiv.innerHTML = `
      <strong style="color: blue;">${todo.author}</strong>: ${todo.item} 
      <br>
      <small style="margin-top: 10px; display: inline-block; color: gray;">${timestamp}</small>
    `;

    // 삭제 버튼 생성 및 이벤트 처리
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "x";
    deleteBtn.addEventListener("click", function () {
      deleteTodo(todo.id);
    });

    // todoDiv에 삭제 버튼 추가
    todoDiv.appendChild(deleteBtn);
    todosContainer.appendChild(todoDiv);
  });
}

// DOMContentLoaded 이벤트 리스너 추가
window.addEventListener("DOMContentLoaded", function () {
  getTodos();
});

// 입력 폼 요소 선택
const guestbookForm = document.querySelector(".guestbook-form");
const authorInput = document.querySelector("#author");
const contentInput = document.querySelector("#content");

// 폼 제출 시 addTodo 함수를 호출하는 이벤트 리스너 추가
guestbookForm.addEventListener("submit", function (event) {
  event.preventDefault(); // 폼 제출 시 새로고침 방지
  addTodo();
});

// 새로운 todo를 추가하는 함수
function addTodo() {
  const author = authorInput.value.trim();
  const title = contentInput.value.trim();
  let todoData = {
    id: 0,
    item: title,
    author: author,
    timestamp: new Date().toISOString(),
  };
  if (title === "" || author === "") return;
  axios
    .post(`${host}/todo`, todoData)
    .then((response) => {
      authorInput.value = ""; // 입력 필드 초기화
      contentInput.value = ""; // 입력 필드 초기화
      getTodos();
    })
    .catch((error) => {
      console.error("Error adding todo:", error);
    });
}

// 삭제 기능
function deleteTodo(todoId) {
  axios
    .delete(`${host}/todo/${todoId}`)
    .then(function (response) {
      console.log("Todo deleted:", response.data);
      getTodos();
    })
    .catch(function (error) {
      console.error("Error deleting todo:", error);
    });
}

// 마우스 hover 효과

const hobby = document.querySelectorAll(".container .item");

hobby.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)";
    this.style.transition = "transform 0.3s ease";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
    this.style.transition = "transform 0.3s ease";
  });
});

const images = document.querySelectorAll(".photo article");

images.forEach((image) => {
  image.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)";
    this.style.transition = "transform 0.3s ease";
  });

  image.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
    this.style.transition = "transform 0.3s ease";
  });
});
