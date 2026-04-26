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
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById('shatter-wrapper');
  const container = document.getElementById('shatter-canvas-container');
  const btn = document.getElementById('shatter-main-btn');
  const soonText = document.getElementById('shatter-soon-text');

  // Agar element nahi mila toh script exit kar jayegi (prevents errors on other pages)
  if (!wrapper || !container || !btn) return;

  const scene = new THREE.Scene();
  
  // Wrapper ke dimensions fetch kar rahe hain
  let width = wrapper.clientWidth || window.innerWidth;
  let height = wrapper.clientHeight || 300;

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x00ffcc, 2, 50);
  pointLight1.position.set(2, 2, 2);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xbd00ff, 2, 50);
  pointLight2.position.set(-2, -2, 2);
  scene.add(pointLight2);

  // Crystal Material
  const crystalMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.1,
    transmission: 0.9,
    opacity: 1,
    transparent: true,
    envMapIntensity: 1.0
  });

  let shards = [];
  let isShattered = false;

  function explodeCrystal() {
    const numShards = 35;
    for (let i = 0; i < numShards; i++) {
      const geometry = new THREE.TetrahedronGeometry(Math.random() * 0.3 + 0.1);
      const shard = new THREE.Mesh(geometry, crystalMaterial);
      
      shard.position.set((Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 0.5, 0);
      
      shard.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.25,
        (Math.random() - 0.1) * 0.25,
        (Math.random() - 0.5) * 0.25
      );
      
      shard.userData.rotSpeed = new THREE.Vector3(
        Math.random() * 0.15, Math.random() * 0.15, Math.random() * 0.15
      );

      scene.add(shard);
      shards.push(shard);
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    if (isShattered) {
      shards.forEach(shard => {
        shard.position.add(shard.userData.velocity);
        shard.userData.velocity.y -= 0.006; // Gravity effect
        shard.rotation.x += shard.userData.rotSpeed.x;
        shard.rotation.y += shard.userData.rotSpeed.y;
        shard.rotation.z += shard.userData.rotSpeed.z;
      });
    }
    renderer.render(scene, camera);
  }
  animate();

  btn.addEventListener('click', () => {
    btn.style.display = 'none';
    isShattered = true;
    explodeCrystal();
    
    // Animate text reveal
    soonText.style.opacity = '1';
    soonText.style.transform = 'scale(1)';
  });

  // Keep it responsive within your wrapper
  window.addEventListener('resize', () => {
    width = wrapper.clientWidth;
    height = wrapper.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const rock = document.getElementById("vintage-rock");
  const container = document.getElementById("mystic-rock-container");
  const hint = document.getElementById("tap-hint");

  // Agar rock element nahi hai toh script kuch nahi karegi
  if (!rock) return;

  rock.addEventListener("click", () => {
    // 1. Text hide karo
    if(hint) hint.style.opacity = "0";

    // 2. Container aur rock me "cracked" class add karo
    container.classList.add("cracked");
    rock.classList.add("cracked");

    // 3. Exact 2.2 seconds baad redirect kar do
    // (Jab white light screen ko almost cover kar chuki hogi)
    setTimeout(() => {
      window.location.href = "https://my-store-10ff99d.creator-spring.com/";
    }, 2200); 
  });
});
