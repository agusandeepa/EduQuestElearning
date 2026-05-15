"""
Database Initialization Script
Creates tables and populates initial data for the History Learning Website
"""

from app.database import engine, SessionLocal
from app.models import Base, Lesson, QuizQuestion, Achievement
from datetime import datetime

def init_database():
    """Database tables create කරලා initial data add කරන්න"""
    
    print("🔄 Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created successfully!")
    
    # Database session
    db = SessionLocal()
    
    try:
        # Check if data already exists
        existing_lessons = db.query(Lesson).count()
        if existing_lessons > 0:
            print(f"⚠️  Database already contains {existing_lessons} lessons. Skipping data initialization.")
            print("💡 If you want to reinitialize, delete the database and run this script again.")
            return
        
        print("\n🔄 Adding lessons data...")
        
        # ============================================
        # 10 History Lessons (Grade 10-11 O/L Syllabus)
        # ============================================
        
        lessons_data = [
            {
                "order": 1,
                "title_en": "Arrival of Prince Vijaya",
                "title_si": "විජය කුමරුගේ පැමිණීම",
                "description_en": "Learn about the legendary arrival of Prince Vijaya to Sri Lanka in 543 BCE and the establishment of the Sinhalese civilization.",
                "description_si": "ක්‍රි.පූ. 543 දී විජය කුමරු ශ්‍රී ලංකාවට පැමිණීම සහ සිංහල ශිෂ්ටාචාරය ආරම්භ වීම ගැන ඉගෙන ගන්න.",
                "content_en": "Prince Vijaya, son of King Sinhabahu, arrived in Sri Lanka on the day of Buddha's parinirvana (543 BCE). He landed at Tambapanni (present-day Mannar) with 700 followers. Vijaya married Kuveni, a Yaksha princess, and later established the first Sinhalese kingdom. He brought civilization to the island and is considered the founder of the Sinhalese race.",
                "content_si": "සිංහබාහු රජුගේ පුත් විජය කුමරු බුදුන් වහන්සේගේ පරිනිර්වාණ දිනයේදීම (ක්‍රි.පූ. 543) ශ්‍රී ලංකාවට පැමිණියේය. ඔහු අනුචරයන් 700 ක් සමඟ තම්බපණ්ණියට (වර්තමාන මන්නාරම) ගොඩ බැස්සේය. විජය යක්ෂ කුමරියක් වූ කුවේණි සමඟ විවාහ වූ අතර පසුව පළමු සිංහල රාජධානිය ස්ථාපිත කළේය.",
                "period_en": "543 BCE",
                "period_si": "ක්‍රි.පූ. 543",
                "key_points_en": ["Vijaya's arrival on Buddha's parinirvana day", "Landing at Tambapanni", "Marriage with Kuveni", "Establishment of Sinhalese kingdom", "Brought 700 followers"],
                "key_points_si": ["බුදුන් වහන්සේගේ පරිනිර්වාණ දිනයේ විජයගේ පැමිණීම", "තම්බපණ්ණියට ගොඩ බැසීම", "කුවේණි සමඟ විවාහය", "සිංහල රාජධානිය පිහිටුවීම", "අනුචරයන් 700ක් ගෙන ආවේය"],
                "image_url": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
                "xp_reward": 100
            },
            {
                "order": 2,
                "title_en": "King Devanampiyatissa & Introduction of Buddhism",
                "title_si": "දෙවානම්පියතිස්ස රජු සහ බුද්ධාගමේ පැමිණීම",
                "description_en": "The reign of King Devanampiyatissa and the arrival of Arahat Mahinda, marking the introduction of Buddhism to Sri Lanka.",
                "description_si": "දෙවානම්පියතිස්ස රජුගේ පාලන කාලය සහ අරහත් මහින්ද ස්ථවිරයන් වහන්සේගේ පැමිණීම, ශ්‍රී ලංකාවට බුද්ධාගම හඳුන්වාදීම.",
                "content_en": "King Devanampiyatissa (307-267 BCE) was a contemporary of Emperor Ashoka of India. In 247 BCE, Arahat Mahinda, son of Emperor Ashoka, arrived in Sri Lanka at Mihintale and introduced Buddhism. The king embraced Buddhism and it became the state religion. The arrival of Sanghamitta Theri brought the sacred Bo sapling. This period marked the beginning of Sri Lanka's Buddhist civilization.",
                "content_si": "දෙවානම්පියතිස්ස රජු (ක්‍රි.පූ. 307-267) ඉන්දියාවේ අශෝක මහ රජුගේ සමකාලීනයෙකි. ක්‍රි.පූ. 247 දී අශෝක මහ රජුගේ පුත් අරහත් මහින්ද ස්ථවිරයන් වහන්සේ මිහින්තලයේදී ශ්‍රී ලංකාවට පැමිණ බුද්ධාගම හඳුන්වා දුන්හ. රජු බුද්ධාගම භාරගෙන එය රාජ්‍ය ආගම බවට පත් කළේය. සංඝමිත්තා තෙරණිය විසින් ශ්‍රී මහා බෝධිය ගෙන එන ලදී.",
                "period_en": "307-267 BCE",
                "period_si": "ක්‍රි.පූ. 307-267",
                "key_points_en": ["Contemporary of Emperor Ashoka", "Arrival of Arahat Mahinda (247 BCE)", "Buddhism introduced at Mihintale", "Sanghamitta brought Bo sapling", "Buddhism became state religion"],
                "key_points_si": ["අශෝක මහ රජුගේ සමකාලීන", "අරහත් මහින්ද ස්ථවිරයන්ගේ පැමිණීම (ක්‍රි.පූ. 247)", "මිහින්තලයේදී බුද්ධාගම හඳුන්වාදීම", "සංඝමිත්තා තෙරණිය බෝධිය ගෙනාවාය", "බුද්ධාගම රාජ්‍ය ආගම බවට පත්විය"],
                "image_url": "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800",
                "xp_reward": 100
            },
            {
                "order": 3,
                "title_en": "King Dutugemunu & Unification",
                "title_si": "දුටුගැ���ුණු රජු සහ එක්සත් කිරීම",
                "description_en": "The heroic King Dutugemunu's battle against King Elara and the unification of Sri Lanka under one banner.",
                "description_si": "වීර දුටුගැමුණු රජු විසින් එළාර රජු පරාජය කර ශ්‍රී ලංකාව එක් ධජයක් යටතට ගෙන ඒම.",
                "content_en": "King Dutugemunu (161-137 BCE) is one of the most celebrated kings in Sri Lankan history. He defeated the South Indian Tamil King Elara in a legendary battle at Vijithapura, unifying Sri Lanka. He built the Ruwanwelisaya, Mirisaveti Stupa, and the Brazen Palace. He is remembered as a great Buddhist king and warrior who protected the nation and religion.",
                "content_si": "දුටුගැමුණු රජු (ක්‍රි.පූ. 161-137) ශ්‍රී ලංකා ඉතිහාසයේ වඩාත් කීර්තිමත් රජවරුන්ගෙන් එක් අයෙකි. ඔහු විජිතපුරයේදී දකුණු ඉන්දීය දෙමළ රජු එළාර පරාජය කර ශ්‍රී ලංකාව එක්සත් කළේය. ඔහු රුවන්වැලිසෑය, මිරිසවැටිය සහ ලෝහප්‍රාසාදය ඉදිකළේය. ජාතිය සහ ආගම ආරක්ෂා කළ මහා බෞද්ධ රජෙක් සහ රණවිරුවෙකු ලෙස ඔහු සිහිපත් වේ.",
                "period_en": "161-137 BCE",
                "period_si": "ක්‍රි.පූ. 161-137",
                "key_points_en": ["Defeated King Elara", "Unified Sri Lanka", "Built Ruwanwelisaya", "Built Mirisaveti Stupa", "Great Buddhist king and warrior"],
                "key_points_si": ["එළාර රජු පරාජය කළේය", "ශ්‍රී ලංකාව එක්සත් කළේය", "රුවන්වැලිසෑය ඉදිකළේය", "මිරිසවැටිය ඉදිකළේය", "මහා බෞද්ධ රජෙක් හා රණවිරුවෙක්"],
                "image_url": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
                "xp_reward": 100
            },
            {
                "order": 4,
                "title_en": "Anuradhapura Kingdom - Golden Era",
                "title_si": "අනුරාධපුර යුගය - ස්වර්ණමය යුගය",
                "description_en": "The flourishing of arts, culture, and Buddhism during the golden age of Anuradhapura Kingdom.",
                "description_si": "අනුරාධපුර රාජධානියේ ස්වර්ණමය යුගයේ කලා, සංස්කෘතිය සහ බුද්ධාගම සමෘද්ධිය.",
                "content_en": "The Anuradhapura period (377 BCE - 1017 CE) represents the golden age of Sri Lankan civilization. Great tanks like Abhaya Wewa and Tissa Wewa were built. The Sacred Tooth Relic was brought to Sri Lanka during King Sirimeghavanna's reign (301-328 CE). Magnificent stupas, monasteries, and irrigation works were constructed. This period saw great literary works and the compilation of Buddhist scriptures.",
                "content_si": "අනුරාධපුර යුගය (ක්‍රි.පූ. 377 - ක්‍රි.ව. 1017) ශ්‍රී ලංකා ශිෂ්ටාචාරයේ ස්වර්ණමය යුගය නියෝජනය කරයි. අභය වැව, තිස්ස වැව වැනි මහා ජලාශ ඉදිකරන ලදී. මෙඝවර්ණ රජුගේ කාලයේ (301-328) ශ්‍රී දළදා වහන්සේ ශ්‍රී ලංකාවට ගෙන එන ලදී. විශිෂ්ට ස්තූප, විහාර සහ වාරිමාර්ග ඉදිකරන ලදී. මෙම කාලපරිච්ඡේදය මහා සාහිත්‍ය කෘති සහ බෞද්ධ ග්‍රන්ථ සම්පාදනය දුටුවේය.",
                "period_en": "377 BCE - 1017 CE",
                "period_si": "ක්‍රි.පූ. 377 - ක්‍රි.ව. 1017",
                "key_points_en": ["Great tanks built", "Sacred Tooth Relic brought (301-328 CE)", "Magnificent stupas constructed", "Literary works flourished", "Advanced irrigation systems"],
                "key_points_si": ["මහා ජලාශ ඉදිකළේය", "ශ්‍රී දළදා වහන්සේ ගෙන ආවේය (301-328)", "විශිෂ්ට ස්තූප ඉදිකළේය", "සාහිත්‍ය කෘති සමෘද්ධිය", "දියුණු වාරිමාර්ග පද්ධති"],
                "image_url": "https://images.unsplash.com/photo-1591178564787-da9fe2a3e46d?w=800",
                "xp_reward": 100
            },
            {
                "order": 5,
                "title_en": "Polonnaruwa Kingdom",
                "title_si": "පොළොන්නරුව රාජධානිය",
                "description_en": "The medieval capital of Sri Lanka and its magnificent achievements in art, architecture, and irrigation.",
                "description_si": "ශ්‍රී ලංකාවේ මධ්‍යකාලීන අගනුවර සහ කලාව, ගෘහනිර්මාණ ශිල්පය සහ වාරිමාර්ග හි එහි විශිෂ්ට ජයග්‍රහණ.",
                "content_en": "After Anuradhapura fell to South Indian invasions, Polonnaruwa became the capital (1055-1232 CE). King Parakramabahu I (1153-1186) was the greatest ruler, who said 'Not even a drop of water should flow to the sea without serving humanity'. He built the Parakrama Samudraya, restored many tanks and canals, and made Sri Lanka prosperous. The Gal Vihara rock sculptures represent the pinnacle of Sri Lankan art.",
                "content_si": "අනුරාධපුරය දකුණු ඉන්දීය ආක්‍රමණවලට යටත්වීමෙන් පසු පොළොන්නරුව අගනුවර බවට පත්විය (1055-1232). පරාක්‍රමබාහු මහ රජු (1153-1186) ශ්‍රේෂ්ඨතම පාලකයා වූ අතර 'ජනතාවට සේවය නොකර පිංජලයක වතුරවත් මුහුදට නොයා යුතුය' යැයි කීය. ඔහු පරාක්‍රම සමුද්‍රය ඉදිකළ අතර බොහෝ ජලාශ සහ ඇල පද්ධති ප්‍රතිසංස්කරණය කර ශ්‍රී ලංකාව සමෘද්ධිමත් කළේය. ගල්විහාරයේ ශිලා මූර්ති ශ්‍රී ලංකා කලාවේ උච්චතම අවස්ථාව නියෝජනය කරයි.",
                "period_en": "1055-1232 CE",
                "period_si": "ක්‍රි.ව. 1055-1232",
                "key_points_en": ["Capital after Anuradhapura", "King Parakramabahu I's greatness", "Parakrama Samudraya built", "Gal Vihara sculptures", "Irrigation masterpieces"],
                "key_points_si": ["අනුරාධපුරයෙන් පසු අගනුවර", "පරාක්‍රමබාහු මහ රජුගේ ශ්‍රේෂ්ඨත්වය", "පරාක්‍රම සමුද්‍රය ඉදිකිරීම", "ගල්විහාර මූර්ති", "වාරිමාර්ග විශිෂ්ට කෘති"],
                "image_url": "https://images.unsplash.com/photo-1598965675045-99d197bccc47?w=800",
                "xp_reward": 100
            },
            {
                "order": 6,
                "title_en": "Arrival of European Powers",
                "title_si": "යුරෝපීය බලවතුන්ගේ පැමිණීම",
                "description_en": "The arrival of Portuguese, Dutch, and British colonial powers and their impact on Sri Lanka.",
                "description_si": "පෘතුගීසි, ලන්දේසි සහ බ්‍රිතාන්‍ය යටත් විජිත බලවතුන්ගේ පැමිණීම සහ ශ්‍රී ලංකාවට ඔවුන්ගේ බලපෑම.",
                "content_en": "The Portuguese arrived in 1505 and controlled coastal areas until 1658. The Dutch then took control until 1796. The British gained control in 1796 and in 1815, the Kandyan Kingdom fell, giving Britain complete control of the island. Each colonial power left significant impacts on Sri Lankan culture, religion, economy, and governance.",
                "content_si": "පෘතුගීසීන් 1505 දී පැමිණ 1658 දක්වා වෙරළබඩ ප්‍රදේශ පාලනය කළහ. ඉන්පසු ලන්දේසීන් 1796 දක්වා පාලනය කළහ. බ්‍රිතාන්‍යයන් 1796 දී පාලනය ලබා ගත් අතර 1815 දී උඩරට රාජධානිය වැටීමත් සමඟ බ්‍රිතාන්‍යයට දිවයිනේ සම්පූර්ණ පාලනය හිමිවිය. සෑම යටත් විජිත බලවතෙක්ම ශ්‍රී ලංකා සංස්කෘතිය, ආගම, ආර්ථිකය සහ පාලනය කෙරෙහි සැලකිය යුතු බලපෑම් ඇති කළහ.",
                "period_en": "1505-1948",
                "period_si": "1505-1948",
                "key_points_en": ["Portuguese arrival (1505)", "Dutch period (1658-1796)", "British control (1796)", "Fall of Kandyan Kingdom (1815)", "Cultural and economic changes"],
                "key_points_si": ["පෘතුගීසීන්ගේ පැමිණීම (1505)", "ලන්දේසි යුගය (1658-1796)", "බ්‍රිතාන්‍ය පාලනය (1796)", "උඩරට රාජධානිය වැටීම (1815)", "සංස්කෘතික හා ආර්ථික වෙනස්කම්"],
                "image_url": "https://images.unsplash.com/photo-1555400082-a5fc76e97df1?w=800",
                "xp_reward": 100
            },
            {
                "order": 7,
                "title_en": "British Colonial Period",
                "title_si": "බ්‍රිතාන්‍ය යටත් විජිත යුගය",
                "description_en": "British rule and the transformation of Sri Lankan society, economy, and governance systems.",
                "description_si": "බ්‍රිතාන්‍ය පාලනය සහ ශ්‍රී ලංකා සමාජය, ආර්ථිකය සහ පාලන පද්ධතිවල පරිවර්තනය.",
                "content_en": "British rule (1796-1948) brought significant changes. Plantation economy (tea, coffee, rubber) was established. Infrastructure like railways and roads were built. English education system was introduced. The Colebrooke-Cameron reforms (1833) unified administrative systems. However, colonial exploitation and discrimination led to growing nationalism.",
                "content_si": "බ්‍රිතාන්‍ය පාලනය (1796-1948) සැලකිය යුතු වෙනස්කම් ගෙන ආවේය. වැවිලි ආර්ථිකය (තේ, කෝපි, රබර්) ස්ථාපිත කරන ලදී. දුම්රිය සහ මාර්ග වැනි යටිතල පහසුකම් ඉදිකරන ලදී. ඉංග්‍රීසි අධ්‍යාපන ක්‍රමය හඳුන්වා දෙන ලදී. කෝල්බෲක්-කැමරන් ප්‍රතිසංස්කරණ (1833) පරිපාලන පද්ධති එක්සත් කළේය. කෙසේවෙතත්, යටත් විජිත සූරාකෑම සහ වෙනස්කම් නිසා වැඩෙන ජාතිකවාදයක් ඇති විය.",
                "period_en": "1796-1948",
                "period_si": "1796-1948",
                "key_points_en": ["Plantation economy established", "Railways and infrastructure built", "English education introduced", "Colebrooke-Cameron reforms (1833)", "Rise of nationalism"],
                "key_points_si": ["වැවිලි ආර්ථිකය ස්ථාපිතය", "දුම්රිය සහ යටිතල පහසුකම්", "ඉංග්‍රීසි අධ්‍යාපනය හඳුන්වාදීම", "කෝල්බෲක්-කැමරන් ප්‍රතිසංස්කරණ (1833)", "ජාතිකවාදයේ උත්පත්තිය"],
                "image_url": "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?w=800",
                "xp_reward": 100
            },
            {
                "order": 8,
                "title_en": "National Awakening & Reform Movements",
                "title_si": "ජාතික පිබිදීම සහ ප්‍රතිසංස්කරණ ව්‍යාපාර",
                "description_en": "The rise of nationalist movements and social reforms in response to colonial rule.",
                "description_si": "යටත් විජිත පාලනයට ප්‍රතිචාරයක් ලෙස ජාතිකවාදී ව්‍යාපාර සහ සමාජ ප්‍රතිසංස්කරණවල නැගීම.",
                "content_en": "Anagarika Dharmapala led the Buddhist revival movement. The Temperance Movement fought against alcohol. Pirivena education system was established to preserve Buddhist education. Leaders like Ponnambalam Ramanathan and Ponnambalam Arunachalam worked for Tamil rights. The Ceylon National Congress (1919) and later political movements marked the growth of independence struggle.",
                "content_si": "අනගාරික ධර්මපාල බෞද්ධ පුනර්ජීවන ව්‍යාපාරයට නායකත්වය දුන්හ. මත්පැන්වලට එරෙහිව මධුසාරා විරෝධී ව්‍යාපාරය සටන් කළේය. බෞද්ධ අධ්‍යාපනය සුරැකීම සඳහා පිරිවෙන අධ්‍යාපන ක්‍රමය ස්ථාපිත කරන ලදී. පොන්නම්බලම් රාමනාදන් සහ පොන්නම්බලම් අරුණාචලම් වැනි නායකයෝ දෙමළ අයිතිවාසිකම් සඳහා වැඩ කළහ. ලංකා ජාතික කොංග්‍රසය (1919) සහ පසු දේශපාලන ව්‍යාපාර නිදහස් අරගලයේ වර්ධනය සනිටුහන් කළේය.",
                "period_en": "Late 1800s - Early 1900s",
                "period_si": "1800 අග - 1900 මුල",
                "key_points_en": ["Anagarika Dharmapala's Buddhist revival", "Temperance Movement", "Pirivena education", "Ceylon National Congress (1919)", "Growth of political consciousness"],
                "key_points_si": ["අනගාරික ධර්මපාලගේ බෞද්ධ පුනර්ජීවනය", "මධුසාරා විරෝධී ව්‍යාපාරය", "පිරිවෙන අධ්‍යාපනය", "ලංකා ජාතික කොංග්‍රසය (1919)", "දේශපාලන අවබෝධයේ වර්ධනය"],
                "image_url": "https://images.unsplash.com/photo-1529511582893-2d7e684dd128?w=800",
                "xp_reward": 100
            },
            {
                "order": 9,
                "title_en": "Independence Movement",
                "title_si": "නිදහස් ව්‍යාපාරය",
                "description_en": "The struggle for independence led by national leaders and the path to freedom.",
                "description_si": "ජාතික නායකයන් විසින් මෙහෙයවන ලද නිදහස සඳහා වූ අරගලය සහ නිදහසට යන මාර්ගය.",
                "content_en": "D.S. Senanayake, the 'Father of the Nation', led the independence movement through constitutional means. The State Council (1931) introduced universal adult suffrage - a first in Asia. The Soulbury Commission (1944-45) drafted the constitution for independence. Unlike many colonies, Sri Lanka gained independence peacefully through negotiations.",
                "content_si": "'ජාතියේ පියා' ලෙස හැඳින්වෙන ඩී.එස්. සේනානායක ව්‍යවස්ථාපිත මාර්ග හරහා නිදහස් ව්‍යාපාරයට නායකත්වය දුන්හ. රාජ්‍ය මණ්ඩලය (1931) විශ්වීය වැඩිහිටි ඡන්ද අයිතිය හඳුන්වා දුන්නේය - ආසියාවේ පළමු වරට. සෝල්බරි කොමිසම (1944-45) නිදහස සඳහා ව්‍යවස්ථාව කෙටුම්පත් කළේය. බොහෝ යටත් විජිත මෙන් නොව, ශ්‍රී ලංකාව සාමකාමීව සාකච්ඡා මගින් නිදහස ලබා ගත්තේය.",
                "period_en": "1920s-1948",
                "period_si": "1920-1948",
                "key_points_en": ["D.S. Senanayake's leadership", "State Council (1931)", "Universal adult suffrage - first in Asia", "Soulbury Commission (1944-45)", "Peaceful independence through negotiations"],
                "key_points_si": ["ඩී.එස්. සේනානායකගේ නායකත්වය", "රාජ්‍ය මණ්ඩලය (1931)", "විශ්වීය ඡන්ද අයිතිය - ආසියාවේ පළමු", "සෝල්බරි කොමිසම (1944-45)", "සාකච්ඡා මගින් සාමකාමී නිදහස"],
                "image_url": "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800",
                "xp_reward": 100
            },
            {
                "order": 10,
                "title_en": "Independence Day - February 4, 1948",
                "title_si": "නිදහස් දිනය - 1948 පෙබරවාරි 4",
                "description_en": "Sri Lanka's independence from British rule and the beginning of a new era as a sovereign nation.",
                "description_si": "බ්‍රිතාන්‍ය පාලනයෙන් ශ්‍රී ලංකාවේ නිදහස සහ ස්වෛරී ජාතියක් ලෙස නව යුගයක ආරම්භය.",
                "content_en": "On February 4, 1948, Ceylon (now Sri Lanka) gained independence from British rule. D.S. Senanayake became the first Prime Minister. The independence ceremony was held at Independence Square in Colombo. Sri Lanka became a dominion within the British Commonwealth. This marked the beginning of self-governance and a new chapter in the nation's history.",
                "content_si": "1948 පෙබරවාරි 4 වන දින ලංකාව (වර්තමාන ශ්‍රී ලංකාව) බ්‍රිතාන්‍ය පාලනයෙන් නිදහස ලබා ගත්තේය. ඩී.එස්. සේනානායක පළමු අග්‍රාමාත්‍යවරයා බවට පත්විය. නිදහස් උත්සවය කොළඹ නිදහස් චතුරශ්‍රයේදී පවත්වන ලදී. ශ්‍රී ලංකාව බ්‍රිතාන්‍ය පොදු රාජ්‍ය මණ්ඩලය තුළ ඩොමීනියන් රාජ්‍යයක් බවට පත්විය. මෙය ස්වයං පාලනයේ ආරම්භය සහ ජාතියේ ඉතිහාසයේ නව පරිච්ඡේදයක් සනිටුහන් කළේය.",
                "period_en": "February 4, 1948",
                "period_si": "1948 පෙබරවාරි 4",
                "key_points_en": ["Independence on February 4, 1948", "D.S. Senanayake - First Prime Minister", "Ceremony at Independence Square", "Dominion status in Commonwealth", "Beginning of self-governance"],
                "key_points_si": ["1948 පෙබරවාරි 4 නිදහස", "ඩී.එස්. සේනානායක - පළමු අග්‍රාමාත්‍යවරයා", "නිදහස් චතුරශ්‍රයේ උත්සවය", "පොදු රාජ්‍ය මණ්ඩලයේ ඩොමීනියන් තත්ත්වය", "ස්වයං පාලනයේ ආරම්භය"],
                "image_url": "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=800",
                "xp_reward": 150
            }
        ]
        
        # Add lessons to database
        for lesson_data in lessons_data:
            lesson = Lesson(**lesson_data)
            db.add(lesson)
        
        db.commit()
        print(f"✅ Added {len(lessons_data)} lessons successfully!")
        
        # ============================================
        # Quiz Questions for Each Lesson
        # ============================================
        
        print("\n🔄 Adding quiz questions...")
        
        quiz_questions = [
            # Lesson 1: Vijaya
            {
                "lesson_id": 1,
                "question_en": "When did Prince Vijaya arrive in Sri Lanka?",
                "question_si": "විජය කුමරු ශ්‍රී ලංකාවට පැමිණියේ කවදාද?",
                "options_en": ["543 BCE", "437 BCE", "247 BCE", "161 BCE"],
                "options_si": ["ක්‍රි.පූ. 543", "ක්‍රි.පූ. 437", "ක්‍රි.පූ. 247", "ක්‍රි.පූ. 161"],
                "correct_answer": "0",
                "explanation_en": "Prince Vijaya arrived on the day of Buddha's parinirvana in 543 BCE.",
                "explanation_si": "විජය කුමරු බුදුන් වහන්සේගේ පරිනිර්වාණ දිනයේදීම ක්‍රි.පූ. 543 දී පැමිණියේය."
            },
            {
                "lesson_id": 1,
                "question_en": "Where did Prince Vijaya first land in Sri Lanka?",
                "question_si": "විජය කුමරු ශ්‍රී ලංකාවේ මුලින්ම ගොඩබැස්සේ කොහේද?",
                "options_en": ["Tambapanni", "Anuradhapura", "Polonnaruwa", "Galle"],
                "options_si": ["තම්බපණ්ණිය", "අනුරාධපුරය", "පොළොන්නරුව", "ගාල්ල"],
                "correct_answer": "0",
                "explanation_en": "Vijaya landed at Tambapanni (present-day Mannar).",
                "explanation_si": "විජය තම්බපණ්ණියට (වර්තමාන මන්නාරම) ගොඩ බැස්සේය."
            },
            {
                "lesson_id": 1,
                "question_en": "Who did Prince Vijaya marry?",
                "question_si": "විජය කුමරු විවාහ වූයේ කා සමඟද?",
                "options_en": ["Kuveni", "Sanghamitta", "Viharamahadevi", "Sugala"],
                "options_si": ["කුවේණි", "සංඝමිත්තා", "විහාරමහාදේවි", "සුගලා"],
                "correct_answer": "0",
                "explanation_en": "Vijaya married Kuveni, a Yaksha princess.",
                "explanation_si": "විජය යක්ෂ කුමරියක් වූ කුවේණි සමඟ විවාහ විය."
            },
            
            # Lesson 2: Devanampiyatissa
            {
                "lesson_id": 2,
                "question_en": "Who introduced Buddhism to Sri Lanka?",
                "question_si": "ශ්‍රී ලංකාවට බුද්ධාගම හඳුන්වා දුන්නේ කවුද?",
                "options_en": ["Arahat Mahinda", "Emperor Ashoka", "Sanghamitta Theri", "Buddha"],
                "options_si": ["අරහත් මහින්ද ස්ථවිරයෝ", "අශෝක මහ රජු", "සංඝමිත්තා තෙරණිය", "බුදුරජාණන් වහන්සේ"],
                "correct_answer": "0",
                "explanation_en": "Arahat Mahinda, son of Emperor Ashoka, introduced Buddhism in 247 BCE.",
                "explanation_si": "අශෝක මහ රජුගේ පුත් අරහත් මහින්ද ස්ථවිරයෝ ක්‍රි.පූ. 247 දී බුද්ධාගම හඳුන්වා දුන්හ."
            },
            {
                "lesson_id": 2,
                "question_en": "Where did Buddhism first arrive in Sri Lanka?",
                "question_si": "ශ්‍රී ලංකාවට බුද්ධාගම පළමුව පැමිණියේ කොහේද?",
                "options_en": ["Mihintale", "Anuradhapura", "Kelaniya", "Mahiyangana"],
                "options_si": ["මිහින්තලය", "අනුරාධපුරය", "කැලණිය", "මහියංගනය"],
                "correct_answer": "0",
                "explanation_en": "Arahat Mahinda met King Devanampiyatissa at Mihintale.",
                "explanation_si": "අරහත් මහින්ද ස්ථවිරයෝ දෙවානම්පියතිස්ස රජු හමුවූයේ මිහින්තලයේදීය."
            },
            {
                "lesson_id": 2,
                "question_en": "Who brought the sacred Bo sapling to Sri Lanka?",
                "question_si": "ශ්‍රී මහා බෝධිය ශ්‍රී ලංකාවට ගෙන ආවේ කවුද?",
                "options_en": ["Sanghamitta Theri", "Arahat Mahinda", "Emperor Ashoka", "King Devanampiyatissa"],
                "options_si": ["සංඝමිත්තා තෙරණිය", "අරහත් මහින්ද ස්ථවිරයෝ", "අශෝක මහ රජු", "දෙවානම්පියතිස්ස රජු"],
                "correct_answer": "0",
                "explanation_en": "Sanghamitta Theri brought the sacred Bo sapling from India.",
                "explanation_si": "සංඝමිත්තා තෙරණිය ඉන්දියාවෙන් ශ්‍රී මහා බෝධිය ගෙන ආවාය."
            },
            
            # Lesson 3: Dutugemunu
            {
                "lesson_id": 3,
                "question_en": "Which king did Dutugemunu defeat to unify Sri Lanka?",
                "question_si": "දුටුගැමුණු ශ්‍රී ලංකාව එක්සත් කිරීම සඳහා පරාජය කළ රජු කවුද?",
                "options_en": ["King Elara", "King Vijaya", "King Parakramabahu", "King Ashoka"],
                "options_si": ["එළාර රජු", "විජය රජු", "පරාක්‍රමබාහු රජු", "අශෝක රජු"],
                "correct_answer": "0",
                "explanation_en": "Dutugemunu defeated King Elara in battle at Vijithapura.",
                "explanation_si": "දුටුගැමුණු විජිතපුරයේදී එළාර රජු පරාජය කළේය."
            },
            {
                "lesson_id": 3,
                "question_en": "What is King Dutugemunu's most famous construction?",
                "question_si": "දුටුගැමුණු රජුගේ වඩාත් ප්‍රසිද්ධ ඉදිකිරීම කුමක්ද?",
                "options_en": ["Ruwanwelisaya", "Jetavanaramaya", "Abhayagiriya", "Thuparamaya"],
                "options_si": ["රුවන්වැලිසෑය", "ජේතවනාරාමය", "අභයගිරිය", "ථූපාරාමය"],
                "correct_answer": "0",
                "explanation_en": "Dutugemunu built the magnificent Ruwanwelisaya stupa.",
                "explanation_si": "දුටුගැමුණු විශිෂ්ට රුවන්වැලිසෑය ඉදිකළේය."
            },
            
            # Lesson 4: Anuradhapura Golden Era
            {
                "lesson_id": 4,
                "question_en": "During which king's reign was the Sacred Tooth Relic brought to Sri Lanka?",
                "question_si": "ශ්‍රී දළදා වහන්සේ ශ්‍රී ලංකාවට ගෙන ආවේ කුමන රජුගේ කාලයේද?",
                "options_en": ["Sirimeghavanna", "Dutugemunu", "Devanampiyatissa", "Parakramabahu"],
                "options_si": ["මෙඝවර්ණ", "දුටුගැමුණු", "දෙවානම්පියතිස්ස", "පරාක්‍රමබාහු"],
                "correct_answer": "0",
                "explanation_en": "The Sacred Tooth Relic was brought during King Sirimeghavanna's reign (301-328 CE).",
                "explanation_si": "ශ්‍රී දළදා වහන්සේ මෙඝවර්ණ රජුගේ කාලයේ (301-328) ගෙන එන ලදී."
            },
            {
                "lesson_id": 4,
                "question_en": "What was the Anuradhapura period known for?",
                "question_si": "අනුරාධපුර යුගය ප්‍රසිද්ධ වූයේ කුමකටද?",
                "options_en": ["Irrigation and Buddhist culture", "Trade with Europe", "Military conquests", "Modern technology"],
                "options_si": ["වාරිමාර්ග සහ බෞද්ධ සංස්කෘතිය", "යුරෝපය සමඟ වෙළඳාම", "යුද ජයග්‍රහණ", "නවීන තාක්ෂණය"],
                "correct_answer": "0",
                "explanation_en": "Anuradhapura was famous for advanced irrigation systems and Buddhist civilization.",
                "explanation_si": "අනුරාධපුරය දියුණු වාරිමාර්ග පද්ධති සහ බෞද්ධ ශිෂ්ටාචාරය සඳහා ප්‍රසිද්ධ විය."
            },
            
            # Lesson 5: Polonnaruwa
            {
                "lesson_id": 5,
                "question_en": "Who was the greatest king of Polonnaruwa?",
                "question_si": "පොළොන්නරුවේ ශ්‍රේෂ්ඨතම රජු කවුද?",
                "options_en": ["Parakramabahu I", "Dutugemunu", "Vijayabahu I", "Nissanka Malla"],
                "options_si": ["පරාක්‍රමබාහු මහ රජු", "දුටුගැමුණු", "විජයබාහු", "නිශ්ශංක මල්ල"],
                "correct_answer": "0",
                "explanation_en": "Parakramabahu I (1153-1186) was the greatest ruler of Polonnaruwa.",
                "explanation_si": "පරාක්‍රමබාහු මහ රජු (1153-1186) පොළොන්නරුවේ ශ්‍රේෂ්ඨතම පාලකයා විය."
            },
            {
                "lesson_id": 5,
                "question_en": "What famous saying is attributed to King Parakramabahu?",
                "question_si": "පරාක්‍රමබාහු රජුට ආරෝපණය කරන ප්‍රසිද්ධ කථාව කුමක්ද?",
                "options_en": ["Not a drop of water should go to waste", "Education for all", "Justice for everyone", "Build more temples"],
                "options_si": ["පිංජලයක වතුරවත් නාස්ති නොකළ යුතුය", "සැමට අධ්‍යාපනය", "සැමට යුක්තිය", "තවත් විහාර ගොඩනඟන්න"],
                "correct_answer": "0",
                "explanation_en": "He said 'Not even a drop of water should flow to the sea without serving humanity'.",
                "explanation_si": "ඔහු කීවේ 'ජනතාවට සේවය නොකර පිංජලයක වතුරවත් මුහුදට නොයා යුතුය' යනුවෙනි."
            },
            
            # Lesson 6: European Arrival
            {
                "lesson_id": 6,
                "question_en": "When did the Portuguese first arrive in Sri Lanka?",
                "question_si": "පෘතුගීසීන් ශ්‍රී ලංකාවට පළමුව පැමිණියේ කවදාද?",
                "options_en": ["1505", "1658", "1796", "1815"],
                "options_si": ["1505", "1658", "1796", "1815"],
                "correct_answer": "0",
                "explanation_en": "The Portuguese arrived in Sri Lanka in 1505.",
                "explanation_si": "පෘතුගීසීන් 1505 දී ශ්‍රී ලංකාවට පැමිණියහ."
            },
            {
                "lesson_id": 6,
                "question_en": "Which European power ruled Sri Lanka before the British?",
                "question_si": "බ්‍රිතාන්‍යයන්ට පෙර ශ්‍රී ලංකාව පාලනය කළ යුරෝපීය බලවතා කවුද?",
                "options_en": ["Dutch", "Portuguese", "French", "Spanish"],
                "options_si": ["ලන්දේසීන්", "පෘතුගීසීන්", "ප්‍රංශ", "ස්පාඤ්ඤ"],
                "correct_answer": "0",
                "explanation_en": "The Dutch ruled from 1658 to 1796 before British control.",
                "explanation_si": "බ්‍රිතාන්‍ය පාලනයට පෙර ලන්දේසීන් 1658 සිට 1796 දක්වා පාලනය කළහ."
            },
            
            # Lesson 7: British Period
            {
                "lesson_id": 7,
                "question_en": "What was the main economic activity introduced by the British?",
                "question_si": "බ්‍රිතාන්‍යයන් හඳුන්වා දුන් ප්‍රධාන ආර්ථික ක්‍රියාකාරකම කුමක්ද?",
                "options_en": ["Plantation economy", "Fishing", "Mining", "Tourism"],
                "options_si": ["වැවිලි ආර්ථිකය", "මසුන් ඇල්ලීම", "පතල් කර්මාන්තය", "සංචාරක කර්මාන්තය"],
                "correct_answer": "0",
                "explanation_en": "British established plantation economy with tea, coffee, and rubber.",
                "explanation_si": "බ්‍රිතාන්‍යයන් තේ, කෝපි සහ රබර් වැවිලි ආර්ථිකය ස්ථාපිත කළහ."
            },
            {
                "lesson_id": 7,
                "question_en": "When did the Kandyan Kingdom fall to British rule?",
                "question_si": "උඩරට රාජධානිය බ්‍රිතාන්‍ය පාලනයට යටත් වූයේ කවදාද?",
                "options_en": ["1815", "1796", "1833", "1948"],
                "options_si": ["1815", "1796", "1833", "1948"],
                "correct_answer": "0",
                "explanation_en": "The Kandyan Kingdom fell in 1815, giving Britain complete control.",
                "explanation_si": "උඩරට රාජධානිය 1815 දී වැටී බ්‍රිතාන්‍යයට සම්පූර්ණ පාලනය හිමි විය."
            },
            
            # Lesson 8: National Awakening
            {
                "lesson_id": 8,
                "question_en": "Who led the Buddhist revival movement?",
                "question_si": "බෞද්ධ පුනර්ජීවන ව්‍යාපාරයට නායකත්වය දුන්නේ කවුද?",
                "options_en": ["Anagarika Dharmapala", "D.S. Senanayake", "Ponnambalam Ramanathan", "S.W.R.D. Bandaranaike"],
                "options_si": ["අනගාරික ධර්මපාල", "ඩී.එස්. සේනානායක", "පොන්නම්බලම් රාමනාදන්", "එස්.ඩබ්ලිව්.ආර්.ඩී. බණ්ඩාරනායක"],
                "correct_answer": "0",
                "explanation_en": "Anagarika Dharmapala led the Buddhist revival movement in the late 1800s.",
                "explanation_si": "අනගාරික ධර්මපාල 1800 දශකයේ අගභාගයේ බෞද්ධ පුනර්ජීවන ව්‍යාපාරයට නායකත්වය දුන්හ."
            },
            {
                "lesson_id": 8,
                "question_en": "When was the Ceylon National Congress formed?",
                "question_si": "ලංකා ජාතික කොංග්‍රසය පිහිටුවන ලද්දේ කවදාද?",
                "options_en": ["1919", "1931", "1944", "1948"],
                "options_si": ["1919", "1931", "1944", "1948"],
                "correct_answer": "0",
                "explanation_en": "The Ceylon National Congress was formed in 1919.",
                "explanation_si": "ලංකා ජාතික කොංග්‍රසය 1919 දී පිහිටුවන ලදී."
            },
            
            # Lesson 9: Independence Movement
            {
                "lesson_id": 9,
                "question_en": "Who is known as the 'Father of the Nation' in Sri Lanka?",
                "question_si": "ශ්‍රී ලංකාවේ 'ජාතියේ පියා' ලෙස හඳුන්වන්නේ කවුද?",
                "options_en": ["D.S. Senanayake", "Anagarika Dharmapala", "S.W.R.D. Bandaranaike", "Dudley Senanayake"],
                "options_si": ["ඩී.එස්. සේනානායක", "අනගාරික ධර්මපාල", "එස්.ඩබ්ලිව්.ආර්.ඩී. බණ්ඩාරනායක", "ඩඩ්ලි සේනානායක"],
                "correct_answer": "0",
                "explanation_en": "D.S. Senanayake is known as the 'Father of the Nation'.",
                "explanation_si": "ඩී.එස්. සේනානායක 'ජාතියේ පියා' ලෙස හැඳින්වේ."
            },
            {
                "lesson_id": 9,
                "question_en": "When was universal adult suffrage introduced in Ceylon?",
                "question_si": "ලංකාවේ විශ්වීය වැඩිහිටි ඡන්ද අයිතිය හඳුන්වා දුන්නේ කවදාද?",
                "options_en": ["1931", "1919", "1944", "1948"],
                "options_si": ["1931", "1919", "1944", "1948"],
                "correct_answer": "0",
                "explanation_en": "Universal adult suffrage was introduced in 1931 - first in Asia.",
                "explanation_si": "විශ්වීය වැඩිහිටි ඡන්ද අයිතිය 1931 දී හඳුන්වා දෙන ලදී - ආසියාවේ පළමු."
            },
            
            # Lesson 10: Independence
            {
                "lesson_id": 10,
                "question_en": "On which date did Sri Lanka gain independence?",
                "question_si": "ශ්‍රී ලංකාව නිදහස ලබා ගත්තේ කුමන දිනයේද?",
                "options_en": ["February 4, 1948", "January 26, 1948", "August 15, 1947", "May 18, 1948"],
                "options_si": ["1948 පෙබරවාරි 4", "1948 ජනවාරි 26", "1947 අගෝස්තු 15", "1948 මැයි 18"],
                "correct_answer": "0",
                "explanation_en": "Sri Lanka gained independence on February 4, 1948.",
                "explanation_si": "ශ්‍රී ලංකාව 1948 පෙබරවාරි 4 වන දින නිදහස ලබා ගත්තේය."
            },
            {
                "lesson_id": 10,
                "question_en": "Who became the first Prime Minister of independent Ceylon?",
                "question_si": "නිදහස් ලංකාවේ පළමු අග්‍රාමාත්‍යවරයා වූයේ කවුද?",
                "options_en": ["D.S. Senanayake", "Dudley Senanayake", "S.W.R.D. Bandaranaike", "John Kotelawala"],
                "options_si": ["ඩී.එස්. සේනානායක", "ඩඩ්ලි සේනානායක", "එස්.ඩබ්ලිව්.ආර්.ඩී. බණ්ඩාරනායක", "ජෝන් කොතලාවල"],
                "correct_answer": "0",
                "explanation_en": "D.S. Senanayake became the first Prime Minister on February 4, 1948.",
                "explanation_si": "ඩී.එස්. සේනානායක 1948 පෙබරවාරි 4 වන දින පළමු අග්‍රාමාත්‍යවරයා බවට පත්විය."
            }
        ]
        
        # Add quiz questions to database
        for question_data in quiz_questions:
            question = QuizQuestion(**question_data)
            db.add(question)
        
        db.commit()
        print(f"✅ Added {len(quiz_questions)} quiz questions successfully!")
        
        # ============================================
        # Achievements
        # ============================================
        
        print("\n🔄 Adding achievements...")
        
        achievements_data = [
            {
                "code": "first_steps",
                "name_en": "First Steps",
                "name_si": "පළමු පියවර",
                "description_en": "Complete your first lesson",
                "description_si": "ඔබේ පළමු පාඩම සම්පූර්ණ කරන්න",
                "icon": "🎯",
                "xp_reward": 50,
                "badge_color": "#4CAF50",
                "requirement_type": "lessons_completed",
                "requirement_value": 1
            },
            {
                "code": "history_scholar",
                "name_en": "History Scholar",
                "name_si": "ඉතිහාස විශාරද",
                "description_en": "Complete 5 lessons",
                "description_si": "පාඩම් 5ක් සම්පූර්ණ කරන්න",
                "icon": "📚",
                "xp_reward": 100,
                "badge_color": "#2196F3",
                "requirement_type": "lessons_completed",
                "requirement_value": 5
            },
            {
                "code": "master_historian",
                "name_en": "Master Historian",
                "name_si": "ප්‍රවීණ ඉතිහාසඥයා",
                "description_en": "Complete all 10 lessons",
                "description_si": "සියලුම පාඩම් 10 සම්පූර්ණ කරන්න",
                "icon": "👑",
                "xp_reward": 200,
                "badge_color": "#FFD700",
                "requirement_type": "lessons_completed",
                "requirement_value": 10
            },
            {
                "code": "perfect_score",
                "name_en": "Perfect Score",
                "name_si": "පරිපූර්ණ ලකුණු",
                "description_en": "Score 100% in a quiz",
                "description_si": "ප්‍රශ්නාවලියකින් 100% ලබා ගන්න",
                "icon": "⭐",
                "xp_reward": 75,
                "badge_color": "#FF9800",
                "requirement_type": "quiz_score",
                "requirement_value": 100
            },
            {
                "code": "quiz_master",
                "name_en": "Quiz Master",
                "name_si": "ප්‍රශ්න ප්‍රවීණයා",
                "description_en": "Complete 10 quizzes",
                "description_si": "ප්‍රශ්නාවලි 10ක් සම්පූර්ණ කරන්න",
                "icon": "🏆",
                "xp_reward": 150,
                "badge_color": "#9C27B0",
                "requirement_type": "quizzes_completed",
                "requirement_value": 10
            },
            {
                "code": "week_warrior",
                "name_en": "Week Warrior",
                "name_si": "සති රණකාමියා",
                "description_en": "Study for 7 consecutive days",
                "description_si": "අඛණ්ඩව දින 7ක් අධ්‍යයනය කරන්න",
                "icon": "🔥",
                "xp_reward": 100,
                "badge_color": "#F44336",
                "requirement_type": "streak_days",
                "requirement_value": 7
            },
            {
                "code": "vijayas_heir",
                "name_en": "Vijaya's Heir",
                "name_si": "විජයගේ උරුමක්කාරයා",
                "description_en": "Complete Lesson 1 with 100%",
                "description_si": "පාඩම 1 100% සමඟ සම්පූර්ණ කරන්න",
                "icon": "⚔️",
                "xp_reward": 50,
                "badge_color": "#795548",
                "requirement_type": "lesson_perfect",
                "requirement_value": 1
            },
            {
                "code": "buddhist_scholar",
                "name_en": "Buddhist Scholar",
                "name_si": "බෞද්ධ විශාරද",
                "description_en": "Complete lessons on Buddhism",
                "description_si": "බුද්ධාගම පිළිබඳ පාඩම් සම්පූර්ණ කරන්න",
                "icon": "☸️",
                "xp_reward": 100,
                "badge_color": "#FF6F00",
                "requirement_type": "lesson_perfect",
                "requirement_value": 2
            },
            {
                "code": "independence_hero",
                "name_en": "Independence Hero",
                "name_si": "නිදහස් වීරයා",
                "description_en": "Complete Lesson 10 about Independence",
                "description_si": "නිදහස පිළිබඳ පාඩම 10 සම්පූර්ණ කරන්න",
                "icon": "🇱🇰",
                "xp_reward": 150,
                "badge_color": "#8B0000",
                "requirement_type": "lesson_perfect",
                "requirement_value": 10
            },
            {
                "code": "knowledge_seeker",
                "name_en": "Knowledge Seeker",
                "name_si": "දැනුම් සොයන්නා",
                "description_en": "Read all lesson content",
                "description_si": "සියලුම පාඩම් අන්තර්ගතය කියවන්න",
                "icon": "📖",
                "xp_reward": 75,
                "badge_color": "#00BCD4",
                "requirement_type": "lessons_completed",
                "requirement_value": 10
            }
        ]
        
        # Add achievements to database
        for achievement_data in achievements_data:
            achievement = Achievement(**achievement_data)
            db.add(achievement)
        
        db.commit()
        print(f"✅ Added {len(achievements_data)} achievements successfully!")
        
        print("\n" + "="*60)
        print("🎉 Database initialization completed successfully!")
        print("="*60)
        print(f"\n📊 Summary:")
        print(f"   ✅ Lessons: {len(lessons_data)}")
        print(f"   ✅ Quiz Questions: {len(quiz_questions)}")
        print(f"   ✅ Achievements: {len(achievements_data)}")
        print("\n🚀 You can now start the FastAPI server!")
        print("   Run: uvicorn app.main:app --reload")
        print("="*60)
        
    except Exception as e:
        print(f"\n❌ Error occurred: {str(e)}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    print("="*60)
    print("🏛️  History Learning Website - Database Initialization")
    print("="*60)
    init_database()
