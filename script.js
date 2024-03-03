const cardContainer=document.getElementById('card-container');
const markContainer=document.getElementById('mark-container');
const latestContainer=document.getElementById('latest-container');
const input=document.getElementById('input');
const err=document.getElementById('error');
const spinner=document.getElementById('spinner')
let count=0;
const read=document.getElementById('read');


async function getallPost(s){
  spinner.classList.remove('hidden');
    const res= await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data= await res.json();
    const posts1=data.posts;
    cardShow(posts1,s);
}

function cardShow(posts1,s){
  cardContainer.innerHTML=``;

  setTimeout(()=>{
    spinner.classList.add('hidden');
  },2000);
  
  if(posts1.length===0){
    err.classList.remove('hidden');
  }
  else{
    err.classList.add('hidden');
  }

  setTimeout(()=>{



    posts1.forEach(element => {
    
      console.log(element);
        const newdiv=document.createElement('div');
        newdiv.classList=`bg-[#12132d0d] p-6 rounded-2xl flex md:flex-row flex-col justify-between`;
        newdiv.innerHTML=`<div class="md:w-1/4 w-full">
        ${element.isActive?`<div class="h-5 w-5 bg-green-600 rounded-[150%] transform translate-x-24 translate-y-4"></div>`:`<div class="h-5 w-5 bg-red-600 rounded-[150%] transform translate-x-24 translate-y-4"></div>`}
        <div><img src="${element.image}" class="w-28 rounded-2xl"/></div>
        </div>



        <div class="md:w-3/4 w-full">
        <div class="flex justify-start space-x-4 ml-3">
        <p>#${element.category}</p>
        <p>Author: ${element.author.name}</p>
        </div>
        <div class="border-b-2 border-dashed space-y-4 p-3">
        <h2 class="text-[#12132D] text-2xl font-semibold">${element.title}</h2>
        <p class="text-[#12132d99] inter">${element.description}</p>
        </div>


        <div class="flex md:flex-row flex-col justify-between md:p-4 p-1">
        <div class="flex justify-between flex-wrap pt-4 lg:w-3/4 w-full">
        <div class="flex space-x-1 lg:space-x-3 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M9.33333 10.5H18.6667M9.33333 15.1666H16.3333M10.5 21H7C6.07174 21 5.1815 20.6312 4.52513 19.9748C3.86875 19.3185 3.5 18.4282 3.5 17.5V8.16663C3.5 7.23837 3.86875 6.34813 4.52513 5.69175C5.1815 5.03538 6.07174 4.66663 7 4.66663H21C21.9283 4.66663 22.8185 5.03538 23.4749 5.69175C24.1313 6.34813 24.5 7.23837 24.5 8.16663V17.5C24.5 18.4282 24.1313 19.3185 23.4749 19.9748C22.8185 20.6312 21.9283 21 21 21H17.5L14 24.5L10.5 21Z" stroke="#12132D" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg><p>${element.comment_count}</p></div>
        <div class="flex space-x-1 lg:space-x-3 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M11.6667 14C11.6667 14.6188 11.9125 15.2123 12.3501 15.6499C12.7877 16.0875 13.3812 16.3333 14 16.3333C14.6188 16.3333 15.2123 16.0875 15.6499 15.6499C16.0875 15.2123 16.3333 14.6188 16.3333 14C16.3333 13.3812 16.0875 12.7877 15.6499 12.3501C15.2123 11.9125 14.6188 11.6667 14 11.6667C13.3812 11.6667 12.7877 11.9125 12.3501 12.3501C11.9125 12.7877 11.6667 13.3812 11.6667 14Z" stroke="#12132D" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M24.5 14C21.7 18.6667 18.2 21 14 21C9.8 21 6.3 18.6667 3.5 14C6.3 9.33333 9.8 7 14 7C18.2 7 21.7 9.33333 24.5 14Z" stroke="#12132D" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg><p>${element.view_count}</p>
        </div>
        <div class="flex space-x-1 lg:space-x-3 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M9.91667 14H14V8.16667M3.5 14C3.5 15.3789 3.77159 16.7443 4.29926 18.0182C4.82694 19.2921 5.60036 20.4496 6.57538 21.4246C7.55039 22.3996 8.70791 23.1731 9.98182 23.7007C11.2557 24.2284 12.6211 24.5 14 24.5C15.3789 24.5 16.7443 24.2284 18.0182 23.7007C19.2921 23.1731 20.4496 22.3996 21.4246 21.4246C22.3996 20.4496 23.1731 19.2921 23.7007 18.0182C24.2284 16.7443 24.5 15.3789 24.5 14C24.5 12.6211 24.2284 11.2557 23.7007 9.98182C23.1731 8.70791 22.3996 7.55039 21.4246 6.57538C20.4496 5.60036 19.2921 4.82694 18.0182 4.29927C16.7443 3.77159 15.3789 3.5 14 3.5C12.6211 3.5 11.2557 3.77159 9.98182 4.29927C8.70791 4.82694 7.55039 5.60036 6.57538 6.57538C5.60036 7.55039 4.82694 8.70791 4.29926 9.98182C3.77159 11.2557 3.5 12.6211 3.5 14Z" stroke="#12132D" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg><P>${element.posted_time} min</P>
        </div>
        </div>


        <div>
       
        </div>
        </div>


        </div>`;
      

         // Create button element
     const button = document.createElement('button');
     button.classList.add('btn');
     const img = document.createElement('img');
     img.src = "./images/email 1.svg";
     button.appendChild(img);
     button.classList=`translate-y-0 p-2 rounded-2xl  md:translate-y-40 lg:translate-y-46 xl:translate-y-40 mt-3 md:mt-3 xl:mt-0 lg:mt-2`;
     button.addEventListener('click', () => {
         mark(element.title, element.view_count);
     });

     const containerDiv = document.createElement('div');
     containerDiv.appendChild(button);
     newdiv.appendChild(containerDiv);
     cardContainer.appendChild(newdiv);

      
        cardContainer.appendChild(newdiv);


        
 
 
 
      });





    
  },s);




}


async function queryPost(name,s){

  
  spinner.classList.remove('hidden');

  const res= await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${name}`);
  const data= await res.json();
  const queryData=data.posts;
  console.log(queryData);
  cardShow(queryData,s);
  
}


function search(){
  const text=input.value;
  if(text){
    queryPost(text,2000);

    input.value='';
   
  }
  
}







async function getLatest(){
  const res= await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
  const data= await res.json();
  console.log(data);
  latestShow(data);
}

function latestShow(data){

  data.forEach(element =>{
   
    newdiv2=document.createElement('div');
    newdiv2.innerHTML=`<div class="card card-compact  bg-base-100 shadow-xl p-4 md:h-[70vh] h-auto">
    <div><img src="${element.cover_image}" alt="Shoes" class="w-full" /></div>
    <div class="card-body">
      <div class="flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <g clip-path="url(#clip0_29_1905)">
        <path d="M4 7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V7Z" stroke="#12132D" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16 3V7" stroke="#12132D" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 3V7" stroke="#12132D" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 11H20" stroke="#12132D" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11 16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16C13 15.7348 12.8946 15.4804 12.7071 15.2929C12.5196 15.1054 12.2652 15 12 15C11.7348 15 11.4804 15.1054 11.2929 15.2929C11.1054 15.4804 11 15.7348 11 16Z" stroke="#12132D" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_29_1905">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
    ${element.author.posted_date? `<p class="text-[#12132d99] inter font-normal">${element.author.posted_date}</p>`:`<p class="text-[#12132d99] inter font-normal">No publish date</p>`}
    
    </div>
      <h2 class="card-title mulish font-bold text-[#12132D]">${element.title}</h2>
      <p class="text-[#12132d99] inter font-normal">${element.description}</p>
      <div  class="flex justify-start space-x-4 items-center">
      <div><img src="${element.profile_image}" class="w-10 h-10 rounded-full"/></div>
      <div>
      <p class="mulish font-semibold text-[#12132D] text-base ">${element.author.name}</p>
      ${element.author.designation?`<p class="text-[#12132d99] inter font-normal">${element.author.designation}</p>`:`<p class="text-[#12132d99] inter font-normal">Unknown</p>`}
      
      </div>
      </div>
    </div>
  </div>`;
  latestContainer.appendChild(newdiv2);
  })

}



getLatest();

function mark(t,v){
    console.log(t,v);
    count++;
    console.log(count);
    read.innerText=parseInt(count);
    const div2=document.createElement('div');
    div2.classList=` bg-white mb-3 w-full rounded-2xl`;
    div2.innerHTML=`<div class="flex justify-between p-2"><h3 class="text-[#12132D] text-lg font-semibold">${t}</h3>
    <div class="flex"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M11.6667 14C11.6667 14.6188 11.9125 15.2123 12.3501 15.6499C12.7877 16.0875 13.3812 16.3333 14 16.3333C14.6188 16.3333 15.2123 16.0875 15.6499 15.6499C16.0875 15.2123 16.3333 14.6188 16.3333 14C16.3333 13.3812 16.0875 12.7877 15.6499 12.3501C15.2123 11.9125 14.6188 11.6667 14 11.6667C13.3812 11.6667 12.7877 11.9125 12.3501 12.3501C11.9125 12.7877 11.6667 13.3812 11.6667 14Z" stroke="#12132D" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M24.5 14C21.7 18.6667 18.2 21 14 21C9.8 21 6.3 18.6667 3.5 14C6.3 9.33333 9.8 7 14 7C18.2 7 21.7 9.33333 24.5 14Z" stroke="#12132D" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg><p>${v}</p></div></div>
    <div></div>`;
  markContainer.appendChild(div2);

    
   
}



getallPost(2000);


