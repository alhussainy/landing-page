/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let mainHeaderHeight = 0;



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){

    const navBarList = document.getElementById("navbar__list");
    //get all sections or their children 'landing__container'
    const navBarListItems = document.querySelectorAll('section');
    const docFrag = document.createDocumentFragment();
    for(const item of navBarListItems){
        const elem = document.createElement('li');
        const listLink=document.createElement('a');
        listLink.href ="#"+item.id;
        listLink.innerText = item.getAttribute('data-nav');
        listLink.classList.add("menu__link");
        elem.appendChild(listLink);
        docFrag.appendChild(elem);
       
    }
    navBarList.appendChild(docFrag);
    const mainHeader = document.querySelector("header.page__header");
    mainHeaderHeight = mainHeader != null ? mainHeader.offsetHeight:0;
}


// Add class 'active' to section when near top of viewport

function addClassActiveToMenuLinkAndSection(){   
    //get menu links
    const menuLinks = document.querySelectorAll('.menu__link');
    menuLinks.forEach((link)=>{
    const sec =document.getElementById((link.getAttribute('href')).split("#")[1]);//get section by id from href in anchors
    //if view port view section add 'active' class to anchor and 'your-active-class' to the section 
    if((window.pageYOffset+mainHeaderHeight) >= sec.offsetTop && (window.pageYOffset+mainHeaderHeight) <= sec.offsetTop+sec.offsetHeight){
        link.classList.add('active');
        sec.className=='your-active-class'?true:sec.className='your-active-class';
        
    }else{
        //sec.className=='your-active-class'?sec.className="":true;
        link.classList.remove('active');
        sec.className="";
    }
   });
}


//change to top anchor status

function showAnchor(){
     //affect to top link dusring scrolling
     const toTop=document.getElementById("toTop");
     if(window.pageYOffset>mainHeaderHeight){
         toTop.style.display="inline";
     }else{
         toTop.style.display="none";
     }
}

    let scrollingStoped =null;//set setTimeOut to fade out nav menu after stopping scrolling
    //hide and show nav menu
    function showNavMenu(){
    window.clearTimeout(scrollingStoped);//clear setTimeOut from event queue while scrolling
    const mainHeader=document.querySelector('header.page__header');
    //show nav menu during scrolling
    //for animation ref:https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
    mainHeader.animate([
        // keyframes
        { opacity: '1' }
      ], {
        // timing options
        duration: 500,
        fill:'forwards',
        easing:"ease-out"
      });
   
   
    //setTimeOut to put it in event queue to be executed if scroll stopped
    scrollingStoped=window.setTimeout(()=>{
        if(window.pageYOffset>mainHeaderHeight){//hide nav menu if user scrolls and show nav if scrollTop=0
            mainHeader.animate([
                // keyframes
                { opacity: '1' },
                {opacity:'1'},
                { opacity: '0'  }
              ], {
                // timing options
                duration: 1400,
                fill:'forwards',
                easing:"ease-in-out"
              });
          
        }else{

            mainHeader.animate([
                // keyframes
                { opacity: '1' }
              ], {
                // timing options
                duration: 1000,
                fill:'forwards',
                easing:"ease-in-out"
              });
             
            window.clearTimeout(scrollingStoped);//clear setTimeOut
            
        }
       
    },0);
}

// Scroll to anchor ID using scrollTO event

function scrollToSection(ev){
    ev.preventDefault();
    const sec = document.querySelector(ev.target.getAttribute('href'))  ;
    window.scrollTo({
        top: sec.offsetTop,
        behavior: 'smooth'
      });
  
}
/**
 * End Main Functions
 * Begin Events
 * 
*/


//document.addEventListener('DOMContentLoaded',buildNav,{once:true});

//wait until all DOM elments are loaded
document.addEventListener('DOMContentLoaded',()=>{
    // Build menu 
    buildNav();

    //show hidden nav menu on hover 
    const mainHeader=document.querySelector('header.page__header');
    mainHeader.addEventListener('mouseover',function(){
        //animte how the nav menu appear
        mainHeader.animate([
            // keyframes
            { opacity: '1' }
          ], {
            // timing options
            duration: 500,
            fill:'forwards',
            easing:"ease-in-out"
          });
    });

    // Scroll to section on link click
    //get all menu anchors
    const menuLinks = document.querySelectorAll('.menu__link');
    //add  event listeners to anchor to scroll to it
    menuLinks.forEach((link)=>{link.addEventListener('click',scrollToSection)});

    //init to top anchor 
    const toTop=document.getElementById("toTop");
    toTop.addEventListener('click',function(ev){
        ev.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        
    });
},{once:true});


// Set sections as active
//add event listener to window to check for the currently viewed section
document.addEventListener('scroll',addClassActiveToMenuLinkAndSection);
document.addEventListener('scroll',showAnchor);
document.addEventListener('scroll',showNavMenu);



