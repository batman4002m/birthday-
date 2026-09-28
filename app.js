/* تولد مامان عزیزم */

const screens=[...document.querySelectorAll(".screen")];
let current=1;
let opened=0;
let letterStarted=false;
let balloonPopped=0;
let gardenFlowers=0;
let candlesOff=0;

function go(n){
  screens[current-1].classList.remove("active");
  current=n;
  screens[current-1].classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
  if(n===4) document.getElementById("envelopeHint").textContent="روی پاکت بزن";
  if(n===5) makeBalloons();
  if(n===6) makeGarden();
}

function openCard(card){
  if(card.classList.contains("open")) return;
  card.classList.add("open");
  opened++;
  if(opened>=9) document.getElementById("cardsNext").classList.remove("hidden");
}

const letterText =
`مامان عزیزم

تولد تو برای من بزرگترین اتفاقه

تولد رو خیلی دوست دارم چون یه فرشته افتاده توی این دنیا
و اون فرشته تویی
اگر تو نبودی منی هم نبود

شاید همیشه نتونم با حرفام همه چیز رو بگم
اما همیشه توی قلبم جای خاصی داری

هر وقت خسته شدم بودنت بهم آرامش داد
هر وقت ناراحت شدم حرفات بهم امید داد
و هر وقت خوشحال شدم دلم میخواست تو هم کنارم باشی

برای تمام مهربونی هات
برای تمام صبر و حوصله هات
برای تمام زحمت هات
برای تمام لحظه هایی که کنارم بودی

از ته قلبم ممنونم

ایشالا دوباره روی پاهات وایسی مامانی :)

دوستت دارم مامانی
تولدت مبارک فرشته من`;

function openEnvelope(){
  const env=document.getElementById("envelope");
  if(env.classList.contains("open"))return;
  env.classList.add("open");
  document.getElementById("envelopeHint").textContent="نامه برای تو";
  setTimeout(()=>{
    document.getElementById("letterWrap").classList.remove("hidden");
    startLetter();
  },650);
}
function startLetter(){
  if(letterStarted)return;
  letterStarted=true;
  const el=document.getElementById("typing");
  const cursor=document.getElementById("cursor");
  let i=0;
  const timer=setInterval(()=>{
    el.textContent=letterText.slice(0,i++);
    if(i>letterText.length){
      clearInterval(timer);
      cursor.classList.add("hidden");
      document.getElementById("letterNext").classList.remove("hidden");
    }
  },18);
}

function makeBalloons(){
  const wrap=document.getElementById("balloons");
  if(wrap.dataset.ready==="1") return;

  wrap.dataset.ready="1";
  const colors=["#ff7ebc","#9b8cff","#ffd76b","#8fe7ff","#ff9f9f","#b6efb0","#d8a4ff","#fff"];
  const positions=[
    [8,12],[31,5],[57,13],[78,7],
    [18,51],[43,42],[67,53],[83,42]
  ];

  positions.forEach((pos,i)=>{
    const b=document.createElement("button");
    b.type="button";
    b.className="balloon";
    b.setAttribute("aria-label","ترکاندن بادکنک");
    b.style.left=pos[0]+"%";
    b.style.top=pos[1]+"%";
    b.style.setProperty("--balloon-color",colors[i]);
    b.style.animationDelay=(i*.12)+"s";

    b.addEventListener("click",()=>{
      if(b.classList.contains("popped")) return;

      b.classList.add("popped");
      balloonPopped++;
      document.getElementById("balloonCount").textContent=balloonPopped+" از ۸";

      if(balloonPopped===8){
        setTimeout(()=>go(6),700);
      }
    });

    wrap.appendChild(b);
  });
}

function makeGarden(){
  const garden=document.getElementById("garden");
  if(garden.dataset.ready)return;
  garden.dataset.ready="1";
  garden.onclick=(e)=>{
    const r=garden.getBoundingClientRect();
    const flower=document.createElement("span");
    flower.className="garden-flower";
    flower.textContent=["🌷","🌸","🌼","🌺","💐"][gardenFlowers%5];
    flower.style.left=(e.clientX-r.left-18)+"px";
    flower.style.top=(e.clientY-r.top-25)+"px";
    garden.appendChild(flower);
    gardenFlowers++;
    document.getElementById("gardenText").textContent=gardenFlowers+" گل برای مامانی";
    if(gardenFlowers>=10)document.getElementById("gardenNext").classList.remove("hidden");
  };
}

function blowCandle(btn){
  if(btn.classList.contains("off")) return;

  btn.classList.add("off");
  const flame=btn.querySelector(".candle-flame");
  if(flame) flame.textContent="💨";

  candlesOff++;

  if(candlesOff===5){
    document.getElementById("candleNext").classList.remove("hidden");
  }
}

function cutCake(){
  const cake=document.getElementById("cake");
  if(cake.classList.contains("cut"))return;
  cake.classList.add("cut");
  setTimeout(()=>{
    go(9);
    makeBurst();
  },1300);
}

function makeBurst(){
  const burst=document.getElementById("burst");
  burst.innerHTML="";

  for(let i=0;i<110;i++){
    const c=document.createElement("span");
    c.className="confetti";
    const angle=Math.random()*Math.PI*2;
    const distance=160+Math.random()*520;

    c.style.setProperty("--x",Math.cos(angle)*distance+"px");
    c.style.setProperty("--y",Math.sin(angle)*distance+"px");
    c.style.animationDelay=(Math.random()*.35)+"s";
    c.style.background=["#ff8fc7","#9b8cff","#ffd76b","#ffffff","#8fe7ff","#b6efb0"][i%6];

    burst.appendChild(c);
  }

  setTimeout(()=>burst.replaceChildren(),3500);
}

function createStars(){
  const wrap=document.getElementById("stars");
  for(let i=0;i<90;i++){
    const s=document.createElement("span");
    s.className="star";
    s.style.left=Math.random()*100+"%";
    s.style.top=Math.random()*100+"%";
    s.style.animationDelay=(Math.random()*3)+"s";
    s.style.animationDuration=(2+Math.random()*3)+"s";
    wrap.appendChild(s);
  }
}
createStars();

function petals(){
  const wrap=document.getElementById("petals");
  for(let i=0;i<18;i++){
    const p=document.createElement("span");
    p.textContent=["🌸","🌷","✨"][i%3];
    p.style.position="fixed";
    p.style.left=Math.random()*100+"%";
    p.style.top="-30px";
    p.style.fontSize=(14+Math.random()*15)+"px";
    p.style.zIndex="1";
    p.style.pointerEvents="none";
    p.style.animation=`fall ${6+Math.random()*7}s linear ${Math.random()*5}s infinite`;
    wrap.appendChild(p);
  }
}
petals();