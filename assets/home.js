const navbar=document.getElementById("navbar");
const heroMedia=document.getElementById("heroMedia");
const menuBtn=document.getElementById("menuBtn");
const mobilePanel=document.getElementById("mobilePanel");

const getAssetBase=()=>{
  const path=window.location.pathname;
  const repoName="Demo-Air";
  if(window.location.hostname.endsWith("github.io") && path.toLowerCase().includes(`/${repoName.toLowerCase()}`)){
    return `/${repoName}/assets/`;
  }
  return new URL("./assets/",window.location.href).href;
};

const assetBase=getAssetBase();
document.documentElement.style.setProperty("--hero-bg",`url("${assetBase}airr.png")`);
document.querySelectorAll("img[src*='assets/']").forEach(img=>{
  const fileName=img.getAttribute("src").split("/").pop();
  img.src=`${assetBase}${fileName}`;
});

window.addEventListener("scroll",()=>{
  const y=window.scrollY;
  navbar.classList.toggle("scrolled",y>24);
  if(heroMedia) heroMedia.style.setProperty("--parallax",`${Math.min(y*.12,70)}px`);
});

menuBtn.addEventListener("click",()=>mobilePanel.classList.toggle("open"));
mobilePanel.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>mobilePanel.classList.remove("open")));

document.querySelectorAll(".trip-tabs button").forEach(button=>{
  button.addEventListener("click",()=>{
    document.querySelectorAll(".trip-tabs button").forEach(item=>item.classList.remove("active"));
    button.classList.add("active");
  });
});

document.querySelectorAll(".faq-question").forEach(button=>{
  button.addEventListener("click",()=>{
    const item=button.closest(".faq-item");
    const wasOpen=item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach(row=>row.classList.remove("open"));
    if(!wasOpen) item.classList.add("open");
  });
});

const revealItems=document.querySelectorAll(".reveal");
if("IntersectionObserver" in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.14});
  revealItems.forEach(item=>observer.observe(item));
}else{
  revealItems.forEach(item=>item.classList.add("visible"));
}
