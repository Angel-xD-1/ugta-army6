
// script.js
document.addEventListener("DOMContentLoaded", function() {
  const faders = document.querySelectorAll('.fade-in');

  const options = {
    threshold: 0.2
  };

  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});

// DOM elements
const openBtn = document.getElementById('openUnit');
const panel = document.getElementById('unitPanel');
const closeBtn = document.getElementById('closePanel');
const unitCards = document.querySelectorAll('.unit-card');
const unitDetails = document.getElementById('unitDetails');
const mobileToggle = document.getElementById('mobileToggle');
const mainNav = document.querySelector('.main-nav');

// Data for units
const UNITS = {
  alpha: {
    title: 'ALPHA — Штурмовий підрозділ',
    desc: 'Елітна група для швидких штурмових операцій і рейдів.',
    leader: 'Капітан «Яструб»',
    tasks: ['Штурмові операції','Тактична розвідка','Зв\'язок та евакуація']
  },
  bravo: {
    title: 'BRAVO — Розвідка',
    desc: 'Збір інформації, спостереження, контр-розвідка.',
    leader: 'Старшина «Тінь»',
    tasks: ['Розвідка','Супровід колон','Аналітика']
  },
  charlie: {
    title: 'CHARLIE — Інженерний',
    desc: 'Інженерно-технічна підтримка, укріплення, ремонт.',
    leader: 'Майстер «Коваль»',
    tasks: ['Будівництво укріплень','Ремонт техніки','Підтримка логістики']
  }
};

// open / close panel
if (openBtn) openBtn.addEventListener('click', ()=> openPanel());
if (closeBtn) closeBtn.addEventListener('click', ()=> closePanel());
if (mobileToggle) mobileToggle.addEventListener('click', ()=> {
  mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
});

// allow click on background to close
panel?.addEventListener('click', (e)=>{
  if (e.target === panel) closePanel();
});
window.addEventListener('keydown', (e)=> { if (e.key === 'Escape') closePanel(); });

function openPanel(){
  panel.classList.add('open');
  panel.setAttribute('aria-hidden','false');
  // reset details
  unitDetails.innerHTML = `<h3>Оберіть підрозділ</h3><p class="muted">Тут відобразиться повний склад і завдання.</p>`;
}

function closePanel(){
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden','true');
}

// click unit -> show details
unitCards.forEach(card=>{
  card.addEventListener('click', ()=>{
    const id = card.dataset.id;
    showUnit(id);
  });
});

function showUnit(id){
  const u = UNITS[id];
  if(!u) return;
  unitDetails.innerHTML = `
    <h3>${u.title}</h3>
    <p class="muted">${u.desc}</p>
    <p><strong>Командир:</strong> ${u.leader}</p>
    <h4>Завдання:</h4>
    <ul>${u.tasks.map(t=>`<li>${t}</li>`).join('')}</ul>
  `;
  // smooth focus for keyboard users
  unitDetails.scrollIntoView({behavior:'smooth', block:'center'});
}
// FAQ toggle
document.querySelectorAll('.faq-item').forEach(item=>{
  const btn = item.querySelector('.faq-q');
  btn.addEventListener('click', ()=>{
    item.classList.toggle('open');
  });
});

