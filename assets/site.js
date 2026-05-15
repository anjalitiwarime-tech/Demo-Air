const navbar=document.getElementById("navbar");
const menuBtn=document.getElementById("menuBtn");
const mobilePanel=document.getElementById("mobilePanel");

window.addEventListener("scroll",()=>{
  if(navbar) navbar.classList.toggle("scrolled",window.scrollY>24);
});

if(menuBtn&&mobilePanel){
  menuBtn.addEventListener("click",()=>mobilePanel.classList.toggle("open"));
  mobilePanel.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>mobilePanel.classList.remove("open")));
}

document.querySelectorAll(".trip-tabs button,.filter-tabs button").forEach(button=>{
  button.addEventListener("click",()=>{
    const group=button.parentElement;
    group.querySelectorAll("button").forEach(item=>item.classList.remove("active"));
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

document.querySelectorAll("[data-demo-form]").forEach(form=>{
  form.addEventListener("submit",event=>{
    event.preventDefault();
    const note=form.querySelector(".form-note");
    if(note){
      note.classList.add("show");
      note.scrollIntoView({behavior:"smooth",block:"nearest"});
    }
  });
});

document.querySelectorAll("[data-deal-filter]").forEach(button=>{
  button.addEventListener("click",()=>{
    const value=button.dataset.dealFilter;
    document.querySelectorAll("[data-deal-card]").forEach(card=>{
      const visible=value==="all"||card.dataset.dealCard===value;
      card.style.display=visible?"":"none";
    });
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
