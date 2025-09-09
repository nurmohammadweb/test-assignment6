

const loadPages = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayAllTree(data.categories));
};


const removeActive = () => {
  const treeBtn = document.querySelectorAll(".tree-btn");
  // console.log(treeBtn);
  treeBtn.forEach(btn => btn.classList.remove("active"));
};

const treeAllDetail = async (id) => {
  const detail = `https://openapi.programming-hero.com/api/plant/${id}`;
  // console.log(detail);
  const res = await fetch(detail);
  const details = await res.json();
  allDeteils(details.plants);
};

const allDeteils = (tree) => {
  console.log(tree);
  const detailBox = document.getElementById("deteils-container");
  detailBox.innerHTML = ` 
                <h2 class="card-title">${tree.name}</h2>
                <figure class="px-5 pt-5">
                  <img src="${tree.image}" class="rounded-xl" />
                </figure>
                <div class="card-body">
                  <p>Categorie : ${tree.category}</p>
                  <p>Price : ${tree.price}</p>
                  <p class="py-1">Description : ${tree.description}
                  </p>
                </div>
              </div>
            </div>
           `;
  document.getElementById("tree-modal").showModal();

};

const treeBox = (id) => {
  //console.log(id);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const highlight = document.getElementById(`btn-highlight-${id}`);
      //console.log(highlight);
      highlight.classList.add("active")
      displayTreeBox(data.plants);
    
    });
  
};

const displayTreeBox = (trees) => {
  const optionContain = document.getElementById("option-contain");
  optionContain.innerHTML = "";

  trees.forEach((tree) => {
    const allPlants = document.createElement("div");
    allPlants.innerHTML = `
      <div class="card bg-base-100 m-4 shadow-sm">
        <figure class="px-10 pt-10">
          <img src="${tree.image}" class="rounded-xl" />
        </figure>
        <div class="card-body">
          <h2 onclick="treeAllDetail(${tree.id})" class="card-title">${tree.name}</h2>
          <p class="py-2">${tree.description}</p>
          <div class="flex gap-10">
            <p class="bg-green-200 rounded w-[20px]">${tree.category}</p>
            <p>
              <img class="w-5 inline items-center" src="assets/bangladeshi-taka-sign-solid-full.svg" alt="">
              ${tree.price}
            </p>
          </div>
          <div class="card-actions">
            <button onclick='addToCart(${JSON.stringify(tree)})' 
                 class="btn w-full bg-green-600 rounded-2xl">
               Add to Cart
             </button>

          </div>
        </div>
      </div>`;
    optionContain.append(allPlants);
  });

};

const displayAllTree = (trees) => {
  const allTreeContainer = document.getElementById("option-container");
  allTreeContainer.innerHTML = "";
  //console.log(allTreeContainer);

  for (let tree of trees) {
    const allTree = document.createElement("div");
    allTree.innerHTML = `
    <button id="btn-highlight-${tree.id}" onclick="treeBox('${tree.id}')" class="hover:bg-green-600 w-full p-4 rounded-[4px] tree-btn">${tree.category_name}</button>`;

    allTreeContainer.append(allTree);
  }

};
let cart = [];

// add to cart
const addToCart = (tree) => {
  
  let existing = cart.find(item => item.id === tree.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({...tree, quantity: 1});
  }
  updateCart();
};

// remove cart
const removeFromCart = (id) => {
  cart = cart.filter(item => item.id !== id);
  updateCart();
};


const updateCart = () => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = `<h3 class="font-bold text-[16px] text-center">Your Cart</h3>`;

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("flex", "justify-between", "items-center", "bg-green-50", "p-2", "m-2", "rounded");

    cartItem.innerHTML = `
      <div>
        <h4 class="font-bold text-sm">${item.name}</h4>
        <p class="text-sm">৳${item.price} × ${item.quantity}</p>
      </div>
      <button onclick="removeFromCart(${item.id})" class="text-red-600 font-bold">×</button>
    `;

    cartContainer.appendChild(cartItem);
  });

  // total price
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("flex", "justify-between", "p-2", "border-t");
  totalDiv.innerHTML = `
    <h4 class="font-bold">Total:</h4>
    <p class="font-bold">৳${total}</p>
  `;
  cartContainer.appendChild(totalDiv);
};

loadPages();
