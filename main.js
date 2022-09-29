// grab elements 
// theme elements
const main = document.querySelector('main');
const themeToggler = document.querySelector('.theme-btn');
const bg = document.querySelector('.bg-img');

// form elements
const form = document.querySelector('.form');
const todo = document.querySelector('#todo');
const placeholder = document.querySelector('.placeholder');
const list = document.querySelector('.list');

const container = document.querySelector('.list-container');

// filter elements 
const filters= document.querySelectorAll('.filter-container li');
// const active= document.querySelector('.active');
// const completed= document.querySelector('.completed');

// grab the clear element
const clear = document.querySelector('.delete-completed');

// deal with the theme 
themeToggler.addEventListener("click", () => {
    document.body.classList.toggle('light');
} 
)



// deal with the placeholder
todo.addEventListener("focus", ()=>{
    placeholder.textContent = "Currently typing";
})
todo.addEventListener("blur", ()=>{
    placeholder.textContent = "create a new todo...";
})
// deal with the form 
form.addEventListener('submit', addTodo);

// functions
function addTodo(e){
    e.preventDefault();
    const value = todo.value;
    if(value){
        
        const element = document.createElement('li');
        element.classList.add('list-item');

        const attr = document.createAttribute('data-id');
        attr.value = 'active';
        element.setAttributeNode(attr);

        element.innerHTML = `
        <span class="checkbox">
        <img src="./images/icon-check.svg" class="input-check">
      </span>
      <div class="text-container">
        <p class="todo-text">${value}</p>
      </div>
      <img src="./images/icon-cross.svg" class="cross">
        `
    // dealing with the checked part
    element.addEventListener('click', (e) => {
        completeTask(e);
        filterLister();
        itemsLength();
    });

    // dealing with the delete element part
    const deleteBtn = element.querySelector('.cross');
    deleteBtn.addEventListener('click', (e) => {
        deleteElement(e);
        filterLister();
        itemsLength();
    });

    // dealing with the filters 
  

    list.appendChild(element);
    container.classList.add('show');
    todo.value = '';
    
    function itemsLength(){
        let items = document.querySelector('.items-number');
        let lists = list.querySelectorAll('.list-item');

        let listLength = [];
        lists.forEach( list => {
            if(list.dataset.id === "active"){
                listLength.push(list);
            }
        })
        items.textContent = `${listLength.length} items left`;
    }

    itemsLength();

    filters.forEach( filter => {
        filter.addEventListener('click', (e)=> {
            const clickedElementId = e.currentTarget.dataset.id;
            filter.classList.add('current-filter');
            filters.forEach(filt => {
                if(filter !== filt ){
                    filt.classList.remove('current-filter');
                }
            })
            
           handleFilter(clickedElementId);
        })
    })
   
   function handleFilter(el){
    if(list.children.length > 0){
        const childs = list.querySelectorAll('.list-item');
       childs.forEach(item => {
           if(el === "all" ){
               item.style.display = "flex";
           }else if(el !== item.dataset.id){
             item.style.display = "none";
           } else {
             item.style.display = "flex";
           }
         
       })
    }
   }

// deal with rerender the list according to the filter
function filterLister(){
    filters.forEach(filter => {
        if(filter.classList.contains('current-filter')){
            const filterId = filter.dataset.id;
            handleFilter(filterId);
        }
    })
}

// dealing with the clear part

clear.addEventListener('click', () => {
    const items = list.querySelectorAll('.list-item');
    items.forEach(item => {
        if(item.dataset.id === 'completed'){
            list.removeChild(item);
            if(list.children.length === 0){
                container.classList.remove('show')
            }
        }
    })
    itemsLength();
})



    }else {
        alert("enter a todo");
    }
}

function completeTask(e){
    const target = e.currentTarget;
    target.classList.toggle('checked');
    if(target.classList.contains('checked')){
        target.dataset.id = 'completed';
    }else {
        target.dataset.id = 'active';
    }
    
}

function deleteElement(e){
    const elementToDelete = e.currentTarget.parentElement;
    list.removeChild(elementToDelete);
    if(list.children.length === 0){
        container.classList.remove('show');
    }

}


// deeal with the clear items part


