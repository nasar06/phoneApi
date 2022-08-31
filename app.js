
// Load Phones Data*****
const loadPhone = async (search, limit) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
        const phones = await res.json();
        displayAllPhones(phones.data, limit)
    }
    catch (error) {
        console.log(error)
    }
}

// display phone Data*****
const displayAllPhones = (phones, limit) => {
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.innerHTML = '';

    //Show All btn*****
    const showAllBtn = document.getElementById("all-phone-btn");
    if (limit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAllBtn.classList.remove('d-none');
    }
    else {
        showAllBtn.classList.add('d-none');
    }

    //display phone not found*****
    const notFoundDiv = document.getElementById('not-found');
    if (phones.length === 0) {
        notFoundDiv.classList.remove('d-none')
    }
    else {
        notFoundDiv.classList.add('d-none');
    }


    // All phones looping by[forEach]
    phones.forEach(phone => {
        // console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
                    <!-- Button trigger modal -->
                <button id="phone-detail" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">
                        Phone Details
                    </button>
            </div>
        </div>
        `
        phoneContainer.appendChild(div);
    })
    //load spinner
    document.getElementById('spinner').classList.add('d-none');

}


const processSearch = limit => {
    //load spinner
    document.getElementById('spinner').classList.remove('d-none');
    const inputValue = document.getElementById('input-fild').value;
    loadPhone(inputValue, limit);
}

//handel Phone Search*****
document.getElementById('btn-search').addEventListener('click', function () {

    processSearch(10)

})

// show all phone
document.getElementById('all-phone-btn').addEventListener('click', function () {
    processSearch();
})


