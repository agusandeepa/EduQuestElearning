// Lesson Animated Player - Embedded HTML Animations for History Lessons

interface LessonAnimatedPlayerProps {
  animatedId: string;
  title: string;
}

const PREHISTORIC_HTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{box-sizing:border-box;margin:0;padding:0;}body{background:#0a1628;font-family:sans-serif;overflow:hidden;}
.scene{position:relative;width:100%;height:420px;overflow:hidden;}
.sky{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,#1a2a4a 0%,#0a1628 60%);transition:background 2s ease;}
.star{position:absolute;width:2px;height:2px;background:white;border-radius:50%;animation:twinkle 3s infinite;}
@keyframes twinkle{0%,100%{opacity:.3}50%{opacity:1}}
.mountain{position:absolute;bottom:110px;}
.ground{position:absolute;bottom:0;left:0;right:0;height:110px;background:linear-gradient(to bottom,#2d4a1e,#1a2d10);}
.grass{position:absolute;top:0;left:0;right:0;height:8px;background:#3d6b28;border-radius:4px 4px 0 0;}
.cave{position:absolute;bottom:110px;right:70px;}
.fire{position:absolute;bottom:118px;left:50%;transform:translateX(-50%);}
.flame{width:16px;height:24px;background:#ff6b35;border-radius:50% 50% 20% 20%;position:absolute;bottom:0;animation:flicker .4s ease-in-out infinite alternate;transform-origin:bottom center;}
.flame2{width:10px;height:18px;background:#ffd700;left:3px;animation:flicker2 .3s ease-in-out infinite alternate;}
@keyframes flicker{from{transform:scaleX(1) scaleY(1)}to{transform:scaleX(.8) scaleY(1.1) rotate(3deg)}}
@keyframes flicker2{from{transform:scaleX(1) scaleY(1)}to{transform:scaleX(1.2) scaleY(.9) rotate(-3deg)}}
.human{position:absolute;bottom:110px;animation:walk 4s ease-in-out infinite;}
@keyframes walk{0%{transform:translateX(0)}30%{transform:translateX(30px)}50%{transform:translateX(30px)}80%{transform:translateX(0)}100%{transform:translateX(0)}}
.spear{animation:spearMove 4s ease-in-out infinite;}
@keyframes spearMove{0%,100%{transform:rotate(-20deg)}30%,80%{transform:rotate(10deg)}}
.tree{position:absolute;bottom:108px;animation:sway 4s ease-in-out infinite;transform-origin:bottom center;}
@keyframes sway{0%,100%{transform:rotate(-1deg)}50%{transform:rotate(1deg)}}
.panel{position:absolute;top:0;left:0;right:0;padding:10px 14px;background:rgba(10,22,40,.88);border-bottom:1px solid rgba(255,200,100,.15);display:flex;align-items:center;gap:8px;}
.badge{padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.7}}
.ptitle{font-size:13px;font-weight:500;color:#e8e0d0;}
.pbar{position:absolute;top:40px;left:0;right:0;height:2px;background:rgba(255,255,255,.08);}
.pfill{height:100%;background:#ffc864;transition:width .12s linear;}
.info{position:absolute;bottom:0;left:0;right:0;padding:10px 14px 12px;background:linear-gradient(to top,rgba(4,8,20,.97) 70%,rgba(4,8,20,0));}
.ititle{font-size:13px;font-weight:600;color:#ffd080;margin-bottom:3px;}
.itext{font-size:11px;color:#b0a898;line-height:1.6;}
.pottery{position:absolute;bottom:118px;left:115px;opacity:0;transition:opacity .8s;}
.farm{position:absolute;bottom:116px;left:55px;opacity:0;transition:opacity .8s;}
.animal{position:absolute;bottom:113px;animation:anWalk 6s ease-in-out infinite;opacity:0;transition:opacity .8s;}
@keyframes anWalk{0%,100%{transform:translateX(0) scaleX(1)}40%{transform:translateX(-40px) scaleX(1)}41%{transform:translateX(-40px) scaleX(-1)}80%{transform:translateX(0) scaleX(-1)}81%{transform:translateX(0) scaleX(1)}}
</style></head><body>
<div class="scene" id="sc">
<div class="sky" id="sky">
<div class="star" style="top:10%;left:15%;animation-delay:.2s"></div>
<div class="star" style="top:8%;left:35%;animation-delay:.7s"></div>
<div class="star" style="top:15%;left:60%;animation-delay:1.1s"></div>
<div class="star" style="top:6%;left:80%;animation-delay:.4s"></div>
<div class="star" style="top:18%;left:90%;animation-delay:1.5s"></div>
<div class="star" style="top:12%;left:50%;animation-delay:.9s"></div>
</div>
<div class="mountain" style="left:0"><svg width="190" height="150" viewBox="0 0 190 150"><polygon points="0,150 95,18 190,150" fill="#1e2d1e" opacity=".9"/><polygon points="55,150 125,58 190,150" fill="#243024" opacity=".8"/></svg></div>
<div class="mountain" style="right:0"><svg width="170" height="130" viewBox="0 0 170 130"><polygon points="0,130 85,14 170,130" fill="#1a2818" opacity=".85"/></svg></div>
<div class="ground"><div class="grass"></div></div>
<div class="cave" id="caveObj"><svg width="110" height="90" viewBox="0 0 110 90"><ellipse cx="55" cy="90" rx="50" ry="45" fill="#1a1008"/><ellipse cx="55" cy="90" rx="36" ry="34" fill="#0d0804"/><text x="55" y="28" text-anchor="middle" font-size="9" fill="#887060">Fa-Hien Cave</text></svg></div>
<div class="tree" style="left:45px"><svg width="34" height="70" viewBox="0 0 34 70"><rect x="13" y="44" width="6" height="26" fill="#3d2010"/><circle cx="16" cy="30" r="18" fill="#1e4010"/><circle cx="6" cy="40" r="12" fill="#2a5018"/><circle cx="26" cy="40" r="12" fill="#2a5018"/></svg></div>
<div class="tree" style="left:240px;animation-delay:1.2s"><svg width="28" height="55" viewBox="0 0 28 55"><rect x="11" y="36" width="5" height="19" fill="#3d2010"/><circle cx="13" cy="24" r="15" fill="#1e4010"/></svg></div>
<div class="tree" style="right:15px;animation-delay:.8s"><svg width="34" height="70" viewBox="0 0 34 70"><rect x="13" y="44" width="6" height="26" fill="#3d2010"/><circle cx="16" cy="30" r="18" fill="#254a18"/><circle cx="26" cy="40" r="12" fill="#1e4010"/></svg></div>
<div class="human" style="left:170px"><svg width="38" height="64"><circle cx="19" cy="9" r="7" fill="#c8a070"/><rect x="12" y="16" width="13" height="20" rx="3" fill="#6b4020"/><line x1="12" y1="19" x2="4" y2="35" stroke="#c8a070" stroke-width="2.5"/><line x1="25" y1="19" x2="33" y2="35" stroke="#c8a070" stroke-width="2.5"/><line x1="17" y1="36" x2="13" y2="54" stroke="#c8a070" stroke-width="2.5"/><line x1="21" y1="36" x2="25" y2="54" stroke="#c8a070" stroke-width="2.5"/><g class="spear" style="transform-origin:33px 35px"><line x1="33" y1="8" x2="33" y2="50" stroke="#8b6030" stroke-width="2.5"/><polygon points="33,6 30,14 36,14" fill="#a0a0a0"/></g></svg></div>
<div class="fire"><svg width="28" height="28"><ellipse cx="14" cy="26" rx="9" ry="3" fill="#5a3010" opacity=".5"/></svg><div class="flame flame2"></div><div class="flame"></div></div>
<div class="pottery" id="pottery"><svg width="55" height="58" viewBox="0 0 55 58"><ellipse cx="27" cy="50" rx="18" ry="5" fill="#3a2010" opacity=".4"/><path d="M16,48 Q9,30 16,14 Q20,7 27,7 Q34,7 38,14 Q46,30 38,48 Z" fill="#8b5030"/><ellipse cx="27" cy="9" rx="9" ry="3" fill="#7a4025"/><text x="27" y="-3" text-anchor="middle" font-size="9" fill="#a09070">Pottery</text></svg></div>
<div class="farm" id="farm"><svg width="110" height="36" viewBox="0 0 110 36"><line x1="0" y1="28" x2="110" y2="28" stroke="#4a6030" stroke-width="1"/><line x1="18" y1="28" x2="18" y2="8" stroke="#6a8040" stroke-width="2"/><ellipse cx="18" cy="6" rx="7" ry="4" fill="#5a9030"/><line x1="46" y1="28" x2="46" y2="10" stroke="#6a8040" stroke-width="2"/><ellipse cx="46" cy="8" rx="7" ry="4" fill="#5a9030"/><line x1="74" y1="28" x2="74" y2="12" stroke="#6a8040" stroke-width="2"/><ellipse cx="74" cy="10" rx="7" ry="4" fill="#5a9030"/><line x1="100" y1="28" x2="100" y2="8" stroke="#6a8040" stroke-width="2"/><ellipse cx="100" cy="6" rx="7" ry="4" fill="#5a9030"/></svg></div>
<div class="animal" id="animal" style="left:290px"><svg width="55" height="36" viewBox="0 0 55 36"><ellipse cx="27" cy="20" rx="18" ry="9" fill="#8b7050"/><circle cx="43" cy="14" r="7" fill="#8b7050"/><line x1="13" y1="27" x2="10" y2="36" stroke="#7a6040" stroke-width="2.5"/><line x1="22" y1="29" x2="20" y2="36" stroke="#7a6040" stroke-width="2.5"/><line x1="32" y1="29" x2="35" y2="36" stroke="#7a6040" stroke-width="2.5"/><line x1="41" y1="27" x2="44" y2="36" stroke="#7a6040" stroke-width="2.5"/><circle cx="47" cy="12" r="2" fill="#3a2010"/></svg></div>
<div class="panel">
<div class="badge" id="badge" style="background:#3a2010;color:#ffa060">Paleolithic</div>
<div class="ptitle" id="ptitle">500,000 – 37,000 BC</div>
</div>
<div class="pbar"><div class="pfill" id="pf" style="width:0%"></div></div>
<div class="info"><div class="ititle" id="ititle">Cave Dwellers of Early Sri Lanka</div><div class="itext" id="itext">Evidence found at Fa-Hien Cave (Bulathsinhala), Batadombalena (Kuruwita) and Bundala — earliest human habitation in Lanka.</div></div>
</div>
<script>
var stages=[
{badge:'Paleolithic',bc:'#3a2010',bc2:'#ffa060',title:'500,000 – 37,000 BC',sky:'radial-gradient(ellipse at 50% 0%,#1a2a4a 0%,#0a1628 60%)',cave:1,pottery:0,farm:0,animal:0,ititle:'Cave Dwellers of Early Sri Lanka',itext:'Evidence found at Fa-Hien Cave (Bulathsinhala), Batadombalena (Kuruwita) and Bundala — earliest human habitation in Lanka.'},
{badge:'Mesolithic',bc:'#10203a',bc2:'#60a0ff',title:'37,000 – 2,900 BC',sky:'radial-gradient(ellipse at 30% 20%,#1a3050 0%,#0a1a30 60%)',cave:0,pottery:0,farm:0,animal:1,ititle:'Balangoda Man — Skilled Hunters',itext:'Ancient humans discovered in the Balangoda area. Average height 5\'9", expert hunters and gatherers who mastered fire.'},
{badge:'Neolithic',bc:'#102010',bc2:'#60c060',title:'2,900 – 900 BC',sky:'radial-gradient(ellipse at 60% 0%,#0a2a15 0%,#050f08 60%)',cave:0,pottery:1,farm:1,animal:0,ititle:'Agriculture & Permanent Settlements',itext:'Introduction of farming, pottery making, animal domestication — at sites like Ibbankatuwa burial site and Pomparippu.'}
];
var cur=0,prog=0,timer=null;
function go(i){
cur=i;var s=stages[i];
document.getElementById('sky').style.background=s.sky;
document.getElementById('badge').textContent=s.badge;
document.getElementById('badge').style.background=s.bc;
document.getElementById('badge').style.color=s.bc2;
document.getElementById('ptitle').textContent=s.title;
document.getElementById('ititle').textContent=s.ititle;
document.getElementById('itext').textContent=s.itext;
document.getElementById('caveObj').style.display=s.cave?'block':'none';
document.getElementById('pottery').style.opacity=s.pottery?'1':'0';
document.getElementById('farm').style.opacity=s.farm?'1':'0';
document.getElementById('animal').style.opacity=s.animal?'1':'0';
reset();
}
function reset(){clearInterval(timer);prog=0;document.getElementById('pf').style.width='0%';timer=setInterval(function(){prog+=0.38;document.getElementById('pf').style.width=Math.min(prog,100)+'%';if(prog>=100){clearInterval(timer);setTimeout(function(){go((cur+1)%3);},400);}},110);}
go(0);
</script></body></html>`;

const VIJAYA_HTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{box-sizing:border-box;margin:0;padding:0;}body{background:#050c1c;font-family:sans-serif;overflow:hidden;}
.scene{position:relative;width:100%;height:420px;overflow:hidden;}
.sky{position:absolute;inset:0;transition:background 2s ease;}
.sun{position:absolute;border-radius:50%;transition:all 2s ease;}
.sea{position:absolute;bottom:0;left:0;right:0;height:170px;transition:opacity 1.5s;overflow:hidden;}
.wave{position:absolute;width:200%;height:16px;border-radius:50%;animation:wm 3s linear infinite;}
.w2{animation:wm 4.5s linear infinite reverse;top:26px;}
.w3{animation:wm 5.5s linear infinite;top:46px;}
@keyframes wm{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.land{position:absolute;bottom:0;left:0;right:0;height:120px;background:linear-gradient(to bottom,#2d5a1e,#1a3a10);transition:opacity 1.5s;}
.ltop{position:absolute;top:0;left:0;right:0;height:9px;background:#3d7a28;border-radius:4px 4px 0 0;}
.ship{position:absolute;bottom:148px;transition:left 4s ease-in-out,opacity 1.5s;}
.flag{animation:fw 1s ease-in-out infinite alternate;transform-origin:bottom left;}
@keyframes fw{from{transform:skewX(0)}to{transform:skewX(-14deg)}}
.tree{position:absolute;bottom:118px;animation:sw 4s ease-in-out infinite;transform-origin:bottom center;}
@keyframes sw{0%,100%{transform:rotate(-1deg)}50%{transform:rotate(1deg)}}
.ch{position:absolute;bottom:118px;transition:left 2s,opacity 1.5s;}
.palace{position:absolute;bottom:118px;right:45px;transition:opacity 2s;}
.panel{position:absolute;top:0;left:0;right:0;padding:10px 14px;background:rgba(5,12,28,.9);border-bottom:1px solid rgba(255,200,100,.15);display:flex;align-items:center;gap:8px;}
.badge{padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;}
.ptitle{font-size:13px;font-weight:500;color:#e8e0d0;}
.pbar{position:absolute;top:40px;left:0;right:0;height:2px;background:rgba(255,255,255,.07);}
.pfill{height:100%;background:#ffc864;transition:width .12s linear;}
.info{position:absolute;bottom:0;left:0;right:0;padding:10px 14px 13px;background:linear-gradient(to top,rgba(4,8,20,.97) 70%,rgba(4,8,20,0));}
.ititle{font-size:13px;font-weight:600;color:#ffd080;margin-bottom:3px;}
.itext{font-size:11px;color:#b0a898;line-height:1.6;}
.heart{position:absolute;animation:hu 1.8s ease-out forwards;pointer-events:none;}
@keyframes hu{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-55px)}}
</style></head><body>
<div class="scene" id="sc">
<div class="sky" id="sky"></div>
<div class="sun" id="sun"></div>
<div class="sea" id="sea"><div style="position:absolute;inset:0;background:linear-gradient(to bottom,#1a4a7a,#0a2a50)"></div><div class="wave" style="background:rgba(255,255,255,.06);top:8px"></div><div class="wave w2" style="background:rgba(255,255,255,.04)"></div><div class="wave w3" style="background:rgba(255,255,255,.03)"></div></div>
<div class="land" id="land" style="opacity:0"><div class="ltop"></div></div>
<div class="tree" style="left:22px"><svg width="34" height="72"><rect x="13" y="46" width="6" height="26" fill="#3d2010"/><circle cx="16" cy="31" r="19" fill="#1e4010"/><circle cx="6" cy="42" r="13" fill="#2a5818"/><circle cx="27" cy="42" r="13" fill="#254a14"/></svg></div>
<div class="tree" style="left:230px;animation-delay:1.5s"><svg width="28" height="58"><rect x="11" y="37" width="5" height="21" fill="#3d2010"/><circle cx="13" cy="24" r="15" fill="#1e4010"/></svg></div>
<div class="tree" style="right:16px;animation-delay:.8s"><svg width="34" height="72"><rect x="13" y="46" width="6" height="26" fill="#3d2010"/><circle cx="16" cy="31" r="19" fill="#254a18"/><circle cx="27" cy="42" r="13" fill="#1e4010"/></svg></div>
<div class="ship" id="ship" style="left:-200px"><svg width="155" height="108"><polygon points="20,78 135,78 124,100 31,100" fill="#6b3a10"/><rect x="33" y="98" width="87" height="7" rx="2" fill="#8b4a18"/><line x1="77" y1="8" x2="77" y2="80" stroke="#5a3010" stroke-width="3"/><polygon points="77,8 77,53 122,31" fill="#d4a060" class="flag"/><polygon points="77,8 77,53 32,31" fill="#b08040" opacity=".7"/><line x1="20" y1="78" x2="0" y2="90" stroke="#4a2a08" stroke-width="2"/><line x1="135" y1="78" x2="155" y2="90" stroke="#4a2a08" stroke-width="2"/><circle cx="49" cy="68" r="5" fill="#c8a070" opacity=".85"/><circle cx="67" cy="66" r="5" fill="#c8a070" opacity=".85"/><circle cx="87" cy="68" r="5" fill="#c8a070" opacity=".85"/><circle cx="107" cy="66" r="5" fill="#c8a070" opacity=".85"/><text x="77" y="58" text-anchor="middle" font-size="9" fill="#ffd080">VIJAYA</text></svg></div>
<div class="ch" id="kuv" style="left:50px;opacity:0"><svg width="32" height="64"><circle cx="16" cy="9" r="7" fill="#b07850"/><path d="M9,16 Q3,40 5,58 L13,58 L16,34 L19,58 L27,58 Q29,40 23,16 Z" fill="#8b3060"/><line x1="9" y1="20" x2="1" y2="36" stroke="#b07850" stroke-width="2"/><line x1="23" y1="20" x2="31" y2="36" stroke="#b07850" stroke-width="2"/></svg></div>
<div class="ch" id="vij" style="left:100px;opacity:0"><svg width="40" height="68"><circle cx="20" cy="9" r="8" fill="#c8a070"/><path d="M12,17 Q6,42 8,62 L16,62 L20,38 L24,62 L32,62 Q34,42 28,17 Z" fill="#c08030"/><line x1="12" y1="22" x2="2" y2="40" stroke="#c8a070" stroke-width="2.5"/><line x1="28" y1="22" x2="38" y2="40" stroke="#c8a070" stroke-width="2.5"/><rect x="6" y="1" width="28" height="6" rx="3" fill="#c0a000"/></svg></div>
<div class="palace" id="pal" style="opacity:0"><svg width="155" height="100"><rect x="12" y="52" width="130" height="48" fill="#8b6030"/><polygon points="0,52 77,4 155,52" fill="#6b4020"/><rect x="62" y="66" width="30" height="34" fill="#5a3015"/><rect x="22" y="57" width="22" height="18" rx="2" fill="#c8a060" opacity=".55"/><rect x="110" y="57" width="22" height="18" rx="2" fill="#c8a060" opacity=".55"/><line x1="77" y1="4" x2="77" y2="-3" stroke="#6b4020" stroke-width="2"/><polygon points="77,-3 74,4 80,4" fill="#c0a000"/><text x="77" y="40" text-anchor="middle" font-size="9" fill="#ffd080">Tambapanni</text></svg></div>
<div class="panel"><div class="badge" id="badge"></div><div class="ptitle" id="ptitle"></div></div>
<div class="pbar"><div class="pfill" id="pf" style="width:0%"></div></div>
<div class="info"><div class="ititle" id="ititle"></div><div class="itext" id="itext"></div></div>
</div>
<script>
var stages=[
{badge:'⛵ Voyage',bc:'#0a1830',bc2:'#80c0ff',title:'543 BC — Sailing from Bengal',sky:'linear-gradient(to bottom,#050e22 0%,#0e2244 45%,#c87030 80%,#e89050 100%)',sunBg:'#ffcc80',sunT:'55px',sunR:'72px',sunS:'52px',sea:1,land:0,ship:'26%',shipOp:1,kv:0,vj:0,pal:0,hearts:0,ititle:'Prince Vijaya sets sail',itext:"Son of King Sinhabahu of Sinhapura (Bengal), Vijaya was banished with 700 followers — sailing toward the island of Lanka on an auspicious day."},
{badge:'🏝️ Landing',bc:'#0a2010',bc2:'#80e060',title:'Arrival at Mahiyangana',sky:'linear-gradient(to bottom,#081808 0%,#0e2e14 40%,#1a5020 80%,#2a6a30 100%)',sunBg:'#ffe880',sunT:'46px',sunR:'52px',sunS:'50px',sea:1,land:1,ship:'55%',shipOp:1,kv:1,vj:0,pal:0,hearts:0,ititle:'First step on Lankan soil',itext:"On the day of the Buddha's Parinirvana, Vijaya landed at Mahiyangana. Kuveni, the Yaksha princess and indigenous ruler, watched from the shore."},
{badge:'💍 Kuveni',bc:'#1e0828',bc2:'#e090d0',title:'Marriage — Alliance & Sacrifice',sky:'linear-gradient(to bottom,#120820 0%,#200e38 50%,#3a1a50 100%)',sunBg:'#c080ff',sunT:'36px',sunR:'92px',sunS:'46px',sea:0,land:1,ship:'120%',shipOp:0,kv:1,vj:1,pal:0,hearts:1,ititle:'Vijaya & Kuveni united',itext:"Vijaya married Kuveni who helped him defeat the Yakshas. Later, he sent her away and married a princess from the Madra Kingdom — a political union."},
{badge:'🏯 Kingdom',bc:'#201000',bc2:'#ffb840',title:'543–505 BC · 38 Year Reign',sky:'linear-gradient(to bottom,#120a00 0%,#2a1800 50%,#5a3800 100%)',sunBg:'#ffbb40',sunT:'42px',sunR:'46px',sunS:'56px',sea:0,land:1,ship:'120%',shipOp:0,kv:0,vj:1,pal:1,hearts:0,ititle:'Tambapanni — The first capital',itext:'King Vijaya established his capital at Tambapanni (now Mannar) — first king of the Sinhalese nation. Introduced Aryan culture, urbanization and agriculture.'}
];
var cur=0,prog=0,timer=null,ht=null;
function go(i){
cur=i;var s=stages[i];
document.getElementById('sky').style.background=s.sky;
var su=document.getElementById('sun');
su.style.background=s.sunBg;su.style.top=s.sunT;su.style.right=s.sunR;
su.style.width=su.style.height=s.sunS;su.style.boxShadow='0 0 35px '+s.sunBg;
document.getElementById('sea').style.opacity=s.sea;
document.getElementById('land').style.opacity=s.land;
var sh=document.getElementById('ship');sh.style.left=s.ship;sh.style.opacity=s.shipOp;
document.getElementById('kuv').style.opacity=s.kv;
document.getElementById('vij').style.opacity=s.vj;
document.getElementById('vij').style.left=s.pal?'130px':'100px';
document.getElementById('pal').style.opacity=s.pal;
document.getElementById('badge').textContent=s.badge;
document.getElementById('badge').style.background=s.bc;
document.getElementById('badge').style.color=s.bc2;
document.getElementById('ptitle').textContent=s.title;
document.getElementById('ititle').textContent=s.ititle;
document.getElementById('itext').textContent=s.itext;
clearInterval(ht);
if(s.hearts){ht=setInterval(function(){var h=document.createElement('div');h.className='heart';h.textContent='♥';h.style.cssText='left:'+(75+Math.random()*55)+'px;bottom:160px;color:'+(Math.random()>.5?'#ff80b0':'#ff60a0')+';font-size:16px;';document.getElementById('sc').appendChild(h);setTimeout(function(){h.remove();},1850);},550);}
reset();
}
function reset(){clearInterval(timer);prog=0;document.getElementById('pf').style.width='0%';timer=setInterval(function(){prog+=0.35;document.getElementById('pf').style.width=Math.min(prog,100)+'%';if(prog>=100){clearInterval(timer);setTimeout(function(){go((cur+1)%4);},400);}},120);}
setTimeout(function(){document.getElementById('ship').style.left='26%';},300);
go(0);
</script></body></html>`;

const PANDUKABHAYA_HTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{box-sizing:border-box;margin:0;padding:0;}body{background:#050c1c;font-family:sans-serif;overflow:hidden;}
.scene{position:relative;width:100%;height:420px;overflow:hidden;}
.sky{position:absolute;inset:0;transition:background 2.5s ease;}
.sun{position:absolute;border-radius:50%;transition:all 2s ease;}
.ground{position:absolute;bottom:0;left:0;right:0;height:120px;background:linear-gradient(to bottom,#2d5a1e,#1a3a10);}
.gtop{position:absolute;top:0;left:0;right:0;height:9px;background:#3d7a28;border-radius:4px 4px 0 0;}
.tree{position:absolute;bottom:118px;animation:sw 4s ease-in-out infinite;transform-origin:bottom center;}
@keyframes sw{0%,100%{transform:rotate(-1deg)}50%{transform:rotate(1deg)}}
.palace{position:absolute;bottom:118px;left:50%;transform:translateX(-50%);transition:opacity 2s;}
.tank{position:absolute;bottom:100px;right:30px;transition:opacity 2s;}
.temple{position:absolute;bottom:118px;left:20px;transition:opacity 2s;}
.king{position:absolute;bottom:118px;transition:left 2s,opacity 1.5s;}
.worker{position:absolute;bottom:118px;transition:opacity 1.5s;animation:wb 3s ease-in-out infinite;}
@keyframes wb{0%,100%{transform:translateX(0)}50%{transform:translateX(18px)}}
.drop{position:absolute;animation:df 1.6s ease-out forwards;pointer-events:none;}
@keyframes df{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(40px)}}
.panel{position:absolute;top:0;left:0;right:0;padding:10px 14px;background:rgba(5,12,28,.9);border-bottom:1px solid rgba(255,200,100,.15);display:flex;align-items:center;gap:8px;}
.badge{padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;}
.ptitle{font-size:13px;font-weight:500;color:#e8e0d0;}
.pbar{position:absolute;top:40px;left:0;right:0;height:2px;background:rgba(255,255,255,.07);}
.pfill{height:100%;background:#ffc864;transition:width .12s linear;}
.info{position:absolute;bottom:0;left:0;right:0;padding:10px 14px 13px;background:linear-gradient(to top,rgba(4,8,20,.97) 70%,rgba(4,8,20,0));}
.ititle{font-size:13px;font-weight:600;color:#ffd080;margin-bottom:3px;}
.itext{font-size:11px;color:#b0a898;line-height:1.6;}
</style></head><body>
<div class="scene" id="sc">
<div class="sky" id="sky"></div>
<div class="sun" id="sun"></div>
<div class="ground"><div class="gtop"></div></div>
<div class="tree" style="left:15px"><svg width="34" height="72"><rect x="13" y="46" width="6" height="26" fill="#3d2010"/><circle cx="16" cy="31" r="19" fill="#1e4010"/><circle cx="6" cy="42" r="13" fill="#2a5818"/><circle cx="27" cy="42" r="13" fill="#254a14"/></svg></div>
<div class="tree" style="right:18px;animation-delay:.8s"><svg width="30" height="64"><rect x="11" y="42" width="6" height="22" fill="#3d2010"/><circle cx="14" cy="28" r="17" fill="#254a18"/><circle cx="24" cy="38" r="11" fill="#1e4010"/></svg></div>
<div class="temple" id="temple" style="opacity:0"><svg width="80" height="85" viewBox="0 0 80 85"><rect x="5" y="55" width="70" height="30" fill="#7a5820"/><polygon points="0,55 40,10 80,55" fill="#5a4015"/><rect x="30" y="62" width="20" height="23" fill="#4a3010"/><rect x="8" y="58" width="15" height="12" rx="1" fill="#c8a060" opacity=".5"/><rect x="57" y="58" width="15" height="12" rx="1" fill="#c8a060" opacity=".5"/><line x1="40" y1="10" x2="40" y2="3" stroke="#5a4015" stroke-width="2"/><polygon points="40,2 37,10 43,10" fill="#d4a020"/><text x="40" y="47" text-anchor="middle" font-size="7" fill="#ffd080">Temple</text></svg></div>
<div class="palace" id="palace" style="opacity:0"><svg width="180" height="110" viewBox="0 0 180 110"><rect x="10" y="58" width="160" height="52" fill="#8b6030"/><polygon points="0,58 90,8 180,58" fill="#6b4820"/><rect x="70" y="72" width="40" height="38" fill="#5a3515"/><rect x="18" y="64" width="28" height="20" rx="2" fill="#c8a060" opacity=".55"/><rect x="134" y="64" width="28" height="20" rx="2" fill="#c8a060" opacity=".55"/><line x1="90" y1="8" x2="90" y2="0" stroke="#6b4820" stroke-width="2"/><polygon points="90,0 86,8 94,8" fill="#d4a020"/><text x="90" y="48" text-anchor="middle" font-size="9" fill="#ffd080">Anuradhapura</text></svg></div>
<div class="tank" id="tank" style="opacity:0"><svg width="110" height="70" viewBox="0 0 110 70"><ellipse cx="55" cy="52" rx="52" ry="18" fill="#1a4a7a" opacity=".9"/><ellipse cx="55" cy="50" rx="48" ry="14" fill="#2a6aaa"/><ellipse cx="55" cy="48" rx="44" ry="10" fill="#3a80c0" opacity=".7"/><rect x="3" y="30" width="104" height="22" fill="#1a4a7a"/><rect x="0" y="28" width="110" height="6" fill="#4a6030" rx="2"/><text x="55" y="22" text-anchor="middle" font-size="8" fill="#80c0ff">Abhaya Wewa</text><line x1="15" y1="34" x2="15" y2="50" stroke="rgba(255,255,255,.3)" stroke-width="1"/><line x1="95" y1="34" x2="95" y2="50" stroke="rgba(255,255,255,.3)" stroke-width="1"/></svg></div>
<div class="king" id="king" style="left:200px;opacity:0"><svg width="44" height="76"><circle cx="22" cy="10" r="9" fill="#c8a070"/><path d="M13,19 Q6,46 9,70 L18,70 L22,44 L26,70 L35,70 Q38,46 31,19 Z" fill="#b07020"/><line x1="13" y1="24" x2="2" y2="44" stroke="#c8a070" stroke-width="2.5"/><line x1="31" y1="24" x2="42" y2="44" stroke="#c8a070" stroke-width="2.5"/><rect x="7" y="1" width="30" height="8" rx="4" fill="#d4a000"/><line x1="37" y1="28" x2="50" y2="16" stroke="#8b6020" stroke-width="2"/><polygon points="50,14 46,20 52,22" fill="#c8a060"/></svg></div>
<div class="worker" id="worker" style="left:340px;opacity:0"><svg width="36" height="64"><circle cx="18" cy="8" r="7" fill="#b09070"/><rect x="11" y="15" width="13" height="20" rx="2" fill="#6b4020"/><line x1="11" y1="18" x2="3" y2="34" stroke="#b09070" stroke-width="2"/><line x1="24" y1="18" x2="32" y2="34" stroke="#b09070" stroke-width="2"/><line x1="15" y1="35" x2="12" y2="54" stroke="#b09070" stroke-width="2"/><line x1="20" y1="35" x2="23" y2="54" stroke="#b09070" stroke-width="2"/><rect x="0" y="30" width="10" height="6" rx="1" fill="#8b6030" opacity=".8"/></svg></div>
<div class="panel"><div class="badge" id="badge"></div><div class="ptitle" id="ptitle"></div></div>
<div class="pbar"><div class="pfill" id="pf" style="width:0%"></div></div>
<div class="info"><div class="ititle" id="ititle"></div><div class="itext" id="itext"></div></div>
</div>
<script>
var stages=[
{badge:'👑 Origins',bc:'#1a0a00',bc2:'#ffb060',title:'437 BC — Pandukabhaya rises',sky:'linear-gradient(to bottom,#120800 0%,#2a1400 50%,#5a3010 100%)',sunBg:'#ffaa40',sunT:'50px',sunR:'60px',sunS:'50px',palace:0,tank:0,temple:0,king:1,kingL:'48%',worker:0,ititle:'Son of King Panduvasudeva',itext:"Pandukabhaya, son of King Panduvasudeva and Queen Bhadrakacchanadevi, rose to power — destined to build the first great city of Sri Lanka."},
{badge:'🏛️ Capital',bc:'#0a1820',bc2:'#60c0ff',title:'437 BC — Anuradhapura founded',sky:'linear-gradient(to bottom,#081520 0%,#102a3a 45%,#1a4a30 80%,#2a6040 100%)',sunBg:'#ffe060',sunT:'44px',sunR:'55px',sunS:'54px',palace:1,tank:0,temple:0,king:1,kingL:'38%',worker:0,ititle:'Anuradhapura — first great city',itext:"In 437 BC, King Pandukabhaya established Anuradhapura as his capital in a fertile region between the Malwathu Oya and Kaddamba rivers."},
{badge:'💧 Irrigation',bc:'#0a1a10',bc2:'#60e090',title:'Irrigation & Urban Planning',sky:'linear-gradient(to bottom,#06120a 0%,#0e2818 45%,#1a4820 80%,#286038 100%)',sunBg:'#a0e080',sunT:'40px',sunR:'50px',sunS:'48px',palace:1,tank:1,temple:0,king:1,kingL:'40%',worker:1,ititle:'Abhaya Wewa & city planning',itext:"Pandukabhaya built Abhaya Wewa (Basawakkulama Tank), introduced urban planning, established 10 administrative divisions and strengthened the legal system."},
{badge:'🕌 Legacy',bc:'#1a1000',bc2:'#ffd060',title:'Economic & Religious Reforms',sky:'linear-gradient(to bottom,#100c00 0%,#201800 50%,#4a3800 100%)',sunBg:'#ffcc40',sunT:'38px',sunR:'48px',sunS:'58px',palace:1,tank:1,temple:1,king:1,kingL:'42%',worker:0,ititle:'Agriculture, Trade & Temples',itext:"He developed rice cultivation, established trade routes, introduced taxation and supported construction of temples — starting a continuous royal dynasty."}
];
var cur=0,prog=0,timer=null,dt=null;
function go(i){
cur=i;var s=stages[i];
document.getElementById('sky').style.background=s.sky;
var su=document.getElementById('sun');
su.style.background=s.sunBg;su.style.top=s.sunT;su.style.right=s.sunR;
su.style.width=su.style.height=s.sunS;su.style.boxShadow='0 0 40px '+s.sunBg;
document.getElementById('palace').style.opacity=s.palace;
document.getElementById('tank').style.opacity=s.tank;
document.getElementById('temple').style.opacity=s.temple;
var k=document.getElementById('king');k.style.opacity=s.king;k.style.left=s.kingL;
document.getElementById('worker').style.opacity=s.worker;
document.getElementById('badge').textContent=s.badge;
document.getElementById('badge').style.background=s.bc;
document.getElementById('badge').style.color=s.bc2;
document.getElementById('ptitle').textContent=s.title;
document.getElementById('ititle').textContent=s.ititle;
document.getElementById('itext').textContent=s.itext;
clearInterval(dt);
if(s.tank&&s.worker){dt=setInterval(function(){var d=document.createElement('div');d.className='drop';d.textContent='💧';d.style.cssText='left:'+(300+Math.random()*60)+'px;bottom:180px;font-size:12px;';document.getElementById('sc').appendChild(d);setTimeout(function(){d.remove();},1600);},700);}
reset();
}
function reset(){clearInterval(timer);prog=0;document.getElementById('pf').style.width='0%';timer=setInterval(function(){prog+=0.35;document.getElementById('pf').style.width=Math.min(prog,100)+'%';if(prog>=100){clearInterval(timer);setTimeout(function(){go((cur+1)%4);},400);}},120);}
go(0);
</script></body></html>`;

const ANCIENT_WORLD_HTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{box-sizing:border-box;margin:0;padding:0;}body{background:#050c1c;font-family:sans-serif;overflow:hidden;}
.scene{position:relative;width:100%;height:420px;overflow:hidden;}
.sky{position:absolute;inset:0;transition:background 2.5s ease;}
.sun{position:absolute;border-radius:50%;transition:all 2s ease;}
.ground{position:absolute;bottom:0;left:0;right:0;height:115px;transition:background 2s ease;}
.gtop{position:absolute;top:0;left:0;right:0;height:8px;border-radius:4px 4px 0 0;transition:background 2s ease;}
.river{position:absolute;bottom:0;left:0;right:0;height:44px;transition:opacity 1.5s,background 2s;overflow:hidden;}
.rwave{position:absolute;top:0;left:-100%;width:300%;height:100%;animation:rw 5s linear infinite;}
@keyframes rw{from{transform:translateX(0)}to{transform:translateX(33.33%)}
}
.pyramid{position:absolute;bottom:113px;transition:opacity 2s;}
.ziggurat{position:absolute;bottom:113px;transition:opacity 2s;}
.indus-city{position:absolute;bottom:113px;transition:opacity 2s;}
.great-wall{position:absolute;bottom:113px;transition:opacity 2s;}
.figure{position:absolute;bottom:113px;transition:left 2s,opacity 1.5s;}
.scribe{position:absolute;bottom:113px;transition:opacity 1.5s;}
.camel{position:absolute;bottom:110px;transition:opacity 1.5s;animation:cw 6s ease-in-out infinite;}
@keyframes cw{0%,100%{transform:translateX(0) scaleX(1)}40%{transform:translateX(50px) scaleX(1)}41%{transform:translateX(50px) scaleX(-1)}80%{transform:translateX(0) scaleX(-1)}81%{transform:translateX(0) scaleX(1)}}
.panel{position:absolute;top:0;left:0;right:0;padding:10px 14px;background:rgba(5,12,28,.9);border-bottom:1px solid rgba(255,200,100,.15);display:flex;align-items:center;gap:8px;}
.badge{padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;}
.ptitle{font-size:13px;font-weight:500;color:#e8e0d0;}
.pbar{position:absolute;top:40px;left:0;right:0;height:2px;background:rgba(255,255,255,.07);}
.pfill{height:100%;background:#ffc864;transition:width .12s linear;}
.info{position:absolute;bottom:0;left:0;right:0;padding:10px 14px 13px;background:linear-gradient(to top,rgba(4,8,20,.97) 70%,rgba(4,8,20,0));}
.ititle{font-size:13px;font-weight:600;color:#ffd080;margin-bottom:3px;}
.itext{font-size:11px;color:#b0a898;line-height:1.6;}
.star{position:absolute;width:2px;height:2px;background:white;border-radius:50%;animation:tw 3s infinite;}
@keyframes tw{0%,100%{opacity:.3}50%{opacity:1}}
</style></head><body>
<div class="scene" id="sc">
<div class="sky" id="sky">
<div class="star" style="top:8%;left:15%;animation-delay:.2s"></div>
<div class="star" style="top:12%;left:40%;animation-delay:.8s"></div>
<div class="star" style="top:6%;left:70%;animation-delay:1.3s"></div>
<div class="star" style="top:16%;left:85%;animation-delay:.5s"></div>
</div>
<div class="sun" id="sun"></div>
<div class="ground" id="ground"><div class="gtop" id="gtop"></div></div>
<div class="river" id="river"><svg class="rwave" viewBox="0 0 900 44" preserveAspectRatio="none"><path d="M0,22 Q75,8 150,22 Q225,36 300,22 Q375,8 450,22 Q525,36 600,22 Q675,8 750,22 Q825,36 900,22 L900,44 L0,44 Z" fill="rgba(40,120,200,.55)"/><path d="M0,28 Q75,16 150,28 Q225,40 300,28 Q375,16 450,28 Q525,40 600,28 Q675,16 750,28 Q825,40 900,28 L900,44 L0,44 Z" fill="rgba(30,100,180,.4)"/></svg></div>
<div class="ziggurat" id="ziggurat" style="opacity:0;left:60px"><svg width="160" height="100" viewBox="0 0 160 100"><rect x="0" y="75" width="160" height="25" fill="#8b6030"/><rect x="18" y="55" width="124" height="22" fill="#9b7040"/><rect x="36" y="38" width="88" height="19" fill="#ab8050"/><rect x="54" y="24" width="52" height="16" fill="#bb9060"/><rect x="68" y="12" width="24" height="14" fill="#cb9a6a"/><rect x="74" y="4" width="12" height="10" fill="#db9a50"/><text x="80" y="96" text-anchor="middle" font-size="8" fill="#ffd080">Ziggurat of Ur</text></svg></div>
<div class="pyramid" id="pyramid" style="opacity:0;right:40px"><svg width="160" height="100" viewBox="0 0 160 100"><polygon points="80,2 0,100 160,100" fill="#c8a850"/><polygon points="80,2 80,100 160,100" fill="#b09040"/><rect x="55" y="72" width="28" height="28" fill="#5a3a10"/><line x1="69" y1="2" x2="69" y2="2" stroke="none"/><text x="80" y="96" text-anchor="middle" font-size="8" fill="#3a2010">Great Pyramid</text></svg></div>
<div class="indus-city" id="indus" style="opacity:0;left:30px"><svg width="190" height="100" viewBox="0 0 190 100"><rect x="0" y="55" width="190" height="45" fill="#b0906a"/><rect x="8" y="35" width="44" height="40" fill="#c0a070"/><rect x="16" y="22" width="28" height="16" fill="#c8a870"/><rect x="60" y="42" width="36" height="36" fill="#b89060"/><rect x="68" y="30" width="20" height="14" fill="#c0a868"/><rect x="106" y="38" width="40" height="42" fill="#c0a070"/><rect x="112" y="25" width="28" height="15" fill="#c8a870"/><rect x="156" y="50" width="30" height="30" fill="#b09068"/><line x1="0" y1="68" x2="190" y2="68" stroke="#8a7050" stroke-width="3"/><line x1="52" y1="55" x2="52" y2="100" stroke="#8a7050" stroke-width="2"/><line x1="100" y1="55" x2="100" y2="100" stroke="#8a7050" stroke-width="2"/><line x1="150" y1="55" x2="150" y2="100" stroke="#8a7050" stroke-width="2"/><text x="95" y="14" text-anchor="middle" font-size="8" fill="#ffd080">Mohenjo-daro</text></svg></div>
<div class="great-wall" id="wall" style="opacity:0;left:0;right:0"><svg width="100%" height="90" viewBox="0 0 700 90"><rect x="0" y="40" width="700" height="50" fill="#9a8060"/><rect x="0" y="35" width="700" height="10" fill="#b09070"/><rect x="30" y="18" width="30" height="24" fill="#a08060"/><rect x="110" y="18" width="30" height="24" fill="#a08060"/><rect x="190" y="18" width="30" height="24" fill="#a08060"/><rect x="270" y="18" width="30" height="24" fill="#a08060"/><rect x="350" y="18" width="30" height="24" fill="#a08060"/><rect x="430" y="18" width="30" height="24" fill="#a08060"/><rect x="510" y="18" width="30" height="24" fill="#a08060"/><rect x="590" y="18" width="30" height="24" fill="#a08060"/><rect x="670" y="18" width="30" height="24" fill="#a08060"/><text x="350" y="12" text-anchor="middle" font-size="9" fill="#ffd080">Great Wall of China</text></svg></div>
<div class="figure" id="fig" style="left:200px;opacity:0"><svg width="40" height="72"><circle cx="20" cy="9" r="8" fill="#c8a070"/><path d="M12,17 Q5,44 8,68 L16,68 L20,42 L24,68 L32,68 Q35,44 28,17 Z" fill="#8b6030"/><line x1="12" y1="22" x2="2" y2="42" stroke="#c8a070" stroke-width="2.5"/><line x1="28" y1="22" x2="38" y2="42" stroke="#c8a070" stroke-width="2.5"/><rect x="5" y="1" width="30" height="7" rx="3" fill="#d4a000"/></svg></div>
<div class="scribe" id="scribe" style="opacity:0;left:130px"><svg width="38" height="68"><circle cx="19" cy="8" r="7" fill="#b09060"/><rect x="12" y="15" width="13" height="20" rx="2" fill="#6b4a20"/><line x1="12" y1="18" x2="3" y2="36" stroke="#b09060" stroke-width="2"/><line x1="25" y1="18" x2="34" y2="36" stroke="#b09060" stroke-width="2"/><line x1="15" y1="35" x2="13" y2="55" stroke="#b09060" stroke-width="2"/><line x1="22" y1="35" x2="24" y2="55" stroke="#b09060" stroke-width="2"/><rect x="28" y="28" width="14" height="10" rx="1" fill="#d4c090" opacity=".9"/><line x1="28" y1="31" x2="42" y2="31" stroke="#8b6030" stroke-width="1"/><line x1="28" y1="34" x2="42" y2="34" stroke="#8b6030" stroke-width="1"/></svg></div>
<div class="camel" id="camel" style="opacity:0;left:280px"><svg width="64" height="48" viewBox="0 0 64 48"><ellipse cx="28" cy="28" rx="20" ry="10" fill="#c8a060"/><ellipse cx="48" cy="22" rx="10" ry="8" fill="#c8a060"/><ellipse cx="24" cy="18" rx="6" ry="8" fill="#b89050"/><circle cx="54" cy="16" r="6" fill="#c8a060"/><line x1="12" y1="36" x2="10" y2="48" stroke="#b09050" stroke-width="3"/><line x1="20" y1="38" x2="18" y2="48" stroke="#b09050" stroke-width="3"/><line x1="36" y1="38" x2="38" y2="48" stroke="#b09050" stroke-width="3"/><line x1="44" y1="36" x2="46" y2="48" stroke="#b09050" stroke-width="3"/><circle cx="57" cy="13" r="2" fill="#3a2010"/><line x1="60" y1="14" x2="64" y2="18" stroke="#b09050" stroke-width="1.5"/></svg></div>
<div class="panel"><div class="badge" id="badge"></div><div class="ptitle" id="ptitle"></div></div>
<div class="pbar"><div class="pfill" id="pf" style="width:0%"></div></div>
<div class="info"><div class="ititle" id="ititle"></div><div class="itext" id="itext"></div></div>
</div>
<script>
var stages=[
{badge:'🏺 Mesopotamia',bc:'#1a0800',bc2:'#ffb060',title:'3500–539 BC — Tigris & Euphrates',sky:'linear-gradient(to bottom,#120800 0%,#2a1400 50%,#5a3010 100%)',sun:'#ffaa40',st:'38px',sr:'55px',ss:'52px',ground:'linear-gradient(to bottom,#6b4a20,#3a2810)',gtop:'#8b6030',river:'rgba(60,140,200,.7)',rivshow:1,zig:1,pyr:0,indus:0,wall:0,fig:1,figl:'44%',scribe:1,camel:0,ititle:'Cradle of Civilization — Mesopotamia',itext:'Between the Tigris and Euphrates rivers (modern Iraq), Sumerians built the first cities: Ur, Uruk, Babylon. They invented Cuneiform writing and Hammurabi created one of the earliest written legal codes.'},
{badge:'🔺 Egypt',bc:'#1a1200',bc2:'#ffd060',title:'3100–30 BC — Nile Valley',sky:'linear-gradient(to bottom,#100c00 0%,#201800 50%,#503800 100%)',sun:'#ffcc40',st:'34px',sr:'48px',ss:'58px',ground:'linear-gradient(to bottom,#c8a850,#8b7030)',gtop:'#d4b060',river:'rgba(30,100,180,.8)',rivshow:1,zig:0,pyr:1,indus:0,wall:0,fig:1,figl:'42%',scribe:1,camel:1,ititle:'Pharaohs & the Great Pyramids',itext:'Along the Nile, Pharaohs ruled as god-kings. Hieroglyphics were their writing system. The Great Pyramids of Giza were royal tombs. Key pharaohs: Ramesses II, Tutankhamun, Cleopatra VII.'},
{badge:'🌊 Indus Valley',bc:'#0a1008',bc2:'#60e090',title:'2600–1900 BC — South Asia',sky:'linear-gradient(to bottom,#060e04 0%,#102010 50%,#1a3a18 100%)',sun:'#80d060',st:'40px',sr:'52px',ss:'50px',ground:'linear-gradient(to bottom,#5a7040,#3a5028)',gtop:'#6a8848',river:'rgba(40,150,100,.7)',rivshow:1,zig:0,pyr:0,indus:1,wall:0,fig:1,figl:'46%',scribe:0,camel:0,ititle:'Planned Cities of Mohenjo-daro',itext:'In present-day Pakistan, the Indus Valley Civilization built advanced planned cities with drainage systems. Trade with Mesopotamia is confirmed. Cities: Mohenjo-daro, Harappa. Script still undeciphered.'},
{badge:'🐉 China',bc:'#0a0a18',bc2:'#80a0ff',title:'2100 BC onwards — Yellow River',sky:'linear-gradient(to bottom,#080818 0%,#101830 50%,#1a2848 100%)',sun:'#a0c0ff',st:'36px',sr:'50px',ss:'54px',ground:'linear-gradient(to bottom,#3a5830,#243820)',gtop:'#4a7038',river:'rgba(60,100,200,.6)',rivshow:0,zig:0,pyr:0,indus:0,wall:1,fig:1,figl:'40%',scribe:1,camel:1,ititle:'Ancient China — Inventions & Dynasties',itext:'Along the Yellow and Yangtze rivers, the Shang Dynasty arose. China gave the world paper, printing, gunpowder and the compass. The Great Wall protected against northern invaders. The Silk Road connected East to West.'}
];
var cur=0,prog=0,timer=null;
function go(i){
cur=i;var s=stages[i];
document.getElementById("sky").style.background=s.sky;
var su=document.getElementById("sun");
su.style.background=s.sun;su.style.top=s.st;su.style.right=s.sr;su.style.width=su.style.height=s.ss;su.style.boxShadow="0 0 50px "+s.sun;
document.getElementById("ground").style.background=s.ground;
document.getElementById("gtop").style.background=s.gtop;
var rv=document.getElementById("river");rv.style.opacity=s.rivshow?1:0;rv.style.background=s.river;
document.getElementById("ziggurat").style.opacity=s.zig;
document.getElementById("pyramid").style.opacity=s.pyr;
document.getElementById("indus").style.opacity=s.indus;
document.getElementById("wall").style.opacity=s.wall;
var f=document.getElementById("fig");f.style.opacity=s.fig;f.style.left=s.figl;
document.getElementById("scribe").style.opacity=s.scribe;
document.getElementById("camel").style.opacity=s.camel;
document.getElementById("badge").textContent=s.badge;
document.getElementById("badge").style.background=s.bc;
document.getElementById("badge").style.color=s.bc2;
document.getElementById("ptitle").textContent=s.title;
document.getElementById("ititle").textContent=s.ititle;
document.getElementById("itext").textContent=s.itext;
reset();
}
function reset(){clearInterval(timer);prog=0;document.getElementById("pf").style.width="0%";timer=setInterval(function(){prog+=0.33;document.getElementById("pf").style.width=Math.min(prog,100)+"%";if(prog>=100){clearInterval(timer);setTimeout(function(){go((cur+1)%4);},400);}},125);}
go(0);
</script></body></html>`;

const GREEK_ROMAN_HTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{box-sizing:border-box;margin:0;padding:0;}body{background:#050c1c;font-family:sans-serif;overflow:hidden;}
.scene{position:relative;width:100%;height:420px;overflow:hidden;}
.sky{position:absolute;inset:0;transition:background 2.5s ease;}
.sun{position:absolute;border-radius:50%;transition:all 2s ease;}
.ground{position:absolute;bottom:0;left:0;right:0;height:115px;transition:background 2s ease;}
.gtop{position:absolute;top:0;left:0;right:0;height:8px;border-radius:4px 4px 0 0;transition:background 2s ease;}
.sea{position:absolute;bottom:0;left:0;right:0;height:50px;transition:opacity 1.5s;overflow:hidden;}
.swave{position:absolute;top:0;left:-100%;width:300%;height:100%;animation:sw 6s linear infinite;}
@keyframes sw{from{transform:translateX(0)}to{transform:translateX(33.33%)}}
.parthenon{position:absolute;bottom:113px;transition:opacity 2s;}
.colosseum{position:absolute;bottom:113px;transition:opacity 2s;}
.alexander{position:absolute;bottom:113px;transition:left 2s,opacity 1.5s;}
.senate{position:absolute;bottom:113px;transition:opacity 2s;}
.soldier{position:absolute;bottom:113px;transition:opacity 1.5s;animation:march 2s ease-in-out infinite;}
@keyframes march{0%,100%{transform:translateX(0)}50%{transform:translateX(12px)}}
.philosopher{position:absolute;bottom:113px;transition:opacity 1.5s;}
.chariot{position:absolute;bottom:110px;transition:opacity 1.5s;animation:ch 5s ease-in-out infinite;}
@keyframes ch{0%,100%{transform:translateX(0) scaleX(1)}40%{transform:translateX(60px) scaleX(1)}41%{transform:translateX(60px) scaleX(-1)}80%{transform:translateX(0) scaleX(-1)}81%{transform:translateX(0) scaleX(1)}}
.star{position:absolute;width:2px;height:2px;background:white;border-radius:50%;animation:tw 3s infinite;}
@keyframes tw{0%,100%{opacity:.3}50%{opacity:1}}
.flame{position:absolute;animation:fl .5s ease-in-out infinite alternate;}
@keyframes fl{from{transform:scaleY(1)}to{transform:scaleY(1.15) skewX(3deg)}}
.panel{position:absolute;top:0;left:0;right:0;padding:10px 14px;background:rgba(5,12,28,.9);border-bottom:1px solid rgba(255,200,100,.15);display:flex;align-items:center;gap:8px;}
.badge{padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;}
.ptitle{font-size:13px;font-weight:500;color:#e8e0d0;}
.pbar{position:absolute;top:40px;left:0;right:0;height:2px;background:rgba(255,255,255,.07);}
.pfill{height:100%;background:#ffc864;transition:width .12s linear;}
.info{position:absolute;bottom:0;left:0;right:0;padding:10px 14px 13px;background:linear-gradient(to top,rgba(4,8,20,.97) 70%,rgba(4,8,20,0));}
.ititle{font-size:13px;font-weight:600;color:#ffd080;margin-bottom:3px;}
.itext{font-size:11px;color:#b0a898;line-height:1.6;}
</style></head><body>
<div class="scene" id="sc">
<div class="sky" id="sky">
<div class="star" style="top:8%;left:12%;animation-delay:.3s"></div>
<div class="star" style="top:14%;left:38%;animation-delay:.9s"></div>
<div class="star" style="top:7%;left:65%;animation-delay:1.4s"></div>
<div class="star" style="top:18%;left:88%;animation-delay:.6s"></div>
</div>
<div class="sun" id="sun"></div>
<div class="ground" id="ground"><div class="gtop" id="gtop"></div></div>
<div class="sea" id="sea"><svg class="swave" viewBox="0 0 900 50" preserveAspectRatio="none"><path d="M0,25 Q75,10 150,25 Q225,40 300,25 Q375,10 450,25 Q525,40 600,25 Q675,10 750,25 Q825,40 900,25 L900,50 L0,50 Z" fill="rgba(30,80,180,.6)"/><path d="M0,32 Q75,20 150,32 Q225,44 300,32 Q375,20 450,32 Q525,44 600,32 Q675,20 750,32 Q825,44 900,32 L900,50 L0,50 Z" fill="rgba(20,60,160,.45)"/></svg></div>
<div class="parthenon" id="parthenon" style="opacity:0;left:50%;transform:translateX(-50%)"><svg width="220" height="110" viewBox="0 0 220 110"><rect x="0" y="95" width="220" height="15" fill="#c8c0a0"/><rect x="10" y="88" width="200" height="10" fill="#d8d0b0"/><rect x="20" y="30" width="180" height="60" fill="#d0c8a8"/><polygon points="0,30 110,2 220,30" fill="#c0b898"/><rect x="28" y="38" width="14" height="52" rx="3" fill="#b8b090"/><rect x="52" y="38" width="14" height="52" rx="3" fill="#b8b090"/><rect x="76" y="38" width="14" height="52" rx="3" fill="#b8b090"/><rect x="100" y="38" width="14" height="52" rx="3" fill="#b8b090"/><rect x="124" y="38" width="14" height="52" rx="3" fill="#b8b090"/><rect x="148" y="38" width="14" height="52" rx="3" fill="#b8b090"/><rect x="172" y="38" width="14" height="52" rx="3" fill="#b8b090"/><rect x="55" y="54" width="110" height="36" fill="#c8c0a0"/><text x="110" y="20" text-anchor="middle" font-size="8" fill="#ffd080">Parthenon — Athens</text></svg></div>
<div class="colosseum" id="colosseum" style="opacity:0;left:50%;transform:translateX(-50%)"><svg width="240" height="110" viewBox="0 0 240 110"><ellipse cx="120" cy="80" rx="118" ry="42" fill="#9a7a50"/><ellipse cx="120" cy="78" rx="110" ry="36" fill="#b09060"/><ellipse cx="120" cy="76" rx="88" ry="26" fill="#6a4a28" opacity=".9"/><ellipse cx="120" cy="74" rx="72" ry="18" fill="#3a2810"/><rect x="2" y="42" width="236" height="40" fill="#9a7a50"/><rect x="10" y="30" width="220" height="16" fill="#a88a60"/><rect x="18" y="18" width="204" height="16" fill="#b09068"/><rect x="24" y="30" width="8" height="12" rx="1" fill="#5a3a18" opacity=".7"/><rect x="42" y="30" width="8" height="12" rx="1" fill="#5a3a18" opacity=".7"/><rect x="60" y="30" width="8" height="12" rx="1" fill="#5a3a18" opacity=".7"/><rect x="78" y="30" width="8" height="12" rx="1" fill="#5a3a18" opacity=".7"/><rect x="96" y="30" width="8" height="12" rx="1" fill="#5a3a18" opacity=".7"/><rect x="114" y="30" width="8" height="12" rx="1" fill="#5a3a18" opacity=".7"/><rect x="132" y="30" width="8" height="12" rx="1" fill="#5a3a18" opacity=".7"/><rect x="150" y="30" width="8" height="12" rx="1" fill="#5a3a18" opacity=".7"/><rect x="168" y="30" width="8" height="12" rx="1" fill="#5a3a18" opacity=".7"/><rect x="186" y="30" width="8" height="12" rx="1" fill="#5a3a18" opacity=".7"/><rect x="204" y="30" width="8" height="12" rx="1" fill="#5a3a18" opacity=".7"/><text x="120" y="14" text-anchor="middle" font-size="8" fill="#ffd080">Colosseum — Rome</text></svg></div>
<div class="senate" id="senate" style="opacity:0;left:30px"><svg width="150" height="95" viewBox="0 0 150 95"><rect x="0" y="68" width="150" height="27" fill="#b09068"/><rect x="8" y="48" width="134" height="24" fill="#c0a070"/><polygon points="0,48 75,10 150,48" fill="#a89060"/><rect x="40" y="56" width="12" height="40" rx="2" fill="#907850"/><rect x="62" y="56" width="12" height="40" rx="2" fill="#907850"/><rect x="84" y="56" width="12" height="40" rx="2" fill="#907850"/><rect x="106" y="56" width="12" height="40" rx="2" fill="#907850"/><text x="75" y="36" text-anchor="middle" font-size="7" fill="#ffd080">Roman Senate</text></svg></div>
<div class="philosopher" id="phil" style="opacity:0;left:60px"><svg width="42" height="74"><circle cx="21" cy="10" r="9" fill="#d0b888"/><path d="M12,19 Q5,48 8,72 L18,72 L21,46 L24,72 L34,72 Q37,48 30,19 Z" fill="#9a7848"/><line x1="12" y1="24" x2="1" y2="46" stroke="#d0b888" stroke-width="2.5"/><line x1="30" y1="24" x2="41" y2="46" stroke="#d0b888" stroke-width="2.5"/><circle cx="21" cy="8" r="4" fill="#9a7848"/><line x1="26" y1="40" x2="36" y2="28" stroke="#8b7040" stroke-width="2"/><circle cx="37" cy="27" r="3" fill="#d0c090"/></svg></div>
<div class="alexander" id="alex" style="left:200px;opacity:0"><svg width="46" height="78"><circle cx="23" cy="10" r="9" fill="#c8a070"/><path d="M14,19 Q6,48 9,74 L19,74 L23,46 L27,74 L37,74 Q40,48 32,19 Z" fill="#8b2020"/><line x1="14" y1="24" x2="2" y2="46" stroke="#c8a070" stroke-width="2.5"/><line x1="32" y1="24" x2="44" y2="46" stroke="#c8a070" stroke-width="2.5"/><rect x="6" y="2" width="34" height="8" rx="4" fill="#c8a000"/><polygon points="23,0 17,6 29,6" fill="#ffd040"/><line x1="38" y1="28" x2="52" y2="14" stroke="#8b6020" stroke-width="2.5"/><polygon points="52,12 47,18 54,20" fill="#c8a060"/></svg></div>
<div class="soldier" id="soldier" style="opacity:0;left:320px"><svg width="38" height="70"><circle cx="19" cy="9" r="8" fill="#c8a070"/><rect x="12" y="17" width="13" height="22" rx="2" fill="#6a3010"/><rect x="8" y="14" width="22" height="8" rx="1" fill="#a08030"/><line x1="12" y1="21" x2="2" y2="40" stroke="#c8a070" stroke-width="2.5"/><line x1="25" y1="21" x2="36" y2="40" stroke="#c8a070" stroke-width="2.5"/><line x1="15" y1="39" x2="13" y2="58" stroke="#c8a070" stroke-width="2.5"/><line x1="22" y1="39" x2="24" y2="58" stroke="#c8a070" stroke-width="2.5"/><rect x="0" y="32" width="12" height="18" rx="2" fill="#8b3010" opacity=".85"/><line x1="36" y1="18" x2="36" y2="58" stroke="#6b5020" stroke-width="2"/><polygon points="36,16 33,24 39,24" fill="#c0c0c0"/></svg></div>
<div class="chariot" id="chariot" style="opacity:0;left:80px"><svg width="90" height="56" viewBox="0 0 90 56"><ellipse cx="20" cy="46" rx="14" ry="14" fill="none" stroke="#8b6020" stroke-width="3"/><line x1="20" y1="32" x2="20" y2="46" stroke="#8b6020" stroke-width="2"/><line x1="8" y1="40" x2="32" y2="52" stroke="#8b6020" stroke-width="2"/><line x1="8" y1="52" x2="32" y2="40" stroke="#8b6020" stroke-width="2"/><ellipse cx="70" cy="46" rx="14" ry="14" fill="none" stroke="#8b6020" stroke-width="3"/><line x1="70" y1="32" x2="70" y2="46" stroke="#8b6020" stroke-width="2"/><line x1="58" y1="40" x2="82" y2="52" stroke="#8b6020" stroke-width="2"/><line x1="58" y1="52" x2="82" y2="40" stroke="#8b6020" stroke-width="2"/><path d="M20,32 Q45,10 70,32" stroke="#8b6020" stroke-width="2" fill="none"/><rect x="30" y="22" width="30" height="16" rx="3" fill="#a07030"/><circle cx="52" cy="18" r="5" fill="#c8a070"/></svg></div>
<div class="panel"><div class="badge" id="badge"></div><div class="ptitle" id="ptitle"></div></div>
<div class="pbar"><div class="pfill" id="pf" style="width:0%"></div></div>
<div class="info"><div class="ititle" id="ititle"></div><div class="itext" id="itext"></div></div>
</div>
<script>
var stages=[
{badge:'🏛️ Athens',bc:'#0a1020',bc2:'#80c0ff',title:'800–146 BC — Greek City-States',sky:'linear-gradient(to bottom,#0a1428 0%,#142040 50%,#1a3060 100%)',sun:'#ffe0a0',st:'38px',sr:'52px',ss:'52px',ground:'linear-gradient(to bottom,#8a9a60,#5a6a40)',gtop:'#9aaa70',sea:1,part:1,colo:0,senate:0,phil:1,alex:0,soldier:0,chariot:0,ititle:'Athens — Birthplace of Democracy',itext:'Athens and Sparta were the greatest Greek city-states. Under Cleisthenes (508 BC), Athens became the birthplace of democracy. Great philosophers: Socrates, Plato, Aristotle. Olympic Games began in 776 BC.'},
{badge:'⚔️ Alexander',bc:'#1a0808',bc2:'#ff9060',title:'356–323 BC — Alexander the Great',sky:'linear-gradient(to bottom,#180808 0%,#301210 50%,#502018 100%)',sun:'#ff8040',st:'36px',sr:'48px',ss:'56px',ground:'linear-gradient(to bottom,#8a6840,#5a4828)',gtop:'#9a7850',sea:0,part:1,colo:0,senate:0,phil:0,alex:1,soldier:1,chariot:1,ititle:'Alexander Conquers the World',itext:'Alexander the Great conquered Persia, Egypt and reached India. He spread Greek (Hellenistic) culture across Asia and founded Alexandria in Egypt. One of history\'s greatest military leaders.'},
{badge:'🏟️ Rome',bc:'#100a00',bc2:'#ffd060',title:'753 BC – 476 AD — Roman Empire',sky:'linear-gradient(to bottom,#100800 0%,#201400 50%,#3a2800 100%)',sun:'#ffcc40',st:'34px',sr:'46px',ss:'58px',ground:'linear-gradient(to bottom,#7a6840,#4a4028)',gtop:'#8a7850',sea:0,part:0,colo:1,senate:1,phil:0,alex:0,soldier:1,chariot:0,ititle:'Roman Republic & Empire',itext:'Rome grew from a republic (Senate) to an empire under Augustus Caesar. Pax Romana gave 200 years of peace. Romans built roads, aqueducts and the Colosseum. Christianity spread under Roman rule.'},
{badge:'🌍 Legacy',bc:'#0a1808',bc2:'#80ff80',title:'Legacy of Greece & Rome',sky:'linear-gradient(to bottom,#081006 0%,#101e0c 50%,#1a3018 100%)',sun:'#a0e080',st:'40px',sr:'54px',ss:'50px',ground:'linear-gradient(to bottom,#506040,#303828)',gtop:'#607050',sea:1,part:1,colo:1,senate:1,phil:1,alex:0,soldier:0,chariot:0,ititle:'Lasting Influence on the World',itext:'Democracy and republic concepts came from Greece and Rome. Latin shaped European languages. Roman law is the basis for many modern legal systems. Greek philosophy and architecture remain influential today.'}
];
var cur=0,prog=0,timer=null;
function go(i){
cur=i;var s=stages[i];
document.getElementById("sky").style.background=s.sky;
var su=document.getElementById("sun");
su.style.background=s.sun;su.style.top=s.st;su.style.right=s.sr;su.style.width=su.style.height=s.ss;su.style.boxShadow="0 0 50px "+s.sun;
document.getElementById("ground").style.background=s.ground;
document.getElementById("gtop").style.background=s.gtop;
document.getElementById("sea").style.opacity=s.sea?1:0;
document.getElementById("parthenon").style.opacity=s.part;
document.getElementById("colosseum").style.opacity=s.colo;
document.getElementById("senate").style.opacity=s.senate;
document.getElementById("phil").style.opacity=s.phil;
var a=document.getElementById("alex");a.style.opacity=s.alex;a.style.left=s.alex?"44%":"200px";
document.getElementById("soldier").style.opacity=s.soldier;
document.getElementById("chariot").style.opacity=s.chariot;
document.getElementById("badge").textContent=s.badge;
document.getElementById("badge").style.background=s.bc;
document.getElementById("badge").style.color=s.bc2;
document.getElementById("ptitle").textContent=s.title;
document.getElementById("ititle").textContent=s.ititle;
document.getElementById("itext").textContent=s.itext;
reset();
}
function reset(){clearInterval(timer);prog=0;document.getElementById("pf").style.width="0%";timer=setInterval(function(){prog+=0.33;document.getElementById("pf").style.width=Math.min(prog,100)+"%";if(prog>=100){clearInterval(timer);setTimeout(function(){go((cur+1)%4);},400);}},125);}
go(0);
</script></body></html>`;

const ANIMATIONS: Record<string, string> = {
  'prehistoric-sl': PREHISTORIC_HTML,
  'vijaya-arrival': VIJAYA_HTML,
  'pandukabhaya-anuradhapura': PANDUKABHAYA_HTML,
  'ancient-world-civilizations': ANCIENT_WORLD_HTML,
  'greek-roman-civilizations': GREEK_ROMAN_HTML,
};

export function LessonAnimatedPlayer({ animatedId, title }: LessonAnimatedPlayerProps) {
  const html = ANIMATIONS[animatedId];
  if (!html) return null;

  const blob = new Blob([html], { type: 'text/html' });
  const blobUrl = URL.createObjectURL(blob);

  return (
    <div className="rounded-xl overflow-hidden mb-6" style={{ height: '420px' }}>
      <iframe
        src={blobUrl}
        title={title}
        className="w-full h-full border-0"
        sandbox="allow-scripts"
      />
    </div>
  );
}
