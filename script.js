
//common functions

// all pets value validates
const getValidatedValue = (obj, key) =>
    obj[key] ? obj[key] : "Not Available";

// convert date of birth to only year function
const getyearFromFullDate = (obj) =>
    obj ? new Date(obj).getFullYear() : 'Not Availble';

// price validate function
const validatePrice = (obj, key) =>
    obj[key] ? `${obj[key]}$` : 'Not Available'


//call category button API
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
};

//sort button functionalities
document.getElementById('sort-btn').addEventListener('click', function () {
    const petsContainer = document.getElementById('all-pets-container');
    const petsData = Array.from(petsContainer.children);

    petsData.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.price').innerText.replace("$", "")) || 0;
        const priceB = parseFloat(b.querySelector('.price').innerText.replace("$", "")) || 0;
        return (priceB - priceA);
    });

    //remove existing data
    petsContainer.innerHTML = "";
    petsData.forEach(pet => {
        petsContainer.appendChild(pet);
    });
});

//common functions end

// call all pets by API fetch
const allPets = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => displayAllPets(data.pets))
}

// For display the categories in button------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const displayCategories = (categories) => {

    const categoriesContainer = document.getElementById('categories-container')
    categories.forEach(item => {
        const btnDiv = document.createElement('div')
        btnDiv.classList = ('flex items-center justify-center')
        btnDiv.innerHTML = `
            <button class="flex items-center gap-4 w-[180px] py-2 justify-center border rounded-xl border-[rgba(14, 122, 129, 0.15)] cat-hover">
                <img src="${item.category_icon}"/>
                <p class="text-2xl font-semibold">${item.category}</p>
            </button>
        `;
        categoriesContainer.append(btnDiv);
    });
};

//for display all pets from API call
const displayAllPets = (pets) => {
    const petContainer = document.getElementById('all-pets-container');
    pets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.classList = ('p-5 border rounded-xl')
        petCard.innerHTML = `
            <img class="w-full md:max-h-[135px] lg:max-h-[130px] rounded-xl" src="${pet.image}"/>
            <h1 class="text-xl font-bold my-4">${pet.pet_name}</h1>
            <div class="flex flex-col gap-2 justify-center border-b pb-2">
                <p class="flex gap-2 whitespace-nowrap"><img class="w-[25px] h-[25px] justify-center" src="https://img.icons8.com/?size=48&id=zukFPciIOcaq&format=png"/>Breed: ${getValidatedValue(pet, "breed")}</p>
                <p class="flex gap-2"><img class="w-[25px]" src="https://img.icons8.com/?size=50&id=60611&format=png"/>Birth: ${getyearFromFullDate(pet.date_of_birth)}</p>
                <p class="flex gap-2"><img class="w-[25px]" src="https://img.icons8.com/?size=50&id=1665&format=png"/>Gender: ${getValidatedValue(pet, "gender")}</p>
                <p class="flex gap-2"><img class="w-[25px]" src="https://img.icons8.com/?size=50&id=2971&format=png"/>Price: <span class="price">${validatePrice(pet, 'price')}</span></p>
            </div>
            <div class="flex py-3 mt-3 items-center justify-evenly">
                <button class="btn btn-accent px-6 py-2 md:px-2"><i class="fa-regular fa-heart"></i><button/>
                <button class="btn btn-accent px-6 py-2 md:px-2">Adopt<button/>
                <button class="btn btn-accent px-5 py-2 md:px-2 ">Details<button/>
            <div/>
        `;
        petContainer.append(petCard);
    });
}





// call the functions
loadCategories();
allPets();