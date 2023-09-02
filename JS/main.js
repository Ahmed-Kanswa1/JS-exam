
let storedIndex=``
if( localStorage.getItem('index') !=null){
    storedIndex= localStorage.getItem('index')
}




//fetch API
let apiData=``
let apiResponse=``
let meals=``
async function getAPI(){
     apiData= await fetch('https://themealdb.com/api/json/v1/1/search.php?s=')
     apiResponse= await apiData.json()
    meals=apiResponse.meals
    // console.log(meals[3].strMeal);
    // console.log('1111111111111111111');
    return meals;
    
}



//fetch API
// display
 async function display(mealsData) {

   
   

    
    let data=``
    for(let i=0;i<20;i++){
       
        data+=`       <div class="col-md-3 mt-3  ">
        
        <div class="image position-relative" >
            <img src="${mealsData[i].strMealThumb}" class="w-100" alt="photo">
            <a class="detailsPage" href="details.html" target="" >
            <div class="layer position-absolute  d-flex align-items-center" >
                <h3>${mealsData[i].strMeal}</h3>
            </div>
            </a>
        </div>
      
        
    </div>
    `
    }
   try {
    document.getElementById('displayData').innerHTML=data 
   } catch (error) {
    
   }
        
  
    
}

//display
//Start app
//-------------------

async function startApp() {
    let getApi=await getAPI()
     
  await  display(getApi)
   await clickedOnAphoto()
   await displayPage2(getApi)
   await listData(getApi)
  await getTags(getApi)
}
 startApp()


//Start app



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


//nav----

//---------------details page--------------
let index='5'

async function clickedOnAphoto() {
  
    $('#displayData,#displayDataSearch').on('click', '.detailsPage', function() {
         index = $(this).closest('.col-md-3').index();
         localStorage.setItem('index',JSON.stringify(index));
        console.log(index);
        console.log('Clicked on details page link');
       
    });
    

    

    }
    

    
async function displayPage2(ApiData) {
    //  storedIndex= localStorage.getItem('index')
    let newDetails=``
 
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
        <a href="${ApiData[storedIndex].strSource}" target="" class="btn btn-success mb-4">Source</a>
        <a href="${ApiData[storedIndex].strYoutube}" target="" class="btn btn-danger mb-4">YouTube</a>


    </div>
        `

        try {
            document.getElementById('myPage2').innerHTML=newDetails
        } catch (error) {
            
        }
  


}




async function listData(ApiData) {
    let listData=``
    for(let i=0;i<20;i++){
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
})
//fetch api for search


async function getSearchAPI(mealName){
    apiSearch= await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
     apiSearchResponse= await apiSearch.json()
     searchMeals=apiSearchResponse.meals
    console.log(searchMeals);
   
   
    return searchMeals;
    
}
// getSearchAPI()

async function displaySearch(searchValue) {
    let dataS=``
    
    
    for(let i=0;i<searchValue.length;i++){
       
        dataS+=`       <div class="col-md-3 mt-3  ">
        
        <div class="image position-relative" >
            <img src="${searchValue[i].strMealThumb}" class="w-100" alt="photo">
            <a class="detailsPage" href="details.html" target="" >
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

async function startSearch(mealName="Soup") {
   
    let getSearch= await getSearchAPI(mealName)
    
    await displaySearch(getSearch)
    // await displayPage2(getSearch)
   
}
startSearch()
async function letterSearch(letterValue="a") {
    let letterSearch=await getSearchLetter(letterValue)
    await displaySearch(letterSearch)
    // await displayPage2(letterSearch)
}
letterSearch()


//fetch api for search








//----------------------------search-------------
//----------------------------search by letter-------------
let apiSearch1=``
let apiSearchResponse1=``
let searchMeals1=``
$('#searchLetter').keyup(function () {
    value=$('#searchLetter').val()
    letterSearch(value)
   console.log(value);
})


async function getSearchLetter(letter){
    apiSearch1= await fetch(`https://themealdb.com/api/json/v1/1/search.php?f=${letter}`)
     apiSearchResponse1= await apiSearch1.json()
     searchMeals1=apiSearchResponse1.meals
    console.log(searchMeals1);
   
   
    return searchMeals1;
    
}


//----------------------------search by letter-------------


//----------------cate-------------------------

let apiCate=``
let cateResponse=``
let cateResult=``
async function getCateApi(){
    apiCate= await fetch(`https://themealdb.com/api/json/v1/1/categories.php`)
     cateResponse= await apiCate.json()
     cateResult=cateResponse.categories
    console.log(cateResult);
   
    
    return cateResult;
    
}
// getSearchLetter()
//*----------start--------
async function startCate() {
    let startCate=await getCateApi()
    await displayCate(startCate)
   
}
startCate()
//display
async function displayCate(apiCate) {

    
    console.log(apiCate);
    
    let data=``
    for(let i=0;i<apiCate.length;i++){
       
        data+=`       <div class="col-md-3 mt-3  ">
        
        <div class="image position-relative"  >
            <img src="${apiCate[i].strCategoryThumb}" class="w-100" alt="photo">
            <a class="detailsPage" id="cate"  href="cateFilter.html" target="" >
            <div class="layer position-absolute text-center   " >
                <h3 class="mt-1">${apiCate[i].strCategory}</h3>
                <p class="text-black p-3">${apiCate[i].strCategoryDescription}</p>
            </div>
            </a>
        </div>
      
        
    </div>
    `
    }
    try {
        document.getElementById('displayCate').innerHTML=data 
    } catch (error) {
        
    }
   
    
  
    
}


//display

// document.getElementById('cate').addEventListener('click', function(e) {
//     console.log(e);
// });

let cateNameF=``
if( localStorage.getItem('cateName') !=null){
    cateNameF= localStorage.getItem('cateName')
}

$('#displayCate').on('click', '.detailsPage', function() {
    index = $(this).closest('.col-md-3').index();
    localStorage.setItem('index',JSON.stringify(index));
   console.log(index);
   console.log('Clicked on details page link');

  cateNameF=$(`.layer h3:eq(${index})`).text()
 localStorage.setItem('cateName',cateNameF);
 




  
});



//----------------cate-------------------------

//---------cat api filter --------------

let cateApi=``
let cateResponseFilter=``
let cateResultFilter=``
async function getCateFilterApi(){
   let filter= localStorage.getItem('cateName')
    cateApi= await fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${filter}`)
    cateResponseFilter= await cateApi.json()
    cateResultFilter=cateResponseFilter.meals
    console.log(cateResultFilter);

    
    return cateResultFilter;
    
}


//---------cat api filter --------------

//display filter-----------------
async function displayFilter(cateFilter) {
    let dataS=``
   
    console.log(cateFilter);
    for(let i=0;i<cateFilter.length;i++){
       
        dataS+=`       <div class="col-md-3 mt-3  ">
        
        <div class="image position-relative" >
            <img src="${cateFilter[i].strMealThumb}" class="w-100" alt="photo">
            <a class="detailsPage" href="details.html" target="" >
            <div class="layer position-absolute  d-flex align-items-center" >
                <h3>${cateFilter[i].strMeal}</h3>
            </div>
            </a>
        </div>
      
        
    </div>
    `
}
try {
    document.getElementById('cateFilter').innerHTML=dataS
} catch (error) {
    
}

}




//display filter-----------------
//start filter

async function startCateFilter() {
    let cateFilterApi= await getCateFilterApi()
    await displayFilter(cateFilterApi)
    // alert(filterName)
    
    // await displayPage2(cateFilterApi)

}
startCateFilter()

//-----------------------area--------
//api

let areaApi=``
let areaResponse=``
let areaResult=``
async function getArea(){
//    let area= localStorage.getItem('area')
    areaApi= await fetch(`https://themealdb.com/api/json/v1/1/list.php?a=list`)
    areaResponse= await areaApi.json()
    areaResult=areaResponse.meals
    console.log(areaResult);

    
    return areaResult;
    
}


//api
//display areas


async function displayArea(areas) {
    let dataS=``
  
    
    for(let i=0;i<areas.length;i++){
       
        dataS+=`       <div class="col-md-3 mt-3  ">
        
        <div class="image position-relative" >
       
            <a class="detailsPage" href="showAreaFood.html" target="" >
            <i class="fa-solid fa-house-laptop fa-4x my-2"></i>
                <h3>${areas[i].strArea}</h3>
            
            </a>
        </div>
      
        
    </div>
    `
}
try {
    document.getElementById('areaSearch').innerHTML=dataS
} catch (error) {
    
}

}



//display areas




//-----------------------area--------

//start area


async function startArea() {
    let areaApi= await getArea()
     await displayArea(areaApi)

}
startArea()
//start area


//------------------selected area-------------------
//clicked area
let areaName=``
if( localStorage.getItem('SelectedAreaName') !=null){
    areaName= localStorage.getItem('SelectedAreaName')
}

$('#areaSearch').on('click', '.detailsPage', function() {
    index = $(this).closest('.col-md-3').index();
    localStorage.setItem('index',JSON.stringify(index));
   console.log(index);
   console.log('Clicked on details page link');

  areaName=$(` h3:eq(${index})`).text()
  console.log(areaName);
 localStorage.setItem('selectedAreaName',areaName);
 




  
});
//clicked area
//api

let selectedArea=``
let selectedResponse=``
let selectedResult=``
async function selectedArea1(){
   let areaSelected= localStorage.getItem('selectedAreaName')
    selectedArea= await fetch(`https://themealdb.com/api/json/v1/1/filter.php?a=${areaSelected}`)
    selectedResponse= await selectedArea.json()
    selectedResult=selectedResponse.meals
    console.log(selectedResult);

    
    return selectedResult;
    
}




//api

//start selected

async function startSelectedArea() {
    let selectedAreaApi= await selectedArea1()
     
     await displaySelected(selectedAreaApi)

}
startSelectedArea()


//start selected

//-------display selected--------------


async function displaySelected(selcArea) {
    let dataS=``
    
    console.log(selcArea);
    for(let i=0;i<selcArea.length;i++){
       
        dataS+=`       <div class="col-md-3 mt-3  ">
        
        <div class="image position-relative" >
            <img src="${selcArea[i].strMealThumb}" class="w-100" alt="photo">
            <a class="detailsPage" href="details.html" target="" >
            <div class="layer position-absolute  d-flex align-items-center" >
                <h3>${selcArea[i].strMeal}</h3>
            </div>
            </a>
        </div>
      
        
    </div>
    `
}
try {
    document.getElementById('showArea').innerHTML=dataS
} catch (error) {
    
}

}



//-------display selected--------------



//------------------selected area-------------------



//ing---------------------------------------
//api

let ingApi=``
let ingResponse=``
let ingResult=``
async function getIng(){
//    let area= localStorage.getItem('area')
    ingApi= await fetch(`https://themealdb.com/api/json/v1/1/list.php?i=list`)
    ingResponse= await ingApi.json()
    ingResult=ingResponse.meals
    

console.log(ingResult);
    return ingResult;
    
}

//api
//display Ing-----------

async function displayIng(Ings) {
    let dataS=``
    
    
    for(let i=0;i<20;i++){
       
        dataS+=`       <div class="col-md-3 mt-3  ">
        
        <div class="image position-relative text-center" >
       
            <a class="detailsPage overflow-hidden  " style="height: 200px;" href="showIng.html" target="" >
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${Ings[i].strIngredient}</h3>
                <p class="p-1" style="height: 95px;">${Ings[i].strDescription}</p>
            
            </a>
        </div>
      
        
    </div>
    `
}
try {
    document.getElementById('ing').innerHTML=dataS
} catch (error) {
    
}

}

//display Ing-----------




//start ing


async function startIng() {
    let IngApi= await getIng()
     
     await displayIng(IngApi)

}
startIng()

//start ing

//selected Ing----------------------------------


$('#ing').on('click', '.detailsPage', function() {
    index = $(this).closest('.col-md-3').index();
    localStorage.setItem('index',JSON.stringify(index));
   console.log(index);
   console.log('Clicked on details page link');

  let ingName=$(` h3:eq(${index})`).text()
  console.log(ingName);
 localStorage.setItem('selectedIngName',ingName);
 




  
});



//selected Ing----------------------------------


//selected ing api------------


let ingSapi=``
let ingSresponse=``
let ingSresult=``
async function ingSele(){
   let ingSelected= localStorage.getItem('selectedIngName')
   ingSapi= await fetch(`https://themealdb.com/api/json/v1/1/filter.php?i=${ingSelected}`)
   ingSresponse= await ingSapi.json()
   ingSresult=ingSresponse.meals
    console.log(ingSresult);

    
    return ingSresult;
    
}



//selected ing api------------

//start ing selected

async function startIngSelected() {
    let IngApiSelected= await ingSele()
     
     await displayIngSelected(IngApiSelected)

}
startIngSelected()

//start ing selected

//display


async function displayIngSelected(selectedIng) {
    let dataS=``
   
    
    for(let i=0;i<selectedIng.length;i++){
       
        dataS+=`       <div class="col-md-3 mt-3  ">
        
        <div class="image position-relative" >
            <img src="${selectedIng[i].strMealThumb}" class="w-100" alt="photo">
            <a class="detailsPage" href="details.html" target="" >
            <div class="layer position-absolute  d-flex align-items-center" >
                <h3>${selectedIng[i].strMeal}</h3>
            </div>
            </a>
        </div>
      
        
    </div>
    `
}
try {
    document.getElementById('showIng').innerHTML=dataS
} catch (error) {
    
}

}




//display







//ing---------------------------------------

//------------------contact-------------------

let regexName=/[a-zA-Z0-9]{1,}/

let regexEmail=/^[a-zA-Z0-9]{1,}@[a-zA-Z]{3}.[a-zA-Z]{3}$/

let regexPhone=/^(002|\+2)?01[0521][0-9]{8}$/
let regexAge=/^[1-9]{1,2}$/
let regexPass=/(?=.*[a-z])(?=.*[0-9])(?=.{8,})/
let pass1=''
let pass2=''
let age=''
let Name=''
let Email=''
let phone=''


$('#name11').keyup(function () {
    Name=$('#name11').val()
    if(regexName.test(Name)){
        $('#nameAlert').hide()
    }else{
        $('#nameAlert').show()
    }

  
    //  Name=$('#name11').val()
    //  Email=$('#email').val()
    //  phone=$('#phone').val()
    //   age=$('#age').val()
    //   pass1=$('#pass1').val()
    //   pass2=$('#pass2').val()
    //   console.log(Name);
    // //   console.log(Email);
    //   console.log(age);
    //   console.log(phone);
    // console.log(pass1);
    // console.log(pass2);
});

$('#email').keyup(function () {
    
     Email=$('#email').val()
    if(regexEmail.test(Email)){
        $('#emailAlert').hide()
    }else{
        $('#emailAlert').show()
    }
    allInputs()
    console.log(Email);
});
$('#phone').keyup(function () {
    
    phone=$('#phone').val()
    if(regexPhone.test(phone)){
        $('#phoneAlert').hide()
    }else{
        $('#phoneAlert').show()
    }
    allInputs()
    console.log(phone);
});

$('#age').keyup(function () {
    
     age=$('#age').val()
    if(regexAge.test(age)){
        $('#ageAlert').hide()
    }else{
        $('#ageAlert').show()
    }
    allInputs()
    console.log(age);
});

$('#pass1').keyup(function () {
    
     pass1=$('#pass1').val()
    if(regexPass.test(pass1)){
        $('#pass1Alert').hide()
    }else{
        $('#pass1Alert').show()
    }
    allInputs()
    console.log(pass1);
});

$('#pass2').keyup(function () {
    
     pass2=$('#pass2').val()
    if(pass1==pass2){
        $('#pass2Alert').hide()
    }else{
        $('#pass2Alert').show()
    }
    allInputs()
    console.log(pass2);
});

function allInputs() {
    if(pass1==pass2&&regexPass.test(pass1)&&regexAge.test(age)&&regexPhone.test(phone)&&regexEmail.test(Email)&&regexName.test(Name)){
        $('#submitBtn').attr('disabled', false);
    }
}
allInputs()

function hideAlerts() {
    if(Name=$('#name11').val()==""){
        $('#emailAlert').hide()
        $('#nameAlert').hide()
        $('#phoneAlert').hide()
        $('#ageAlert').hide()
        $('#pass1Alert').hide()
        $('#pass2Alert').hide()

    }
}
hideAlerts()





//------------------contact-------------------












//testttttttttttttttttttttttttttttttttt
// $('#ing,#displayData,#showIng,#showArea,#areaSearch,#cateFilter,#displayCate').on('click', '.detailsPage', function() {
//     index = $(this).closest('.col-md-3').index();
//     localStorage.setItem('index',JSON.stringify(index));
//    console.log(index);
//    console.log('tessssssssssssssssssssssst');

//   test=$(` h3:eq(${index})`).text()
//   test1=$(` img:eq(${index})`).text()
//   console.log(test);
//   console.log(test1);
//  localStorage.setItem('test',test);
 

// });

$(document).ready(function () {
    $('#loading').fadeOut(500,function () {
        $("body").css('overflow','auto')
    })
})





