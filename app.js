const sliderControl = document.querySelector(".slider-controls");
const sliderImage = document.querySelector(".slider-image");

const champName = document.querySelector(".champ-name");
const searchingBtn = document.querySelector(".search");
const skinSlider = document.querySelector(".skinn-slider");
const slideHeader = document.querySelector(".slider-header");

let url;

let intervaltime;
let index =0;


window.addEventListener("load",()=> {
    // console.log(document.querySelector(".slider-image video"));

        document.querySelector(".slider-image video").play();

  
});

const lolApi = async (champName) => {


    url = await fetch(`http://ddragon.leagueoflegends.com/cdn/12.14.1/data/en_US/champion/${champName}.json?api_key=RGAPI-1ea00ec7-2f71-4ff9-8eb7-befbeb811125`);
    console.log(url);
    // console.log(url.ok);
   
    if(url.ok===true) {
          
            const data = await url.json();
            const entries = Object.entries(data.data);
            const newData = entries[0][1];
            displayMiddle();
            displaySlider(newData,champName);
            displayRoleInfo(newData,champName);
            displaySpells(newData,champName);
     
            
            // console.log("başarılı");
        
    }
    else {
        document.querySelector(".error").classList.add("error-effect");
        setTimeout(() => {
            document.querySelector(".error").classList.remove("error-effect");
        }, 3000);
        document.querySelector(".error").innerHTML=`
        <p> Username not found , please enter to again</p> <i class="fa-solid fa-exclamation"></i>
        `;
        console.log("başarılı değil");

        console.log(document.querySelector("body").scrollTop);
        document.querySelector("body").scrollTop=0;
        console.log(document.querySelector("body").scrollTop);
    }


 

}






const displaySlider = (newData,champName) => {

    sliderControl.innerHTML="";
    sliderImage.innerHTML="";
    document.querySelector(".logo").innerHTML="";

    document.querySelector(".logo").style.opacity="0";
    skinSlider.style.opacity="0";


    
setTimeout(() => {
    skinSlider.style.opacity="1"; 
    document.querySelector(".logo").style.opacity="1"; 
}, 120);


    for(let i =0; i<newData.skins.length; i++){
        // console.log(i);
        console.e
        sliderControl.innerHTML+= `
        <button class="btns" id="${i}"> </button>
        `;
        let imageUrl = champName+"_"+newData.skins[i].num;
        // console.log(imageUrl);
        sliderImage.innerHTML+=  `
        <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${imageUrl}.jpg" id="${i}">
        `;
    sliderImage.children[0].classList.add("active");
    sliderControl.children[0].classList.add("btn-active");
    }



    slideHeader.innerHTML=`
    <span>
    ${newData.skins[0].name} </span>`;
    
    for(let btn of sliderControl.children) {
   
        // console.log(btn);
        btn.addEventListener("click", () => {
            console.log(newData.skins[btn.id].name);
            let changeUrl = champName+"_"+ newData.skins[btn.id].num;
            let bgUrl = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${changeUrl}.jpg`;
            // console.log(bgUrl);
            // console.log(btn.id);
            index=btn.id;
            slideHeader.innerHTML=`
            <span>
            ${newData.skins[btn.id].name} </span>`;
            



            

            for(let img of sliderImage.children){
                // console.log(img);
    
            if(btn.id===img.id){
                // console.log(img);
                document.querySelector(".slider-controls button.btn-active").classList.remove("btn-active");
                btn.classList.add("btn-active");

                document.querySelector(".slider-image img.active").classList.remove("active");
                img.classList.add("active");
            }
        }

        })


    }

    funcInterval(newData);
  




    sliderControl.addEventListener("mouseenter", () => {
        console.log("b");
        clearInterval(intervaltime);

    });

    sliderControl.addEventListener("mouseleave",()=> {
        console.log("a");
        funcInterval(newData);
     
    });
    


}





const displayRoleInfo = (newData,champName) => {
const imgRole = document.querySelector(".img-role");
const imgDiff = document.querySelector(".img-difficulty");
const textInfo = document.querySelector(".text-info");

const roleName = document.querySelector(".role-name");
const diffName = document.querySelector(".dif-name");

document.querySelector(".character-name").textContent=`${champName}`;
// console.log(newData.blurb);

textInfo.textContent=`${newData.blurb}`;



// console.log(newData.tags[0]);

if(newData.tags[0]==="Fighter"){
    imgRole.innerHTML=`
    <img src="./img/roleIcons/Fighter.png">`;
    roleName.textContent=`${newData.tags[0]}`;
}
else if (newData.tags[0]==="Mage"){
    imgRole.innerHTML=`
    <img src="./img/roleIcons/Mage.png">`;
    roleName.textContent=`${newData.tags[0]}`;
}
else if(newData.tags[0]==="Asasian"){
    imgRole.innerHTML=`
    <img src="./img/roleIcons/Asasian.png">`;
    roleName.textContent=`${newData.tags[0]}`;
}
else if(newData.tags[0]==="Support"){
    imgRole.innerHTML=`
    <img src="./img/roleIcons/Support.png">`;
    roleName.textContent=`${newData.tags[0]}`;
}
else if(newData.tags[0]==="Tank"){
    imgRole.innerHTML=`
    <img src="./img/roleIcons/Tank.png">`;
    roleName.textContent=`${newData.tags[0]}`;
}
else if (newData.tags[0]==="Marksman"){
    imgRole.innerHTML=`
    <img src="./img/roleIcons/Adc.png">`;
    roleName.textContent=`${newData.tags[0]}`;
}


if(newData.info.difficulty>0 && newData.info.difficulty<=3){

  imgDiff.children[0].style.backgroundColor="#fff";
  diffName.textContent="Easy";

}
else if(newData.info.difficulty>3 && newData.info.difficulty<=6){

    imgDiff.children[0].style.backgroundColor="#fff";
    imgDiff.children[1].style.backgroundColor="#fff";
    diffName.textContent="Normal";
}
else if(newData.info.difficulty>6 && newData.info.difficulty<=10){

    imgDiff.children[0].style.backgroundColor="#fff";
    imgDiff.children[1].style.backgroundColor="#fff";
    imgDiff.children[2].style.backgroundColor="#fff";
    diffName.textContent="Hard";
}

}

const funcInterval = (newData) => {
    

    intervaltime = setInterval(() => {
        
        index++;
        // console.log(index);
        if(index>newData.skins.length-1){
            index=0;
        }

        document.querySelector(".slider-image img.active").classList.remove("active");
        sliderImage.children[index].classList.add("active");
      
        slideHeader.innerHTML=`
            <span>
            ${newData.skins[index].name} </span> `;
        
        document.querySelector(".slider-controls button.btn-active").classList.remove("btn-active");
        sliderControl.children[index].classList.add("btn-active");
    }, 3000);

    // slideHeader.innerHTML=`
    // <span></span>
    // ${newData.skins[btn.id].name} `;
}


const displaySpells = (newData,champName) => {


    const q = document.querySelector(".q");
    const w = document.querySelector(".w");
    const e = document.querySelector(".e");
    const r = document.querySelector(".r");
    const passive = document.querySelector(".passive");



let passiveData = newData.passive.image.full;
let qData = newData.spells[0].image.full;
let wData = newData.spells[1].image.full;
let eData = newData.spells[2].image.full;
let rData = newData.spells[3].image.full;

//


 

    let passiveVideo;
    let qVideo;
    let wVideo;
    let eVideo;
    let rVideo;

    for(let video of videos) {
        let keys = Object.keys(video);
        if(champName===keys[0]){
            // console.log(video[champName].q);

            document.querySelector(".spell-expo p").textContent=`${newData.passive.description}`;
            document.querySelector(".spell-name-header").textContent=`${newData.passive.name}`;
            // document.querySelector(".videos").innerHTML=`
            // <video autoplay>
            // <source src="${video[champName].q}.webm" type="video/mp4">
            // </video>
            // `;

            // console.log(video[champName]);

             passiveVideo = ` <video autoplay class="video-effect">
            <source src="${video[champName].passive}.webm" type="video/mp4">
            </video> `;

             qVideo = ` <video autoplay>
            <source src="${video[champName].q}.webm" type="video/mp4">
            </video> `;

             wVideo = ` <video autoplay>
            <source src="${video[champName].w}.webm" type="video/mp4">
            </video> `;
             eVideo = ` <video autoplay>
            <source src="${video[champName].e}.webm" type="video/mp4">
            </video> `;
             rVideo = ` <video autoplay>
            <source src="${video[champName].r}.webm" type="video/mp4">
            </video> `;


            document.querySelector(".videos").innerHTML= `
            ${passiveVideo}
            ${qVideo}
            ${wVideo}
            ${eVideo}
            ${rVideo}
            
            `;


            passive.children[0].classList.add("span-effect");
          
setTimeout(() => {
    q.style.pointerEvents="auto";
    w.style.pointerEvents="auto";
    e.style.pointerEvents="auto";
    r.style.pointerEvents="auto";
}, 3000);
q.style.pointerEvents="none";
w.style.pointerEvents="none";
e.style.pointerEvents="none";
r.style.pointerEvents="none";


passive.addEventListener("click",()=> {

    document.querySelector(".spell-expo p").textContent=`${newData.passive.description}`;
    document.querySelector(".spell-name-header").textContent=`${newData.passive.name}`;

    if(!document.querySelector(".videos").children[0].classList.contains("video-effect")) {
        setTimeout(() => {

            document.querySelector(".videos").children[0].autoplay=true;
            document.querySelector(".videos").children[1].autoplay=false;
            document.querySelector(".videos").children[2].autoplay=false;
            document.querySelector(".videos").children[3].autoplay=false;
            document.querySelector(".videos").children[4].autoplay=false;
            document.querySelector(".videos").children[0].classList.add("video-effect");
            document.querySelector(".videos").children[1].classList.remove("video-effect");
            document.querySelector(".videos").children[2].classList.remove("video-effect");
            document.querySelector(".videos").children[3].classList.remove("video-effect");
            document.querySelector(".videos").children[4].classList.remove("video-effect");
            document.querySelector(".videos").children[0].play();
        }, 1000);
       


        q.children[0].classList.remove("span-effect");
        w.children[0].classList.remove("span-effect")
        e.children[0].classList.remove("span-effect")
        r.children[0].classList.remove("span-effect")
        passive.children[0].classList.add("span-effect");

        q.style.pointerEvents="none";
        w.style.pointerEvents="none";
        e.style.pointerEvents="none";
        r.style.pointerEvents="none";

        setTimeout(() => {
            q.style.pointerEvents="auto";
        w.style.pointerEvents="auto";
        e.style.pointerEvents="auto";
        r.style.pointerEvents="auto";
        }, 3000);

    }

});    

q.addEventListener("click",()=>{

    document.querySelector(".spell-expo p").textContent=`${newData.spells[0].description}`;
    document.querySelector(".spell-name-header").textContent=`${newData.spells[0].name}`
    if(!document.querySelector(".videos").children[1].classList.contains("video-effect")) {
    setTimeout(() => {

        document.querySelector(".videos").children[0].autoplay=false;
        document.querySelector(".videos").children[1].autoplay=true;
        document.querySelector(".videos").children[2].autoplay=false;
        document.querySelector(".videos").children[3].autoplay=false;
        document.querySelector(".videos").children[4].autoplay=false;

        document.querySelector(".videos").children[1].classList.add("video-effect");
        document.querySelector(".videos").children[0].classList.remove("video-effect");
        document.querySelector(".videos").children[2].classList.remove("video-effect");
        document.querySelector(".videos").children[3].classList.remove("video-effect");
        document.querySelector(".videos").children[4].classList.remove("video-effect");

        document.querySelector(".videos").children[1].play();

    }, 1000);
      
        q.children[0].classList.add("span-effect");
        w.children[0].classList.remove("span-effect")
        e.children[0].classList.remove("span-effect")
        r.children[0].classList.remove("span-effect")
        passive.children[0].classList.remove("span-effect");
        

        passive.style.pointerEvents="none";
        w.style.pointerEvents="none";
        e.style.pointerEvents="none";
        r.style.pointerEvents="none";

        setTimeout(() => {
            passive.style.pointerEvents="auto";
        w.style.pointerEvents="auto";
        e.style.pointerEvents="auto";
        r.style.pointerEvents="auto";
        }, 3000);

    }


} )


w.addEventListener("click",()=>{
   
    document.querySelector(".spell-expo p").textContent=`${newData.spells[1].description}`;
    document.querySelector(".spell-name-header").textContent=`${newData.spells[1].name}`

    if(!document.querySelector(".videos").children[2].classList.contains("video-effect")) {
        setTimeout(() => {
            document.querySelector(".videos").children[0].autoplay=false;
            document.querySelector(".videos").children[1].autoplay=false;
            document.querySelector(".videos").children[2].autoplay=true;
            document.querySelector(".videos").children[3].autoplay=false;
            document.querySelector(".videos").children[4].autoplay=false;

            document.querySelector(".videos").children[2].classList.add("video-effect");
            document.querySelector(".videos").children[0].classList.remove("video-effect");
            document.querySelector(".videos").children[1].classList.remove("video-effect");
            document.querySelector(".videos").children[3].classList.remove("video-effect");
            document.querySelector(".videos").children[4].classList.remove("video-effect");
            document.querySelector(".videos").children[2].play();
    
        }, 1000);
     
        q.children[0].classList.remove("span-effect");
        w.children[0].classList.add("span-effect")
        e.children[0].classList.remove("span-effect")
        r.children[0].classList.remove("span-effect")
        passive.children[0].classList.remove("span-effect");
        

        passive.style.pointerEvents="none";
        q.style.pointerEvents="none";
        e.style.pointerEvents="none";
        r.style.pointerEvents="none";

        setTimeout(() => {
            passive.style.pointerEvents="auto";
        q.style.pointerEvents="auto";
        e.style.pointerEvents="auto";
        r.style.pointerEvents="auto";
        }, 3000);

    }




    // document.querySelector(".videos").innerHTML=`
    // <video autoplay>
    // <source src="${video[champName].w}.webm" type="video/mp4">
    // </video>
    // `;
} )
e.addEventListener("click",()=>{

    document.querySelector(".spell-expo p").textContent=`${newData.spells[2].description}`;
    document.querySelector(".spell-name-header").textContent=`${newData.spells[2].name}`
    if(!document.querySelector(".videos").children[3].classList.contains("video-effect")) {
    setTimeout(() => {

        document.querySelector(".videos").children[0].autoplay=false;
        document.querySelector(".videos").children[1].autoplay=false;
        document.querySelector(".videos").children[2].autoplay=false;
        document.querySelector(".videos").children[3].autoplay=true;
        document.querySelector(".videos").children[4].autoplay=false;

        document.querySelector(".videos").children[3].classList.add("video-effect");
        document.querySelector(".videos").children[0].classList.remove("video-effect");
        document.querySelector(".videos").children[1].classList.remove("video-effect");
        document.querySelector(".videos").children[2].classList.remove("video-effect");
        document.querySelector(".videos").children[4].classList.remove("video-effect");
        document.querySelector(".videos").children[3].play();

    }, 1000);
       
        q.children[0].classList.remove("span-effect");
        w.children[0].classList.remove("span-effect")
        e.children[0].classList.add("span-effect")
        r.children[0].classList.remove("span-effect")
        passive.children[0].classList.remove("span-effect");
        

        passive.style.pointerEvents="none";
        q.style.pointerEvents="none";
        w.style.pointerEvents="none";
        r.style.pointerEvents="none";

        setTimeout(() => {
            passive.style.pointerEvents="auto";
        q.style.pointerEvents="auto";
        w.style.pointerEvents="auto";
        r.style.pointerEvents="auto";
        }, 3000);

    }
} )
r.addEventListener("click",()=>{

    document.querySelector(".spell-expo p").textContent=`${newData.spells[3].description}`;
    document.querySelector(".spell-name-header").textContent=`${newData.spells[3].name}`
    if(!document.querySelector(".videos").children[4].classList.contains("video-effect")) {
    setTimeout(() => {

        document.querySelector(".videos").children[0].autoplay=false;
        document.querySelector(".videos").children[1].autoplay=false;
        document.querySelector(".videos").children[2].autoplay=false;
        document.querySelector(".videos").children[3].autoplay=false;
        document.querySelector(".videos").children[4].autoplay=true;


        document.querySelector(".videos").children[4].classList.add("video-effect");
        document.querySelector(".videos").children[0].classList.remove("video-effect");
        document.querySelector(".videos").children[1].classList.remove("video-effect");
        document.querySelector(".videos").children[2].classList.remove("video-effect");
        document.querySelector(".videos").children[3].classList.remove("video-effect");
        document.querySelector(".videos").children[4].play();
    }, 1000);
      

        q.children[0].classList.remove("span-effect");
        w.children[0].classList.remove("span-effect")
        e.children[0].classList.remove("span-effect")
        r.children[0].classList.add("span-effect")
        passive.children[0].classList.remove("span-effect");
        

        passive.style.pointerEvents="none";
        q.style.pointerEvents="none";
        w.style.pointerEvents="none";
        r.style.pointerEvents="none";

        setTimeout(() => {
            passive.style.pointerEvents="auto";
        q.style.pointerEvents="auto";
        w.style.pointerEvents="auto";
        r.style.pointerEvents="auto";
        }, 3000);

    }

} )






        }
  
    }

           



passive.style.backgroundImage = `url(http://ddragon.leagueoflegends.com/cdn/12.15.1/img/passive/${passiveData})`;
q.style.backgroundImage = `url(http://ddragon.leagueoflegends.com/cdn/12.15.1/img/spell/${qData})`;
w.style.backgroundImage = `url(http://ddragon.leagueoflegends.com/cdn/12.15.1/img/spell/${wData})`;
e.style.backgroundImage = `url(http://ddragon.leagueoflegends.com/cdn/12.15.1/img/spell/${eData})`;
r.style.backgroundImage = `url(http://ddragon.leagueoflegends.com/cdn/12.15.1/img/spell/${rData})`;



}



document.querySelector(".champ-name").addEventListener("keypress",(e)=> {
if(e.key==="Enter") {
searchingBtn.click();
event.preventDefault();
}
});




searchingBtn.addEventListener("click",()=> {
    sliderControl.innerHTML= "";
     capitalizeFirstLetter(champName.value);
     champName.value="";
    // clearInterval(intervaltime);

    // console.log(capitalizeFirstLetter(champName.value)); // Foo
    });

    function capitalizeFirstLetter(string) {
        let text = string.charAt(0).toUpperCase() + string.slice(1);
        lolApi(text);

      }
      
  

    

const displayMiddle = ()=> {


    document.querySelector(".middle").innerHTML = `
    
    <div class="character-info">
    <h1 class="character-name"></h1>

    <div class="character-roleBlurb">

        <div class="character-role">
            <h1 class="role-header">ROLE</h1>
            <div class="role-info">
                <div class="role">
                    <h4 class="role-back">Role</h4>
                    <div class="img-role"></div>
                    <p class="role-name"></p>
             
                </div>
                <div class="difficulty">
                    <h4 class="difficulty-back">Difficulty</h4>
                    <div class="img-difficulty">
                       <div class="dif"></div>
                       <div class="dif"></div>
                       <div class="dif"></div>
                    </div>
                    <p class="dif-name"></p>
                   
                </div>
               
            </div>
        </div>
        <div class="hr-long"></div>
        <div class="character-blurb">
            <h1 class="blurb-header">BLURB</h1>
            <div class="blurb-info">
                <p class="text-info">
                   
                </p>
            </div>
        </div>
    </div>
</div>

<div class="hr-style"> 
    <div class="hr-short"></div>
</div>

<div class="spells">
    <h1 class="spell-header">SPELLS</h1>
    <div class="spell-container">
        <div class="passive"><span>Passive</span></div>
        <div class="q"><span>Q</span></div>
        <div class="w"><span>W</span></div>
        <div class="e"><span>E</span></div>
        <div class="r"><span>R</span></div>
    </div>
    <div class="spell-info">
        <div class="videos">
     
        </div>

        <h3 class="spell-name-header">Spell Name</h3>
        <div class="spell-expo">  
            <p></p>
        </div>
    </div>
</div>

    
    
    `;
}
    
    