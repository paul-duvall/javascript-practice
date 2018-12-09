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
      {id: 0, name:'Steak Dinner', calories: 1200},
      {id: 1, name:'Cookie', calories: 200},
      {id: 2, name:'Salad', calories: 400}
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
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
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
}

// Add item submit function
const itemAddSubmit = function(e){
  // Get form input from UI Controller
  const input = UICtrl.getItemInput();

  // Check for name and calorie input
  if(input.name !=='' && input.calories !==''){
    const newItem = ItemCtrl.addItem(input.name, input.calories);
  }

  e.preventDefault();
}

// Public methods are returned
return {
  init: function(){
    // This completes any tasks that are necessary when the application first loads
    // Fetch items from the data structure within ItemCtrl
    const items = ItemCtrl.getItems();
    console.log(items);

    // Populate list with items
    UICtrl.populateItemList(items);

    // Load event listeners
    loadEventListeners();
  }
}

})(ItemCtrl, UICtrl);

App.init();