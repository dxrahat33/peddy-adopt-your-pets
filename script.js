

//call category button API
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
};

// call all pets by API fetch
const allPets = () =>{
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then( data => displayAllPets(data.pets))
}

// For display the categories in button------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const displayCategories = (categories) => {

    const categoriesContainer = document.getElementById('categories-container')
    categories.forEach(item => {
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
            <button class="flex items-center gap-4 px-12 py-4 border rounded-xl border-[rgba(14, 122, 129, 0.15)] cat-hover">
                <img src="${item.category_icon}"/>
                <p class="text-2xl font-semibold">${item.category}</p>
            </button>
        `;
        categoriesContainer.append(btnDiv);
    });
};

//for display all pets from API call
const displayAllPets = (pets) =>{
    const petContainer = document.getElementById('all-pets-container');
    pets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.classList = ('p-6 border rounded-xl')
        petCard.innerHTML = `
            <img class="w-full max-h-[130px]" src="${pet.image}"/>
            <h1>${pet.pet_name}</h1>
            <p>${pet.breed}</p>
            <p>${pet.date_of_birth}</p>
            <p>${pet.gender}</p>
            <p>${pet.price}$</p>
        `;
        petContainer.append(petCard);
    });
}





// call the functions
loadCategories();
allPets();