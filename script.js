let url = 'https://striveschool-api.herokuapp.com/books'
let cart = 0;
let cartItems=document.getElementById("cartitems");
let totalcurrency=document.getElementById("totalcurrency")
let ListModalLabel=document.getElementById("ListModalLabel")
let cartTotal=document.getElementById("carttotal")
cartTotal.innerHTML=`<strong> Il tuo carrello è vuoto! </strong> `
totalcurrency.style.display="none"
let updatedTotal = 0;
let badge=document.getElementById("cartbadge")
let secondbadge=document.getElementById("secondcartbadge")

document.addEventListener("DOMContentLoaded", function () {
    initializeUI();
    fetchBooks();
})

function initializeUI() {
    document.getElementById("logo").innerHTML = negozio.nomeNegozio;
    document.getElementById("address").innerHTML = negozio.indirizzo;
    ListModalLabel.style.display="none";

    for (let i = 0; i < negozio.metodiPagamento.length; i++) {
        let eachpaymentmethod = negozio.metodiPagamento[i];
        let paymenttypecontainer = document.getElementById("paymentType");
        paymenttypecontainer.innerHTML += `<li> ${eachpaymentmethod} </li>`
    }
}



const fetchBooks = () => {
    fetch(url)
        .then((raw) => raw.json())
        .then((res) => {
            let data = res
            console.log(data);

            let maincontainer = document.getElementById("bookscontainer")

            maincontainer.innerHTML = data.map((book) => {
                return `
        <div class="col-sm-6 col-md-4 col-lg-3 mt-3">
               <div class="card product-card h-100" id="bookID${book.asin}"> 
<img src="${book.img}" class="card-img-top" alt="${book.title}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title"> ${book.title}</h5>
            <p class="card-text"> ${book.category}</p>
            <div class="mt-auto">
                <p class="card-text"> ${book.price.toFixed(2)} € </p> </div>

                <div class="d-flex justify-content-between mt-4">
                    <button class="btn btn-danger"> Dettagli</button>
                    <div class="d-flex justify-content-around">
                    <button class="border-0 rounded bg-light" onclick="removefromcart('${book.title}', ${book.price}, '${book.asin}')"> <i class="bi bi-trash-fill"> </i> </button>
                    <button class="btn btn-primary" onclick="addtocart('${book.title}', ${book.price}, '${book.asin}')"> <i class="bi bi-cart-plus"></i> </button>
                    </div>
                </div>
            </div>
            </div>
         </div>`
            })

                .join("");
        })
        .catch((err) => console.error(err))
}

let bookcount=0;

const addtocart=(title, price, asin)=>{
    let carrelloTitle=document.getElementById("ListModalLabel")
    let book=document.getElementById("bookID"+asin)
    book.style.border="2px solid blue"
    carrelloTitle.style.display="block"
    totalcurrency.style.display="block"

cartItems.innerHTML+=` <div id="cartItem${asin}"> 
<h6>  ${title}  </h6> <div class="d-flex"> <p> € ${price.toFixed(2)} </p>  <button class="btn" id="removebtn" onclick="removefromcart('${title}', ${price}, '${asin}')">  <i class="bi bi-trash-fill"></i> </button> 
</div> </div>`


bookcount++;

let currentTotal= Number(cartTotal.innerText) || 0
let newTotal=(currentTotal+price).toFixed(2);
cartTotal.innerHTML = `<strong> ${newTotal} </strong>  `;

badge.innerHTML = `<strong class="fs-5 text-center"> ${bookcount}</strong>`;
secondbadge.innerHTML =`<h6 class="totalbadge text-dark"> (${newTotal} €) </h6> </div>`;
}




let removefromcart=(title, price, asin)=>{
    let totale=Number(cartTotal.innerText) || 0
    let badge=document.getElementById("cartbadge")
    let secondbadge=document.getElementById("secondcartbadge")

    let updatedTotal=Number(totale-price).toFixed(2) || 0


     if (updatedTotal <= 0){
        badge.innerHTML= "<strong> 0 </strong> "
        totalcurrency.style.display="none"
        ListModalLabel.style.display="none"
        cartTotal.innerHTML=`<strong> Il tuo carrello è vuoto! </strong> `
        badge.innerHTML=""
        secondbadge.innerHTML=""
        cartItems.innerHTML=""
        bookcount=0;
    }

     else {
        bookcount--;
    cartTotal.innerHTML=`<strong> ${updatedTotal} </strong> `
     badge.innerHTML=`<strong class="fs-5 text-center"> ${bookcount}</strong>`
    secondbadge.innerHTML=`<h6 class="totalbadge text-dark"> (${updatedTotal}€) </h6> `}


let book=document.getElementById("bookID" + asin)
book.style.border="none"

let cartItem=document.getElementById("cartItem" + asin)
cartItem.remove()
}


const searchBook = (ev) => {
    let query = ev.target.value
    let allTitles = document.querySelectorAll(".card-title")
    console.log(query, allTitles[0].innerText.toLowerCase().includes(query.toLowerCase())
    )
    allTitles.forEach((title) => {
      const currCard = title.parentElement.parentElement.parentElement
      if (!title.innerText.toLowerCase().includes(query.toLowerCase())) {
        currCard.style.display = "none"
      } else {
        currCard.style.display = "block"
      }
    })
  }


  const clearCart=()=>{
    updatedTotal=0
    bookcount=0;
badge.innerHTML=""
secondbadge.innerHTML=""
cartItems.innerHTML=""
cartTotal.innerHTML=`<strong> Il tuo carrello è vuoto! </strong> `
totalcurrency.style.display="none"
ListModalLabel.style.display="none"

const allCards=document.querySelectorAll("[id^='bookID']")
allCards.forEach(card => card.style.border="none")
}