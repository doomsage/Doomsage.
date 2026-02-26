const canvas=document.getElementById("bg");

const ctx=canvas.getContext("2d");

function resize(){

  canvas.width=innerWidth;

  canvas.height=innerHeight;

}

resize();

addEventListener("resize",resize);

const dots=Array.from({length:120},()=>({

  x:Math.random()*canvas.width,

  y:Math.random()*canvas.height,

  r:Math.random()*2,

  s:Math.random()*0.6+0.2

}));

function draw(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  dots.forEach(d=>{

    ctx.beginPath();

    ctx.arc(d.x,d.y,d.r,0,Math.PI*2);

    ctx.fillStyle="#7f5af0";

    ctx.fill();

    d.y+=d.s;

    if(d.y>canvas.height)d.y=0;

  });

  requestAnimationFrame(draw);

}

draw();

document.querySelectorAll(".expandable").forEach(card=>{

  card.addEventListener("click",e=>{

    if(e.target.classList.contains("close-btn")){

      card.classList.remove("active");

      return;

    }

    card.classList.toggle("active");

  });

});
// Add the loading class to the body immediately
document.body.classList.add('is-loading');

window.addEventListener('load', function() {
  const bootloader = document.getElementById('bootloader');
  
  // A 2-second delay so the animation gets a moment to shine
  setTimeout(() => {
    // Trigger the CSS fade out
    bootloader.classList.add('fade-out');
    
    // Restore scrolling to the main site
    document.body.classList.remove('is-loading');
    
    // Optional: remove it entirely from the DOM after the fade transition ends
    setTimeout(() => {
        bootloader.remove();
    }, 800); 
    
  }, 1700); // 2000 milliseconds = 2 seconds. Adjust as you see fit!
});
function openProject(url) {
  window.open(url, "_blank");
}
