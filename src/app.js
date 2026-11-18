import {money,valuables,sampleAccounts,ops,outfits} from "./data.js";

const key="arena-store-demo-v1";
const defaults={alias:"Operador",favorites:[],posts:[],likes:[],follows:[],messages:[],comments:[],reports:[],views:{}};
let store;
try {store={...defaults,...JSON.parse(localStorage.getItem(key)||"{}")};}catch{store={...defaults};}
const filter={query:"",operation:"todos",minLevel:5,minKoen:0,minT7:0,sort:"recientes"};
const root=document.getElementById("app");
const seenDetails=new Set();
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function persist(){try{localStorage.setItem(key,JSON.stringify(store));}catch{toast("Sin espacio en el navegador; no se guardó.");}}
async function shrinkPhoto(file){
 if(!["image/png","image/jpeg","image/webp"].includes(file.type)||file.size>8000000)throw Error("Formato o tamaño de imagen no permitido.");
 return new Promise((resolve,reject)=>{
 const url=URL.createObjectURL(file),img=new Image();
 img.onload=()=>{try{
  let w=img.naturalWidth,h=img.naturalHeight,scale=Math.min(1,1000/Math.max(w,h));w=Math.round(w*scale);h=Math.round(h*scale);
  const canvas=document.createElement("canvas");canvas.width=w;canvas.height=h;const ctx=canvas.getContext("2d");ctx.drawImage(img,0,0,w,h);
  const data=canvas.toDataURL("image/jpeg",0.64);URL.revokeObjectURL(url);resolve(data);
 }catch(e){URL.revokeObjectURL(url);reject(e)}};
 img.onerror=()=>{URL.revokeObjectURL(url);reject(new Error("No se pudo abrir la imagen"))};
 img.src=url;
 });
}
function toast(msg){document.querySelector(".toast")?.remove();const d=document.createElement("div");d.className="toast";d.textContent=msg;document.body.append(d);setTimeout(()=>d.remove(),3200);}
function accounts(){return [...store.posts.filter(x=>x.status!=="archivado"),...sampleAccounts];}
function account(id){return accounts().find(x=>x.id===id);}
function inventory(a){return valuables.filter(it=>Number(a.items?.[it.id]||0)>0);}
function countItems(a){return Object.values(a.items||{}).reduce((v,n)=>v+Number(n||0),0);}
function thumb(it){return '<span class="item-icon"><img loading="lazy" alt="" src="'+esc(it.image||"assets/favicon.svg")+'"></span>';}
function itemTile(it,qty){return '<div class="item">'+thumb(it)+'<div><div>'+esc(it.name)+'</div><b>×'+Number(qty||0)+'</b></div></div>';}
function navbar(page){
 const nav=[["inicio","Inicio"],["explorar","Explorar"],["publicar","Publicar"],["comunidad","Comunidad"]];
 return '<header class="topbar"><div class="wrap topinner"><a href="#/inicio" aria-label="Arena Store, inicio"><img class="brandimg" src="assets/logo.png" alt="Arena Store"></a><form class="topnav-search" id="search-form"><input name="query" placeholder="Buscar cuentas, Koens, colecciones..."></form><nav class="nav">'+nav.map(([id,label])=>'<a href="#/'+id+'"><button class="'+(page===id?"active":"")+'">'+label+'</button></a>').join("")+'</nav><div class="headright"><a href="#/mensajes" aria-label="Mensajes"><button class="button ghost">✉</button></a><a href="#/favoritos" aria-label="Favoritos"><button class="button ghost">♡ <span class="tiny">'+store.favorites.length+'</span></button></a><a href="#/perfil" class="userchip">◉ '+esc(store.alias||"Operador")+'</a></div></div></header>';
}
function bottomnav(page){
  const nav=[["inicio","⌂","Inicio"],["explorar","⌕","Cuentas"],["publicar","＋","Publicar"],["favoritos","♡","Favoritos"],["perfil","♙","Perfil"]];
  return '<nav class="bottomnav" aria-label="Menú móvil">'+nav.map(([id,icon,label])=>'<a href="#/'+id+'"><button class="'+(page===id?"active":"")+'"><span>'+icon+'</span>'+label+'</button></a>').join("")+'</nav>';
}
function card(a){
 const fav=store.favorites.includes(a.id),pics=a.screenshots||[],items=inventory(a);
 const type=esc(ops[a.operation]||"Cuenta"),id=encodeURIComponent(a.id);
 const cover=pics[0]?'<img loading="lazy" class="card-cover" src="'+esc(pics[0])+'" alt="Vista de la cuenta '+esc(a.title)+'">':'<div class="screenshot-empty"><span>FOTO DE LA CUENTA</span><strong>NIVEL '+Number(a.level)+'</strong></div>';
 const mini=items.slice(0,3).map(it=>'<div class="mini-item" title="'+esc(it.name)+'">'+thumb(it)+'<span>×'+Number(a.items[it.id])+'</span></div>').join("");
 return '<article class="card listing-card">'+
  '<div class="card-top"><a href="#/detalle/'+id+'" class="card-image-link">'+cover+'</a><span class="flag '+esc(a.operation)+'">'+type+'</span><button type="button" class="fav '+(fav?"on":"")+'" data-act="fav" data-id="'+esc(a.id)+'" aria-label="'+(fav?"Quitar de favoritos":"Guardar en favoritos")+'">'+(fav?"♥":"♡")+'</button></div>'+
  '<div class="card-body"><div class="seller"><span class="avatar">'+esc((a.seller||"O").slice(0,1).toUpperCase())+'</span><strong>'+esc(a.seller||"Operador")+'</strong><span class="seller-spacer"></span>'+(a.mock?'<small class="sample-label">Muestra</small>':'')+'</div>'+
  '<a class="listing-title" href="#/detalle/'+id+'">'+esc(a.title)+'</a>'+
  '<div class="listing-stats"><div><small>Nivel</small><strong>'+Number(a.level)+'</strong></div><div><small>Koens</small><strong>'+short(a.koen)+'</strong></div><div><small>Almacén</small><strong>'+short(a.storage)+'</strong></div><div><small>T7</small><strong>'+Number(a.t7)+'</strong></div></div>'+
  '<div class="listing-inventory"><div class="listing-inventory-label">Colección <span>'+countItems(a)+' piezas</span></div><div class="mini-items">'+(mini||'<small class="muted">Sin objetos registrados</small>')+'</div></div>'+
  '<div class="card-bottom"><div><small class="muted">'+(a.operation==="cambio"?"Intercambio":a.operation==="ambos"?"Precio de referencia":"Precio")+'</small><div class="price">'+(a.operation==="cambio"?"Cambio":"$"+money(a.price))+'</div></div><a class="button primary listing-open" href="#/detalle/'+id+'">Ver cuenta <span aria-hidden="true">↗</span></a></div></div></article>';
}

function short(n){n=Number(n);if(n>=1e9)return +(n/1e9).toFixed(1)+"B";if(n>=1e6)return +(n/1e6).toFixed(1)+"M";if(n>=1e3)return +(n/1e3).toFixed(1)+"K";return money(n);}
function parseAmount(value){const raw=String(value??"").trim().replace(/\s/g,"").replace(",",".").toUpperCase();const m=raw.match(/^(\d+(?:\.\d{1,2})?)(K|M|B)?$/);if(!m)return NaN;const scale=({K:1000,M:1000000,B:1000000000})[m[2]]||1;const result=Math.round(Number(m[1])*scale);return Number.isSafeInteger(result)?result:NaN;}
function home(){
 const data=accounts();
 const featured=data.slice().sort((a,b)=>(Number(b.koen)||0)-(Number(a.koen)||0)).slice(0,3);
 const recent=data.slice().sort((a,b)=>(Number(a.created)||0)-(Number(b.created)||0)).slice(0,3);
 return '<section class="home-hero">'+
  '<div class="hero-copy"><div class="eyebrow">COMUNIDAD INDEPENDIENTE · ARENA BREAKOUT MOBILE</div>'+
  '<h1>EL MERCADO DE <span>CUENTAS</span> DE LOS OPERADORES.</h1>'+
  '<p>Explora cuentas completas con sus Koens, almacén, térmicas, aspectos y colecciones. Busca por características o publica la tuya.</p>'+
  '<form id="search-form" class="hero-search" role="search"><input name="query" aria-label="Buscar cuentas" placeholder="Buscar por nivel, colección o jugador..." autocomplete="off"><button type="submit">Buscar ↗</button></form>'+
  '<div class="hero-links"><a href="#/explorar" class="button primary">Explorar cuentas</a><a href="#/publicar" class="button ghost">Publicar mi cuenta</a></div></div>'+
  '<div class="hero-art"><img loading="eager" src="assets/demo/operador-03.svg" alt="Vista ilustrativa de un perfil de juego"><div class="hero-art-caption"><span>VISTA DE CUENTA</span><strong>NIVEL 30 · KOENS · COLECCIONES</strong></div></div></section>'+
  '<nav class="home-tabs" aria-label="Descubrir cuentas"><a href="#/explorar" class="selected">Todas</a><a href="#/explorar/baratas">Económicas</a><a href="#/explorar/populares">Populares</a><a href="#/explorar/valiosas">Más Koens</a><a href="#/explorar/cambios">Intercambios</a></nav>'+
  '<section class="home-section"><div class="sectionhead"><div><div class="eyebrow">PARA EXPLORAR</div><h2>Cuentas destacadas</h2><p>Una cuenta por publicación. Todo su inventario en una misma ficha.</p></div><a class="sectionlink" href="#/explorar">Ver todas <span>↗</span></a></div>'+
  '<div class="accountgrid">'+featured.map(card).join("")+'</div></section>'+
  '<section class="home-section"><div class="sectionhead"><div><div class="eyebrow">EN LA COMUNIDAD</div><h2>Explora más perfiles</h2><p>Compara características y guarda los que te interesen.</p></div><a class="sectionlink" href="#/explorar">Explorar <span>↗</span></a></div>'+
  '<div class="accountgrid">'+recent.map(card).join("")+'</div></section>'+
  '<section class="home-guide"><div class="guide-intro"><div class="eyebrow">ARENA STORE</div><h2>Publicar, comparar y conectar</h2><p>Elige una cuenta por sus características, no solo por una fotografía.</p></div><div class="guide-grid"><div><span>01</span><strong>Capturas de tu cuenta</strong><small>Muestra tu lobby y perfil de juego.</small></div><div><span>02</span><strong>Inventario detallado</strong><small>Koens, almacén, aspectos y misceláneas por cantidad.</small></div><div><span>03</span><strong>Comunidad</strong><small>Favoritos, comentarios y contacto entre usuarios.</small></div></div></section>';
}

function explore(){
 const mode=(location.hash||"").split("/")[2]; if(["baratas","populares","valiosas"].includes(mode))filter.sort=mode;
 if(mode==="cambios")filter.operation="cambio";
 let found=accounts().filter(a=>(filter.operation==="todos"||a.operation===filter.operation)&&(a.level>=filter.minLevel)&&(a.koen>=filter.minKoen)&&(a.t7>=filter.minT7)&&(a.title+" "+a.seller+" "+Object.keys(a.items||{}).join(" ")).toLowerCase().includes(filter.query.toLowerCase()));
 const sorters={baratas:(a,b)=>Number(a.price||Infinity)-Number(b.price||Infinity),valiosas:(a,b)=>Number(b.koen)-Number(a.koen),populares:(a,b)=>(Number(b.likes||0)+Number(store.likes.includes(b.id)))-(Number(a.likes||0)+Number(store.likes.includes(a.id))),vistas:(a,b)=>Number(store.views[b.id]||0)-Number(store.views[a.id]||0),recientes:(a,b)=>Number(a.created||0)-Number(b.created||0)};
 found=found.sort(sorters[filter.sort]||sorters.recientes);
 const filters='<aside class="panel sidefilters"><h3>Filtros</h3><form id="filter-form"><div class="field"><span>Nombre o vendedor</span><input name="query" value="'+esc(filter.query)+'" placeholder="Buscar..."></div><div class="field"><span>Publicaciones</span><select name="operation">'+[["todos","Todas"],["venta","Venta"],["cambio","Cambio"],["ambos","Venta o cambio"]].map(([v,label])=>'<option value="'+v+'" '+(filter.operation===v?"selected":"")+'>'+label+'</option>').join("")+'</select></div><div class="field"><span>Nivel mínimo (5–30)</span><input type="number" name="minLevel" min="5" max="30" value="'+filter.minLevel+'"></div><div class="field"><span>Koens netos mínimos</span><input type="number" name="minKoen" min="0" value="'+filter.minKoen+'"></div><div class="field"><span>Térmicas T7 mínimas</span><input type="number" name="minT7" min="0" value="'+filter.minT7+'"></div><div class="field"><span>Ordenar</span><select name="sort">'+[["recientes","Recientes"],["populares","Populares"],["vistas","Más vistas"],["baratas","Más económicas"],["valiosas","Más Koens"]].map(([v,label])=>'<option value="'+v+'" '+(filter.sort===v?"selected":"")+'>'+label+'</option>').join("")+'</select></div><button class="button primary full" type="submit">Aplicar filtros</button><button type="button" data-act="clearfilters" class="button full subtle">Limpiar</button></form></aside>';
 return '<div class="results-head"><div><div class="eyebrow">DESCUBRE · COMPARA · GUARDA</div><h2>EXPLORAR CUENTAS</h2><p class="muted">'+found.length+' perfiles disponibles en esta vista.</p></div><a class="button primary small" href="#/publicar">＋ Publicar cuenta</a></div><div class="layout">'+filters+'<section>'+(found.length?'<div class="accountgrid">'+found.map(card).join("")+'</div>':'<div class="empty">No hay cuentas que coincidan. Prueba otros filtros.</div>')+'</section></div>';
}
function details(id){
 const a=account(id);if(!a)return '<div class="empty">No encontramos esa cuenta. <a class="link" href="#/explorar">Volver</a></div>';
 if(!seenDetails.has(id)){seenDetails.add(id);store.views[id]=Number(store.views[id]||0)+1;persist();}
 const pictured=(a.screenshots||[]);
 const items=inventory(a);
 const firstItem=items[0];
 const cover=pictured.length?'<img class="cover-img" src="'+esc(pictured[0])+'" alt="Captura del lobby o perfil incluida por el usuario">':'<div class="cover-fallback clean-cover"><span>CAPTURA DE CUENTA</span><strong>NIVEL '+Number(a.level)+'</strong></div>';
 const images=pictured.slice(1).map(src=>'<a href="'+esc(src)+'" target="_blank" rel="noopener"><img src="'+esc(src)+'" alt="Captura adicional de la cuenta"></a>').join("");
 const tiles=items.map(it=>itemTile(it,a.items[it.id])).join("")||'<p class="muted">Sin misceláneas registradas.</p>';
 const names=(a.outfits||[]).map(code=>outfits.find(x=>x.code===code)?.name).filter(Boolean);
 const comments=store.comments.filter(x=>x.accountId===id).map(x=>'<div class="social-row"><span class="avatar">'+esc(x.author[0]||"O")+'</span><div><b>'+esc(x.author)+'</b><p class="muted">'+esc(x.text)+'</p></div></div>').join("");
 return '<div class="eyebrow">EXPLORAR / FICHA DE CUENTA</div><div class="sectionhead"><div><h2>'+esc(a.title)+'</h2><p>'+esc(a.seller)+' · Nivel '+a.level+' · '+esc(ops[a.operation])+'</p></div><button data-act="fav" data-id="'+esc(id)+'" class="button small">'+(store.favorites.includes(id)?"♥ Guardado":"♡ Guardar")+'</button></div><div class="cols-two"><div class="stack"><div class="detail-cover">'+cover+'</div>'+(images?'<div class="gallery">'+images+'</div>':"")+'<div class="panel"><h3>Datos del perfil</h3><div class="detailstats"><div><small>Nivel</small><b>'+a.level+'/30</b></div><div><small>Koens netos</small><b>'+short(a.koen)+'</b></div><div><small>Valor de almacén</small><b>'+short(a.storage)+'</b></div><div><small>Térmicas T7</small><b>×'+a.t7+'</b></div><div><small>Cosméticos especiales</small><b>×'+a.knife+'</b></div><div><small>Skins de personaje</small><b>×'+a.character+'</b></div></div></div><div class="panel"><h3>Colección de misceláneas</h3><small>Objetos registrados dentro de esta cuenta, con cantidades individuales.</small><div class="inventory">'+tiles+'</div></div><div class="panel"><h3>Conjuntos y aspectos</h3><div class="cosmetic-pills">'+(names.length?names.map(name=>'<span>'+esc(name)+'</span>').join(""):'<p class="muted">Sin conjuntos seleccionados.</p>')+'</div></div><div class="panel"><h3>Acerca de la cuenta</h3><p class="muted">'+esc(a.description||"El usuario todavía no añadió una descripción.")+'</p></div><div class="panel"><h3>Comentarios</h3>'+(comments||'<p class="muted" style="margin-bottom:12px">Todavía no hay comentarios.</p>')+'<form id="comment-form" data-id="'+esc(id)+'"><div class="field"><label for="comment">Deja un comentario</label><textarea id="comment" name="comment" required maxlength="300" placeholder="Escribe tu opinión..."></textarea></div><button class="button small" type="submit">Publicar comentario</button></form></div></div><aside class="panel action-panel"><div class="seller" style="margin-bottom:15px"><span class="avatar">'+esc(a.seller.slice(0,1))+'</span><div><strong>'+esc(a.seller)+'</strong><br><small>'+(a.mock?"Perfil de ejemplo":"Miembro de la comunidad")+'</small></div></div><div class="divider"></div><small>Valor indicado en la ficha</small><div class="price">'+(a.operation==="cambio"?"CAMBIO":"$"+money(a.price)+" USD")+'</div><div class="taglist" style="margin:13px 0"><span>♡ '+(Number(store.likes.includes(id))+Number(a.likes||0))+' me gusta</span><span>◉ '+(store.views[id]||0)+' vistas locales</span></div><div class="stack"><button data-act="like" data-id="'+esc(id)+'" class="button full">'+(store.likes.includes(id)?"♥ Te gusta":"♡ Me gusta")+'</button><a href="#/mensajes/'+esc(id)+'" class="button full primary">✉ Enviar mensaje</a><button data-act="report" data-id="'+esc(id)+'" class="button full ghost">⚑ Reportar publicación</button></div><p class="footnote">La comunicación y las interacciones de esta versión se guardan únicamente en el navegador. No compartas datos de acceso del juego.</p></aside></div>';
}
function publish(){
 const choices=valuables.filter(x=>x.value>=400000).map(it=>'<div class="misc-select"><div class="misc-preview">'+thumb(it)+'</div><div class="misc-name"><b>'+esc(it.name)+'</b><small>'+short(it.value)+' Koens · referencia</small></div><div class="qty-controls"><button type="button" data-act="qty-dec" data-id="'+esc(it.id)+'" aria-label="Restar '+esc(it.name)+'">−</button><input type="number" inputmode="numeric" name="item_'+it.id+'" min="0" max="999" value="0" aria-label="Cantidad de '+esc(it.name)+'"><button type="button" data-act="qty-inc" data-id="'+esc(it.id)+'" aria-label="Añadir '+esc(it.name)+'">+</button></div></div>').join("");
 const appearance=outfits.map(o=>'<label class="choice" style="justify-content:flex-start"><input type="checkbox" name="outfit" value="'+esc(o.code)+'" style="width:17px;height:17px;accent-color:#e9853f"><span>'+esc(o.name)+'</span></label>').join("");
 return '<div class="eyebrow">MI PERFIL / NUEVA PUBLICACIÓN</div><h2 style="margin:6px 0 9px">CREAR PUBLICACIÓN</h2><p class="muted" style="margin-bottom:18px">Muestra tu cuenta mediante capturas, recursos, conjuntos y colecciones.</p><div class="steps"><span>01 · Capturas</span><span>02 · Datos de la cuenta</span><span>03 · Inventario</span><span>04 · Publicar</span></div><form id="publish-form"><div class="cols-two"><div class="stack"><div class="panel editor-section"><h3>01 · Capturas de tu cuenta</h3><small>Usa el lobby o la información personal como portada. También puedes añadir imágenes del inventario.</small><label class="upload-zone"><span class="upicon">▣</span><strong>Subir capturas del juego</strong><small>1 a 4 imágenes JPG, PNG o WebP. Se mostrarán respetando la proporción original.</small><input id="shots" name="screenshots" type="file" accept="image/png,image/jpeg,image/webp" multiple required></label><div id="shot-preview" class="upload-preview"></div></div><div class="panel editor-section"><h3>02 · Información de la cuenta</h3><div class="formgrid"><div class="field"><label>Título del anuncio</label><input name="title" required maxlength="90" placeholder="Cuenta nivel 30 con colecciones"></div><div class="field"><label>Tipo de ficha</label><select name="operation"><option value="venta">Venta</option><option value="cambio">Cambio</option><option value="ambos">Venta o cambio</option></select></div><div class="field"><label>Nivel (5–30)</label><select name="level" required>'+Array.from({length:26},(_,i)=>'<option value="'+(i+5)+'" '+(i===25?'selected':'')+'>'+(i+5)+'</option>').join("")+'</select></div><div class="field"><label>Valor total de almacén</label><input name="storage" inputmode="decimal" type="text" value="" placeholder="Ej.: 120M o 1.1B" required></div><div class="field"><label>Koens netos</label><input name="koen" inputmode="decimal" type="text" value="" placeholder="Ej.: 700.8K o 25M" required></div><div class="field"><label>Imágenes térmicas T7</label><input name="t7" type="number" min="0" max="999" value="0"></div><div class="field"><label>Cosméticos especiales (cantidad)</label><input name="knife" type="number" min="0" max="999" value="0"></div><div class="field"><label>Skins de personaje (cantidad)</label><input name="character" type="number" min="0" max="999" value="0"></div><div class="field"><label>Valor propuesto USD (referencial)</label><input name="price" type="number" min="0" max="999999" value="0"></div><div class="field"><label>Región</label><select name="country"><option>Global</option><option>América</option><option>Europa</option><option>Asia</option></select></div></div><div class="field"><label>Descripción de la cuenta</label><textarea name="description" maxlength="800" placeholder="Destaca características, rango, cosméticos y colecciones..."></textarea></div></div><div class="panel editor-section"><h3>03 · Colección de misceláneas</h3><small>Toca + para añadir una unidad o escribe directamente la cantidad.</small><div class="misc-grid">'+choices+'</div></div><div class="panel editor-section"><h3>04 · Conjuntos y aspectos</h3><small>Selecciona solo los diseños que puedas reconocer en tu cuenta. Ampliaremos el catálogo con imágenes y nombres confirmados.</small><div class="chooseitems">'+appearance+'</div></div></div><aside class="stack"><div class="panel action-panel"><h3>Tu publicación</h3><div class="taglist"><span>Capturas</span><span>Koens</span><span>Nivel</span><span>Colecciones</span><span>Aspectos</span></div><div class="divider"></div><p class="muted">Revisa la ficha antes de compartirla. No añadas contraseñas ni códigos.</p><button type="submit" class="button primary full" style="margin-top:17px">Guardar publicación</button><button type="reset" class="button ghost full" style="margin-top:8px">Limpiar formulario</button></div></aside></div></form>';
}
function community(){
 const users=[["GhostKilo",42,6],["NovaTactical",68,4],["DeltaZero",31,5],["EchoRaven",19,2]];
 return '<div class="eyebrow">ARENA STORE / COMUNIDAD</div><h2 style="margin:8px 0 10px">OPERADORES Y COMUNIDAD</h2><p class="muted" style="margin-bottom:22px">Perfiles, seguidores y reacciones de demostración. Las insignias de confianza reales no se activarán sin comprobaciones.</p><div class="side-by-side"><div class="panel"><h3>Perfiles destacados · demostración</h3>'+users.map(([name,react,posts])=>'<div class="social-row"><span class="avatar">'+name[0]+'</span><div><strong>'+name+'</strong><p class="muted">'+posts+' fichas · '+react+' reacciones ficticias</p></div><button class="button small" data-act="follow" data-id="'+name+'">'+(store.follows.includes(name)?"Siguiendo":"Seguir")+'</button></div>').join("")+'</div><div class="panel"><h3>Confianza de la comunidad</h3><div class="stack"><div><b>Reseñas vinculadas a operaciones reales</b><p class="muted">Pendiente: solo compradores verificados podrán valorar una transacción, evitando reseñas inventadas.</p></div><div><b>Reportes y moderación</b><p class="muted">Las fichas se podrán reportar, ocultar y revisar por administradores.</p></div><div><b>Perfiles de vendedores</b><p class="muted">Historial, actividad y estado comprobable una vez conectado el sistema de usuarios.</p></div></div></div></div>';
}
function favorites(){
 const mine=accounts().filter(a=>store.favorites.includes(a.id));
 return '<div class="eyebrow">MI COLECCIÓN</div><h2 style="margin:7px 0 18px">FAVORITOS</h2>'+(mine.length?'<div class="accountgrid">'+mine.map(card).join("")+'</div>':'<div class="empty">Aún no hay cuentas guardadas. <a href="#/explorar" class="link">Explorar cuentas</a></div>');
}
function profile(){
 const posts=store.posts.map(a=>'<div class="social-row"><span class="avatar">★</span><div><b>'+esc(a.title)+'</b><p class="muted">Nivel '+a.level+' · '+countItems(a)+' objetos · Solo visible para ti</p></div><a class="button small" href="#/detalle/'+esc(a.id)+'">Ver</a><button data-act="deletepost" data-id="'+esc(a.id)+'" class="button small">Eliminar</button></div>').join("");
 const avatar=store.avatarData?'<img src="'+esc(store.avatarData)+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%" alt="Foto de perfil">':'◉';
 return '<div class="eyebrow">MI ARENA STORE</div><h2 style="margin:8px 0 18px">MI PERFIL</h2><div class="side-by-side"><div class="panel"><h3>Identidad de operador</h3><div class="social-row"><span class="avatar" style="width:58px;height:58px">'+avatar+'</span><div><strong>'+esc(store.alias)+'</strong><p class="muted">Perfil local</p></div></div><div class="field"><label>Foto de perfil</label><input id="avatar-file" type="file" accept="image/jpeg,image/png,image/webp"></div><form id="alias-form" class="stack" style="margin-top:15px"><div class="field"><label>Nombre de usuario</label><input name="alias" minlength="2" maxlength="24" required value="'+esc(store.alias)+'"></div><button type="submit" class="button primary">Guardar perfil</button></form><div class="divider"></div><p class="muted">Favoritos: '+store.favorites.length+' · Siguiendo: '+store.follows.length+'</p><p class="footnote">Esta versión guarda tu perfil en el navegador. El registro e inicio de sesión en línea se conectarán en la fase de autenticación.</p></div><div class="panel"><h3>Mis publicaciones ('+store.posts.length+')</h3>'+(posts||'<p class="muted">Todavía no has creado una publicación.</p>')+'<div class="two-actions"><a href="#/publicar" class="button primary">＋ Nueva publicación</a></div></div></div>';
}

function messages(id){
 const a=account(id);
 const convo=store.messages.filter(m=>m.accountId===(id||"general"));
 return '<div class="eyebrow">MENSAJES LOCALES</div><h2 style="margin:8px 0 15px">CHAT DE DEMOSTRACIÓN</h2><div class="cols-two"><div class="panel"><h3>'+(a?"Sobre: "+esc(a.title):"Conversaciones")+'</h3><div class="notice" style="margin:10px 0">Los mensajes no se entregan a nadie. No compartas claves, correos, códigos ni información personal.</div><div class="chatlog"><div class="muted">Conversación simulada, solo en este navegador.</div>'+convo.map(m=>'<div class="bubble">'+esc(m.text)+'</div>').join("")+'</div><form id="message-form" data-id="'+esc(id||"general")+'" style="margin-top:12px"><div class="searchbar"><input name="text" maxlength="300" required placeholder="Mensaje de prueba..."><button class="button primary" type="submit">Enviar</button></div></form></div><aside class="panel"><h3>Comunicación segura</h3><p class="muted">En una versión conectada, los mensajes estarán disponibles solo entre participantes y moderadores autorizados.</p><div class="divider"></div><a href="#/explorar" class="button full">Volver a explorar</a></aside></div>';
}
function how(){
 return '<div class="eyebrow">GUÍA DEL PROTOTIPO</div><h2 style="margin:7px 0 20px">CÓMO FUNCIONA ARENA STORE</h2><div class="side-by-side"><div class="panel"><h3>Publica cuentas completas</h3><p class="muted">Añade nivel (1 a 30), Koen netos, almacén, cantidad de térmicas, cosméticos y misceláneas individuales. Cada ficha representa una cuenta, no un artículo aislado.</p></div><div class="panel"><h3>Explora el catálogo</h3><p class="muted">Compara las fichas, guarda favoritos, revisa el inventario y escribe mensajes de demostración.</p></div><div class="panel"><h3>Reputación y moderación</h3><p class="muted">El sistema definitivo validará historial de transacciones y evitará valoraciones manipuladas. Todavía no existe verificación real.</p></div><div class="panel"><h3>Antes de un lanzamiento público</h3><p class="muted">Habrá que revisar permisos, políticas del juego y proveedores. No activaremos pagos ni custodia de credenciales desde un prototipo.</p></div></div>';
}
function render(){
 let path=(location.hash||"#/inicio").slice(2).split("/");
 let page=path[0]||"inicio", id=path[1] ? decodeURIComponent(path[1]):null;
 const views={inicio:home,explorar:explore,publicar:publish,comunidad:community,favoritos:favorites,perfil:profile,como:how};
 let content=page==="detalle"?details(id):page==="mensajes"?messages(id):(views[page]||home)();
 root.innerHTML=navbar(page)+'<main class="wrap page">'+content+'</main><footer class="footer">Arena Store · proyecto independiente no afiliado a Arena Breakout · <a href="#/como" class="link">Cómo funciona</a> · Sin pagos reales</footer>'+bottomnav(page);
 document.title="Arena Store — "+page[0].toUpperCase()+page.slice(1);
}
document.addEventListener("submit",async e=>{
 const form=e.target;
 e.preventDefault();
 const d=new FormData(form);
 if(form.id==="search-form"){filter.query=String(d.get("query")||"").trim();location.hash="#/explorar";render();return;}
 if(form.id==="filter-form"){
  filter.query=String(d.get("query")||"").trim();filter.operation=d.get("operation")||"todos";filter.minLevel=Math.max(5,Math.min(30,Number(d.get("minLevel"))||5));filter.minKoen=Math.max(0,Number(d.get("minKoen"))||0);filter.minT7=Math.max(0,Number(d.get("minT7"))||0);filter.sort=String(d.get("sort")||"recientes");render();return;
 }
 if(form.id==="alias-form"){store.alias=String(d.get("alias")||"Operador").trim().slice(0,24);persist();render();toast("Alias local actualizado");return;}
 if(form.id==="publish-form"){
  const level=Number(d.get("level")), koen=parseAmount(d.get("koen")), storage=parseAmount(d.get("storage")), price=Number(d.get("price")||0);
  const operation=String(d.get("operation")||"venta"),title=String(d.get("title")||"").trim();
  if(!title||level<5||level>30||!Number.isInteger(level)||!Number.isFinite(koen)||koen<0||!Number.isFinite(storage)||storage<0||price<0||!["venta","cambio","ambos"].includes(operation)){toast("Revisa nivel, título y valores de la cuenta.");return;}
  const uploaded=Array.from(form.querySelector("#shots")?.files||[]).slice(0,4);
  if(!uploaded.length){toast("Añade una captura horizontal de tu perfil.");return;}
  let screenshots=[];
  try{screenshots=await Promise.all(uploaded.map(shrinkPhoto));}catch(err){toast(err.message||"Error al leer las imágenes.");return;}
  const outfitsSelected=d.getAll("outfit").map(String);
  const items={};valuables.forEach(it=>{const q=Math.max(0,Math.min(999,Math.floor(Number(d.get("item_"+it.id))||0)));if(q)items[it.id]=q;});
  const a={id:"local-"+Date.now(),title:title.slice(0,90),seller:store.alias,level,koen,storage,t7:Math.max(0,Number(d.get("t7"))||0),knife:Math.max(0,Number(d.get("knife"))||0),character:Math.max(0,Number(d.get("character"))||0),operation,price:operation==="cambio"?0:price,country:String(d.get("country")||"Global"),description:String(d.get("description")||"").trim().slice(0,800),items,outfits:outfitsSelected,screenshots,likes:0,created:0,status:"local",mock:false};
  store.posts.unshift(a);persist();location.hash="#/detalle/"+a.id;toast("Ficha guardada únicamente en tu navegador");return;
 }
 if(form.id==="message-form"){const text=String(d.get("text")||"").trim();if(!text)return;store.messages.push({accountId:form.dataset.id||"general",text:text.slice(0,300),at:Date.now()});persist();render();toast("Mensaje guardado localmente");return;}
 if(form.id==="comment-form"){const text=String(d.get("comment")||"").trim();if(!text)return;store.comments.push({accountId:form.dataset.id,author:store.alias,text:text.slice(0,300)});persist();render();toast("Comentario local añadido");}
});
document.addEventListener("change",async e=>{
 const el=e.target;
 if(el.id==="shots"){
  const files=Array.from(el.files||[]).slice(0,4),box=document.getElementById("shot-preview");
  if((el.files||[]).length>4)toast("Se usarán las primeras cuatro capturas.");
  if(box){box.replaceChildren();files.forEach((file,i)=>{const img=document.createElement("img"),url=URL.createObjectURL(file);img.src=url;img.alt="Captura "+(i+1);img.onload=()=>{if(i===0&&img.naturalHeight>img.naturalWidth)toast("Usa preferentemente una captura horizontal como portada.");URL.revokeObjectURL(url);};img.onerror=()=>URL.revokeObjectURL(url);box.append(img);});}
 }
 if(el.id==="avatar-file"&&el.files?.[0]){
  try{store.avatarData=await shrinkPhoto(el.files[0]);persist();render();toast("Foto actualizada");}catch(err){toast("No se pudo procesar la foto");}
 }
});
document.addEventListener("reset",e=>{if(e.target.id==="publish-form"){const preview=document.getElementById("shot-preview");if(preview)preview.replaceChildren();}});

document.addEventListener("click",e=>{
 const btn=e.target.closest("[data-act]");if(!btn)return;
 const id=btn.dataset.id;
 if(btn.dataset.act==="qty-inc"||btn.dataset.act==="qty-dec"){const input=btn.closest(".misc-select")?.querySelector('input[name="item_'+id+'"]');if(!input)return;const current=Number(input.value)||0;input.value=String(Math.max(0,Math.min(999,current+(btn.dataset.act==="qty-inc"?1:-1))));input.dispatchEvent(new Event("input",{bubbles:true}));return;}
 if(btn.dataset.act==="fav"){store.favorites=store.favorites.includes(id)?store.favorites.filter(x=>x!==id):[...store.favorites,id];persist();render();return;}
 if(btn.dataset.act==="like"){store.likes=store.likes.includes(id)?store.likes.filter(x=>x!==id):[...store.likes,id];persist();render();return;}
 if(btn.dataset.act==="follow"){store.follows=store.follows.includes(id)?store.follows.filter(x=>x!==id):[...store.follows,id];persist();render();return;}
 if(btn.dataset.act==="clearfilters"){Object.assign(filter,{query:"",operation:"todos",minLevel:5,minKoen:0,minT7:0,sort:"recientes"});render();return;}
 if(btn.dataset.act==="resetpublish"){document.getElementById("publish-form")?.reset();toast("Formulario limpiado");return;}
 if(btn.dataset.act==="deletepost"){if(!confirm("¿Eliminar esta publicación de prueba?"))return;store.posts=store.posts.filter(a=>a.id!==id);store.favorites=store.favorites.filter(x=>x!==id);persist();render();toast("Publicación local eliminada");return;}
 if(btn.dataset.act==="report"){store.reports.push({accountId:id,at:Date.now()});persist();toast("Reporte de prueba guardado en tu navegador");}
});
window.addEventListener("hashchange",()=>{render();window.scrollTo(0,0)});
render();
