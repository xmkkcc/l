// Mobile nav toggle + set year in footer
document.addEventListener('DOMContentLoaded', function(){
  // set year where present
  document.querySelectorAll('[id^="year"]').forEach(el => el.textContent = new Date().getFullYear());

  // toggles for different pages (each header uses a different id)
  ['navToggle','navToggle2','navToggle3','navToggle4'].forEach(id=>{
    const btn = document.getElementById(id);
    if(!btn) return;
    const nav = document.getElementById('main' + id.replace('navToggle','Nav'));
    btn.addEventListener('click', ()=>{
      if(nav) nav.classList.toggle('open');
    });
  });
});