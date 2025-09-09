

const loadPages = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayAllTree(data.categories));
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("option-container").classList.add("hidden");
  } else {
    document.getElementById("option-contain").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const removeAll = () => {
  const allBtn = document.querySelectorAll(".all-btn");
  // console.log("allBtn");
   allBtn.forEach(btn => btn.classList.remove("active"));
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
    manageSpinner(true);
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

const allPlantTree = (id) => {
  const plant = `https://openapi.programming-hero.com/api/plants`;
  console.log(id);
  fetch(plant)
    .then((res) => res.json())
    .then((plant) => {
      removeAll();
      const highlight = document.getElementById(`all-highlights-${id}`);
      //console.log(highlight);
      highlight.classList.add("active");
      displayPlantsTree(plant.plants)
    });  
};

const displayPlantsTree = (alls) => {
  const allBtn = document.getElementById("option-contain");
  allBtn.innerHTML = "";
  alls.forEach((all) => {
    const treePlant = document.createElement("div");
    treePlant.innerHTML = `
    <div class="card bg-base-100  m-4 shadow-sm">
              <figure class="px-10 pt-10">
                <img src="${all.image}"
                  class="rounded-xl" />
              </figure>
              <div class="card-body">
                <h2 class="card-title">${all.name}</h2>
                <p class="py-2">${all.description}
                </p>
                <div class="flex gap-10">
                  <p class="bg-green-200 rounded w-[20px]">${all.category}</p>
                  <p> <img class="w-5 inline items-center" src="assets/bangladeshi-taka-sign-solid-full.svg" alt="">${all.price}</p>
                </div>
                <div class="card-actions">
                  <button class="btn w-full bg-green-600 rounded-2xl">Add to Cart</button>
                </div>
              </div>
            </div>`;

    allBtn.append(treePlant);
  
  });

};
allPlantTree();


const displayTreeBox = (trees) => {
 
  const optionContain = document.getElementById("option-contain");
  optionContain.innerHTML = "";
  console.log(optionContain);

  trees.forEach((tree) => {
      
    const allPlants = document.createElement("div");
    allPlants.innerHTML = `
    <div class="card bg-base-100  m-4 shadow-sm">
              <figure class="px-10 pt-10">
                <img src="${tree.image}"
                  class="rounded-xl" />
              </figure>
              <div class="card-body">
                <h2 onclick="treeAllDetail(${tree.id})" class="card-title">${tree.name}</h2>
                <p class="py-2">${tree.description}
                </p>
                <div class="flex gap-10">
                  <p class="bg-green-200 rounded w-[20px]">${tree.category}</p>
                  <p> <img class="w-5 inline items-center" src="assets/bangladeshi-taka-sign-solid-full.svg" alt="">${tree.price}</p>
                </div>
                <div class="card-actions">
                  <button class="btn w-full bg-green-600 rounded-2xl">Add to Cart</button>
                </div>
              </div>
            </div>`;
    optionContain.append(allPlants);
    
  });
 manageSpinner(false);
 
  
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

loadPages();