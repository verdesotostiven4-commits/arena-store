export const money=n=>new Intl.NumberFormat("es-EC").format(Number(n||0));
export const valuables=[
{id:"jaula",name:"Caja de música de jaula dorada",value:465477,image:"assets/items/jaula.png"},
{id:"busto",name:"Escultura majestuosa",value:485851,image:"assets/items/busto.png"},
{id:"reloj",name:"Reloj de Faetón",value:437944,image:"assets/items/reloj.png"},
{id:"posicion",name:"Módulo de posición de objetivo",value:442052,image:"assets/items/posicion.png"},
{id:"inyeccion",name:"Inyección clasificada Elysium",value:1512000,image:"assets/items/inyeccion.png"},
{id:"maletin",name:"Maletín de materiales peligrosos de Utopía",value:2035000,image:"assets/items/maletin.png"},
{id:"elefante",name:"Elefante de la fortuna",value:432480,image:"assets/items/elefante.png"},
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
export const sampleAccounts=[
{id:"as-101",title:"Cuenta nivel 30 con gran colección",seller:"GhostKilo",level:30,koen:86500000,storage:120000000,t7:4,knife:5,character:11,items:{elefante:2,jaula:1,maletin:1,reloj:1},outfits:["fortuna","nightcity"],operation:"venta",price:249,description:"Perfil ilustrativo con colección de misceláneas, aspectos y recursos.",likes:0,views:0,created:5,status:"demo",mock:true},
{id:"as-102",title:"Operador nivel 29",seller:"DeltaZero",level:29,koen:64200000,storage:95000000,t7:2,knife:3,character:8,items:{inyeccion:1,posicion:2,busto:1},outfits:["forestal","rapida"],operation:"cambio",price:0,description:"Ficha ficticia para probar el diseño de los perfiles de la comunidad.",likes:0,views:0,created:3,status:"demo",mock:true},
{id:"as-103",title:"Colección premium • Nivel 30",seller:"NovaTactical",level:30,koen:151200000,storage:183000000,t7:6,knife:7,character:15,items:{maletin:2,elefante:1,jaula:2,busto:1},outfits:["guardia","cuervo"],operation:"ambos",price:379,description:"Ejemplo de una cuenta con gran cantidad de objetos valiosos.",likes:0,views:0,created:2,status:"demo",mock:true},
{id:"as-104",title:"Cuenta nivel 25 • Coleccionista",seller:"EchoRaven",level:25,koen:24500000,storage:46500000,t7:1,knife:1,character:5,items:{reloj:1,busto:1,posicion:1},outfits:["corpo"],operation:"venta",price:99,description:"Cuenta ficticia de ejemplo para probar búsquedas y filtros.",likes:0,views:0,created:8,status:"demo",mock:true}
];
export const ops={venta:"Venta",cambio:"Cambio",ambos:"Venta o cambio"};