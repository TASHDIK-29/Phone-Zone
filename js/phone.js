const loadPhone = async (searchText=13, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    //console.log(data);

    const phones = data.data;
    // console.log(phones);
    
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
        // clear previous search result than load another
        phoneContainer.textContent = '';

        //console.log(phones.length)
        if(phones.length > 12 && !isShowAll)
        {
            document.getElementById('show-all-div').classList.remove('hidden');
            phones = phones.slice(0,12);
        }
        else{
            document.getElementById('show-all-div').classList.add('hidden');
        }
        // display only first 12 phones
        // phones = phones.slice(0,12);

    phones.forEach(phone => {
        //console.log(phone)
        
        const phoneCard = document.createElement('div');
        // ***
        phoneCard.classList = `card bg-gray-200 shadow-xl p-2` ;

        phoneCard.innerHTML = 
        //shift + tab => to align
        `
        <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="Shoes"
                class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions">
                <button onclick ="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
    });

        // end loading 
        toggleLoadingSpinner(false);
}


// Handel Search Button

const handelSearch = (isShowAll) =>{
    // start loading
    toggleLoadingSpinner(true);

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // add 'hidden' in the show all div before new search
    //document.getElementById('show-all-div').classList.add('hidden'); === phone.js 24

    //console.log(searchText)
    loadPhone(searchText, isShowAll);

    // end loading 
    //toggleLoadingSpinner(false);
}


// Clicked show details
const showDetails = async (id) =>{
    //console.log(id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    //console.log(data);
    const phone =data.data;
    showModal(phone);
}

const showModal = (phone) =>{
    console.log(phone);

    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML =`
    <div class="flex flex-col justify-center items-center">
        <img  src="${phone.image}" alt="">
    </div>
    <h3 class="font-bold text-2xl"> ${phone.name}</h3>
    <p><span class="font-bold text-lg">storage :</span> ${phone.mainFeatures.storage
    }</p>
    <p><span class="font-bold text-lg">Display Size :</span> ${phone.mainFeatures.displaySize
    }</p>
    <p><span class="font-bold text-lg">ChipSet :</span> ${phone.mainFeatures.chipSet
    }</p>
    <p><span class="font-bold text-lg">Memory :</span> ${phone.mainFeatures.memory
    }</p>
    <p><span class="font-bold text-lg">Slug :</span> ${phone.slug
    }</p>
    <p><span class="font-bold text-lg">Release data :</span> ${phone.releaseDate
    }</p>
    <p><span class="font-bold text-lg">Brand :</span> ${phone.brand
    }</p>

    <!-- <p><span class="font-bold text-lg">GPS :</span> ${phone?.others?.GPS || 'No GPS Available'
    }</p> -->
    <p><span class="font-bold text-lg">GPS :</span> ${phone?.others?.GPS ? phone?.others?.GPS :'No GPS Available In This Device'
    }</p>

    <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn bg-red-500">Close</button>
    </form>
    `

    // call modal
    show_details_modal.showModal();
}

// Loading
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');

    if(isLoading)
    {
        loadingSpinner.classList.remove('hidden');
       
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all
const showAllPhones = () =>{
    handelSearch(true);
}


loadPhone();