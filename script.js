
const services=[
 {id:'classic',name:'Classic Cut',desc:'Precision fade + wash',price:8000,icon:'fa-scissors'},
 {id:'elite',name:'Elite Signature',desc:'Cut + Beard + Hot towel',price:15000,icon:'fa-crown'},
 {id:'beard',name:'Beard Sculpt',desc:'Beard trim & oil',price:5000,icon:'fa-user-tie'},
 {id:'kids',name:'Young Elite',desc:'Kids under 12',price:6000,icon:'fa-child'},
 {id:'color',name:'Dye & Tint',desc:'Gray blending',price:10000,icon:'fa-palette'},
 {id:'royal',name:'Royal Treatment',desc:'Full package + facial',price:25000,icon:'fa-star'}
];
const barbers=[
 {id:'tunde',name:'Tunde "Fade King"',spec:'Skin Fades & Afro Curls',rating:'4.9',exp:'8 yrs',booked:'1240 cuts',badge:'MOST BOOKED',img:'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600'},
 {id:'chidi',name:'Chidi Cuts',spec:'Beard & Line-ups Specialist',rating:'5.0',exp:'6 yrs',booked:'980 cuts',badge:'BEARD KING',img:'https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?q=80&w=600'},
 {id:'kemi',name:'Kemi The Artist',spec:'Dye, Kids & Creative Cuts',rating:'4.9',exp:'5 yrs',booked:'750 cuts',badge:'COLOR EXPERT',img:'https://images.unsplash.com/photo-1621786030484-4c855eed6974?q=80&w=600'},
 {id:'femi',name:'Femi Blades',spec:'Classic Cuts & Hot Towel Shaves',rating:'4.8',exp:'10 yrs',booked:'2100 cuts',badge:'LEGEND',img:'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600'},
 {id:'emeka',name:'Emeka Sharp',spec:'Royal Treatment & Facials',rating:'5.0',exp:'7 yrs',booked:'890 cuts',badge:'ROYAL PRO',img:'https://images.unsplash.com/photo-1621786030484-4c855eed6974?q=80&w=600'},
 {id:'jay',name:'Jay The Sculptor',spec:'Beard Sculpt & Line Art',rating:'4.9',exp:'4 yrs',booked:'620 cuts',badge:'TRENDSETTER',img:'https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?q=80&w=600'}
];
const times=["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];
let selectedService=services[1], selectedBarber=barbers[0], selectedDate="", selectedTime="";
function render(){
 document.getElementById('servicesGrid').innerHTML=services.map(s=>`<div class="service-card" onclick="pickService('${s.id}')"><i class="fa ${s.icon}"></i><h3>${s.name}</h3><p>${s.desc}</p><div class="price">₦${s.price.toLocaleString()}</div></div>`).join('');
 document.getElementById('barbersGrid').innerHTML=barbers.map(b=>`<div class="barber-card" onclick="pickBarber('${b.id}');document.getElementById('booking').scrollIntoView({behavior:'smooth'})"><span class="badge-elite">${b.badge}</span><img src="${b.img}"><div class="barber-info"><small>${b.spec} • ${b.exp}</small><h3>${b.name}</h3><div class="barber-meta"><span>⭐ ${b.rating} • ${b.booked}</span><span style="color:var(--gold)">Book →</span></div></div></div>`).join('');
 document.getElementById('serviceChips').innerHTML=services.map(s=>`<div class="chip ${selectedService.id===s.id?'selected':''}" onclick="pickService('${s.id}')">${s.name} • ₦${s.price.toLocaleString()}</div>`).join('');
 document.getElementById('barberChips').innerHTML=barbers.map(b=>`<div class="chip ${selectedBarber.id===b.id?'selected':''}" onclick="pickBarber('${b.id}')">${b.name}</div>`).join('');
 document.getElementById('timeGrid').innerHTML=times.map(t=>`<div class="chip ${selectedTime===t?'selected':''}" onclick="pickTime('${t}')">${t}</div>`).join('');
 updateSummary(); const today=new Date().toISOString().split('T')[0]; document.getElementById('dateInput').min=today;
}
function pickService(id){selectedService=services.find(s=>s.id===id);render()}
function pickBarber(id){selectedBarber=barbers.find(b=>b.id===id);render()}
function pickTime(t){selectedTime=t; selectedDate=document.getElementById('dateInput').value; render()}
function updateSummary(){
 document.getElementById('sumService').textContent=selectedService?selectedService.name:'—';
 document.getElementById('sumBarber').textContent=selectedBarber?selectedBarber.name:'—';
 document.getElementById('sumDate').textContent=selectedDate||'—';
 document.getElementById('sumTime').textContent=selectedTime||'—';
 document.getElementById('sumTotal').textContent=selectedService?'₦'+selectedService.price.toLocaleString():'₦0';
}
function nextStep(n){
 if(n===3){ selectedDate=document.getElementById('dateInput').value; if(!selectedDate||!selectedTime){alert('Select date & time');return} }
 document.querySelectorAll('.form-step').forEach(el=>el.classList.remove('active')); document.getElementById('step'+n).classList.add('active');
 document.querySelectorAll('.stepper div').forEach((d,i)=>d.className=i<n?'on':''); updateSummary();
}
document.getElementById('dateInput').addEventListener('change',e=>{selectedDate=e.target.value;updateSummary()});
function confirmBooking(){
 const name=document.getElementById('custName').value.trim(); const phone=document.getElementById('custPhone').value.trim(); const notes=document.getElementById('custNotes').value.trim();
 if(!name||!phone){alert('Enter name & WhatsApp');return}
 const shopNumber="2348000000000";
 const msg=`*LAGOS ELITE BARBERS - NEW BOOKING*%0A%0A👤 Name: ${name}%0A📱 Phone: ${phone}%0A💈 Service: ${selectedService.name} (₦${selectedService.price})%0A✂️ Barber: ${selectedBarber.name}%0A📅 Date: ${selectedDate}%0A⏰ Time: ${selectedTime}%0A📝 Notes: ${notes||'None'}`;
 window.open(`https://wa.me/${shopNumber}?text=${msg}`,'_blank');
}
render();
