
	/*** CLASE BURBUJA **/


	function InfoBubble(size, pxIni,pyIni){

		this.vx = (Math.random()*10)+3;
		this.vy = (Math.random()*10)+3;
		this.vxIni = (Math.random()*5);
		this.vyIni = (Math.random()*5);
		this.pxIni = pxIni;
		this.pyIni = pyIni;
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
		var canvasG ;
		var ctxx;

		


		
		this.reset = function(){   // resetea todos los valores para realizar de nuevo el ciclo

			this.vx = (Math.random()*10)+3;
			this.vy = (Math.random()*10)+3;
			this.vxIni = (Math.random()*5);
			this.vyIni = (Math.random()*5);
			this.pxIni = pxIni;
			this.pyIni = pyIni;
			this.pxEnd = Math.floor((Math.random()*(containerWidth*2)) + containerWidth);
			this.pyEnd = Math.random()*200;
			this.estado=0;
			this.x = posIniTotalX+190;    // "x" comienzo del generador de burbujas
			this.y = posIniTotalY+170;  // "y" comienzo del generador de burbujas
			this.size = size;
			this.start = (Math.random()*100);
			this.cont = 0;
			this.xRef = 0;
			this.yRef = 0;
			this.salidepantalla = false;
	
		}

		this.nextState = function(){

			this.estado=2;
		

		}

		this.pintar = function(i, canvasID){

			 canvasG = document.getElementById(canvasID);
		 ctxx = canvasG.getContext("2d");
		 ctxx.webkitImageSmoothingEnabled = true;
			 canvasG.style.top = this.y + "px";
            	canvasG.style.left = this.x + "px";
            	canvasG.style.width = this.size + "px";
            	canvasG.style.height = this.size/1.5 + "px";
            	//canvasG.style.border = "1px solid #000";

            	
				ctxx.clearRect(0, 0, this.size, this.size);
                ctxx.save(); 
                ctxx.beginPath();
                ctxx.arc(this.size/4, this.size/5.7, this.size/5.7, 0, 2 * Math.PI);
                //ctxx.lineWidth = 2;
                //ctxx.strokeStyle = 'black';
      			//ctxx.stroke();
                ctxx.clip();
                ctxx.drawImage(i, 0, 0);
                ctxx.restore();
			
			
		}
			this.pintarBubble = function(ctx){

			if(this.estado!=-1)  ctx.drawImage(img,this.x,this.y,this.size+6,this.size);
			
		}

		this.updatepxIni = function(pxInii){
			this.pxIni=pxInii;
		}
			

		this.move = function(){

				if(this.estado==0)		this.animateIn();
				
				if(this.estado==1)		this.normalise();

			  	if(this.estado==2)		this.animateOut();
			 	
		}//mover

		this.animateIn = function(){

			this.factorSine=0.08;

			if(this.x < this.pxIni)		this.x+=((this.pxIni - this.x)/this.pxIni )*30 ;

			if(this.y < this.pyIni)		this.y+=((this.pyIni - this.y)/this.pyIni )*30 ;

			if(this.y >= this.pyIni && this.x >= this.pxIni)	this.estado=1; //cambia estado normal

			this.y+=Math.sin( this.start )/2; // realiza movimiento sinosoidal para dar naturalidad
			
		} //close animateIn

		this.normalise = function(){

			this.x=this.pxIni;
			this.y+=Math.sin( this.start )/2;
			this.factorSine=0.08;	


		} //close normalise


		this.animateOut = function(){

			this.factorSine = 0.09;

			/*if(this.cont<1){

			 this.xRef = this.x;
			 this.yRef = this.y;
			 this.cont++;

			}*/

			if(this.x < this.pxEnd)		this.x+=((this.pxEnd - this.x)/this.pxEnd )*30;

			if(this.y < this.pyEnd)		this.y+=((this.pyEnd - this.y)/this.pyEnd )*30;
		
			if(this.x > this.pxEnd-1900 && this.y > this.pyEnd-1900){this.reset();}

			this.y+=Math.sin( this.start )/0.1; // realiza movimiento sinosoidal dar caos
					
				
		} // close animateOut

		this.changeVel = function(){
			this.vx *= (Math.random()*1);//-1
			this.vy *= (Math.random()*1);//-1
		}

		this.sine = function(){
	  
			this.size +=  Math.cos( this.start )/10 ;  // disminuir el dividendo para mayor expansión
			this.start += this.factorSine;  // aumenta velocidad

		}

		this.limits= function(){ //limites de desplazamiento de burbuja
			
			if(this.x+this.size > containerWidth-50 || this.y+this.size > containerHeight-20 || this.x-this.size < 0  || this.y-this.size < 0 ){
				
				this.vy*=-1;
				this.vx*=-1;
			}		
		}//limits
	}//cierra clase