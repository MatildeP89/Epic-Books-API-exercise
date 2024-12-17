document.addEventListener("DOMContentLoaded",function(){ 
    const params = new URLSearchParams(window.location.search);
    const bookid= params.get('asin');

  
       if (!bookid){document.getElementById("dettagli-libro").innerHTML="<div class='col-6'> <h1> Nessun ASIN inserito </h1> </div>";
        return;
        }

   
    let urldetails='https://striveschool-api.herokuapp.com/books'
    
    fetch(urldetails)
    .then((raw)=>raw.json())
    .then((res)=>{
    
    const bookdetails=res.find(book=>book.asin === bookid);


    if (!bookdetails){
        throw new Error("Nessun libro trovato");
        
    }
    
    
    let detailscontainer=document.getElementById("dettagli-libro")
   
    detailscontainer.innerHTML=`
        <div class="col col-6 p-0"> <img src="${bookdetails.img}" class="img-fluid rounded" alt="Immagine Copertina libro"> </div>

    <div class="col col-6 d-flex flex-column gap-2">
        <h2 id="title"> ${bookdetails.title} </h2> 
    <h5 id="price"> ${bookdetails.price.toFixed(2)} € </h5>
    <h5 id="category"> <badge class="bg-danger rounded p-2"> ${bookdetails.category.toUpperCase()} </badge> </h5>
    </div>
    `
    })
    
    .catch(err=>{

        document.getElementById("dettagli-libro").innerHTML=`<div class='col-6'>    <h2>Errore: ${error.message}</h2> </div>`;
    })
    
}) 