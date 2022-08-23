const lienzo = document.getElementById("lienzo");
let ctx = lienzo.getContext("2d")

// Naves / Objetos
const halconImg = new Image()
halconImg.src = "emissary.png";//Halcon Milenario


const estrellaImg = new Image();
estrellaImg.src = "enemigo.png"//Estrella de la Muerte


const balasImg = new Image();
balasImg.src = "./balas1.png";//Balas Halcon

const disparoSonido = new Audio();
disparoSonido.src = "./disparo.mp3";

//Listado de Enemigos
const enemy = [];//enemigos
const rafaga = [];//balas 
//Creacion de naves
class Nave{
	constructor(x,y,w,h,color,imagen){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.color = color;
		this.imagen = imagen;
	}
	avanzar(){
			this.y -=20;
		}
	retroceder(){
		this.y +=20;
	}
	derecha(){
		this.x +=30;
	}
	izquierda(){
		this.x -=30;
	}
	disparar(){
		const balita  = new Balas(this.x +37  , this.y -35,25,20,balasImg);
		rafaga.push(balita);
		// document.addEventListener("keydown",(evento)=>{
		// 	if(evento.code == "Space"){
		// 		const sonido = new Audio()
		// 	}
		// })

	}
	morir(){}
	dibujarse(){
		ctx.fillStyle = "black"
		ctx.fillRect(this.x, this.y, this.w, this.h, this.imagen);
		ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h);
	}
}

//Enemigo 
class Enemigo{
	constructor(x,y,w,h,color,image){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.color = "black";
		this.image = image;
	}
	dibujarse(){
		ctx.fillStyle = "black";
		ctx.fillRect(this.x, this.y, this.w, this.h, this.image);
		ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
		this.y += 1;   //MOVIMIENTO DESCENDENTE
	}

}

//Funcion para escuchar teclas 
function teclas(milenario){
	document.addEventListener("keydown",(evento)=>{
		// console.log("Tecla tocada: ",evento.code);
		switch(evento.code){
			case"ArrowLeft":
			milenario.izquierda()
			break;
			case"ArrowRight":
			milenario.derecha()
			break;
			case"ArrowUp":
			milenario.avanzar()
			break;
			case"ArrowDown":
			milenario.retroceder();
			break;
			case"Space":
			milenario.disparar();
				break;
		}
	})
} 

//Rafaga
class Balas {
	constructor(x,y,w,h,imagen){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.imagen = imagen; 
	}
	dibujarse(){
		ctx.fillStyle = "black"
		ctx.fillRect(this.x, this.y, this.w, this.h, this.imagen)
		ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h)
		this.y -=3;
	}
} 


// // Dibujar piso
// function dibujarPiso(){
// 	ctx.beginPath();
// 	ctx.moveTo(10,0)
// 	ctx.lineTo(10,500);
// 	ctx.strokeStyle = "white";
// 	ctx.stroke();
// 	ctx.closePath();
// }
// dibujarPiso();


// Crear Enemigos
function crearEnemigos(){
	const num = Math.floor(Math.random()*1000)
 if(num ===10){
	 const estrella1 = new Enemigo(10,0,100,100,"white",estrellaImg);
	 const estrella2 = new Enemigo(130,-200,100,100,"white",estrellaImg);
	 const estrella3= new Enemigo(250,-400,100,100,"white",estrellaImg);
	 const estrella4 = new Enemigo(370,-750,100,100,"white",estrellaImg)
	 const estrella5 = new Enemigo(490,-800,100,100,"white",estrellaImg)
	 const estrella6 = new Enemigo(610,-950,100,100,"white",estrellaImg)
	 const estrella7 = new Enemigo(730,-1000,100,100,"white",estrellaImg)
	 const estrella8 = new Enemigo(850,-1250,100,100,"white",estrellaImg)

	 
	 
	 enemy.push(estrella1,estrella2,estrella3,estrella4,estrella5,estrella6,estrella7,estrella8);
 }

}  


//Mostrar datos
function mostrarDatos(tiempo,score,vida){
	ctx.fillStyle = "white";
	ctx.font = "20px Montserrat";
	ctx.fillText(`Tiempo : ${tiempo}` ,15,20);
	ctx.fillText(`Score: ${score}`,15,50)
	ctx.fillText(`Vida: ${vida}`,15,80)
} 

//Colisiones
// function colisiones(){
// 	for(let i =0;enemy.length;i++){
// 		for (let j=0;balas.length;j++){
// 			malos = enemy[i];
// 			municiones = rafaga[j];
// 			if((municiones.x>malos.x)&& (municiones.x < malos.x+,alos.w))
// 		}
// 	}
// }

//Funcion para iniciar el juego
function iniciarJuego(){
	let tiempo = 0;
	let score = 0;
	let vida = 100;
	const milenario = new Nave(400,190,100,100,"black",halconImg);//halcon
	teclas(milenario);
	

	
	
	setInterval(()=>{
		if(score >= 10){
			alert("vientos")
		}else if(vida <= 0){
			alert("mamaste")
		}
		ctx.clearRect(0,0,1000,500);
		tiempo +=1;
		milenario.dibujarse();//milenario
		crearEnemigos();

		enemy.forEach((enemigos,index)=>{
			enemigos.dibujarse();
			// balas.dibujarse()
			if(enemigos.y+enemigos.w>= 500){
				vida -=10;
				enemy.splice(index,1);
			}
		})
		mostrarDatos(tiempo,score,vida);//mostrar datos
		rafaga.forEach((bala,bIndex)=>{//Balas
			if(bala.y <= 0){
				rafaga.splice(bIndex,1);
			}
			enemy.forEach((malo,mIndex)=>{
				if(bala.y <= malo.y + malo.h &&
					bala.x <= malo.x + malo.w &&
					bala.x >= malo.x){
					console.log("toca")
					enemy.splice(mIndex,1);
					rafaga.splice(bIndex,1);
					score +=1;
				}
			})
			bala.dibujarse();
			
		});
	},1000/60);
}
		iniciarJuego();
		