export const money=n=>new Intl.NumberFormat("es-EC").format(Number(n||0));
export const valuables=[
 {id:"jaula",name:"Caja de música de jaula dorada",value:465477,image:"assets/items/jaula.png"},
 {id:"busto",name:"Escultura majestuosa",value:485851,image:"assets/items/busto.png"},
 {id:"reloj",name:"Reloj de Faetón",value:437944,image:"assets/items/reloj.png"},
 {id:"posicion",name:"Módulo de posición de objetivo",value:442052,image:"assets/items/posicion.png"},
 {id:"inyeccion",name:"Inyección clasificada Elysium",value:1512000,image:"assets/items/inyeccion.png"},
 {id:"maletin",name:"Maletín de materiales peligrosos de Utopía",value:2035000,image:"assets/items/maletin.png"},
 {id:"elefante",name:"Elefante de la fortuna",value:432480,image:"assets/items/elefante.png"},
 {id:"documento",name:"Documento secreto",value:5800000,image:"assets/items/documento-secreto.png"},
 {id:"aurora",name:"Aurora · cuadro",value:446250,image:"assets/items/cuadro-aurora.png"},
 {id:"bombardero",name:"Modelo de bombardero Estrella Oscura",value:481452,image:"assets/items/bombardero-estrella-oscura.png"},
 {id:"esfera",name:"Parte de la esfera de referencia inercial",value:455323,image:null},
 {id:"caballo",name:"Estatua de oro de un corcel encabritado",value:202600,image:"assets/items/caballo.png"}
];
export const outfits=[
 {code:"fortuna",name:"Set Fortuna"},
 {code:"cuervo",name:"Apóstol Cuervo"},
 {code:"guardia",name:"Guardia Real"},
 {code:"corpo",name:"Set Corpo"},
 {code:"nightcity",name:"Atuendo de Night City"},
 {code:"rapida",name:"Respuesta rápida"},
 {code:"forestal",name:"Traje de combate forestal"}
];
// Referencias visuales basadas en capturas del juego facilitadas por el usuario.
// No son ofertas de venta ni prueban inventario, precio, valoraciones o titularidad.
export const sampleAccounts=[
 {id:"ref-ryze",title:"1st RyZe · Nivel 30",seller:"1st RyZe",level:30,koen:982880,storage:10400000,t7:null,knife:null,character:null,items:{},outfits:[],screenshots:["assets/screenshots/ryze-lobby.jpg","assets/screenshots/ryze-profile.jpg"],operation:"referencia",price:null,description:"Capturas del lobby y la información básica del perfil.",likes:0,views:0,created:5,status:"referencia",mock:true},
 {id:"ref-k7",title:"K7 DREX · Nivel 30",seller:"K7 DREX",level:30,koen:523858,storage:1000000,t7:null,knife:null,character:null,items:{},outfits:[],screenshots:["assets/screenshots/k7-drex-lobby.jpg","assets/screenshots/k7-drex-profile.jpg"],operation:"referencia",price:null,description:"Capturas del lobby y de información personal.",likes:0,views:0,created:4,status:"referencia",mock:true},
 {id:"ref-demente7",title:"1st Demente7 · Nivel 30",seller:"1st Demente7",level:30,koen:139963,storage:null,t7:null,knife:null,character:null,items:{},outfits:[],screenshots:["assets/screenshots/demente7-lobby.jpg"],operation:"referencia",price:null,description:"Captura real del lobby proporcionada para mostrar el formato de las fichas.",likes:0,views:0,created:3,status:"referencia",mock:true},
 {id:"ref-eizy",title:"HuB' Eizy · Nivel 30",seller:"HuB' Eizy",level:30,koen:null,storage:null,t7:null,knife:null,character:null,items:{},outfits:[],screenshots:["assets/screenshots/eizy-lobby.jpg"],operation:"referencia",price:null,description:"Captura del lobby; otros datos pendientes de confirmar.",likes:0,views:0,created:2,status:"referencia",mock:true},
 {id:"ref-infiltrado",title:"Perfil Infiltrado · Nivel 30",seller:"Operador",level:30,koen:null,storage:11000000,t7:null,knife:null,character:null,items:{},outfits:[],screenshots:["assets/screenshots/infiltrado-profile.jpg"],operation:"referencia",price:null,description:"Captura de información básica; no se ha aportado el lobby.",likes:0,views:0,created:1,status:"referencia",mock:true}
];
export const ops={venta:"Venta",cambio:"Cambio",ambos:"Venta o cambio",referencia:"Galería"};