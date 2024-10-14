// Show spinner
const showSpinner = () => {
    document.getElementById("spinner").classList.remove("hidden");
  };
  
  // Hide spinner
  const hideSpinner = () => {
    document.getElementById("spinner").classList.add("hidden");
  };
  document.getElementById("home-btn").addEventListener("click", function () {
    location.reload(); // This reloads the current page
  });
  
  //fetch category for button
  const loadCategories = () => {
    showSpinner(); // Show spinner before fetching
    setTimeout(() => {
      fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then((res) => res.json())
        .then((data) => {
          displayCategories(data.categories);
          hideSpinner(); // Hide spinner after loading
        })
        .catch((error) => {
          console.log(error);
          hideSpinner(); // Hide spinner on error
        });
    }, 2000); // Simulate 2-second loading time
  };
  
  //fetch all pets for display
  const loadAllPets = () => {
    showSpinner(); // Show spinner before fetching
    setTimeout(() => {
      fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => {
          displayAllPets(data.pets);
          hideSpinner(); // Hide spinner after loading
        })
        .catch((error) => {
          console.log(error);
          hideSpinner(); // Hide spinner on error
        });
    }, 2000); // Simulate 2-second loading time
  };
  
  // Show details modal
  const showModal = (pet) => {
    const modal = document.getElementById("details-modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  
    // Set modal content with pet details
    document.getElementById("modal-title").innerText = pet.pet_name;
    document.getElementById("modal-image").src = pet.image;
    document.getElementById("modal-breed").innerText = `Breed: ${
      pet.breed || "Not Available"
    }`;
    document.getElementById("modal-birth").innerText = `Birth Year: ${
      new Date(pet.date_of_birth).getFullYear() || "Not Available"
    }`;
    document.getElementById("modal-gender").innerText = `Gender: ${
      pet.gender || "Not Available"
    }`;
    document.getElementById("modal-price").innerText = `Price: $${
      pet.price || "Not Available"
    }`;
    document.getElementById("modal-status").innerText = `Vaccinated Status: ${
      pet.vaccinated_status || "Not Available"
    }`;
    document.getElementById("modal-information").innerText = `${
      pet.pet_details || "Not Available"
    }`;
  };
  
  // Hide details modal
  const hideModal = () => {
    const modal = document.getElementById("details-modal");
    modal.classList.add("hidden");
  };
  
  // Event listener for sorting pets by price
  document.getElementById("sortPriceBtn").addEventListener("click", function () {
    const petsContainer = document.getElementById("all-pets-container");
    const petsData = Array.from(petsContainer.children);
  
    // Sort the pets array based on price in descending order
    petsData.sort((a, b) => {
      const priceA =
        parseFloat(a.querySelector(".price").innerText.replace("$", "")) || 0;
      const priceB =
        parseFloat(b.querySelector(".price").innerText.replace("$", "")) || 0;
      return priceB - priceA; // Descending order
    });
  
    // Remove all existing pet elements and re-append sorted elements
    petsContainer.innerHTML = "";
    petsData.forEach((pet) => {
      petsContainer.appendChild(pet);
    });
  });
  
  //remove active class
  const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    for (let btn of buttons) {
      btn.classList.remove("active");
    }
  };
  //fetch category wise pets
  const loadCategoryPets = (id) => {
    showSpinner(); // Show spinner before fetching
    setTimeout(() => {
      fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
          removeActiveClass();
          const activeBtn = document.getElementById(`btn-${id}`);
          activeBtn.classList.add("active");
          displayAllPets(data.data);
          hideSpinner(); // Hide spinner after loading
        })
        .catch((error) => {
          console.log(error);
          hideSpinner(); // Hide spinner on error
        });
    }, 2000); // Simulate 2-second loading time
  };
  
  //for category show in button
  const displayCategories = (categories) => {
    const btnContainer = document.getElementById("category-container");
    categories.forEach((item) => {
      const buttonContainer = document.createElement("div");
  
      buttonContainer.innerHTML = `
              <button id="btn-${item.category}" onclick="loadCategoryPets('${item.category}')" class="px-10 py-4 border rounded-xl flex items-center gap-4 justify-center cursor-pointer category-btn">
                  <img src="${item.category_icon}" alt="Category Icon">
                  <p class="font-bold text-2xl">${item.category}</p>
              </button>
          `;
      // <img src="${item.category_icon}" alt="Category Icon">
      // <p class="font-bold text-2xl">${item.category}</p>
  
      btnContainer.append(buttonContainer);
    });
  };
  
  //show all pets in main UI as display
  const displayAllPets = (allPets) => {
    const petsContainer = document.getElementById("all-pets-container");
    petsContainer.innerHTML = "";
  
    if (allPets.length === 0) {
      petsContainer.classList.remove("grid");
      petsContainer.innerHTML = `
              <div class="w-full flex flex-col gap-5 items-center justify-center bg-gray-100 py-24 rounded-xl">
                  <img src="images/error.webp"/>
                  <h1 class="inter font-bold text-3xl">No Information Available</h1>
                  <p class="text-center w-11/12">There are no pets available right now. We are working on collecting new pets like birds. If you have any query or question, let us know below.</p>
              </div>
          `;
      return;
    } else {
      petsContainer.classList.add("grid");
    }
  
    // Convert the birth date to year only and format price
    const getYearFromDate = (obj) =>
      obj ? new Date(obj).getFullYear() : "Not Available";
    const getValidatedValue = (obj, key) =>
      obj[key] ? obj[key] : "Not Available";
    const getValidatedValuePrice = (obj, key) =>
      obj[key] ? `$${obj[key]}` : "Not Available";
  
    // Loop through pets data and display each pet
    allPets.forEach((pets) => {
      const card = document.createElement("div");
      card.classList = "p-5 border border-[rgba(19, 19, 19, 0.1)] rounded-xl";
      card.innerHTML = `
              <img class="rounded-xl h-[200px] mx-auto w-full" src="${
                pets.image
              }" alt="Pet Image">
              <h1 class="inter text-xl font-bold mt-6 mb-2 dark1">${
                pets.pet_name
              }</h1>
              <div class="lato dark1-70 font-semibold">
                  <p class="flex items-center gap-1"><img class="w-[20px] h-[20px]" src="https://img.icons8.com/?size=48&id=MP1N0ctxwBcB&format=png"/>Breed: ${getValidatedValue(
                    pets,
                    "breed"
                  )}</p>
                  <p class="flex items-center gap-1"><img class="w-[20px] h-[20px]" src="https://img.icons8.com/?size=80&id=UTe6yKq2hvHK&format=png"/>Birth: ${getYearFromDate(
                    pets.date_of_birth
                  )}</p>
                  <p class="flex items-center gap-1"><img class="w-[20px] h-[20px]" src="https://img.icons8.com/?size=80&id=imR5Nftuu0Ox&format=png"/>Gender: ${getValidatedValue(
                    pets,
                    "gender"
                  )}</p>
                  <p class="flex items-center gap-1 border-b pb-2"><img class="w-[20px] h-[20px]" src="https://img.icons8.com/?size=50&id=7163&format=png"/>Price: <span class="price">${getValidatedValuePrice(
                    pets,
                    "price"
                  )}</span></p>
              </div>
              <div class="mt-4 flex justify-evenly">
                  <button class="like-btn btn-jump py-2 px-3 border border-[rgba(19, 19, 19, 0.1)] rounded-lg">
                      <img src="https://img.icons8.com/?size=24&id=82788&format=png"/>
                  </button>
                  <button class="btn-jump adopt-btn py-2 px-3 border border-[rgba(19, 19, 19, 0.1)] rounded-lg">
                      <p class="text-[#0E7A81] lato font-semibold">Adopt</p>
                  </button>
                  <button class="details-btn btn-jump py-2 px-3 border border-[rgba(19, 19, 19, 0.1)] rounded-lg">
                      <p class="text-[#0E7A81] lato font-semibold">Details</p>
                  </button>
              </div>
          `;
      petsContainer.appendChild(card);
  
      //event listener for like button click function
      const likeBtn = card.querySelector(".like-btn");
      likeBtn.addEventListener("click", function () {
        //like button functionality
        const rightSideCardDiv = document.getElementById(
          "right-side-card-container"
        );
        const petCard = document.createElement("div");
        petCard.innerHTML = `
              <img class="rounded-lg w-[150px] h-[auto]" src="${pets.image}"/>
          `;
        rightSideCardDiv.appendChild(petCard);
      });
  
      //adopt button ------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>
      const adoptButton = card
        .querySelector(".adopt-btn")
        .addEventListener("click", function () {
          // Disable the button and change the text
          this.disabled = true;
          this.innerText = "Processing...";
  
          // Show the modal
          const modal = document.getElementById("adopt-modal");
          modal.classList.remove("hidden");
          modal.classList.add("flex");
  
          // Set the countdown timer
          let countdown = 3;
          const countdownElement = document.getElementById("countdown");
          countdownElement.innerText = countdown;
  
          const countdownInterval = setInterval(() => {
            countdown--;
            countdownElement.innerText = countdown;
  
            if (countdown === 0) {
              clearInterval(countdownInterval);
              modal.classList.add("hidden");
  
              this.innerText = "Adopted";
  
              this.classList.add("bg-[#0E7A81]");
              this.classList.add("text-white");
            }
          }, 1000);
        });
  
      //
      //Details button ------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>
      const DetailsButton = card.querySelector(".details-btn");
      DetailsButton.addEventListener("click", function () {
        showModal(pets); // Pass the pet object to showModal function
      });
    });
  };
  
  //call all functions
  loadCategories();
  loadAllPets();
  