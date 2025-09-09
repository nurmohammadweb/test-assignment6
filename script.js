

const loadPages = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayAllTree(data.categories));
};


const removeAll = () => {
  const allBtn = document.querySelectorAll(".all-btn");
  console.log("allBtn");
};

const removeActive = () => {
  const treeBtn = document.querySelectorAll(".tree-btn");
  // console.log(treeBtn);
  treeBtn.forEach(btn => btn.classList.remove("active"));
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
       displayTreeBox(data.plants)
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

/** const loadWordDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
   
   const res = await fetch(url);
   const details = await res.json();
   displayWordDeteals(details.data);
} 

const displayWordDeteals = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
   detailsBox.innerHTML = `<div class="">
            <h2 class="text-2xl font-bold">${word.word}(<i class="fa-solid fa-microphone"></i>:${word.pronuonciation})</h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p class="">${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p class="">${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Synonym</h2>
            <div class="">${createElements(word.synonyms)}</div>
          </div>
`;
  document.getElementById("word_modal").showModal();
}; */



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
                <h2 onclick="treeInformation('${tree.id}')" class="card-title">${tree.name}</h2>
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
    allTree.innerHTML = `
    <button id="btn-highlight-${tree.id}" onclick="treeBox('${tree.id}')" class="hover:bg-green-600 w-full p-4 rounded-[4px] tree-btn">${tree.category_name}</button>`;

    allTreeContainer.append(allTree);
  }

};

loadPages();