import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, Trophy, Star, Flame, BookOpen, Settings,
  Edit2, X, Save, TrendingUp, Award, Zap, Calculator,
  FlaskConical, Globe, CheckCircle2, Lock, BarChart3,
  Target, Sparkles, Crown, GraduationCap
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  updateUser,
  getMathsLessons, getEnglishLessons, getScienceLessons, getLessons,
  getProgressKey, getQuizResultsKey,
} from "../../services/localStorage";
import { toast } from "sonner";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../hooks/useAuth";

interface ProfilePageProps {
  onBack: () => void;
  onSettingsClick?: () => void;
}

const SUBJECTS = [
  { key:"history",  label:{en:"History", si:"ඉතිහාසය"  }, icon:Globe,        color:"#7c3aed", light:"#ede9fe" },
  { key:"maths",   label:{en:"Maths",   si:"ගණිතය"     }, icon:Calculator,   color:"#2563eb", light:"#dbeafe" },
  { key:"english", label:{en:"English", si:"ඉංග්‍රීසි"  }, icon:BookOpen,     color:"#16a34a", light:"#dcfce7" },
  { key:"science", label:{en:"Science", si:"විද්‍යාව"   }, icon:FlaskConical, color:"#d97706", light:"#fef9c3" },
] as const;

const ACHIEVEMENTS = [
  { id:1,  icon:"🎯", name:{en:"First Steps",      si:"පළමු පියවර"       }, desc:{en:"Complete your first lesson",    si:"පළමු පාඩම සම්පූර්ණ"    }, check:(d:DS)=>d.totalCompleted>=1 },
  { id:2,  icon:"🔥", name:{en:"On a Roll",        si:"ගිනි ගන්නවා"      }, desc:{en:"7-day learning streak",         si:"දින 7ක streak"           }, check:(d:DS)=>d.streak>=7 },
  { id:3,  icon:"⭐", name:{en:"Quiz Champion",    si:"ප්‍රශ්නාවලි ශූරයා" }, desc:{en:"Score 100% on any quiz",        si:"ඕනෑම quiz 100%"         }, check:(d:DS)=>d.hasPerfectQuiz },
  { id:4,  icon:"📚", name:{en:"History Buff",     si:"ඉතිහාස ශිෂ්‍යයා"  }, desc:{en:"Complete 5 History lessons",    si:"ඉතිහාස පාඩම් 5ක්"       }, check:(d:DS)=>d.historyCompleted>=5 },
  { id:5,  icon:"🔢", name:{en:"Math Wizard",      si:"ගණිත විශාරද"      }, desc:{en:"Complete 5 Maths lessons",      si:"ගණිත පාඩම් 5ක්"         }, check:(d:DS)=>d.mathsCompleted>=5 },
  { id:6,  icon:"🌿", name:{en:"Science Explorer", si:"විද්‍යා ගවේෂකයා"  }, desc:{en:"Complete 5 Science lessons",    si:"විද්‍යා පාඩම් 5ක්"       }, check:(d:DS)=>d.scienceCompleted>=5 },
  { id:7,  icon:"🗣️", name:{en:"Wordsmith",        si:"වචන ශිල්පී"       }, desc:{en:"Complete 5 English lessons",    si:"ඉංග්‍රීසි පාඩම් 5ක්"    }, check:(d:DS)=>d.englishCompleted>=5 },
  { id:8,  icon:"💎", name:{en:"All-Rounder",      si:"සෑම විෂයයකින්"    }, desc:{en:"Start all 4 subjects",         si:"විෂයයන් 4ම ආරම්භ"       }, check:(d:DS)=>d.historyCompleted>0&&d.mathsCompleted>0&&d.englishCompleted>0&&d.scienceCompleted>0 },
  { id:9,  icon:"🏅", name:{en:"High Scorer",      si:"ඉහළ ලකුණු"       }, desc:{en:"Average score above 80%",      si:"සාමාන්‍ය 80%ට වැඩි"      }, check:(d:DS)=>d.avgScore>=80 },
  { id:10, icon:"🎓", name:{en:"Scholar",          si:"විශාරද"            }, desc:{en:"Complete 20+ lessons",          si:"පාඩම් 20+ සම්පූර්ණ"      }, check:(d:DS)=>d.totalCompleted>=20 },
];

interface DS { totalCompleted:number;streak:number;hasPerfectQuiz:boolean;historyCompleted:number;mathsCompleted:number;englishCompleted:number;scienceCompleted:number;avgScore:number;totalXP:number; }

function readLS<T>(k:string,fb:T):T{try{const r=localStorage.getItem(k);return r?JSON.parse(r):fb;}catch{return fb;}}
type P={lesson_id:number;completed:boolean;score:number;attempts:number};

function buildDS():DS{
  const hP=readLS<P[]>(getProgressKey('history'),[]);
  const mP=readLS<P[]>(getProgressKey('maths'),[]);
  const eP=readLS<P[]>(getProgressKey('english'),[]);
  const sP=readLS<P[]>(getProgressKey('science'),[]);
  const all=[...hP,...mP,...eP,...sP];
  const user=readLS<{streak?:number;xp?:number}>("history_app_user",{});
  const done=(a:P[])=>a.filter(p=>p.completed&&p.score>=70).length;
  const sc=all.filter(p=>p.score>0);
  const avg=sc.length?Math.round(sc.reduce((s,p)=>s+p.score,0)/sc.length):0;
  const qr=readLS<{score:number}[]>(getQuizResultsKey(),[]);
  return{totalCompleted:done(all),streak:user.streak??0,hasPerfectQuiz:qr.some(r=>r.score>=100),
    historyCompleted:done(hP),mathsCompleted:done(mP),englishCompleted:done(eP),scienceCompleted:done(sP),
    avgScore:avg,totalXP:user.xp??0};
}

function getTotal(k:string):number{
  try{if(k==="history")return getLessons().length;if(k==="maths")return getMathsLessons().length;if(k==="english")return getEnglishLessons().length;if(k==="science")return getScienceLessons().length;}catch{}return 0;
}

function getLevelInfo(xp:number){
  const t=[0,100,250,500,900,1400,2000,2800,3800,5000];
  let lv=1;for(let i=t.length-1;i>=0;i--){if(xp>=t[i]){lv=i+1;break;}}lv=Math.min(lv,10);
  const cur=t[lv-1]??0,nxt=t[lv]??t[t.length-1];
  const pct=nxt>cur?Math.min(Math.round(((xp-cur)/(nxt-cur))*100),100):100;
  const titles=["Novice","Explorer","Learner","Achiever","Scholar","Expert","Master","Champion","Legend","Grandmaster"];
  return{level:lv,pct,title:titles[lv-1],nextXP:nxt};
}

function CountUp({to,suffix=""}:{to:number;suffix?:string}){
  const [v,setV]=useState(0);
  useEffect(()=>{const step=Math.max(1,Math.floor(to/40));let c=0;const id=setInterval(()=>{c=Math.min(c+step,to);setV(c);if(c>=to)clearInterval(id);},25);return()=>clearInterval(id);},[to]);
  return <>{v.toLocaleString()}{suffix}</>;
}

export function ProfilePage({onBack,onSettingsClick}:ProfilePageProps){
  const {language}=useLanguage();
  const { user: authUser, refreshUser } = useAuth();
  const [snap,setSnap]=useState<DS>(buildDS());
  const [editing,setEditing]=useState(false);
  const [editName,setEditName]=useState(authUser?.name??"");
  const [editEmail,setEditEmail]=useState(authUser?.email??"");
  const [tab,setTab]=useState<"overview"|"subjects"|"achievements">("overview");

  // Re-sync whenever the auth user changes (login/logout/profile update)
  useEffect(()=>{
    setSnap(buildDS());
    setEditName(authUser?.name??"");
    setEditEmail(authUser?.email??"");
  },[authUser]);

  const user = authUser;

  const {level,pct,title,nextXP}=getLevelInfo(snap.totalXP);

  const handleSave=()=>{
    if(!editName.trim()){toast.error(language==="en"?"Name cannot be empty":"නම හිස් විය නොහැක");return;}
    updateUser({name:editName,email:editEmail});
    refreshUser();
    toast.success(language==="en"?"✅ Profile updated!":"✅ පැතිකඩ යාවත්කාලීනයි!");setEditing(false);
  };

  const subjectData=SUBJECTS.map(s=>{
    const prog=readLS<P[]>(getProgressKey(s.key as 'history'|'maths'|'english'|'science'),[]);
    const done=prog.filter(p=>p.completed&&p.score>=70).length;
    const total=getTotal(s.key);
    const sc=prog.filter(p=>p.score>0);
    const avg=sc.length?Math.round(sc.reduce((a,b)=>a+b.score,0)/sc.length):0;
    return{...s,done,total,avg,xp:done*50,pct:total>0?Math.round((done/total)*100):0};
  });

  const unlocked=ACHIEVEMENTS.filter(a=>a.check(snap));
  const locked=ACHIEVEMENTS.filter(a=>!a.check(snap));

  type QR2={lesson_id:number;score:number;date:string};
  const recentQuiz=readLS<QR2[]>(getQuizResultsKey(),[])
    .sort((a,b)=>new Date(b.date).getTime()-new Date(a.date).getTime()).slice(0,5);


  const L=(e:string,s:string)=>language==="en"?e:s;
  const isAdmin = !!(user as any)?.isAdmin;

  // ── Admin-specific stats from localStorage ────────────────────────────────
  const adminStats = isAdmin ? (() => {
    const totalLessons = SUBJECTS.reduce((sum, s) => sum + getTotal(s.key), 0);
    const subjectBreakdown = SUBJECTS.map(s => {
      const prog = readLS<P[]>(getProgressKey(s.key as 'history'|'maths'|'english'|'science'), []);
      const done = prog.filter(p => p.completed && p.score >= 70).length;
      const total = getTotal(s.key);
      const sc = prog.filter(p => p.score > 0);
      const avg = sc.length ? Math.round(sc.reduce((a, b) => a + b.score, 0) / sc.length) : 0;
      return { ...s, done, total, avg, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
    });
    const qr = readLS<{score:number;date:string}[]>(getQuizResultsKey(), []);
    const avgQuizScore = qr.length ? Math.round(qr.reduce((s, r) => s + r.score, 0) / qr.length) : 0;
    const recentActivity = [...qr].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
    const allP = [...readLS<P[]>(getProgressKey('history'),[]),...readLS<P[]>(getProgressKey('maths'),[]),...readLS<P[]>(getProgressKey('english'),[]),...readLS<P[]>(getProgressKey('science'),[])];
    const completedLessons = allP.filter(p => p.completed && p.score >= 70).length;
    return { totalLessons, subjectBreakdown, avgQuizScore, totalQuizzes: qr.length, recentActivity, completedLessons };
  })() : null;

  // ── Admin profile view ────────────────────────────────────────────────────
  if (isAdmin && adminStats) {
    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950">
        <div className="h-1 w-full" style={{background:"linear-gradient(90deg,#7c3aed,#a855f7,#c084fc)"}}/>
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10" style={{background:"#7c3aed",filter:"blur(80px)"}}/>
          <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full opacity-8" style={{background:"#a855f7",filter:"blur(80px)"}}/>
        </div>

        {/* Nav */}
        <div className="relative z-10 flex items-center justify-between px-5 py-4 max-w-2xl mx-auto">
          <motion.button whileTap={{scale:0.96}} onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-700 font-semibold text-sm transition-colors">
            <ArrowLeft className="w-4 h-4"/>{L("Back","ආපසු")}
          </motion.button>
          {onSettingsClick&&(
            <motion.button whileTap={{scale:0.96}} onClick={onSettingsClick}
              className="flex items-center gap-2 text-gray-500 hover:text-purple-700 text-sm font-medium transition-colors px-3 py-2 rounded-xl hover:bg-purple-50">
              <Settings className="w-4 h-4"/>{L("Settings","සැකසීම්")}
            </motion.button>
          )}
        </div>

        <div className="relative z-10 px-5 pb-12 max-w-2xl mx-auto">

          {/* Admin Hero Card */}
          <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}} className="mb-5">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden border border-purple-100 dark:border-gray-700">
              <div className="h-24 relative" style={{background:"linear-gradient(135deg,#7c3aed 0%,#a855f7 60%,#c084fc 100%)"}}>
                <div className="absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle at 20% 50%,white 1px,transparent 1px),radial-gradient(circle at 80% 20%,white 1px,transparent 1px)",backgroundSize:"30px 30px"}}/>
                <div className="absolute top-3 right-4 bg-white dark:bg-gray-800 rounded-2xl px-3 py-1.5 flex items-center gap-1.5 shadow-md">
                  <Crown className="w-4 h-4 text-purple-600"/>
                  <span className="text-purple-700 font-black text-sm">{L("Administrator","පරිපාලක")}</span>
                </div>
              </div>
              <div className="px-6 pb-6">
                <div className="flex items-end justify-between -mt-10 mb-3">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center text-4xl"
                      style={{background:"linear-gradient(135deg,#faf5ff,#ede9fe)"}}>
                      👑
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 text-white"/>
                    </div>
                  </div>
                  {editing ? (
                    <div className="flex gap-2">
                      <motion.button whileTap={{scale:0.96}} onClick={handleSave}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-all">
                        <Save className="w-3.5 h-3.5"/>{L("Save","සුරකින්න")}
                      </motion.button>
                      <motion.button whileTap={{scale:0.96}} onClick={()=>setEditing(false)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                        <X className="w-3.5 h-3.5"/>
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button whileTap={{scale:0.96}} onClick={()=>setEditing(true)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-purple-700 border-2 border-purple-200 bg-purple-50 hover:bg-purple-100 transition-all">
                      <Edit2 className="w-3.5 h-3.5"/>{L("Edit Profile","සංස්කරණය")}
                    </motion.button>
                  )}
                </div>

                {editing ? (
                  <div className="space-y-3 mb-3">
                    <input value={editName} onChange={e=>setEditName(e.target.value)}
                      className="w-full border border-purple-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400"
                      placeholder={L("Display Name","නම")}/>
                    <input value={editEmail} onChange={e=>setEditEmail(e.target.value)}
                      className="w-full border border-purple-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                      placeholder={L("Email","ඊමේල්")}/>
                  </div>
                ) : (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-2xl font-black text-gray-900">{user?.name ?? "Administrator"}</h1>
                      <span className="text-xs px-2.5 py-1 rounded-full font-bold text-white bg-purple-600">{L("Admin","පරිපාලක")}</span>
                    </div>
                    {user?.email && <p className="text-gray-400 text-sm mt-0.5">{user.email}</p>}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Admin Stat Cards */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              {label:L("Total Lessons","මුළු පාඩම්"),    value:adminStats.totalLessons,      icon:BookOpen,    color:"#7c3aed", bg:"#faf5ff", border:"#ddd6fe", suffix:""},
              {label:L("Completed","සම්පූර්ණ"),          value:adminStats.completedLessons,   icon:CheckCircle2,color:"#16a34a", bg:"#f0fdf4", border:"#bbf7d0", suffix:""},
              {label:L("Quizzes Taken","ගත් ප්‍රශ්නාවලි"),value:adminStats.totalQuizzes,       icon:Target,      color:"#2563eb", bg:"#eff6ff", border:"#bfdbfe", suffix:""},
              {label:L("Avg Quiz Score","සාමාන්‍ය ලකුණු"), value:adminStats.avgQuizScore,       icon:Award,       color:"#d97706", bg:"#fefce8", border:"#fde68a", suffix:adminStats.avgQuizScore>0?"%":""},
            ].map((s,i)=>{
              const Icon=s.icon;
              return(
                <motion.div key={s.label} initial={{opacity:0,y:12,scale:0.9}} animate={{opacity:1,y:0,scale:1}}
                  transition={{delay:i*0.07,type:"spring",stiffness:220}}
                  className="rounded-2xl p-4 border shadow-sm flex items-center gap-3"
                  style={{background:s.bg,borderColor:s.border}}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{background:s.color+"18"}}>
                    <Icon className="w-5 h-5" style={{color:s.color}}/>
                  </div>
                  <div>
                    <div className="text-xl font-black leading-none" style={{color:s.color}}>
                      {s.value===0&&s.suffix==="%"?<span className="text-gray-300">—</span>:<CountUp to={s.value} suffix={s.suffix}/>}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 font-medium">{s.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Subject Breakdown */}
          <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 mb-4">
            <h3 className="text-gray-800 font-bold text-sm mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-600"/>
              {L("Subject Overview","විෂය දළ විශ්ලේෂණය")}
            </h3>
            <div className="space-y-3.5">
              {adminStats.subjectBreakdown.map((s,i)=>{
                const Icon=s.icon;
                return(
                  <motion.div key={s.key} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:0.1+i*0.08}}>
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{background:s.light}}>
                        <Icon className="w-3.5 h-3.5" style={{color:s.color}}/>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-sm font-semibold flex-1">{L(s.label.en,s.label.si)}</span>
                      <span className="text-xs text-gray-400">{s.done}/{s.total}</span>
                      {s.avg>0&&<span className="text-xs font-semibold text-gray-500">~{s.avg}%</span>}
                      <span className="text-xs font-bold" style={{color:s.color}}>{s.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden ml-10" style={{background:s.light}}>
                      <motion.div className="h-full rounded-full" style={{backgroundColor:s.color}}
                        initial={{width:0}} animate={{width:`${s.pct}%`}} transition={{duration:0.9,delay:0.1+i*0.08,ease:"easeOut"}}/>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Quiz Activity */}
          <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-gray-800 font-bold text-sm mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500"/>
              {L("Recent Quiz Activity","මෑත ප්‍රශ්නාවලි")}
            </h3>
            {adminStats.recentActivity.length===0?(
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📭</div>
                <p className="text-gray-400 text-sm">{L("No quiz activity yet.","තවම ක්‍රියාකාරකම් නැත.")}</p>
              </div>
            ):(
              <div className="space-y-2">
                {adminStats.recentActivity.map((qr,i)=>{
                  const sc=qr.score>=80?"#16a34a":qr.score>=60?"#d97706":"#dc2626";
                  const scbg=qr.score>=80?"#f0fdf4":qr.score>=60?"#fefce8":"#fef2f2";
                  let ds="";
                  try{const d=new Date(qr.date),diff=Math.floor((Date.now()-d.getTime())/86400000);ds=diff===0?L("Today","අද"):diff===1?L("Yesterday","ඊයේ"):L(`${diff}d ago`,`දින ${diff}`);}catch{}
                  return(
                    <motion.div key={i} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}}
                      className="flex items-center gap-3 p-3 rounded-xl border" style={{borderColor:scbg,background:scbg}}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                        style={{background:"white",color:sc,boxShadow:`0 0 0 2px ${sc}22`}}>
                        {qr.score}%
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 text-xs font-semibold">{L("Quiz Activity","ප්‍රශ්නාවලිය")}</p>
                        <p className="text-gray-400 text-xs">{ds}</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{background:sc}}>
                        {qr.score>=80?"✨ Great":qr.score>=60?"👍 Good":"📖 Review"}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>

        </div>
      </div>
    );
  }

  return(
    <div className="min-h-screen bg-[#f0fdf4] dark:bg-gray-950">

      {/* Subtle top green bar */}
      <div className="h-1 w-full" style={{background:"linear-gradient(90deg,#16a34a,#22c55e,#4ade80)"}}/>

      {/* Wavy background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10" style={{background:"#16a34a",filter:"blur(80px)"}}/>
        <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full opacity-8" style={{background:"#22c55e",filter:"blur(60px)"}}/>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-8" style={{background:"#4ade80",filter:"blur(80px)"}}/>
      </div>

      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-5 py-4 max-w-2xl mx-auto">
        <motion.button whileTap={{scale:0.96}} onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-green-700 font-semibold text-sm transition-colors">
          <ArrowLeft className="w-4 h-4"/>{L("Back","ආපසු")}
        </motion.button>
        {onSettingsClick&&(
          <motion.button whileTap={{scale:0.96}} onClick={onSettingsClick}
            className="flex items-center gap-2 text-gray-500 hover:text-green-700 text-sm font-medium transition-colors px-3 py-2 rounded-xl hover:bg-green-50">
            <Settings className="w-4 h-4"/>{L("Settings","සැකසීම්")}
          </motion.button>
        )}
      </div>

      <div className="relative z-10 px-5 pb-12 max-w-2xl mx-auto">

        {/* ══ HERO CARD ══ */}
        <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}} className="mb-5">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden border border-green-100 dark:border-gray-700">
            {/* Green top gradient strip */}
            <div className="h-24 relative" style={{background:"linear-gradient(135deg,#16a34a 0%,#22c55e 60%,#4ade80 100%)"}}>
              <div className="absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle at 20% 50%,white 1px,transparent 1px),radial-gradient(circle at 80% 20%,white 1px,transparent 1px)",backgroundSize:"30px 30px"}}/>
              {/* Level badge top-right */}
              <div className="absolute top-3 right-4 bg-white dark:bg-gray-800 rounded-2xl px-3 py-1.5 flex items-center gap-1.5 shadow-md">
                <Star className="w-4 h-4 text-green-600"/>
                <span className="text-green-700 font-black text-sm">Level {level}</span>
              </div>
            </div>

            <div className="px-6 pb-6">
              {/* Avatar — overlapping the green strip */}
              <div className="flex items-end justify-between -mt-10 mb-3">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center text-4xl"
                    style={{background:"linear-gradient(135deg,#f0fdf4,#dcfce7)"}}>
                    😊
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs font-black">{level}</span>
                  </div>
                </div>
                <motion.button whileTap={{scale:0.96}} onClick={()=>setEditing(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-green-700 border-2 border-green-200 bg-green-50 hover:bg-green-100 transition-all">
                  <Edit2 className="w-3.5 h-3.5"/>{L("Edit Profile","සංස්කරණය")}
                </motion.button>
              </div>

              {/* Name & title */}
              <div className="mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-black text-gray-900">
                    {user?.name??(L("Explorer","ගවේෂකයා"))}
                  </h1>
                  <span className="text-xs px-2.5 py-1 rounded-full font-bold text-white bg-green-600">{title}</span>
                  {snap.streak>0&&(
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold text-orange-600 bg-orange-50 border border-orange-200 flex items-center gap-1">
                      <Flame className="w-3 h-3"/>{snap.streak}d
                    </span>
                  )}
                </div>
                {user?.email&&<p className="text-gray-400 text-sm mt-0.5">{user.email}</p>}
              </div>

              {/* XP Bar */}
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span className="font-bold text-gray-700">{snap.totalXP.toLocaleString()} XP</span>
                  <span>{nextXP-snap.totalXP} XP {L("to next level","ඊළඟ මට්ටමට")}</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                  <motion.div className="h-full rounded-full relative overflow-hidden" initial={{width:0}} animate={{width:`${pct}%`}} transition={{duration:1.2,ease:"easeOut"}}
                    style={{background:"linear-gradient(90deg,#16a34a,#22c55e,#4ade80)"}}>
                    <motion.div className="absolute inset-0" style={{background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)"}}
                      animate={{x:["-100%","200%"]}} transition={{duration:2,repeat:Infinity,repeatDelay:1}}/>
                  </motion.div>
                </div>
                <div className="text-xs text-gray-400 mt-1 text-right">{pct}% to Level {level+1}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ══ STAT CARDS ══ */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {[
            {label:L("Total XP","මුළු XP"),    value:snap.totalXP,           suffix:"", icon:Star,          color:"#16a34a",bg:"#f0fdf4",border:"#bbf7d0"},
            {label:L("Day Streak","Streak"),   value:snap.streak,             suffix:"🔥",icon:Flame,        color:"#ea580c",bg:"#fff7ed",border:"#fed7aa"},
            {label:L("Lessons","පාඩම්"),       value:snap.totalCompleted,     suffix:"", icon:GraduationCap, color:"#2563eb",bg:"#eff6ff",border:"#bfdbfe"},
            {label:L("Avg Score","සාමාන්‍ය"),   value:snap.avgScore,           suffix:snap.avgScore>0?"%":"",icon:Target,color:"#7c3aed",bg:"#faf5ff",border:"#ddd6fe"},
          ].map((s,i)=>{
            const Icon=s.icon;
            return(
              <motion.div key={s.label} initial={{opacity:0,y:12,scale:0.9}} animate={{opacity:1,y:0,scale:1}}
                transition={{delay:i*0.07,type:"spring",stiffness:220}}
                className="rounded-2xl p-3 text-center border shadow-sm"
                style={{background:s.bg,borderColor:s.border}}>
                <Icon className="w-5 h-5 mx-auto mb-1.5" style={{color:s.color}}/>
                <div className="text-xl font-black leading-none" style={{color:s.color}}>
                  {s.value===0&&s.suffix==="%"?<span className="text-gray-300">—</span>:
                   s.suffix==="🔥"?<>{s.value}{s.suffix}</>:
                   <CountUp to={typeof s.value==="number"?s.value:0} suffix={s.suffix}/>}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-xs mt-1 font-medium leading-tight">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* ══ TABS ══ */}
        <div className="flex gap-2 mb-5 bg-white dark:bg-gray-800 rounded-2xl p-1.5 shadow-sm border border-gray-100 dark:border-gray-700">
          {(["overview","subjects","achievements"] as const).map(t2=>(
            <motion.button key={t2} onClick={()=>setTab(t2)} whileTap={{scale:0.97}}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={tab===t2?{background:"#16a34a",color:"white",boxShadow:"0 2px 8px #16a34a44"}:{color:"#6b7280"}}>
              {t2==="overview"&&L("Overview","දළ")}
              {t2==="subjects"&&L("Subjects","විෂයයන්")}
              {t2==="achievements"&&L("Badges","ජය")}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ══ OVERVIEW TAB ══ */}
          {tab==="overview"&&(
            <motion.div key="ov" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="space-y-4">

              {/* Subject overview */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-gray-800 font-bold text-sm mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-green-600"/>
                  {L("Subject Progress","විෂය ප්‍රගතිය")}
                </h3>
                <div className="space-y-3.5">
                  {subjectData.map((s,i)=>{
                    const Icon=s.icon;
                    return(
                      <motion.div key={s.key} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.08}}>
                        <div className="flex items-center gap-3 mb-1.5">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{background:s.light}}>
                            <Icon className="w-3.5 h-3.5" style={{color:s.color}}/>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm font-semibold flex-1">{L(s.label.en,s.label.si)}</span>
                          <span className="text-xs text-gray-400">{s.done}/{s.total}</span>
                          <span className="text-xs font-bold" style={{color:s.color}}>{s.pct}%</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden ml-10" style={{background:s.light}}>
                          <motion.div className="h-full rounded-full" style={{backgroundColor:s.color}}
                            initial={{width:0}} animate={{width:`${s.pct}%`}} transition={{duration:0.9,delay:0.1+i*0.08,ease:"easeOut"}}/>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-gray-800 font-bold text-sm mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-500"/>
                  {L("Recent Quiz Activity","මෑත ප්‍රශ්නාවලි")}
                </h3>
                {recentQuiz.length===0?(
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">📭</div>
                    <p className="text-gray-400 text-sm">{L("No quiz activity yet. Start learning!","තවම ක්‍රියාකාරකම් නැත. ඉගෙනීම ආරම්භ කරන්න!")}</p>
                  </div>
                ):(
                  <div className="space-y-2">
                    {recentQuiz.map((qr,i)=>{
                      const sc=qr.score>=80?"#16a34a":qr.score>=60?"#d97706":"#dc2626";
                      const scbg=qr.score>=80?"#f0fdf4":qr.score>=60?"#fefce8":"#fef2f2";
                      let ds="";
                      try{const d=new Date(qr.date),diff=Math.floor((Date.now()-d.getTime())/86400000);ds=diff===0?L("Today","අද"):diff===1?L("Yesterday","ඊයේ"):L(`${diff}d ago`,`දින ${diff}`);}catch{}
                      return(
                        <motion.div key={i} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}}
                          className="flex items-center gap-3 p-3 rounded-xl border" style={{borderColor:scbg,background:scbg}}>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                            style={{background:"white",color:sc,boxShadow:`0 0 0 2px ${sc}22`}}>
                            {qr.score}%
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800 text-xs font-semibold">{L(`Quiz · Lesson ${qr.lesson_id}`,`ප්‍රශ්නාවලිය · පාඩම ${qr.lesson_id}`)}</p>
                            <p className="text-gray-400 text-xs">{ds}</p>
                          </div>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{background:sc}}>
                            {qr.score>=80?"✨ Great":qr.score>=60?"👍 Good":"📖 Review"}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Streak banner */}
              <motion.div className="rounded-2xl p-5 flex items-center gap-4 overflow-hidden relative"
                style={{background:"linear-gradient(135deg,#f97316,#ef4444)",boxShadow:"0 6px 24px #ef444444"}}
                whileHover={{scale:1.01}} whileTap={{scale:0.99}}>
                <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white opacity-10"/>
                <motion.div animate={{scale:[1,1.2,1],rotate:[0,10,-10,0]}} transition={{duration:2,repeat:Infinity}}>
                  <Flame className="w-10 h-10 text-white drop-shadow"/>
                </motion.div>
                <div className="flex-1">
                  <p className="text-white font-black text-xl">{snap.streak} {L("Day Streak! 🔥","දින Streak! 🔥")}</p>
                  <p className="text-white/80 text-xs">{L("Keep the streak alive!","Streak එක ජීවත් රකින්න!")}</p>
                </div>
                <Button onClick={onBack} size="sm" className="bg-white font-bold rounded-xl shrink-0" style={{color:"#ef4444"}}>
                  <Zap className="w-3.5 h-3.5 mr-1"/>{L("Learn Now","ඉගෙනගන්න")}
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* ══ SUBJECTS TAB ══ */}
          {tab==="subjects"&&(
            <motion.div key="sub" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="space-y-3">
              {subjectData.map((s,i)=>{
                const Icon=s.icon;
                return(
                  <motion.div key={s.key} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.07,type:"spring",stiffness:200}}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-5 border dark:border-gray-700 shadow-sm overflow-hidden relative"
                    style={{borderColor:s.color+"30"}}>
                    {/* Left accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{background:s.color}}/>
                    <div className="pl-2">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm" style={{background:s.light}}>
                          <Icon className="w-5 h-5" style={{color:s.color}}/>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-gray-900 dark:text-white font-black text-base">{L(s.label.en,s.label.si)}</h3>
                            <span className="text-yellow-600 text-xs font-black">{s.xp} XP</span>
                          </div>
                          <p className="text-xs mt-0.5" style={{color:s.color}}>
                            {s.done===0?L("Not started yet","ආරම්භ කර නැත"):s.avg>0?L(`Avg: ${s.avg}%`,`සාමාන්‍ය: ${s.avg}%`):L("In progress","ප්‍රගතිගත")}
                          </p>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="h-3 rounded-full overflow-hidden mb-2" style={{background:s.light}}>
                        <motion.div className="h-full rounded-full" style={{backgroundColor:s.color}}
                          initial={{width:0}} animate={{width:`${s.pct}%`}} transition={{duration:1,ease:"easeOut",delay:i*0.1}}/>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">{s.pct}% {L("complete","සම්පූර්ණ")}</span>
                        <span className="text-gray-400">{s.done} / {s.total} {L("lessons","පාඩම්")}</span>
                      </div>

                      {/* Dot progress */}
                      {s.total>0&&(
                        <div className="flex gap-1 mt-2.5 flex-wrap">
                          {Array.from({length:Math.min(s.total,12)}).map((_,d)=>(
                            <div key={d} className="w-2.5 h-2.5 rounded-full transition-all"
                              style={{background:d<s.done?s.color:s.color+"20"}}/>
                          ))}
                          {s.total>12&&<span className="text-gray-300 text-xs self-center">+{s.total-12}</span>}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Total summary */}
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-green-100 dark:border-gray-700 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-green-600"/>
                  <span className="text-gray-700 dark:text-gray-300 font-bold text-sm">{L("Total Subject XP","මුළු විෂය XP")}</span>
                </div>
                <span className="text-green-600 font-black text-xl">{subjectData.reduce((s,d)=>s+d.xp,0).toLocaleString()} XP</span>
              </motion.div>
            </motion.div>
          )}

          {/* ══ ACHIEVEMENTS TAB ══ */}
          {tab==="achievements"&&(
            <motion.div key="ach" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>

              {/* Progress */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-4 border border-green-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-3">
                  <Crown className="w-5 h-5 text-yellow-500 shrink-0"/>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gray-700 dark:text-gray-300 font-bold">{unlocked.length}/{ACHIEVEMENTS.length} {L("Badges Earned","ජය ගත්")}</span>
                      <span className="text-green-600 font-bold">{Math.round((unlocked.length/ACHIEVEMENTS.length)*100)}%</span>
                    </div>
                    <div className="h-2.5 rounded-full overflow-hidden bg-gray-100">
                      <motion.div className="h-full rounded-full" initial={{width:0}}
                        animate={{width:`${(unlocked.length/ACHIEVEMENTS.length)*100}%`}} transition={{duration:1}}
                        style={{background:"linear-gradient(90deg,#16a34a,#22c55e)"}}/>
                    </div>
                  </div>
                </div>
              </div>

              {unlocked.length>0&&(
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500"/>
                    <span className="text-green-700 font-bold text-sm">{L("Earned","ජය ගත්")} ({unlocked.length})</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {unlocked.map((a,i)=>(
                      <motion.div key={a.id} initial={{opacity:0,scale:0.88}} animate={{opacity:1,scale:1}} transition={{delay:i*0.06,type:"spring",stiffness:220}}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center border border-green-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-green-400"/>
                        <motion.div className="text-3xl mb-2" animate={{y:[0,-2,0]}} transition={{duration:2,repeat:Infinity,delay:i*0.3}}>
                          {a.icon}
                        </motion.div>
                        <Sparkles className="w-3 h-3 text-green-500 absolute top-2 right-2"/>
                        <h3 className="text-gray-800 font-bold text-xs mb-1">{L(a.name.en,a.name.si)}</h3>
                        <p className="text-gray-400 text-xs leading-tight">{L(a.desc.en,a.desc.si)}</p>
                        <div className="mt-2 text-green-600 text-xs font-bold flex items-center justify-center gap-1">
                          <Award className="w-3 h-3"/>{L("Unlocked!","ජය ගත්!")}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {locked.length>0&&(
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Lock className="w-4 h-4 text-gray-300"/>
                    <span className="text-gray-400 font-bold text-sm">{L("Locked","අගුළු")} ({locked.length})</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {locked.map((a,i)=>(
                      <motion.div key={a.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.04}}
                        className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4 text-center border border-gray-100 dark:border-gray-600">
                        <div className="text-3xl mb-2 grayscale opacity-30">{a.icon}</div>
                        <h3 className="text-gray-300 font-bold text-xs mb-1">{L(a.name.en,a.name.si)}</h3>
                        <p className="text-gray-300 text-xs leading-tight">{L(a.desc.en,a.desc.si)}</p>
                        <div className="mt-2 text-gray-300 text-xs flex items-center justify-center gap-1">
                          <Lock className="w-3 h-3"/>{L("Locked","අගුළු")}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ══ EDIT MODAL ══ */}
      <AnimatePresence>
        {editing&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
            style={{background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)"}}
            onClick={()=>setEditing(false)}>
            <motion.div initial={{scale:0.88,y:16}} animate={{scale:1,y:0}} exit={{scale:0.88,opacity:0}}
              onClick={e=>e.stopPropagation()}
              className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-700">
              <div className="h-1 -mx-6 -mt-6 mb-6 rounded-t-3xl" style={{background:"linear-gradient(90deg,#16a34a,#22c55e)"}}/>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-gray-900 dark:text-white font-black text-lg flex items-center gap-2">
                  <Edit2 className="w-5 h-5 text-green-600"/>{L("Edit Profile","පැතිකඩ සංස්කරණය")}
                </h2>
                <button onClick={()=>setEditing(false)} className="w-8 h-8 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-700">
                  <X className="w-4 h-4"/>
                </button>
              </div>
              <div className="space-y-4">
                {[{label:L("Full Name","සම්පූර්ණ නම"),val:editName,set:setEditName,type:"text",ph:L("Your name","ඔබේ නම")},
                  {label:L("Email","ලිපිනය"),val:editEmail,set:setEditEmail,type:"email",ph:"email@example.com"}
                ].map(f=>(
                  <div key={f.label}>
                    <label className="text-gray-500 dark:text-gray-400 text-xs font-bold mb-1.5 block uppercase tracking-wide">{f.label}</label>
                    <input type={f.type} value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph}
                      className="w-full rounded-xl px-4 py-3 text-gray-900 text-sm font-semibold outline-none border-2 border-gray-100 focus:border-green-400 transition-all bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600"/>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={()=>setEditing(false)}
                  className="flex-1 py-3 rounded-xl text-gray-500 font-bold text-sm border-2 border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                  {L("Cancel","අවලංගු")}
                </button>
                <motion.button whileTap={{scale:0.97}} onClick={handleSave}
                  className="flex-1 py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
                  style={{background:"linear-gradient(135deg,#16a34a,#22c55e)"}}>
                  <Save className="w-4 h-4"/>{L("Save","සුරකින්න")}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
