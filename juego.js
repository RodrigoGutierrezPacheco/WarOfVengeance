const lienzo = document.getElementById("lienzo");
let ctx = lienzo.getContext("2d")

// Naves / Objetos
const halconImg = new Image()
halconImg.src = "emissary.png";//Halcon Milenario

const estrellaImg = new Image();
estrellaImg.src = "enemigo.png"//Estrella de la Muerte

const balasImg = new Image();
balasImg.src = "balas1.png";//Balas Halcon

//Listado de Enemigos
const enemy = [];
const rafaga = [];
//Creacion de naves
class Nave{
	constructor(x,y,w,h,color,imagen){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.color = "black";
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
	}
	morir(){}
	dibujarse(){
		ctx.fillRect(this.x, this.y, this.w, this.h, this.imagen);
		ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h);
		ctx.fillStyle = "black"
	}
}

class Enemigo{
	constructor(x,y,w,h,imagen,nivel){
		this.x = x;
		this.y = y;
		this.w = w;
		this.y = y;
		this.imagen = imagen;
		this.nivel = nivel;
	}
	dibujarse(){
		ctx.fillStyle = "black"
		ctx.fillRect(this.x, this.y, this.w, this.h,this.imagen);
		this.y -= 1;
		ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h);
	}
}

//Funcion para escuchar teclas
function teclas(milenario){
	document.addEventListener("keydown",(evento)=>{
		console.log("Tecla tocada: ",evento.code);
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


// Dibujar piso
function dibujarPiso(){
	ctx.beginPath();
	ctx.moveTo(10,0)
	ctx.lineTo(10,500);
	ctx.strokeStyle = "white";
	ctx.stroke();
	ctx.closePath();
}
dibujarPiso();


//Crear Enemigos
function enemigos(){
 const num = Math.floor(Math.random()*100)
 const enemigoss = new Enemigo(500,250,30,60,estrellaImg)
 enemy.push(enemigoss);
}  

//Mostrar datos
function mostrarDatos(tiempo,score,vida){
	ctx.fillStyle = "white";
	ctx.font = "20px Montserrat";
	ctx.fillText(`Tiempo : ${tiempo}` ,15,20);
	ctx.fillText(`Score: ${score}`,15,50)
	ctx.fillText(`Vida: ${vida}`,15,80)
} 

//Funcion para iniciar el juego
function iniciarJuego(){
	let tiempo = 0;
	let score = 0;
	let vida = 100;
	const milenario = new Nave(400,190,100,100,"black",halconImg);//halcon
	teclas(milenario);
	const muerte = new Nave (50,-50,40,40,"black",estrellaImg);//estrellaMuerte



	setInterval(()=>{
		ctx.clearRect(0,0,1000,500);
		// dibujarPiso();
		tiempo +=1;
		milenario.dibujarse();
		muerte.dibujarse();
		console.log(muerte);
		mostrarDatos(tiempo,score,vida);
		rafaga.forEach((balas)=>{
			balas.dibujarse();
		})

		enemy.forEach((enemigoss,index)=>{
			muerte.dibujarse();
			console.log(muerte)
		})

	},1000/60);

}
iniciarJuego();
