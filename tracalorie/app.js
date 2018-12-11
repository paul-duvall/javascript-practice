// This project uses the module pattern

// ************************ Storage controller ************************
const StorageCtrl = (function(){

  // Public methods
  return {
    storeItem: function(item){
      let items;
      // Check if any items in local storage
      if(localStorage.getItem('items') === null){
        // Runs if there is no items currently in local storage
        items = [];
        // Push new item into items array
        items.push(item);
        // Set local storage
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // Runs if there are already items in local storage
        // Set items array to hold items already in local storage
        items = JSON.parse(localStorage.getItem('items'));

        // Push on new item
        items.push(item);

        // Reset local storage, including new item
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: function(){
      let items;
      if(localStorage.getItem('items') === null){
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateItemStorage: function(updatedItem){
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item, index){
        if(updatedItem.id === item.id){
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemFromStorage: function(id){
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item, index){
        if(id === item.id){
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsFromStorage: function(){
      console.log('hi');
      localStorage.removeItem('items');
    }
  }
})();


// ************************ Item controller ************************
const ItemCtrl = (function(){
  // Item constructor
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data structure / state
  const data = {
    // items: [
    //   // {id: 0, name:'Steak Dinner', calories: 1200},
    //   // {id: 1, name:'Cookie', calories: 200},
    //   // {id: 2, name:'Salad', calories: 400}
    // ],
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  }

  // Public methods are returned
  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories) {
      // Create id for current item
      if(data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      
      // Parse the calories from a string to a number
      calories = parseInt(calories);

      // Create the new item
      newItem = new Item(ID, name, calories);

      // Add new item to the items array
      data.items.push(newItem);

      return newItem;
    },
    getItemById(id){
      let found = null;
      // Loop through the items in data
      data.items.forEach(function(item){
        // Check if current item's id matched the id selected for editing
        if(item.id === id){
          // Set found to match the item found
          found = item;
        }
      });
      return found;
    },
    updateItem: function(name, calories){
      // Turn the calories string into a number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function(item){
        if(item.id === data.currentItem.id){
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function(id){
      // Create an array of the ids for all the items in data.items
      const ids = data.items.map(function(item){
        return item.id;
      });

      // Get index of the selected item
      const index = ids.indexOf(id);

      // Remove item from data.items
      data.items.splice(index, 1);
    },
    clearAllItems: function(){
      data.items = [];
    },
    setCurrentItem: function(item){
      data.currentItem = item;
    },
    getCurrentItem: function(){
      return data.currentItem;
    },
    getTotalCalories: function(){
      let total = 0;

      // Loop through items and add calories
      data.items.forEach(function(item){
        total += item.calories;
      });

      // Set total calories within data structure
      data.totalCalories = total;

      // Return total;
      return data.totalCalories;
    },
    logData: function() {
      return data;
    }
  }

})();





// ************************ UI controller ************************
const UICtrl = (function(){
  // object contains references to the various selectors needed
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',
  }

  // Public methods are returned
  return {
    populateItemList: function(items){
      let html = '';
      items.forEach(function(item){
        html += `
        <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>
        `;
      });

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function(){
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function(item){
      // Show the list (hidden when empty)
      document.querySelector(UISelectors.itemList).style.display = 'block';

      // Create li element
      const li = document.createElement('li');
      // Add class to li element
      li.className = 'collection-item';
      // Add ID to li element
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `
        <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>`;
      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },
    updateListItem: function(item){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // The above gives us a node list, which needs to be converted into an array so we can loop through
      listItems = Array.from(listItems);

      // Loop through listItems
      listItems.forEach(function(listItem){
        const itemID = listItem.getAttribute('id');

        if(itemID === `item-${item.id}`){
          document.querySelector(`#${itemID}`).innerHTML = `
          <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },
    deleteListItem: function(id){
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    // Clears the input after the new item has been added
    clearInput: function(){
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    // Returns current item to form for edit state
    addItemToForm: function(){
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    // Remove all items from the UI for 'clear all' button
    removeItems: function(){
      let listItems = document.querySelectorAll(UISelectors.listItems);
      
      // Turn node list into an array
      listItems = Array.from(listItems);

      listItems.forEach(function(item){
        item.remove();
      });
    },
    // Hides ul element when there are no items in the list
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function(totalCalories){
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState: function(){
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: function(){
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    // Makes the UISelectors variable available at global level
    getSelectors: function(){
      return UISelectors;
    }
  }
})();





// ************************ App controller ************************
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
  // *************************** //
  // Load event listeners        //
  // *************************** //
  const loadEventListeners = function(){
  // Get UI selectors
  const UISelectors = UICtrl.getSelectors();
  // Add item event
  document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

  // Disable submit on enter
  // (This means user has to click on a button and hitting the enter key does nothing)
  // (This is necessary because there are multiple buttons in the different states)
  document.addEventListener('keypress', function(e){
    if(e.keyCode === 13 || e.which === 13){
      e.preventDefault();
      return false;
    }
  });

  // Edit icon click event
  document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

  // Update item event
  document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

  // Delete item event
  document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

  // Back button event
  document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

    // Clear items event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
}

// *************************** //
// Add item submit function    //
// *************************** //
const itemAddSubmit = function(e){
  // Get form input from UI Controller
  const input = UICtrl.getItemInput();

  // Check for name and calorie input
  if(input.name !=='' && input.calories !==''){
    // Add item to data structure
    const newItem = ItemCtrl.addItem(input.name, input.calories);
    // Add item to the UI list
    UICtrl.addListItem(newItem);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to the UI
    UICtrl.showTotalCalories(totalCalories);

    // Store item in local storage
    StorageCtrl.storeItem(newItem);

    // Clear the inputs once the item has been added to the data structure and UI
    UICtrl.clearInput();
  }
  e.preventDefault();
}

  // *************************** //
  // Click edit item             //
  // *************************** //
  const itemEditClick = function(e){
    // Use event delegation to target the edit item button
    if(e.target.classList.contains('edit-item')){
      // Get list item id
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArr = listId.split('-');

      // Get the actual id
      const id = parseInt(listIdArr[1]);

      // Get the actual item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set the current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }
    e.preventDefault;
  }

// *************************** //
// Update item submit          //
// *************************** //
const itemUpdateSubmit = function(e){
  // Get item input
  const input = UICtrl.getItemInput();
  
  // Update the item
  const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

  // Update UI
  UICtrl.updateListItem(updatedItem);

   // Get total calories
   const totalCalories = ItemCtrl.getTotalCalories();
   // Add total calories to the UI
   UICtrl.showTotalCalories(totalCalories);

   // Update local storage
   StorageCtrl.updateItemStorage(updatedItem);

   UICtrl.clearEditState();

  e.preventDefault();
}

// *************************** //
// Delete button event         //
// *************************** //
const itemDeleteSubmit = function(e){
  // Get current Item
  const currentItem = ItemCtrl.getCurrentItem();

  // Delete item from data structure
  ItemCtrl.deleteItem(currentItem.id);

  // Delete item from UI
  UICtrl.deleteListItem(currentItem.id);

  // Get total calories
  const totalCalories = ItemCtrl.getTotalCalories();
  // Add total calories to the UI
  UICtrl.showTotalCalories(totalCalories);

  // Delete item from local storage
  StorageCtrl.deleteItemFromStorage(currentItem.id);

  UICtrl.clearEditState();

  e.preventDefault();
}

// *************************** //
// Clear items event           //
// *************************** //
const clearAllItemsClick = function(){
  // Delete all items from data structure
  ItemCtrl.clearAllItems();

  // Get total calories
  const totalCalories = ItemCtrl.getTotalCalories();
  // Add total calories to the UI
  UICtrl.showTotalCalories(totalCalories);

  // Remove all items from UI
  UICtrl.removeItems();

  // Remove all items from local storage
  StorageCtrl.clearItemsFromStorage();

  // Hide the list (so the line doesn't appear)
  UICtrl.hideList();
}


// Public methods are returned
return {
  init: function(){
    // This completes any tasks that are necessary when the application first loads
    
    // Clear edit state (establish initial state)
    UICtrl.clearEditState();  
    
    // Fetch items from the data structure within ItemCtrl
    const items = ItemCtrl.getItems();

    // Check if any items are present
    if(items.length === 0){
      UICtrl.hideList();
    } else {
      // Populate list with items
      UICtrl.populateItemList(items);
    }

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to the UI
    UICtrl.showTotalCalories(totalCalories);

    // Load event listeners
    loadEventListeners();
  }
}

})(ItemCtrl, StorageCtrl, UICtrl);

App.init();