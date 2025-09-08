

const loadPages = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayAllTree(data.categories));
};

const treeBox = (id) => {
  //console.log(id);

  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayTreeBox(data.plants));
};

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
                <h2 class="card-title">${tree.name}</h2>
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
};

const displayAllTree = (trees) => {
  const allTreeContainer = document.getElementById("option-container");
  allTreeContainer.innerHTML = "";
  //console.log(allTreeContainer);

  for (let tree of trees) {
    const allTree = document.createElement("div");
    allTree.innerHTML = `<button onclick="treeBox('${tree.id}')" class="hover:bg-green-600 hover:text-white w-full p-4 rounded-[4px]">${tree.category_name}</button>`;

    allTreeContainer.append(allTree);
  }

};

loadPages();