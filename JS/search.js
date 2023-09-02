
let storedIndex=``
if( localStorage.getItem('index') !=null){
    storedIndex= localStorage.getItem('index')
}

//nav----
function autoClose() {
    $('.navList').animate({width:0},1)
    $('.my-navbar').animate({width:60},1)
}
autoClose()
$('#close').click(function(){
    $(this).toggleClass('active')
    let width= $('.navList').width()
        console.log(width);
    if($(this).hasClass('active')){
        $('.navList').animate({width:0},500)
         $('.my-navbar').animate({width:60},500)
        $('#close').removeClass('fa-x').addClass('fa-align-justify')
        $('#listItem1,#listItem2,#listItem3,#listItem4,#listItem5').animate({top:'200px',left:'-200px'})
        $('.navFooter').hide(10)
        
    }else {
       
        $('.navList').animate({width:190},500)
        $('.navFooter').show(1)
        $('#close').removeClass('fa-align-justify').addClass('fa-x')
        $('#list').animate({top:0,left:0},500)
         $('.my-navbar').animate({width:250},500)
        $('#listItem1').animate({top:0,left:0},300,function () {
            $('#listItem2').animate({top:0,left:0},300,function () {
                $('#listItem3').animate({top:0,left:0},300,function () {
                    $('#listItem4').animate({top:0,left:0},300,function () {
                        $('#listItem5').animate({top:0,left:0},200)
                    })
                })
            })
        })
    }
    
  
    
   

})

//start
async function startSearch(mealName="Soup") {
   
    let getSearch= await getSearchAPI(mealName)
    await displaySearch(getSearch)
    
   await clickedOnAphoto()
   await listData(getSearch)
   await getTags(getSearch)
   await displaySearchPage(getSearch)
   
}
startSearch()
//start


//nav----
//---------------details page--------------
let index='5'

async function clickedOnAphoto() {
  
    $('#displayDataSearch').on('click', '.detailsPage', function() {
         index = $(this).closest('.col-md-3').index();
         localStorage.setItem('index',JSON.stringify(index));
        console.log(index);
        console.log('Clicked on details page link');
       
    });
    

    

    }
    

    async function displaySearchPage(ApiData) {
        //  storedIndex= localStorage.getItem('index')
        let newDetails=``
    
    console.log('ddddddddddddddddddddddddddddd');
    console.log(index);
    

    
        newDetails+=`
        <div class="col-md-4 mt-4">
        <img src="${ApiData[storedIndex].strMealThumb}" class="w-100 rounded-3" alt="meal photo">
        <h2>${ApiData[storedIndex].strMeal}</h2>
    </div>
    <div class="col-md-8 mt-4">
        <h2>Instructions</h2>
        <p class="p-1 ">${ApiData[storedIndex].strInstructions}</p>
        <h3><strong>Area :</strong> ${ApiData[storedIndex].strArea}</h3>
        <h3><strong>Category  :</strong> ${ApiData[storedIndex].strCategory}</h3>
        <h3><strong>Recipes   :</strong> </h3>
        <ul class="d-flex flex-wrap " id="Recipes">
        
          
        </ul>
        <h3>Tags :</h3>
        <ul class="d-flex " id="tags">
            
        </ul>
        <a href="${ApiData[storedIndex].strSource}" target="_blank" class="btn btn-success mb-4">Source</a>
        <a href="${ApiData[storedIndex].strYoutube}" target="_blank" class="btn btn-danger mb-4">YouTube</a>


    </div>
        `

    document.getElementById('myPageSearch').innerHTML=newDetails


}




async function listData(ApiData) {
    let listData=``
    for(let i=0;i<=20;i++){
        let ingredient = ApiData[storedIndex][`strIngredient${i}`];
        let strMeasure = ApiData[storedIndex][`strMeasure${i}`];

        if(ingredient&&strMeasure) {
            listData += `
              <li class="alert alert-info m-2 p-1">${strMeasure} ${ingredient}</li>
            `;
          }
        }
   
        try {
            document.getElementById('Recipes').innerHTML=listData
        } catch (error) {
            
        }
            
       
    
}

async function getTags(ApiData) {
    let tagsData=``
    let tagArray=ApiData[storedIndex].strTags.split(", ")
    console.log(tagArray);

    for(let i=0;i<=tagArray.length;i++){
        let tags = tagArray[i] ;

        if(tags) {
            tagsData += `
           
              <li class="alert alert-danger m-2 p-1">${tags}</li>
            `;
          }
        }
   
        try {
            document.getElementById('tags').innerHTML=tagsData
        } catch (error) {
            
        }
    
}






//---------------details page--------------



//----------------------------search-------------
// let getInput1=document.getElementById('searchName')
// let getInput2=document.getElementById('searchLetter')
let apiSearch=``
let apiSearchResponse=``
let searchMeals=``
let value=``
$('#searchName').keyup(function () {
     value=$('#searchName').val()
     startSearch(value)
    console.log(value);
    getSearchAPI(value)
})
//fetch api for search


async function getSearchAPI(mealName){
    apiSearch= await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
     apiSearchResponse= await apiSearch.json()
     searchMeals=apiSearchResponse.meals
    console.log(searchMeals);
    console.log('ssssssssssssssssssss');
    console.log(value);
    return searchMeals;
    
}


async function displaySearch(searchValue) {
    let dataS=``
    console.log('99999999999999999999');
    console.log(searchValue);
    for(let i=0;i<searchValue.length;i++){
       
        dataS+=`       <div class="col-md-3 mt-3  ">
        
        <div class="image position-relative" >
            <img src="${searchValue[i].strMealThumb}" class="w-100" alt="photo">
            <a class="detailsPage" href="searchDisplay.html" target="_blank" >
            <div class="layer position-absolute  d-flex align-items-center" >
                <h3>${searchValue[i].strMeal}</h3>
            </div>
            </a>
        </div>
      
        
    </div>
    `
}
try {
    document.getElementById('displayDataSearch').innerHTML=dataS
} catch (error) {
    
}

}




// async function startApp() {
//     let getApi=await getAPI()
     
//   await  display(getApi)
//    await clickedOnAphoto()
//    await displayPage2(getApi)
//    await listData(getApi)
//   await getTags(getApi)
// }
//  startApp()


//fetch api for search








//----------------------------search-------------