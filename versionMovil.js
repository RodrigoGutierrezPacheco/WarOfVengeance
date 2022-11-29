let btnStart = document.querySelector(".start")
btnStart.addEventListener("click",()=>{
	clearInterval(idInterval)
	iniciarJuego();
})





let idInterval
const lienzo = document.getElementById("lienzo");
let ctx = lienzo.getContext("2d")


// Naves / Objetos
const halconImg = new Image()
halconImg.src = "Emissary.png";//Halcon Milenario


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
		const balita  = new Balas(this.x +6 , this.y -17,12,10,balasImg);
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
		ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h)
		this.y -=3;
	}
} 




// Crear Enemigos
function crearEnemigos(){
	setInterval(() => {
		const num = Math.floor(Math.random()*800)
 if(num ===100){


	const estrella1 = new Enemigo(5,0,25,25,"white",estrellaImg);
	const estrella2 = new Enemigo(35,-50,25,25,"white",estrellaImg);
	const estrella3= new Enemigo(65,-150,25,25,"white",estrellaImg);
	const estrella4 = new Enemigo(95,-325,25,25,"white",estrellaImg)
	const estrella5 = new Enemigo(125,-350,25,25,"white",estrellaImg)
	const estrella6 = new Enemigo(155,-425,25,25,"white",estrellaImg)
	const estrella7 = new Enemigo(185,-450,25,25,"white",estrellaImg)
	const estrella8 = new Enemigo(215,-500,25,25,"white",estrellaImg)
	 
	 enemy.push(estrella1,estrella2,estrella3,estrella4,estrella5,estrella6,estrella7,estrella8);
 }
	}, 2000);}


//Mostrar datos
function mostrarDatos(tiempo,score,vida){
	ctx.fillStyle = "white";
	ctx.font = "10px Montserrat";
	ctx.fillText(`Tiempo : ${tiempo}` ,5,10);
	ctx.fillText(`Score: ${score}`,5,25)
	ctx.fillText(`Vida: ${vida}`,5,40)
} 


//Funcion para iniciar el juego
function iniciarJuego(){
	let tiempo = 0;
	let score = 0;
	let vida = 500;
	const milenario = new Nave(125,115,25,25,"black",halconImg);//halcon
	let flechaIzquierda = document.querySelector(".flechaIzquierda")
  flechaIzquierda.addEventListener("click",()=>{
	milenario.izquierda();
  })
  let flechaDerecha = document.querySelector(".flechaDerecha")
  flechaDerecha.addEventListener("click",()=>{
	milenario.derecha();
  })
	let fire = document.querySelector(".fire")
  fire.addEventListener("click",()=>{
	milenario.disparar();
  })


	teclas(milenario);
	

	
	
	idInterval = setInterval(()=>{
    if(vida <= 0){
			const openModal = document.querySelector(".modal_container");
        openModal.style.opacity = 1;
				clearInterval(idInterval)
				milenario.dibujarse();//milenario

      // openModal.classList.add("modal-show")
		}; 
		
		ctx.clearRect(0,0,1000,500);
		tiempo +=1;
		milenario.dibujarse();//milenario
		crearEnemigos();

		enemy.forEach((enemigos,index)=>{
			enemigos.dibujarse();
			if(enemigos.y+enemigos.w>= 250){
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
					enemy.splice(mIndex,1);
					rafaga.splice(bIndex,1);
					score +=1;
				}
			})
			bala.dibujarse();
			
		});
	},1000/60);
}
