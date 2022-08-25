
let idInterval
const lienzo = document.getElementById("lienzo");
let ctx = lienzo.getContext("2d")


// Naves / Objetos
const halconImg = new Image()
halconImg.src = "Emissary.png";//Halcon Milenario
//verificar imagen

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
		this.x +=40;
	}
	izquierda(){
		this.x -=40;
	}
	disparar(){
		const balita  = new Balas(this.x +37  , this.y -35,25,20,balasImg);
		rafaga.push(balita);

	}
	morir(){}
	dibujarse(){
		ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h);
		ctx.fillStyle = "black"
		// ctx.fillRect(this.x, this.y, this.w, this.h, this.imagen);
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
		// ctx.fillRect(this.x, this.y, this.w, this.h, this.image);
		ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
		this.y += 2;   //MOVIMIENTO DESCENDENTE
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
		// ctx.fillRect(this.x, this.y, this.w, this.h, this.imagen)
		ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h)
		this.y -=5;
	}
} 



// Crear Enemigos
function crearEnemigos(){
	setInterval(() => {
		const num = Math.floor(Math.random()*800)
 if(num ===100){
	 const estrella1 = new Enemigo(10,0,100,100,"white",estrellaImg);
	 const estrella2 = new Enemigo(130,-100,100,100,"white",estrellaImg);
	 const estrella3= new Enemigo(250,-300,100,100,"white",estrellaImg);
	 const estrella4 = new Enemigo(370,-650,100,100,"white",estrellaImg)
	 const estrella5 = new Enemigo(490,-700,100,100,"white",estrellaImg)
	 const estrella6 = new Enemigo(610,-850,100,100,"white",estrellaImg)
	 const estrella7 = new Enemigo(730,-900,100,100,"white",estrellaImg)
	 const estrella8 = new Enemigo(850,-1000,100,100,"white",estrellaImg)

	 
	 
	 enemy.push(estrella1,estrella2,estrella3,estrella4,estrella5,estrella6,estrella7,estrella8);
 }
	}, 2000);
	

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
		milenario.dibujarse();
		crearEnemigos();

		enemy.forEach((enemigos,index)=>{
			enemigos.dibujarse();
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
					enemy.splice(mIndex,1);
					rafaga.splice(bIndex,1);
					score +=1;
				}
			})
			bala.dibujarse();
			
		});
	},1000/60);
}
let btnStart = document.querySelector(".start")
btnStart.addEventListener("click",()=>{
	clearInterval(idInterval)
	iniciarJuego();
})



