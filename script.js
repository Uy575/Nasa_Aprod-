const mc = document.getElementById("mainContainer");
const apiKey = "DEMO_KEY";
const fvrt = document.getElementById("fvrt");
const tL = document.getElementById("timeline");
const add = document.getElementById("added");
let count = 10;
const nasaApiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;
let data = [];
let fvrtOne = {};

let pageValue = '';


function fvrtlist(){
    setTimeout(()=>{

        pageValue = 'fvrtOne';
        updatingData(pageValue);
    },500)
   }
   function timelineList(){
    setTimeout(()=>{

        nasaData();

    },500)
 }

async function nasaData(){
    const responce = await fetch(nasaApiUrl);
    data = await responce.json();
    updatingData('data');

}

function creatingHtmlElements(page){
    const currPage = page === 'data'? data : Object.values(fvrtOne);
         currPage.forEach((result) => {
        //    Main content 
           const mainContent = document.createElement("div");
           mainContent.classList.add("mainContent");
        
           //    image container 
    
           const imgContainer = document.createElement("div");
           imgContainer.classList.add("imgContainer");
         
        //    img block 
    
           const img = document.createElement('img');
            img.src  = result.url;
            img.alt = "picture of the day"
            img.loading = "lazy";
        // main text 
        
        const maintext = document.createElement("div");
        maintext.classList.add("maintext");
        //  for main heading    
    
        const mainHeading = document.createElement("div");
        mainHeading.classList.add("mainHeading");
        // creating h3 for title
    
            let h3 = document.createElement("h3");
            h3.textContent = result.title;
            h3.textContent.length > 20? h3.style.fontSize = "0.8rem": false;
        // for add to fvrt 
        const addToFevourite = document.createElement("div");
        addToFevourite.classList.add("mainHeading");
        let h4 = document.createElement("h4");
        if(page === 'data'){
            h4.textContent = "Add to favourite";
            h4.setAttribute("onclick", `addingToFvrt('${result.url}')`);
        }
        if(page === 'fvrtOne'){
            h4.textContent = "Remove from favourite";
            h4.setAttribute("onclick", `removingToFvrt('${result.url}')`);
        }
        // for main pera 
         const mainPera = document.createElement("div");
         mainPera.classList.add("mainPera");
    
        // creating pera 
            let mainpera = document.createElement("p");
            mainpera.textContent = result.explanation;
            
            
            imgContainer.appendChild(img);
            mainHeading.appendChild(h3);
            addToFevourite.appendChild(h4);
            mainPera.appendChild(mainpera);
            maintext.append(mainHeading,addToFevourite,mainPera);
            mainContent.append(imgContainer,maintext);
            mc.appendChild(mainContent);
    
        });
}

function updatingData(page){

   if(localStorage.getItem('nasaFavourite')){
    fvrtOne = JSON.parse(localStorage.getItem('nasaFavourite'));
   }
   mc.textContent = '';
   creatingHtmlElements(page);
}

function addingToFvrt(itemurl){
    data.forEach((item)=>{
        if(item.url.includes(itemurl) && !fvrtOne[itemurl]){
           fvrtOne[itemurl] = item
        
        //    for(i= 0; i<=itemurl.length; i++){
                add.hidden = false;
            // }
    
        }
    });
    setTimeout(()=>{
       add.hidden = true;
      },2000);
     localStorage.setItem("nasaFavourite", JSON.stringify(fvrtOne));
     
}
function removingToFvrt(itemurl){
    if(fvrtOne[itemurl]){
        delete fvrtOne[itemurl];
        localStorage.setItem("nasaFavourite", JSON.stringify(fvrtOne));
        updatingData('fvrtOne');
    }
}



fvrt.addEventListener("click",fvrtlist);
tL.addEventListener("click",timelineList);

nasaData();