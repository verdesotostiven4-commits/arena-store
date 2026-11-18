export const money=n=>new Intl.NumberFormat("es-EC").format(Number(n||0));
export const valuables=[
 {id:"maletin",name:"Maletín de materiales peligrosos de Utopía",value:2035000,image:null},
 {id:"documento",name:"Documento secreto",value:5800000,image:null},
 {id:"inyeccion",name:"Inyección clasificada Elysium",value:1512000,image:null},
 {id:"item-04",name:"Estatua de león de oro",value:494702,image:null},
 {id:"item-05",name:"Skyhook EMS",value:492264,image:null},
 {id:"item-06",name:"Estatua conmemorativa Contribución Anónima",value:426279,image:null},
 {id:"item-07",name:"Huevo de Hefra",value:448486,image:null},
 {id:"item-08",name:"Modelo de isla del universo Nueva Frontera",value:487971,image:null},
 {id:"busto",name:"Escultura majestuosa",value:485851,image:null},
 {id:"jaula",name:"Caja de música de jaula dorada",value:465477,image:null},
 {id:"avion",name:"Modelo de bombardero Estrella Oscura",value:481452,image:null},
 {id:"item-12",name:"Tetera antigua",value:477053,image:null},
 {id:"aurora",name:"Aurora",value:446250,image:null},
 {id:"item-14",name:"Mancuerna de oro",value:468202,image:null},
 {id:"item-15",name:"Jarrón",value:433350,image:null},
 {id:"reloj",name:"Reloj de Faetón",value:437944,image:null},
 {id:"item-17",name:"Collar de gemas",value:441702,image:null},
 {id:"elefante",name:"Elefante de la fortuna",value:432480,image:null},
 {id:"item-19",name:"Brazo robótico T-008",value:428452,image:null},
 {id:"esfera",name:"Parte de la esfera de referencia inercial",value:455323,image:null},
 {id:"posicion",name:"Módulo de posición de objetivo",value:442052,image:null},
 {id:"item-27",name:"Módulo de IT",value:784000,image:null},
 {id:"item-31",name:"Módulo de cálculo de prototipos",value:437750,image:null},
 {id:"item-37",name:"Componente de catapulta electromagnética",value:490144,image:null},
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