//select my todo form
const todoForm = document.querySelector('#todo-form')
//select the text box in the todo form
const todoInput = document.querySelector('#todo-input');
//the parent element of where my todo list tasks will render
const todoListUl = document.querySelector('#todo-list');


//TODO ARRAY
//Store Todos in to this array before pushing to local storage
let todoArray = []

////////CHECK LOCAL STORAGE/////////

//check local storage if there are saved todos
if(localStorage.length > 0) {
  let retrieveLS = JSON.parse(localStorage.getItem('Saved Todos'));
    for (let i = 0; i < retrieveLS.length; i++){
      let lSTodo = document.createElement('li');
      lSTodo.innerText = retrieveLS[i].task;
      lSTodo.isCompleted = retrieveLS[i].isCompleted ? true : false;
      console.log(lSTodo.isCompleted)
        if(lSTodo.isCompleted = true){
          lSTodo.style.textDecoration = "line-through";
        }
      let lSDeleteButton =  document.createElement('button')
      lSDeleteButton.innerText = "X";
      todoListUl.append(lSTodo);
      lSTodo.append(lSDeleteButton);

    }
} else {
  console.log("save some todos")
}

/////////ADD TODO FROM FORM///////////
//pull the value from the todo form and add new todos
todoForm.addEventListener('submit', function(e){
  e.preventDefault();
    
  //add new todo
  const todoLi = document.createElement('li');
  todoLi.innerText = todoInput.value; 
  //add delete button
  
  const deleteButton = document.createElement('button'); 
  deleteButton.innerText = "X";
  //render todo item, and button to DOM
  
  todoLi.append(deleteButton);
  todoListUl.append(todoLi);
  // push todos in the array
  todoArray.push(
    {
      task: todoInput.value,
      isCompleted: false
    }
  );
  //store in local storage
  localStorage.setItem("Saved Todos", JSON.stringify(todoArray))
  //clear input form
  todoInput.value = '';
});



//listen for clicks on delete button and list item
todoListUl.addEventListener('click', function(e){
  let clickedTodo = e.target;

  if(!clickedTodo.isCompleted) {
    clickedTodo.style.textDecoration = "line-through";
    clickedTodo.isCompleted = true;
  } else {
    clickedTodo.style.textDecoration = "none";
    clickedTodo.isCompleted = "false";
  }

  for (let i = 0; i < todoArray.length; i++) {
    console.log(todoArray[i].task);
    console.log(clickedTodo.childNodes[0].textContent)
    if(todoArray[i].task === clickedTodo.childNodes[0].textContent) {
      todoArray[i].isCompleted = !todoArray[i].isCompleted;
      localStorage.setItem("Saved Todos", JSON.stringify(todoArray));
    }
  }




  //delete todo
  if(e.target.tagName === "BUTTON"){
    e.target.parentElement.remove()
    todoArray = [];

    const modifiedToDos = (document.querySelectorAll('li'));
    const arrayed = Array.from(modifiedToDos)
    console.log("modified todos array", arrayed)
    for (let i=0; i < arrayed.length; i++){
      todoArray.push ({
        task: arrayed[i].innerText.slice(0, -1),
        isComplete: false
      })
    }
    localStorage.removeItem("Saved Todos");
    localStorage.setItem("Saved Todos", JSON.stringify(todoArray));

    
  } 

});





