export const money = n => new Intl.NumberFormat("es-EC").format(Number(n||0));
export const valuables = [
{id:"leon",name:"Estatua de león de oro",value:494702,tier:"alto",icon:"🦁"},
{id:"tetera",name:"Tetera antigua",value:477053,tier:"alto",icon:"🫖"},
{id:"documento",name:"Documento secreto",value:5800000,tier:"alto",icon:"💽"},
{id:"huevo",name:"Huevo de Hefra",value:448486,tier:"alto",icon:"🥚"},
{id:"esfera",name:"Esfera de referencia inercial",value:455323,tier:"alto",icon:"🌐"},
{id:"skyhook",name:"Skyhook EMS",value:492264,tier:"alto",icon:"⬡"},
{id:"modulo",name:"Módulo de IT",value:784000,tier:"alto",icon:"📷"},
{id:"avion",name:"Modelo de bombardero Estrella Oscura",value:481452,tier:"alto",icon:"✈"},
{id:"collar",name:"Collar de gemas",value:441702,tier:"alto",icon:"📿"},
{id:"maquina",name:"Mancuerna de oro",value:468202,tier:"alto",icon:"🏅"},
{id:"aurora",name:"Aurora",value:446250,tier:"alto",icon:"🖼"},
{id:"robot",name:"Brazo robótico T-008",value:428452,tier:"alto",icon:"⚙"},
{id:"maletin",name:"Maletín de materiales peligrosos de Utopía",value:2035000,tier:"alto",icon:"🧳"},
{id:"joyero",name:"Joyero de mármol dorado",value:194350,tier:"bajo",icon:"📦"}
];
export const sampleAccounts = [
{id:"as-101",title:"Coleccionista insular • Nivel 30",seller:"GhostKilo",level:30,koen:86500000,storage:120000000,t7:4,knife:5,character:11,items:{leon:2,tetera:5,documento:1,collar:1},operation:"venta",price:249,country:"Global",description:"Colección destacada de cosméticos y objetos de alto valor, con capturas de demostración.",likes:42,created:5,status:"demo",mock:true},
{id:"as-102",title:"Operador veterano • Intercambio",seller:"DeltaZero",level:29,koen:64200000,storage:95000000,t7:2,knife:3,character:8,items:{huevo:1,skyhook:2,esfera:1},operation:"cambio",price:0,country:"Global",description:"Cuenta ficticia para mostrar el flujo de intercambios de fichas.",likes:31,created:3,status:"demo",mock:true},
{id:"as-103",title:"Arsenal cosmético • Nivel 30",seller:"NovaTactical",level:30,koen:151200000,storage:183000000,t7:6,knife:7,character:15,items:{leon:3,avion:1,documento:2,modulo:1},operation:"ambos",price:379,country:"Global",description:"Cuenta de ejemplo con numerosas skins y colección de misceláneas valiosas.",likes:68,created:2,status:"demo",mock:true},
{id:"as-104",title:"Inventario equilibrado • Nivel 25",seller:"EchoRaven",level:25,koen:24500000,storage:46500000,t7:1,knife:1,character:5,items:{tetera:2,huevo:1,aurora:1},operation:"venta",price:99,country:"Global",description:"Perfil de ejemplo con cosméticos, térmicas y objetos de colección.",likes:19,created:8,status:"demo",mock:true}
];
export const ops={venta:"Venta",cambio:"Intercambio",ambos:"Venta o cambio"};
