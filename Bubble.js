
	/*** CLASE BURBUJA **/

	function Bubble(size){

		this.vx = (Math.random()*10)+3;
		this.vy = (Math.random()*10)+3;
		this.vxIni = (Math.random()*5);
		this.vyIni = (Math.random()*5);
		this.pxIni = (Math.random()*(containerWidth- 170));
		this.pyIni = (Math.random()*(containerHeight- 120));
		this.pxEnd = Math.floor((Math.random()*(containerWidth*2)) + containerWidth);
		this.pyEnd = Math.random()*200;
		this.estado=0;  // -1 para iniciar con nada
		this.x = posIniTotalX+190;    // "x" comienzo del generador de burbujas
		this.y = posIniTotalY+170; // "y" comienzo del generador de burbujas
		this.size = size;
		this.start = (Math.random()*100);
		this.factorSine = 0.06;  // aumetar para hacer vibración
		this.salidepantalla = false;
		this.cont = 0;
		this.xRef = 0;
		this.yRef = 0;
		
		this.reset = function(){   // resetea todos los valores para realizar de nuevo el ciclo

			this.vx = (Math.random()*10)+3;
			this.vy = (Math.random()*10)+3;
			this.vxIni = (Math.random()*5);
			this.vyIni = (Math.random()*5);
			this.pxIni = (Math.random()*(containerWidth- 170));
			this.pyIni = (Math.random()*(containerHeight- 120));
			this.pxEnd = Math.floor((Math.random()*(containerWidth*2)) + containerWidth);
			this.pyEnd = Math.random()*200;
			this.estado=0;
			this.x = posIniTotalX+190;    // "x" comienzo del generador de burbujas
			this.y = posIniTotalY+170;  // "y" comienzo del generador de burbujas
			this.size = Math.floor(Math.random()*100) + 50;
			this.start = (Math.random()*100);
			this.cont = 0;
			this.xRef = 0;
			this.yRef = 0;
			this.salidepantalla = false;

		}

		this.nextState = function(){

			this.estado=2;

		}

		this.pintar = function(ctx){

			if(this.estado != -1)  ctx.drawImage(img,this.x,this.y,this.size+2,this.size);
		
		}//mover

		this.move = function(){

				if(this.estado==0)		this.animateIn();
				
				if(this.estado==1)		this.normalise();

			  	if(this.estado==2)		this.animateOut();
			 	
		}//mover

		this.animateIn = function(){

			this.factorSine=0.06;

			if(this.x < this.pxIni)		this.x+=((this.pxIni - this.x)/this.pxIni )*10 ;

			if(this.y < this.pyIni)		this.y+=((this.pyIni - this.y)/this.pyIni )*10 ;

			if(this.y >= this.pyIni && this.x >= this.pxIni)	this.estado=1; //cambia estado normal

			this.y+=Math.sin( this.start )/2; // realiza movimiento sinosoidal para dar naturalidad
			
		} //close animateIn

		this.normalise = function(){

			this.x+=this.vx;
			this.y+=this.vy;
			this.factorSine=0.06;	

		} //close normalise


		this.animateOut = function(){

			this.factorSine = 0.09;

			if(this.cont<1){

			 this.xRef = this.x;
			 this.yRef = this.y;
			 this.cont++;

			}

			if(this.x < this.pxEnd)		this.x+=((this.pxEnd - this.x)/this.pxEnd )*30;

			if(this.y < this.pyEnd)		this.y+=((this.pyEnd - this.y)/this.pyEnd )*30;
		
			if(this.x > this.pxEnd-1900 && this.y > this.pyEnd-1900)  this.reset();

			this.y+=Math.sin( this.start )/0.08; // realiza movimiento sinosoidal dar caos
					
				
		} // close animateOut

		this.changeVel = function(){
			this.vx *= (Math.random()*1);//-1
			this.vy *= (Math.random()*1);//-1
		}

		this.sine = function(){
	  
			this.size +=  Math.cos( this.start )/2 ;  // disminuir el dividendo para mayor expansión
			this.start += this.factorSine;  // aumenta velocidad

		}

		this.limits= function(){ //limites de desplazamiento de burbuja
			
			if(this.x+this.size > containerWidth-50 || this.y+this.size > containerHeight-20 || this.x-this.size < 0  || this.y-this.size < 0 ){
				this.vx*=-1;
				this.vy*=-1;
			}		
		}//limits
	}//cierra clase