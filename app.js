const tools = [
["Direct Video Downloader","Media","↓","Unduh video dari direct link MP4/WebM yang memang bisa diakses publik.","download"],
["Image Compressor","Media","▧","Kompres gambar di browser dengan pengaturan kualitas.","imagecompress"],
["Image Resizer","Media","⤢","Ubah dimensi gambar menggunakan canvas browser.","imageresize"],
["Image to Base64","Media","▤","Ubah gambar menjadi data URL Base64.","imagebase64"],
["Video Metadata Viewer","Media","◉","Lihat durasi, dimensi, dan informasi dasar video lokal.","videometa"],
["Audio Metadata Viewer","Media","♫","Lihat durasi dan informasi dasar file audio lokal.","audiometa"],
["GIF Frame Helper","Media","▦","Buka dan pratinjau GIF animasi dari file lokal.","generic"],
["Color Palette from Image","Media","◈","Ambil sampel warna dominan sederhana dari gambar.","palette"],
["Aspect Ratio Calculator","Media","⤡","Hitung dimensi video/gambar berdasarkan rasio.","aspect"],
["Media File Inspector","Media","▣","Periksa tipe MIME dan ukuran file media lokal.","fileinspect"],
["Word & Character Counter","Teks","≋","Hitung kata, karakter, kalimat, dan estimasi waktu baca.","wordcount"],
["Case Converter","Teks","Aa","Ubah teks ke uppercase, lowercase, atau Title Case.","case"],
["Remove Duplicate Lines","Teks","☷","Hapus baris duplikat dengan cepat.","duplicates"],
["Text Cleaner","Teks","✧","Rapikan spasi dan baris kosong berlebih.","cleantext"],
["Lorem Ipsum Generator","Teks","¶","Buat teks placeholder untuk desain dan mockup.","lorem"],
["Markdown Preview","Teks","M↓","Tulis Markdown dan lihat pratinjau teksnya.","markdown"],
["Slug Generator","Teks","↗","Ubah judul menjadi URL slug yang rapi.","slug"],
["Text Diff Lite","Teks","⇄","Bandingkan dua teks secara sederhana.","diff"],
["URL Encoder / Decoder","Teks","％","Encode dan decode komponen URL.","url"],
["Base64 Text Encoder","Teks","64","Encode atau decode teks Base64.","base64"],
["JSON Formatter","Developer","{}","Format dan validasi JSON dengan indentasi rapi.","json"],
["JSON Minifier","Developer","{ }","Ringkas JSON dengan menghapus whitespace.","jsonmini"],
["HTML Escape / Unescape","Developer","</>","Escape karakter HTML atau kembalikan ke teks biasa.","html"],
["CSS Gradient Builder","Developer","◒","Buat CSS linear-gradient dan salin hasilnya.","gradient"],
["Regex Tester","Developer",".*","Uji pola regex terhadap teks contoh.","regex"],
["UUID Generator","Developer","⊹","Buat UUID v4 untuk ID dan testing.","uuid"],
["Hash Generator","Developer","#","Hitung SHA-256 teks dengan Web Crypto API.","hash"],
["JWT Decoder","Developer","JWT","Decode payload JWT tanpa memverifikasi tanda tangan.","jwt"],
["Timestamp Converter","Developer","◷","Konversi Unix timestamp ke tanggal lokal.","timestamp"],
["Cron Expression Helper","Developer","◴","Panduan format cron dan contoh ekspresi umum.","cron"],
["URL Parser","Developer","⌁","Pisahkan protokol, host, path, query, dan hash URL.","urlparse"],
["User Agent Viewer","Developer","⌘","Lihat string user agent browser saat ini.","ua"],
["HTML Entity Helper","Developer","&","Encode/decode beberapa HTML entities.","html"],
["XML Pretty Printer","Developer","⌗","Format XML sederhana dengan parser browser.","xml"],
["Password Generator","Utilitas","⛨","Buat password acak di browser dengan Web Crypto.","password"],
["QR Code Quick Link","Utilitas","▦","Buat QR melalui layanan eksternal; jangan masukkan data rahasia.","qr"],
["Color Converter","Utilitas","◉","Konversi HEX dan RGB sederhana.","color"],
["Unit Converter","Utilitas","⇌","Konversi satuan panjang, berat, dan suhu.","units"],
["Percentage Calculator","Utilitas","％","Hitung persentase, kenaikan, dan penurunan.","percent"],
["Tip Calculator","Utilitas","＋","Hitung tip dan pembagian tagihan.","tip"],
["Age Calculator","Utilitas","♧","Hitung usia berdasarkan tanggal lahir.","age"],
["Date Difference","Utilitas","▦","Hitung jarak hari antara dua tanggal.","datediff"],
["Pomodoro Timer","Utilitas","◴","Timer fokus sederhana dengan kontrol manual.","pomodoro"],
["Random Number Generator","Utilitas","⚄","Hasilkan angka acak dalam rentang pilihan.","random"],
["List Randomizer","Utilitas","⤨","Acak urutan daftar teks.","shuffle"],
["Text to Speech","Utilitas","◖","Bacakan teks memakai fitur speech browser jika tersedia.","speech"],
["Speech to Text","Utilitas","◉","Dikte suara memakai dukungan browser jika tersedia.","speechin"],
["Internet Speed Note","Utilitas","↯","Catat hasil speed test eksternal secara manual.","speednote"],
["Favicon Previewer","Utilitas","✳","Pratinjau favicon dari URL gambar.","favicon"],
["Privacy Checklist","Utilitas","✓","Checklist singkat sebelum membagikan file atau tautan.","privacy"]
];
const icons = {Media:"▣",Teks:"≋",Developer:"⌘",Utilitas:"◈"};
const grid=document.getElementById('toolGrid'), search=document.getElementById('searchInput'), empty=document.getElementById('emptyState');
let category='Semua', favorites=new Set();
function render(){
 const q=search.value.toLowerCase().trim();
 const filtered=tools.map((t,i)=>({...t,id:i})).filter(t=>(category==='Semua'||t[1]===category)&&(!q||(t[0]+' '+t[1]+' '+t[3]).toLowerCase().includes(q)));
 document.getElementById('visibleCount').textContent=filtered.length;
 grid.innerHTML=filtered.map(t=>`<article class="tool-card" data-id="${t.id}" style="animation-delay:${Math.min((t.id%8)*.025,.18)}s" tabindex="0" role="button" aria-label="Buka ${esc(t[0])}">
 <div class="card-top"><span class="tool-icon">${esc(t[2])}</span><button class="favorite ${favorites.has(t.id)?'on':''}" data-fav="${t.id}" aria-label="Favoritkan ${esc(t[0])}">${favorites.has(t.id)?'★':'☆'}</button></div>
 <h3>${esc(t[0])}</h3><p>${esc(t[3])}</p><div class="card-bottom"><span class="category-tag">${t[1]}</span><span class="open-arrow">↗</span></div></article>`).join('');
 empty.hidden=filtered.length!==0;
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
document.getElementById('filters').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;category=b.dataset.category;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));render()});
search.addEventListener('input',render);
grid.addEventListener('click',e=>{const f=e.target.closest('[data-fav]');if(f){const id=+f.dataset.fav;favorites.has(id)?favorites.delete(id):favorites.add(id);render();return}const c=e.target.closest('[data-id]');if(c)openTool(+c.dataset.id)});
grid.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-id]')){e.preventDefault();openTool(+e.target.dataset.id)}});
document.getElementById('themeBtn').addEventListener('click',()=>document.body.classList.toggle('dark'));
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();search.focus()}if(e.key==='Escape')closeModal()});
const backdrop=document.getElementById('modalBackdrop'),panel=document.getElementById('toolPanel');
function closeModal(){backdrop.hidden=true;panel.innerHTML=''}
document.getElementById('modalClose').onclick=closeModal;
backdrop.addEventListener('click',e=>{if(e.target===backdrop)closeModal()});
function field(label,id,placeholder='',type='text'){return `<label class="panel-label" for="${id}">${label}</label><input class="panel-input" id="${id}" type="${type}" placeholder="${esc(placeholder)}">`}
function area(label,id,placeholder=''){return `<label class="panel-label" for="${id}">${label}</label><textarea class="panel-area" id="${id}" placeholder="${esc(placeholder)}"></textarea>`}
function btn(label,id='runBtn'){return `<button class="panel-button" id="${id}">${label}</button>`}
function output(id='output'){return `<div class="panel-output" id="${id}" aria-live="polite">Hasil akan tampil di sini.</div>`}
function openTool(id){
 const t=tools[id];document.getElementById('modalCategory').textContent=t[1].toUpperCase()+' TOOL';document.getElementById('modalTitle').textContent=t[0];document.getElementById('modalDescription').textContent=t[3];panel.innerHTML=panelFor(t[4]);backdrop.hidden=false;wire(t[4]);
}
function panelFor(k){
 switch(k){
 case 'download':return `${field('Direct video URL','videoUrl','https://example.com/video.mp4','url')}<p class="panel-hint">Masukkan direct link ke file video yang bisa diakses publik (mis. MP4/WebM). URL halaman TikTok, Instagram, Facebook, atau YouTube bukan direct media link dan tidak diekstrak oleh tool ini.</p>${btn('Buka / unduh video')}<div id="downloadResult"></div><div class="danger-note">Gunakan hanya konten milikmu atau yang kamu punya izin untuk mengunduh. Hindari melewati login, DRM, paywall, atau pembatasan platform.</div>`;
 case 'wordcount':return area('Teks','textInput','Tempel teks di sini...')+output();
 case 'case':return area('Teks','textInput','Tulis atau tempel teks...')+`<div class="panel-row"><button class="panel-button" data-case="upper">UPPERCASE</button><button class="panel-button" data-case="lower">lowercase</button><button class="panel-button" data-case="title">Title Case</button></div>`+output();
 case 'duplicates':case 'cleantext':case 'slug':case 'lorem':return (k==='lorem'?field('Jumlah paragraf','count','3','number'):area('Teks','textInput','Tempel teks di sini...'))+btn('Proses teks')+output();
 case 'url':case 'base64':return area('Teks','textInput','Teks atau URL...')+`<div class="panel-row"><button class="panel-button" id="encodeBtn">Encode</button><button class="panel-button" id="decodeBtn">Decode</button></div>`+output();
 case 'json':case 'jsonmini':return area('JSON input','textInput','{"hello":"world"}')+btn(k==='json'?'Format JSON':'Minify JSON')+output();
 case 'password':return `<div class="panel-row">${field('Panjang password','passLen','20','number')}<div><label class="panel-label">Karakter</label><select class="panel-select" id="passMode"><option value="all">Huruf + angka + simbol</option><option value="alnum">Huruf + angka</option><option value="alpha">Huruf saja</option></select></div></div>`+btn('Buat password')+output();
 case 'timestamp':return field('Unix timestamp (detik)','stamp','1790000000','number')+btn('Konversi waktu')+output();
 case 'hash':return area('Teks untuk SHA-256','textInput','Masukkan teks...')+btn('Hitung SHA-256')+output();
 case 'uuid':return btn('Buat UUID')+output();
 case 'jwt':return area('JWT token','textInput','header.payload.signature')+btn('Decode payload')+output();
 case 'urlparse':return field('URL','urlInput','https://example.com/path?q=hello#top','url')+btn('Parse URL')+output();
 case 'regex':return field('Regex pattern','pattern','\\w+','text')+area('Teks uji','textInput','Tempel teks...')+btn('Jalankan regex')+output();
 case 'gradient':return `<div class="panel-row">${field('Warna 1','color1','#9be8b4')}${field('Warna 2','color2','#38b977')}</div>${field('Sudut','angle','135','number')}${btn('Buat gradient')}<div id="gradientPreview" style="height:90px;border-radius:14px;margin-top:14px;background:linear-gradient(135deg,#9be8b4,#38b977)"></div>${output()}`;
 case 'color':return field('HEX color','hexColor','#4cc982')+btn('Konversi warna')+output();
 case 'percent':return `<div class="panel-row">${field('Nilai','numA','120','number')}${field('Persen (%)','numB','15','number')}</div>`+btn('Hitung persentase')+output();
 case 'tip':return `<div class="panel-row">${field('Total tagihan','bill','250000','number')}${field('Tip (%)','tipPct','10','number')}</div>${field('Jumlah orang','people','2','number')}${btn('Hitung tagihan')}${output()}`;
 case 'random':return `<div class="panel-row">${field('Minimum','minNum','1','number')}${field('Maksimum','maxNum','100','number')}</div>${btn('Acak angka')}${output()}`;
 case 'shuffle':return area('Daftar (satu item per baris)','textInput','apel\\njeruk\\npisang')+btn('Acak daftar')+output();
 case 'units':return `<label class="panel-label">Jenis konversi</label><select class="panel-select" id="unitType"><option value="kmmi">Kilometer → Mil</option><option value="kglb">Kilogram → Pound</option><option value="cmft">Sentimeter → Kaki</option><option value="ctof">Celsius → Fahrenheit</option><option value="ftoc">Fahrenheit → Celsius</option></select>${field('Nilai','unitValue','10','number')}${btn('Konversi')}${output()}`;
 case 'age':case 'datediff':return `<div class="panel-row">${field(k==='age'?'Tanggal lahir':'Tanggal mulai','dateA','','date')}${k==='datediff'?field('Tanggal akhir','dateB','','date'):''}</div>${btn(k==='age'?'Hitung usia':'Hitung selisih hari')}${output()}`;
 case 'aspect':return `<div class="panel-row">${field('Lebar','widthVal','1920','number')}${field('Tinggi','heightVal','1080','number')}</div>${field('Lebar baru (opsional)','newWidth','1280','number')}${btn('Hitung rasio')}${output()}`;
 case 'pomodoro':return `<p class="panel-hint">Timer manual — tetap berjalan hanya selama halaman terbuka.</p><div class="panel-row">${field('Menit','pomMins','25','number')}${field('Detik','pomSecs','0','number')}</div>${btn('Mulai hitung mundur','timerStart')}<div id="timerOutput" class="panel-output">25:00</div><button class="panel-button" id="timerReset">Reset</button>`;
 case 'speech':return area('Teks yang dibacakan','textInput','Tulis sesuatu...')+btn('Bacakan teks')+`<button class="panel-button" id="speechStop">Stop</button>`;
 case 'speechin':return `<p class="panel-hint">Dukungan bergantung pada browser dan bahasa yang tersedia.</p>${btn('Mulai dikte','speechStart')}${output()}`;
 case 'qr':return field('Teks atau URL','qrText','https://example.com','text')+btn('Buka QR generator eksternal')+`<p class="panel-hint">Teks akan dikirim ke layanan pihak ketiga untuk membuat QR. Jangan gunakan password, token, atau informasi sensitif.</p>`;
 case 'favicon':return field('URL gambar favicon','favUrl','https://example.com/favicon.ico','url')+btn('Pratinjau favicon')+`<div id="favPreview"></div>`;
 case 'fileinspect':case 'imagecompress':case 'imageresize':case 'imagebase64':case 'videometa':case 'audiometa':return `<label class="panel-label" for="fileInput">Pilih file dari perangkat</label><input class="panel-input" id="fileInput" type="file" accept="${k==='videometa'?'video/*':k==='audiometa'?'audio/*':k==='imagecompress'||k==='imageresize'||k==='imagebase64'?'image/*':'*/*'}"><div id="fileResult"></div>${k==='imagecompress'?`${field('Kualitas (0.1–1)','quality','0.75','number')}${btn('Kompres gambar')}`:''}${k==='imageresize'?`<div class="panel-row">${field('Lebar baru','resizeW','800','number')}${field('Tinggi baru','resizeH','600','number')}</div>${btn('Resize gambar')}`:''}${k==='imagebase64'?btn('Konversi ke Base64'):''}`;
 case 'palette':return `<label class="panel-label">Pilih gambar</label><input class="panel-input" id="fileInput" type="file" accept="image/*">${btn('Ambil sampel warna')}${output()}`;
 case 'videometa':case 'audiometa':return `<p class="panel-hint">Pilih file lokal untuk memuat metadata dasar di browser.</p><label class="panel-label">File media</label><input class="panel-input" id="fileInput" type="file" accept="${k==='videometa'?'video/*':'audio/*'}"><div id="fileResult"></div>`;
 case 'privacy':return `<div id="privacyList">${['Saya punya izin untuk membagikan konten ini','Tidak ada data pribadi yang terlihat','Link tidak membuka akses ke akun pribadi','Saya memeriksa izin dan hak cipta','Saya tidak membagikan token/password'].map((x,i)=>`<label class="panel-label"><input type="checkbox" class="privacyCheck"> ${x}</label>`).join('')}</div>${output()}`;
 case 'cron':return `<p class="panel-hint">Format umum: menit jam tanggal-bulan bulan hari-dalam-minggu.</p><div class="panel-output">*/5 * * * * — setiap 5 menit<br>0 9 * * 1-5 — pukul 09.00 Senin–Jumat<br>0 0 * * * — setiap tengah malam<br>0 0 1 * * — hari pertama setiap bulan</div>${field('Ekspresi cron','cronInput','*/5 * * * *')}${btn('Periksa format sederhana')}${output()}`;
 case 'speednote':return `<p class="panel-hint">Tool ini tidak mengukur koneksi secara otomatis. Jalankan pengujian di layanan tepercaya lalu catat hasilnya.</p>${field('Download (Mbps)','down','100','number')}${field('Upload (Mbps)','up','20','number')}${field('Ping (ms)','ping','15','number')}${btn('Buat catatan')}${output()}`;
 default:return `<p class="panel-hint">Tool ini merupakan kartu roadmap pada starter project. Panel ini dapat dikembangkan sesuai API atau kebutuhanmu.</p><div class="panel-output">Nama tool: ${esc(tools.find(x=>x[4]===k)?.[0||0]||k)}<br>Status: starter / perlu implementasi lanjutan.</div>`;
 }
}
function wire(k){
 const $=id=>document.getElementById(id), val=id=>$(id)?.value??'';
 const show=s=>{if($('output'))$('output').textContent=s};
 if(k==='wordcount')$('textInput').addEventListener('input',()=>{let s=val('textInput'),words=s.trim()?s.trim().split(/\s+/).length:0;show(`Kata: ${words}\nKarakter: ${s.length}\nTanpa spasi: ${s.replace(/\s/g,'').length}\nKalimat (perkiraan): ${(s.match(/[.!?]+/g)||[]).length}\nEstimasi baca: ${Math.ceil(words/200)} menit`)});
 if(k==='case')panel.querySelectorAll('[data-case]').forEach(b=>b.onclick=()=>{let s=val('textInput');show(b.dataset.case==='upper'?s.toUpperCase():b.dataset.case==='lower'?s.toLowerCase():s.toLowerCase().replace(/\b\p{L}/gu,c=>c.toUpperCase()))});
 if(['duplicates','cleantext','slug','lorem'].includes(k))$('runBtn').onclick=()=>{let s=val('textInput'),r='';if(k==='duplicates')r=[...new Set(s.split(/\r?\n/))].join('\n');if(k==='cleantext')r=s.split(/\r?\n/).map(x=>x.trim().replace(/[ \t]+/g,' ')).filter(Boolean).join('\n');if(k==='slug')r=s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');if(k==='lorem')r=Array.from({length:Math.max(1,Math.min(20,+val('count')||3))},()=> 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.').join('\n\n');show(r)};
 if(k==='url'||k==='base64'){ $('encodeBtn').onclick=()=>{try{show(k==='url'?encodeURIComponent(val('textInput')):btoa(unescape(encodeURIComponent(val('textInput')))))}catch(e){show('Gagal encode: '+e.message)}};$('decodeBtn').onclick=()=>{try{show(k==='url'?decodeURIComponent(val('textInput')):decodeURIComponent(escape(atob(val('textInput')))))}catch(e){show('Gagal decode: input tidak valid')}}}
 if(k==='json'||k==='jsonmini')$('runBtn').onclick=()=>{try{let o=JSON.parse(val('textInput'));show(k==='json'?JSON.stringify(o,null,2):JSON.stringify(o))}catch(e){show('JSON tidak valid: '+e.message)}};
 if(k==='password')$('runBtn').onclick=()=>{let n=Math.max(4,Math.min(128,+val('passLen')||20)),mode=val('passMode'),chars=mode==='alpha'?'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ':mode==='alnum'?'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789':'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}?';let a=new Uint32Array(n);crypto.getRandomValues(a);show(Array.from(a,x=>chars[x%chars.length]).join(''))};
 if(k==='timestamp')$('runBtn').onclick=()=>{let n=Number(val('stamp'));show(Number.isFinite(n)?new Date(n*1000).toString():'Timestamp tidak valid')};
 if(k==='hash')$('runBtn').onclick=async()=>{try{let b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(val('textInput')));show([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join(''))}catch(e){show('Web Crypto tidak tersedia pada konteks ini. Deploy via HTTPS.') }};
 if(k==='uuid')$('runBtn').onclick=()=>show(crypto.randomUUID?crypto.randomUUID():'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{let r=crypto.getRandomValues(new Uint8Array(1))[0]%16;return(c==='x'?r:(r&3|8)).toString(16)}));
 if(k==='jwt')$('runBtn').onclick=()=>{try{let p=val('textInput').split('.')[1];show(JSON.stringify(JSON.parse(decodeURIComponent(escape(atob(p.replace(/-/g,'+').replace(/_/g,'/'))))),null,2)+'\n\nCatatan: decode saja, tanda tangan tidak diverifikasi.')}catch(e){show('JWT tidak valid atau payload tidak dapat dibaca.')}};
 if(k==='urlparse')$('runBtn').onclick=()=>{try{let u=new URL(val('urlInput'));show(JSON.stringify({protocol:u.protocol,host:u.host,hostname:u.hostname,port:u.port,path:u.pathname,query:u.search,hash:u.hash},null,2))}catch(e){show('URL tidak valid')}};
 if(k==='regex')$('runBtn').onclick=()=>{try{let r=new RegExp(val('pattern'),'g'),s=val('textInput'),m=[...s.matchAll(r)];show(`Cocok: ${m.length}\n${m.map(x=>x[0]).join('\n')||'(tidak ada kecocokan)'}`)}catch(e){show('Regex error: '+e.message)}};
 if(k==='gradient')$('runBtn').onclick=()=>{let css=`linear-gradient(${Number(val('angle'))||135}deg, ${val('color1')||'#9be8b4'}, ${val('color2')||'#38b977'})`;$('gradientPreview').style.background=css;show(`background: ${css};`)};
 if(k==='color')$('runBtn').onclick=()=>{let h=val('hexColor').replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');if(!/^[0-9a-f]{6}$/i.test(h))return show('Format HEX tidak valid');show(`HEX: #${h.toUpperCase()}\nRGB: ${parseInt(h.slice(0,2),16)}, ${parseInt(h.slice(2,4),16)}, ${parseInt(h.slice(4,6),16)}`)};
 if(k==='percent')$('runBtn').onclick=()=>show(`${val('numB')}% dari ${val('numA')} = ${(+val('numA'))*(+val('numB'))/100}`);
 if(k==='tip')$('runBtn').onclick=()=>{let total=+val('bill'),tip=total*(+val('tipPct'))/100,n=Math.max(1,+val('people')||1);show(`Tip: ${tip.toLocaleString()}\nTotal: ${(total+tip).toLocaleString()}\nPer orang: ${((total+tip)/n).toLocaleString()}`)};
 if(k==='random')$('runBtn').onclick=()=>{let a=Math.ceil(+val('minNum')),b=Math.floor(+val('maxNum'));show(b>=a?String(Math.floor(Math.random()*(b-a+1))+a):'Rentang tidak valid')};
 if(k==='shuffle')$('runBtn').onclick=()=>{let a=val('textInput').split(/\r?\n/);for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}show(a.join('\n'))};
 if(k==='units')$('runBtn').onclick=()=>{let n=+val('unitValue'),type=val('unitType'),f={kmmi:[.621371,'mil'],kglb:[2.20462,'lb'],cmft:[1/30.48,'ft'],ctof:[null,'°F'],ftoc:[null,'°C']}[type];let out=type==='ctof'?n*9/5+32:type==='ftoc'?(n-32)*5/9:n*f[0];show(`${out.toFixed(4)} ${f[1]}`)};
 if(k==='age')$('runBtn').onclick=()=>{let d=new Date(val('dateA'));if(!val('dateA')||isNaN(+d))return show('Tanggal tidak valid');let now=new Date(),age=now.getFullYear()-d.getFullYear();if(now<new Date(now.getFullYear(),d.getMonth(),d.getDate()))age--;show(`Usia: ${age} tahun`)};
 if(k==='datediff')$('runBtn').onclick=()=>{let a=new Date(val('dateA')),b=new Date(val('dateB'));show(val('dateA')&&val('dateB')?`${Math.round(Math.abs(b-a)/86400000)} hari`:'Pilih kedua tanggal')};
 if(k==='aspect')$('runBtn').onclick=()=>{let w=+val('widthVal'),h=+val('heightVal'),nw=+val('newWidth');show(w>0&&h>0?`Rasio: ${w/ gcd(w,h)}:${h/gcd(w,h)}\n${nw>0?`Tinggi proporsional untuk lebar ${nw}: ${(nw*h/w).toFixed(2)} px`:''}`:'Dimensi tidak valid')};
 if(k==='pomodoro'){let timer=null;$('runBtn');$('timerStart').onclick=()=>{clearInterval(timer);let n=Math.max(1,(+val('pomMins')||25)*60+(+val('pomSecs')||0));const tick=()=>{if(!backdrop.hidden){ $('timerOutput').textContent=`${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;if(n<=0){clearInterval(timer);return}n--}};tick();timer=setInterval(tick,1000)};$('timerReset').onclick=()=>{clearInterval(timer);$('timerOutput').textContent=`${String(+val('pomMins')||25).padStart(2,'0')}:${String(+val('pomSecs')||0).padStart(2,'0')}`}}
 if(k==='speech'){$('runBtn').onclick=()=>{if(!('speechSynthesis'in window))return show('Browser tidak mendukung Text-to-Speech');speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance(val('textInput')))};$('speechStop').onclick=()=>speechSynthesis.cancel()}
 if(k==='speechin')$('speechStart').onclick=()=>{let SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return show('Speech recognition tidak didukung browser ini');let r=new SR();r.lang='id-ID';r.onresult=e=>show(e.results[0][0].transcript);r.onerror=e=>show('Dikte error: '+e.error);r.start();show('Mendengarkan...')};
 if(k==='qr')$('runBtn').onclick=()=>{let text=val('qrText');if(!text)return;window.open('https://quickchart.io/qr?text='+encodeURIComponent(text)+'&size=300','_blank','noopener,noreferrer')};
 if(k==='favicon')$('runBtn').onclick=()=>{let u=val('favUrl');$('favPreview').innerHTML=`<img alt="Favicon preview" src="${esc(u)}" style="width:64px;height:64px;object-fit:contain;margin-top:12px" onerror="this.alt='Gambar gagal dimuat'">`};
 if(['fileinspect','imagecompress','imageresize','imagebase64','videometa','audiometa','palette'].includes(k)){let file=null;$('fileInput').onchange=()=>{file=$('fileInput').files[0];if(!file)return;const size=(file.size/1024).toFixed(1)+' KB';if(k==='fileinspect')$('fileResult').innerHTML=`<div class="panel-output">${esc(file.name)}\nTipe: ${esc(file.type||'tidak diketahui')}\nUkuran: ${size}</div>`;else if(k==='videometa'||k==='audiometa'){let url=URL.createObjectURL(file),el=document.createElement(k==='videometa'?'video':'audio');el.src=url;el.onloadedmetadata=()=>{$('fileResult').innerHTML=`<div class="panel-output">Nama: ${esc(file.name)}\nUkuran: ${size}\nDurasi: ${el.duration.toFixed(2)} detik${k==='videometa'?`\nDimensi: ${el.videoWidth} × ${el.videoHeight}`:''}</div>`}}else $('fileResult').innerHTML=`<div class="panel-output">${esc(file.name)} · ${size}</div>`};
 if(k==='imagebase64')$('runBtn').onclick=()=>{if(!file)return;let r=new FileReader();r.onload=()=>{panel.insertAdjacentHTML('beforeend',`<div class="panel-output">${esc(r.result)}</div>`)};r.readAsDataURL(file)};
 if(k==='imagecompress'||k==='imageresize')$('runBtn').onclick=()=>{if(!file)return;let img=new Image(),url=URL.createObjectURL(file);img.onload=()=>{let c=document.createElement('canvas'),scale=k==='imagecompress'?1:Math.min((+val('resizeW')||img.width)/img.width,(+val('resizeH')||img.height)/img.height);c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext('2d').drawImage(img,0,0,c.width,c.height);c.toBlob(blob=>{let a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='toolverse-'+(k==='imagecompress'?'compressed':'resized')+'.jpg';a.click();$('fileResult').innerHTML=`<div class="panel-output">Selesai: ${c.width} × ${c.height}\nUkuran hasil: ${(blob.size/1024).toFixed(1)} KB</div>`},'image/jpeg',Math.max(.1,Math.min(1,+val('quality')||.75)))};img.src=url};
 if(k==='palette')$('runBtn').onclick=()=>{if(!file)return;let img=new Image();img.onload=()=>{let c=document.createElement('canvas');c.width=20;c.height=20;let x=c.getContext('2d');x.drawImage(img,0,0,20,20);let d=x.getImageData(0,0,20,20).data,counts={};for(let i=0;i<d.length;i+=4){let h=[d[i],d[i+1],d[i+2]].map(v=>Math.round(v/32)*32).map(v=>Math.min(255,v).toString(16).padStart(2,'0')).join('');counts['#'+h]=(counts['#'+h]||0)+1}show(Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,8).map(x=>`${x[0]}  (${x[1]} samples)`).join('\n'))};img.src=URL.createObjectURL(file)}}
 if(k==='privacy')$('output').textContent='Checklist: 0/5';
 if(k==='privacy')panel.querySelectorAll('.privacyCheck').forEach(c=>c.onchange=()=>{$('output').textContent=`Checklist: ${panel.querySelectorAll('.privacyCheck:checked').length}/5`});
 if(k==='cron')$('runBtn').onclick=()=>{let s=val('cronInput').trim().split(/\s+/);show(s.length===5?'Jumlah field benar (5). Validasi detail bergantung pada scheduler.':'Format umum cron biasanya memiliki 5 field.')};
 if(k==='speednote')$('runBtn').onclick=()=>show(`Catatan speed test\nDownload: ${val('down')} Mbps\nUpload: ${val('up')} Mbps\nPing: ${val('ping')} ms\nWaktu: ${new Date().toLocaleString()}`);
}
function gcd(a,b){return b?gcd(b,a%b):a}
render();
