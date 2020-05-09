// Global UI Node variables Initialisation
let form = document.getElementById('addForm');
let itemList = document.getElementById('items');
let filter = document.getElementById('filter');

class UI{

    // Add Item to the List
    static addItem(event){
        event.preventDefault();

        let newItem = document.createElement("li");
        newItem.className = 'list-group-item';
        
        let deleteBtn = document.createElement("button");
        deleteBtn.appendChild(document.createTextNode('X'));
        deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
        
        newItem.appendChild(document.createTextNode(form.elements.namedItem("item").value));
        newItem.appendChild(deleteBtn);

        itemList.appendChild(newItem);
    }
    // Delete Item from list
    static removeItem(event){
        event.preventDefault();
        if(event.target.classList.contains('delete')){
            if(confirm("Are you sure?")){
                itemList.removeChild(event.target.parentElement);
            }
        }
    }
    // Validate the entered input
    static validate(event){
        event.preventDefault();
        if(!form.elements.namedItem("item").value){
            UI.showAlert('Please enter a value to add first.','danger');
            return;
        }
        UI.addItem(event);
    }
    static showAlert(message, className){
        const warningDiv = document.createElement("div");
        warningDiv.className = `alert alert-${className}`;

        const container = document.querySelector('#main-container');
        console.log(container);
        const main = document.querySelector('#main');

        warningDiv.appendChild(document.createTextNode(message));
        container.insertBefore(warningDiv,main);
        setTimeout(function(){container.removeChild(warningDiv)},3000);
    }
    //Search Items
    static filterItems(event){
    
        let text = event.target.value.toLowerCase();

        let items = itemList.getElementsByTagName('li');
        
        Array.from(items).forEach(function(item){
            let itemName = item.firstChild.textContent;
            if(itemName.toLowerCase().indexOf(text) != -1){
                item.style.display = 'block';
            } else{
                item.style.display = 'none';
            }
        });
    }
}

// Registering UI class methods as eventlisteners
form.addEventListener('submit',UI.validate);
itemList.addEventListener('click',UI.removeItem);
filter.addEventListener('keyup',UI.filterItems);
