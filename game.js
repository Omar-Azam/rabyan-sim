(()=>{
const K='rabyan_cr_sim_v1',KE=K+'_endings';
const $=s=>document.querySelector(s),app=$('#app'),md=$('#modal');
const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}};
const sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
let S=ld(K,null),seen=ld(KE,[]);
const DAYS=[8,9,10,11],SLOT=['Subah 🌅','Dopahar ☀️','Shaam 🌙'],cl=v=>Math.max(0,Math.min(100,v));
// scene: [emoji, speaker, text, [[choice, love, prep, cash, energy, reply],...]]
const SC=[
['📱','A1 Group Chat','Rabyan ne group mein likha: "Sir ne kal ka quiz announce kiya hai. Syllabus: bas sab kuch." Sab seen kar ke so gaye. {n}, tum kya karoge?',[['"Rabyan bhai, aap hi asli sir ho" likho',6,0,0,-5,'Rabyan ne 😂 react kiya. Sab ne tumhein chamcha declare kar diya. Worth it.'],['Poora syllabus ka screenshot maango',3,5,0,-8,'Rabyan: "Ye 14 baar bhej chuka hun." Par pyaar se dobara bhej diya.'],['Mute kar ke so jao',-4,-3,0,15,'Subah 87 unread messages. Rabyan ka last msg: "Phir mat kehna bataya nh."']]],
['🚌','University Point','Bus mein sirf ek seat khali hai, aur uske bilkul saath Rabyan baitha hai. Pura bus tumhein dekh raha hai.',[['Confidence se baith jao',5,0,0,-3,'Rabyan: "Bhai tum bhi isi route pe?" 20 minute dosti ka naya record.'],['Khade rehne ka natak karo',2,0,0,-10,'Pool jhatke se tum Rabyan ki gaod mein... bas bag mein. Bag mein! Awkward.'],['Kirya dene ke bahane baat shuru karo',4,0,-50,-2,'Rabyan ne kaha "Mera kirya tumhari chai se mehnga nh." Ajeeb compliment.']]],
['☕','Canteen','Canteen mein Rabyan akela chai pee raha hai aur lecture slides dekh raha hai. Table pe ek kursi khali hai.',[['Do chai le aao (Rs 150)',8,0,-150,0,'Rabyan: "Ye to propose jaisa lag raha hai 😂" Tum: "Nh nh, ye bas diplomacy hai."'],['Slides ke bare mein sawal poocho',4,8,0,-6,'Rabyan ne 10 minute samjhaya. Tumhein pehli baar Data Science samajh aayi. Almost.'],['Door se dekh kar chale jao',-3,0,0,5,'Rabyan ne tumhein dekha aur hath hila diya. Tum bhaag gaye. Legend.']]],
['📝','Class','Sir attendance le rahe hain. Tumhara dost bola: "Proxy laga de?" Rabyan ne tumhein dekh kar eyebrow uthayi.',[['Proxy mana karo, imandar bano',7,3,0,-2,'Rabyan ne chupke se thumbs-up diya. CR ka dil: +1.'],['Proxy laga do',-8,0,0,0,'Rabyan: "Attendance sheet pe mera naam hai bhai..." Trust issues unlocked.'],['Rabyan se maafi maang lo pehle hi',3,0,0,-3,'Rabyan hans diya: "Pehle gunaah to karo, phir maafi." Bhai philosopher nikla.']]],
['📚','Library','Mids ke liye library crowded hai. Sirf ek table bacha, uspe Rabyan aur uski notes ka dher.',[['Pass baith kar chupke se parho',3,10,0,-12,'Rabyan ne ek notebook sarka di bina bole. Silent respect.'],['"Notes share karoge?" seedha poocho',-2,8,0,-5,'Rabyan: "Sab ko deta hun, par tum ne pooch liya, isliye +1."'],['Selfie lo "Study Date" caption ke saath',2,-6,0,-3,'Ek hi like aaya, wo bhi Rabyan ka. Phir bhi khushi.']]],
['🍕','Roadside','Rabyan ne kaha: "Bhook lagi hai, kuch khate hain?" Tumhare wallet mein Rs 600 hain.',[['Pizza slice treat karo (Rs 400)',9,-2,-400,-2,'Rabyan: "Mere liye itna kuch? Bas tumhara naam yaad rakhunga." Wallet cry kar raha hai.'],['Samose bant lo (Rs 100)',5,0,-100,-2,'Samosa diplomacy successful. Chutney ne tumhari shirt ka tashreef rakha.'],['"Aaj mera roza hai" bahana',-5,0,0,0,'Rabyan: "Kal tum ne biryani khayi thi." Tum ne daftar mein file ki.']]],
['🎮','Hostel Gali','Rabyan ke group mein Valorant night hai. Mids sar par hain. Rabyan ne tumhein invite kiya.',[['Jao aur "bas ek game"',7,-12,0,-15,'Ek game 4 ghante ka nikla. Rabyan ne MVP diya tumhein. Mids ka dard baad mein.'],['Mana karo, parho',-2,10,0,-8,'Rabyan: "Respect. Mids ke baad pakka." Tum ne notes ko hug kiya.'],['Chai bana kar spectate karo',5,3,-50,-5,'Sab ne tumhein MVP of Chai declare kiya. Ye kya title hai?']]],
['🔌','Lab','Lab mein projector chal nahi raha. Rabyan sir ke saath baat karne gaya hai, tum yahan akele ho.',[['Cable theek karo',6,2,0,-8,'Cable ulti thi. Projector chal gaya. Rabyan: "Technician hamare section mein hi tha!"'],['Rabyan ke wapas aane ka intezar karo',3,0,0,5,'Rabyan: "Sab bol gaye the ke tum jiggs ho." Hmm, ye compliment tha?'],['Phone ki torch projector pe lagao',1,0,0,-2,'Nateeja: kuch nh. Par class ne tumhari effort note ki.']]],
['💬','Rabyan ka DM','Raat 1 baje Rabyan ne seen ke baad likha: "Kal ka assignment submit hua?" Tumhara assignment... abhi shuru bhi nh hua.',[['"Haan bhai ho gaya" (jhoot)',-6,0,0,-3,'Rabyan: "Pic bhejo." Tum: "Wifi chala gaya." Jhoot ki duniya mein tumhara swagat.'],['Sach batao aur madad maango',8,6,0,-10,'Rabyan ne 2 ghante tak call pe samjhaya. Subah ankhein laal, dil rich.'],['Seen kar ke phone band kar do',-5,0,0,10,'Kal sabko pata chala ke tumhara assignment CR ke paas nh pohancha.']]],
['🎤','Presentation','Sir ne kaha: "Koi volunteer? Rabyan ke saath pair banao." Class ne tumhein dekha. Tumne sab ko dekha.',[['Haath utha do',9,5,0,-8,'Rabyan ne dheere se kaha: "Bhai script mein ye nh likha." Par presentation mast gayi.'],['Rabyan ka naam le do',4,4,0,-3,'Rabyan: "Mere hi naam pe itne log kyun volunteer hote hain?" Fame hai ye.'],['Washroom ka bahana banao',-6,-2,0,2,'Wapas aaye to dekha slot ban chuka tha. Rabyan ne tumhara naam likh diya tha.']]],
['🚨','Notice Board','Notice: Mids date sheet aa gayi. Rabyan ne tumhein dekh kar kaha: "12 Oct se shuru, ready ho?"',[['"Bilkul ready!" (lie of the century)',2,-2,0,-5,'Rabyan ne tumhari aankhon mein dekha. "Tum rote hue bhi smile kar lete ho."'],['"Nahi yaar, tension hai"',6,3,0,-2,'Rabyan: "Chalo saath parhte hain." Pehli dafa tension kam hui.'],['Date sheet ka screenshot status pe lagao',3,0,0,-1,'Status pe 38 views. Rabyan ne bhi dekha. Sab ne dekha. Sab dar gaye.']]],
['🌧️','Gate','Baarish ho rahi hai, Rabyan ke paas chhatri hai, tumhare paas nh. Gate pe bus ka intezar.',[['Chhatri ke neeche aa jao',8,0,0,-2,'Do bande aadhi chhatri mein. Aadha-aadha bheeg kar bhi dil garam. Filmy!'],['Samosa hawale karke chhatri maango',5,0,-80,0,'Business deal: samosa for chhatri. Rabyan ne kaha "Neat."'],['Baarish mein bheeg kar "mausam acha hai" bolo',2,-4,0,-12,'Agle din tumhein zukaam. Rabyan ne chai ka paigham bheja.']]],
['📸','Group Photo','Sir ne class ki group photo ke liye sab ko ikattha kiya. Rabyan beech mein hai. Tumhari jagah... kone mein.',[['Rabyan ke saath wali jagah lo',6,0,0,-2,'Photo mein tum Rabyan ke kandhe tak aate ho. Pyaar hi pyaar.'],['Peeche se head peeping karo',2,0,0,-2,'Tumhari sirf aankhein nazar aayin. Viral meme ban gaya.'],['Photo ke baad hi bhaag jao',-3,0,0,3,'Rabyan: "Sab ne saath khadi photo li, tum hi bhaag gaye." Oops.']]],
['😴','Hostel','Raat ke 3 baj gaye. Maths ka notes khula hai, aankh band ho rahi hai, aur Rabyan ka msg aaya: "Jaag rahe ho?"',[['Reply do: "Haan, tum bhi?"',6,3,0,-12,'Aadhi raat ko do log "Probability" pe online. Peshgi pyaar.'],['Seen kar ke so jao',-2,-2,0,18,'Subah ka alarm 7 baar baja. Rabyan ka msg: "Sab theek?" Aww.'],['Energy drink peeyo (Rs 200)',1,6,-200,10,'Ab dil tez chal raha hai, magar notes samajh aa gaye.']]],
];
const END={
perfect:['💖','Chai + Notes Ending','Rabyan ne kaha: "Mids ke baad chai meri taraf se." Tumhara dil aur paper dono clear. Poora A1 jashan mana raha hai. Ye ending sach mein legendary hai!'],
dil:['🫠','Dil Jeeta, Paper Haara','Rabyan ke saath chai to bohot hui, par paper mein "Sir, mein ye parha tha" likhna parha. CGPA ro raha hai, dil khush hai.'],
topper:['🏆','Topper, Par Tanha','Tumne mids mein dhoom macha di. Rabyan ne bas ek line kahi: "Mubarak ho, ab mere notes wapas karo." Pyaar? Wo agle semester.'],
fail:['📉','Notes Wale Ban Gaye','Mids mein itni deri se parhna shuru kiya ke Rabyan ne tumhein bhi "Backbencher Group" mein add kar diya. Re-take ready ho jao.'],
cash:['🤑','Samosa Tycoon','Tum ne itna paisa bacha liya ke A1 ki canteen ke malik ban gaye. Rabyan kehta hai "Chai tumhari taraf se rakho." Dil nh jeeta, par business jeeta.'],
friend:['🤝','Bas Dost Ending','Rabyan ne tumhein "Sab se acha dost" ka certificate diya. Dil thora toota, par group chat mein pehle se zyada active ho. Bhai hi sahi.'],
ghost:['👻','Seen Zone Ending','Rabyan ne tumhara msg seen kiya, aur "Typing..." ke baad kuch nh aaya. Mids ke baad dobara try karna. Wapas aao!']};
const E=(k)=>(seen.includes(k)||seen.push(k),sv(KE,seen),k);
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a}
const days=()=>{const d=Math.ceil((new Date(2026,9,12)-new Date().setHours(0,0,0,0))/864e5);return d>1?`Mids mein ${d} din baqi ⏳`:d===1?'Mids kal se! 😱':d===0?'Aaj mids hain! 🫡':'Mids chal rahe hain 📝'};
const nm=s=>s.replace(/{n}/g,S?S.n:'Dost');
const bar=(l,v,c)=>`<div><div class="row"><span>${l}</span><span>${v}</span></div><div class="bar"><i style="width:${v}%;background:${c}"></i></div></div>`;
const hud=()=>`<div class="hud">${bar('❤️ Impress',S.l,'var(--pink)')}${bar('📚 Prep',S.p,'var(--mint)')}${bar('⚡ Energy',S.e,'var(--amber)')}<div class="row"><span>💰 Rs ${S.m}</span><span>${DAYS[S.i/3|0]} Oct · ${SLOT[S.i%3]}</span></div></div>`;
function title(){S=ld(K,null);const c=S&&S.i<12;
app.innerHTML=`<div class="cd d">${days()}</div><h1>CR Ka <b>Dil</b> Jeeto 💘</h1><p class="sub">DUET · BS Data Science · Section A1 · Batch 2026<br>Rabyan (hamara CR) ko impress karo, mids se pehle. Mazaq hi mazaq, sab fictional hai.</p><div class="spacer"></div>
${c?`<button class="btn go" data-a="cont">▶ Jari rakho (${DAYS[S.i/3|0]} Oct)</button>`:''}<button class="btn ${c?'sm':'go'}" data-a="new">${c?'Naya game':'Game shuru karo'}</button>
<p class="small">Endings unlock hui: ${seen.length}/${Object.keys(END).length}</p><button class="link" data-a="about">Kisne banaya?</button>`}
function ask(){app.innerHTML=`<h2 class="d">Tumhara naam kya hai?</h2><p class="sub">Rabyan ko tumhara naam yaad rakhna hoga, warna dosti khatam.</p><input id="nm" maxlength="14" placeholder="Apna naam likho" autocomplete="off"><button class="btn go" data-a="start">Chalo A1 mein</button><button class="link" data-a="home">Wapas</button>`;$('#nm').focus()}
function start(){const n=($('#nm').value.trim()||'Dost');S={n,l:20,p:20,m:600,e:80,i:0,o:shuffle([...SC.keys()]).slice(0,12),r:null};sv(K,S);scene()}
function scene(){if(S.i>=12)return final();const s=SC[S.o[S.i]];
app.innerHTML=`${hud()}<div class="card"><div class="big">${s[0]}</div><div class="who">${s[1]}</div><p class="txt">${nm(s[2])}</p></div><div class="opts">${s[3].map((c,j)=>`<button class="btn" data-a="pick" data-j="${j}">${nm(c[0])}</button>`).join('')}</div>`}
function pick(j){const s=SC[S.o[S.i]],c=s[3][j];const [,l,p,m,e,r]=c;let t=r;
S.l=cl(S.l+l);S.p=cl(S.p+p);S.m=Math.max(0,S.m+m);S.e=cl(S.e+e);
if(S.m<=0&&m<0)t+=' (Wallet khali hai bhai!)';
if(S.e<=0){S.e=30;S.p=cl(S.p-5);t+=' 😵 Neend ne hamla kar diya: prep -5, energy +30.'}
S.i++;sv(K,S);
const ch=[['❤️',l],['📚',p],['💰',m],['⚡',e]].filter(x=>x[1]).map(x=>`<span class="chip ${x[1]>0?'up':'dn'}">${x[0]} ${x[1]>0?'+':''}${x[1]}</span>`).join('');
app.innerHTML=`${hud()}<div class="card"><div class="big">${s[0]}</div><p class="txt">${nm(t)}</p><div class="chips">${ch}</div></div><button class="btn go" data-a="next">${S.i>=12?'Mids ka din aa gaya 😱':'Aage chalo'}</button>`}
function final(){let k;
if(S.p<30)k='fail';else if(S.l>=75&&S.p>=50)k='perfect';else if(S.l>=75)k='dil';else if(S.p>=70&&S.l<45)k='topper';else if(S.m>=1400&&S.l<60)k='cash';else if(S.l<25)k='ghost';else k='friend';
E(k);const [em,t,d]=END[k];S.i=99;sv(K,S);
const sh=`Mene "CR Ka Dil Jeeto" mein "${t}" ending li! Impress ${S.l}, Prep ${S.p}. Tum bhi khelo.`;
app.innerHTML=`<div class="cd d">12 Oct · Mids ka din 📝</div><div class="card"><div class="big">${em}</div><h2 class="d" style="text-align:center">${t}</h2><p class="txt">${nm(d)}</p><div class="chips"><span class="chip">❤️ ${S.l}</span><span class="chip">📚 ${S.p}</span><span class="chip">💰 Rs ${S.m}</span><span class="chip">⚡ ${S.e}</span></div></div><p class="small">Endings: ${seen.length}/${Object.keys(END).length} unlock</p><button class="btn go" data-a="share" data-t="${sh.replace(/"/g,'&quot;')}">Share karo</button><button class="btn sm" data-a="new">Dobara khelo</button><button class="link" data-a="home">Home</button>`}
function about(){md.hidden=false;md.innerHTML=`<div class="card"><div class="big">🕵️</div><h2 class="d">Kisne banaya?</h2><p class="txt">Pata nh kisne banaya hai par Omar ne to nh banaya 👀</p><button class="btn go sm" data-a="close">Theek hai 😏</button></div>`}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;
if(a==='new')ask();else if(a==='start')start();else if(a==='cont')scene();else if(a==='next')scene();else if(a==='pick')pick(+b.dataset.j);else if(a==='home')title();else if(a==='about')about();else if(a==='close')md.hidden=true;
else if(a==='share'){const t=b.dataset.t;navigator.share?navigator.share({text:t}).catch(()=>{}):navigator.clipboard&&navigator.clipboard.writeText(t).then(()=>{b.textContent='Copy ho gaya ✅'})}});
md.addEventListener('click',e=>{if(e.target===md)md.hidden=true});
document.addEventListener('keydown',e=>{if(e.key==='Escape')md.hidden=true;if(e.key==='Enter'&&$('#nm'))start()});
title();
})();
