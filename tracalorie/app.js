// This project uses the module pattern

// ******************* Storage controller *******************



// ******************* Item controller *******************
const ItemCtrl = (function(){
  // Item constructor
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data structure / state
  const data = {
    items: [
      // {id: 0, name:'Steak Dinner', calories: 1200},
      // {id: 1, name:'Cookie', calories: 200},
      // {id: 2, name:'Salad', calories: 400}
    ],
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



// ******************* UI controller *******************
const UICtrl = (function(){
  // object contains references to the various selectors needed
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
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
    // Clears the input after the new item has been added
    clearInput: function(){
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
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
    // Makes the UISelectors variable available at global level
    getSelectors: function(){
      return UISelectors;
    }
  }
})();



// ******************* App controller *******************
const App = (function(ItemCtrl, UICtrl){
// Load event listeners
const loadEventListeners = function(){
  // Get UI selectors
  const UISelectors = UICtrl.getSelectors();

  // Add item event
  document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

  // Edit icon click event
  document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);
}

// Add item submit function
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

    // Clear the inputs once the item has been added to the data structure and UI
    UICtrl.clearInput();
  }
  e.preventDefault();
}

  // Update item submit
  const itemUpdateSubmit = function(e){
    console.log('test');
    
    e.preventDefault;
  }

// Public methods are returned
return {
  init: function(){
    // This completes any tasks that are necessary when the application first loads
    
    // Clear edit state (establish initial state)
    UICtrl.clearEditState();  
    
    // Fetch items from the data structure within ItemCtrl
    const items = ItemCtrl.getItems();
    console.log(items);

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

})(ItemCtrl, UICtrl);

App.init();