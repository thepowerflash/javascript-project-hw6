

const phoneInput = document.querySelector("#phone_input")
const phoneCheck = document.querySelector("#phone_button")
const phoneResult = document.querySelector("#phone_result")

const regExp = /^\+996 \d{3} \d{2}-\d{2}-\d{2}$/;

phoneCheck.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = "ok"
        phoneResult.style.color = "green"
    }else {
        phoneResult.innerHTML = "Not ok"
        phoneResult.style.color = "red"
    }
}
////////////////////////////

const tabContent = document.querySelectorAll(".tab_content_block")
const tabs = document.querySelectorAll(".tab_content_item")
const tabsParent = document.querySelector(".tab_content_items")

const hideTabContent = () => {
    tabContent.forEach((item) => {
    item.style.display = "none"
 })

 tabs.forEach((item) => {
    item.classList.remove("tab_content_item_active")
 })
 }

 const showTabContent = (index =0) => {
 tabContent[index].style.display = "block" 
 tabs[index].classList.add("tab_content_item_active")
}

hideTabContent()
showTabContent()

tabsParent.onclick = (event) => {
    if (event.target.classList.contains("tab_content_item")) {
        tabs.forEach((item, i) => {
            if(event.target === item) {
                hideTabContent()
                showTabContent(i)  
            }
        })
    }
}

const autoSlider = (i = 0) => {
    setInterval(() => {
        i++
        if (i > tabContent.length - 1) {
            i = 0
        }
        hideTabContent()
        showTabContent(i)
    }, 3000)
}

autoSlider()
//////////////

// const som = document.querySelector('#som')
// const usd = document.querySelector('#usd')

// som.addEventListener ('input', () => {
// const request = new XMLHttpRequest()
// request.open('GET', "../data/converter.json")
// request.setRequestHeader('Content-Type', 'application/json')
// request.send()
// request.addEventListener('load', () => {
//     const response = JSON.parse(request.response)
//     usd.value = (som.value / response.usd).toFixed(2)
// })
// })


const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');

const request = new XMLHttpRequest();
request.open('GET', "../data/converter.json");
request.setRequestHeader('Content-Type', 'application/json');
request.send();

request.onload = () => {
    const response = JSON.parse(request.response);
    
    const somToUsdRate = 1 / response.usd;
    const somToEurRate = 1 / response.eur;

    som.oninput = () => {
        const inputValue = parseFloat(som.value);
        if (!isNaN(inputValue)) {
            usd.value = (inputValue * somToUsdRate).toFixed(2);
            eur.value = (inputValue * somToEurRate).toFixed(2);
        }
    };

    usd.oninput = () => {
        const inputValue = parseFloat(usd.value);
        if (!isNaN(inputValue)) {
            som.value = (inputValue / somToUsdRate).toFixed(2);
            eur.value = (inputValue * (somToEurRate / somToUsdRate)).toFixed(2);
        }
    };

    eur.oninput = () => {
        const inputValue = parseFloat(eur.value);
        if (!isNaN(inputValue)) {
            som.value = (inputValue / somToEurRate).toFixed(2);
            usd.value = (inputValue * (somToUsdRate / somToEurRate)).toFixed(2);
        }
    };
};
/////////

// const card = document.querySelector ('.card')
// const btnPrev = document.querySelector('#btn-prev')
// const btnNext = document.querySelector('#btn-next')
// let count = 1

// btnNext.onclick = () => {
//     count++
//     if (count > 200) {
//         count = 1
//     }
//     card.innerHTML = `<img src="https://picsum.photos/200/300?image=${count}" alt="">`
//     fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
//     .then(response => response.json())
//     .then(data => {
//         card.innerHTML = `
//         <p>${data.title}</p>
//         <p style="color: ${data.completed ? 'green' : 'red'}" >${data.completed}</p>
//         <span>${data.id}</span>
//         `
//     })
// }

const card = document.querySelector ('.card')
const btnPrev = document.querySelector('#btn-prev')
const btnNext = document.querySelector('#btn-next')
let count = 1


function fetchFunc(count) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
        .then(response => response.json())
        .then(data => {
            card.innerHTML = `
                <p>${data.title}</p>
                <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
                <span>${data.id}</span>
            `;
        })
    
    }
        btnNext.onclick = () => {
            count++;
            if (count > 200) {
                count = 1;
            }
            fetchFunc(count)
        }
        
            
           

            btnPrev.onclick = () => {
                count--;
                if (count < 1) {
                    count = 199;
                }
            
                
                fetchFunc(count);
        };
        fetchFunc(count)