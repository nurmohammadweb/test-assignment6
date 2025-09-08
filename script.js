

const loadPages = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayAllTree(data.categories));
};

const treeBox = (id) => {
  const url = `https://openapi.programming-hero.com/api/plants/${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayTreeBox(data.plants));
};

const displayTreeBox = (trees) => {
  const optionContainer = document.getElementById("option-container");
  optionContainer.innerHTML = "";
  console.log(optionContainer);

  trees.forEach((tree) => {
    const allPlants = document.createElement("div");
    allPlants.innerHTML = `
    <div class="card bg-base-100  m-4 shadow-sm">
              <figure class="px-10 pt-10">
                <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes"
                  class="rounded-xl" />
              </figure>
              <div class="card-body">
                <h2 class="card-title">Mango Tree</h2>
                <p>A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green
                </p>
                <div class="flex justify-items-center">
                  <p class="bg-green-200 inline-block px-2 rounded">Fruit Tree</p>
                  <span>৳500</span>
                </div>
                <div class="card-actions">
                  <button class="btn btn-primary w-full">Buy Now</button>
                </div>
              </div>
            </div>
          `;
    optionContainer.append(allPlants);
  });
}

const displayAllTree = (trees) => {
  const allTreeContainer = document.getElementById("option-container");
  allTreeContainer.innerHTML = "";
  //console.log(allTreeContainer);

  for (let tree of trees) {
    const allTree = document.createElement("div");
    allTree.innerHTML = `<button onclick="treeBox('${tree.category_name}')" class="hover:bg-green-600 hover:text-white w-full p-4 rounded-[4px]">${tree.category_name}</button>`;

    allTreeContainer.append(allTree);
  }

};

loadPages();