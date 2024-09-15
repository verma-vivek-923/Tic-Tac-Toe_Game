let boxes=document.querySelectorAll(".box");
let reset=document.querySelector(".reset-btn")
let newGame=document.querySelector(".new-btn")
let msg=document.querySelector(".msg")
let line=document.querySelector(".game label")
let checkbox=document.querySelector("input")
let turn=document.querySelector(".turn-text");
let turnx=true;
let winer=false;
let count=0;
let playcomp=false;
let bcount=0;
let arr=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
]

console.log(playcomp)

checkbox.addEventListener("change",()=>{
    playcomp=checkbox.checked;
    resetgame();
})

let show_winner=(win)=>{
    if(playcomp==true){
        if(win=='O'){
            msg.innerText=`Computer Beats You ! Try Again`;
        }else{
            msg.innerText=`Congratulation, You Beat Computer !!`;
        }
    }else{
        // console.log(`Congratulation Winner is ${win}`);
        msg.innerText=`Congratulation Winner is ${win}`
    }
    for(key of boxes){
        key.disabled=true;
  }
  msg.classList.remove("hide");
  winer=true;
}

let resetgame=()=>{
    line.style.transform="none";
    line.style.display="none";
    turn.innerText="Turn X";
    count=0;
    winer=false;
    turnx=true;
    for(key of boxes){
        key.innerHTML="";
        key.disabled=false;
    }
    msg.classList.add("hide");
    reset.innerText=`Reset`;
}


let n_game=()=>{
        reset.innerText=`New Game`;
}
let show_line=(lp1,lp2,lp3,win)=>{
    line.style.display="block";
    // console.log(lp1,lp2,lp3);
    if(win=='X'){
        // line.style.backgroundColor="#fff"
        line.style.backgroundColor="#4a5759"
        line.style.backgroundColor="#2f3e46"
    }else{
        // line.style.backgroundColor="rgb(32,32,32)"
        line.style.backgroundColor="#4a5759";
        line.style.backgroundColor="#2f3e46"
    }



    if(lp1==0 && lp2==1 && lp3==2){
        line.style.transform="translatey(-125px)";
        line.style.width="95%";
    }else if(lp1==0 && lp2==4 && lp3==8){
        line.style.transform="rotate(45deg)";
        line.style.width="100%";
    }else if(lp1==0 && lp2==3 && lp3==6){
       line.style.transform="rotate(90deg) translatey(125px)";
        // line.style.transformOrigin="left";
        line.style.width="95%";
    }else if(lp1==1 && lp2==4 && lp3==7){
        line.style.transform="rotate(90deg)";
        line.style.width="95%";
    }else if(lp1==2 && lp2==4 && lp3==6){
        line.style.transform="rotate(-45deg)";
        line.style.width="100%";
    }else if(lp1==2 && lp2==5 && lp3==8){;
        line.style.transform="rotate(90deg) translatey(-125px)";
        // line.style.transformOrigin="right";
        line.style.width="95%";
    }else if(lp1==6 && lp2==7 && lp3==8){
        line.style.transform="translatey(125px)";
        line.style.width="95%";
    }else{
        line.style.width="95%";
    }
}


let comp_in=()=>{
        let comp=Math.floor(Math.random()*9);
        console.log(comp);

        if(boxes[comp].disabled==false){
            boxes[comp].style.color="rgb(32,32,32)"
            boxes[comp].innerText=`O`;
            turn.innerText="Turn X";
            boxes[comp].disabled=true;
            turnx=true;
            count++;
        }else{
            if(winer==false && count<8){
                comp_in();
                console.log(count)
            }else{
               showdraw();
            }
        }
            winner();
}

boxes.forEach((key)=>{
    key.addEventListener("click",()=>{
    if(playcomp==false){

        if(turnx==true){
            key.style.color="#fff";
            key.innerHTML="X"
            turn.innerText="Turn O";
            turnx=false;
            count++;
            }else{
                key.style.color="rgb(32,32,32)";
                key.innerHTML="O"
                turnx=true;
                turn.innerHTML="Turn X";
                count++;
            }
            key.disabled=true;
            winner();
    
        }else{
        if(turnx==true){

            key.style.color="#fff"
            key.innerHTML="X"
            turn.innerText="Turn O";
            turnx=false;
            key.disabled=true;
            count++;
            winner();
            setTimeout(comp_in,350);
        }   
        }
isfull();
    })
})

function isfull(){
console.log(count)
if(count==9 && winer==false){
    console.log(count);
showdraw();
}
}

let showdraw=()=>{
    msg.innerHTML=`Game Draw ! Try Again`;
    msg.classList.remove("hide");
}

let winner=()=>{

    for(key in arr){
       let p1=boxes[arr[key][0]].textContent;
       let p2=boxes[arr[key][1]].textContent;
       let p3=boxes[arr[key][2]].textContent;
     if(p1!="" && p2!="" && p3!=""){

    //  console.log(`p1=${p1}  ${arr[key][0]}`);
    //  console.log(`p1=${p2}  ${arr[key][1]}`);
    //  console.log(`p1=${p3}  ${arr[key][2]}`);
    if(p1==p2  && p2===p3){
    //   console.log("winner is", p2);
        show_line(arr[key][0],arr[key][1],arr[key][2],p1);
        show_winner(p1);
        n_game();
        }
    }

}
}

reset.addEventListener("click",resetgame);
