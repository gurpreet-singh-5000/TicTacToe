

$( "#single" ).click(function() {
  $( "#l2" ).toggle( 400 );
});
$( "#double" ).click(function() {
  $( "#l5" ).toggle( 400 );
});
$( "#101" ).click(function() {
  $( "#l3" ).toggle( 400 );
});
$( "#102" ).click(function() {
  $( "#l3" ).toggle( 400 );
});
$( "#103" ).click(function() {
  $( "#l3" ).toggle( 400 );
});
$( "#104" ).click(function() {
  $( "#l3" ).toggle( 400 );
});
$( "#120" ).click(function() {
  $( "#l3" ).toggle( 400 );
});
$( "#bl5" ).click(function() {
  $( "#l4" ).toggle( 400 );
});



function displayNames(){
	var x=document.getElementById("pname").value;
	var y=document.getElementById("pnamep").value;
	document.getElementById("111").value = x+" starts";
	document.getElementById("112").value = y+" starts";
}
var fPlayer="",sPlayer="";
$("#111").click(function(){
	fPlayer=document.getElementById("pname").value;
	sPlayer=document.getElementById("pnamep").value;
});
$("#112").click(function(){
	sPlayer=document.getElementById("pname").value;
	fPlayer=document.getElementById("pnamep").value;
});
var count=1;

function startNew(){
	count=1;
	for(i = 1; i <= 9; i++) {
		var y = document.getElementById(i);
		y.value = "";
	} 
	document.getElementById("result").innerHTML = "";
	//document.getElementById("result").style.color = "white";
 }


var flag=0,winner=-1;
function checkRes(){
	var flag=0;
	if(document.getElementById("1").value===document.getElementById("2").value && document.getElementById("1").value===document.getElementById("3").value){
		flag=1;
		winner=1;
	}
	else if(document.getElementById("4").value===document.getElementById("5").value && document.getElementById("4").value===document.getElementById("6").value){
		flag=1;
		winner=4;
	}
	else if(document.getElementById("7").value===document.getElementById("8").value && document.getElementById("7").value===document.getElementById("9").value){
		flag=1;
		winner=7;
	}
	else if(document.getElementById("1").value===document.getElementById("4").value && document.getElementById("1").value===document.getElementById("7").value){
		flag=1;
		winner=1;
	}
	else if(document.getElementById("2").value===document.getElementById("5").value && document.getElementById("2").value===document.getElementById("8").value){
		flag=1;
		winner=2;
	}
	else if(document.getElementById("3").value===document.getElementById("6").value && document.getElementById("3").value===document.getElementById("9").value){
		flag=1;
		winner=3;
	}
	else if(document.getElementById("1").value===document.getElementById("5").value && document.getElementById("1").value===document.getElementById("9").value){
		flag=1;
		winner=1;
	}
	else if(document.getElementById("7").value===document.getElementById("5").value && document.getElementById("7").value===document.getElementById("3").value){
		flag=1;
		winner=7;
	}
	//console.log("winner "+ winner+document.getElementById(winner+1).value+flag);
	//console.log("winner "+ document.getElementById(winner).value+$(winner).val());
	if(flag===1 && document.getElementById(winner).value===''){
		flag=0;	
	}
	//console.log("winner "+ document.getElementById(winner).value+flag);
	return flag;
}

function twoPlayer(){
	if(flag===0 && count%2===1 && this.value===''){
		this.value='X';
		count++;
		//console.log(this.value);
	} 
	else if( flag===0 && count%2===0 && this.value===''){
		this.value='O';
		count++;
	}
	flag=checkRes();
	
	if(flag===1){
		if(document.getElementById(winner).value==="X"){
			document.getElementById("result").innerHTML = fPlayer+" Has Won";
		}
		else if(document.getElementById(winner).value==="O"){
			document.getElementById("result").innerHTML = sPlayer+" Has Won";
		}
		else{
			document.getElementById("result").innerHTML= "Match Draw";	
		}
	}
	else{
		var bFilled=1;
    		for (var j = 1; j<10; j++){  
    			if(document.getElementById(j).value==''){ 
       	        		bFilled=0;
       			} 
 		}
		if(bFilled==1) document.getElementById("result").innerHTML= "Match Draw";	
	}
} 


function tplMethod(){
//console.log("YEs");
	for(var i=1;i<=9; i++){
		document.getElementById(i).addEventListener('click',twoPlayer);
		//$(i).click(twoPlayer());
	}
}

//document.getElementById("111").addEventlistener('click',f27);
//document.getElementById("112").addEventListener('click',f27);

/////////////////////////////////single player //////////////////////////////////////////////////////////////////////////////////////////////////////////////
var signM='X',signm='O';

function minimax(depth,isMax,signM,signm){
    var flag = checkRes(); 
    var score;
    if(flag==0) score=0;
    else{
	if(document.getElementById(winner).value==signM) score=10;
	else score=-10;
    }

    if (score == 10 || score==-10){ 
        return score; 
    }

    var bFilled=1;
    for (var j = 1; j<10; j++){  
    	if(document.getElementById(j).value==''){ 
                bFilled=0;
        } 
    }
    if (bFilled==1){ 
        return 0; 
    }
    // If this maximizer's move 
    if (isMax){ 
        var best = -1000;  
        for (var j = 1; j<10; j++){  
               if(document.getElementById(j).value==''){ 
                     document.getElementById(j).value= signM; 
	             var curr=minimax(depth+1,!isMax,signM,signm);
                     if(curr>best){
		     	best=curr; 
		     }
                     document.getElementById(j).value= ''; 
                } 
        }  
        return best; 
    } 
  
    // If this minimizer's move 
    else{ 
        var best = 1000; 
	for (var j = 1; j<=9; j++){  
               if(document.getElementById(j).value==''){ 
                     document.getElementById(j).value= signm; 
	             var curr=minimax(depth+1,!isMax,signM,signm);
                     if(curr<best){
		     	best=curr; 
		     }
                     document.getElementById(j).value= ''; 
                } 
        }  
        return best;    
    }
}



function findNext(isMax){ 
    var ans; 
    var pos=-1;
    if(isMax) ans=-1000;
    else ans=1000;	
    for (var i = 1; i<=9; i++){ 
	if(document.getElementById(i).value==''){ 
		if(isMax){
                	document.getElementById(i).value=signM;  
                	var curr = minimax(0,!isMax,signM,signm); 
                	document.getElementById(i).value= ''; 
                	if (curr>ans){ 
                	    ans=curr; 
                	    pos=i; 
                	} 
         	} 
		else{
			document.getElementById(i).value=signm;  
                	var curr = minimax(0,!isMax,signM,signm); 
                	document.getElementById(i).value= ''; 
                	if (curr<ans){ 
                	    ans=curr; 
                	    pos=i; 
                	} 

		}
	}
    }   
    return pos;
} 
flag=0;
function addCross(){
	//var winner=-1;
	if(flag===0 && this.value==='') {
	this.value='X'; 
	flag=checkRes();
	var bFilled=1;
    	for (var j = 1; j<10; j++){  
    		if(document.getElementById(j).value==''){ 
        	       	bFilled=0;
        	} 
    	}
	if(flag===1){
		if(document.getElementById(winner).value==="X"){
			document.getElementById("result").innerHTML = "You Have Won";
		}
		else if(document.getElementById(winner).value==="O"){
			document.getElementById("result").innerHTML = "Computer Has Won";
		}
		else{
			document.getElementById("result").innerHTML= "Match Draw";	
		}
	}
	else{
		var pos= findNext(false);
		//winner=-1;
		if(pos!=-1){
			document.getElementById(pos).value='O';
		}
		flag=checkRes();
		if(flag===1){
			if(document.getElementById(winner).value==="X"){
				document.getElementById("result").innerHTML = "You Have Won";
			}
			else if(document.getElementById(winner).value==="O"){
				document.getElementById("result").innerHTML = "Computer Has Won";
			}
		}
		else if(bFilled==1) document.getElementById("result").innerHTML= "Match Draw";
		else{
			var bFilled=1;
    			for (var j = 1; j<10; j++){  
    				if(document.getElementById(j).value==''){ 
        	        		bFilled=0;
        			} 
    			}
			if(bFilled==1) document.getElementById("result").innerHTML= "Match Draw";	
		}
	}
	}

}
flag=0;
function addKnot(){
	//var winner=-1;
	if(flag===0 && this.value==='') {
	this.value='O'; 
	flag=checkRes();
	var bFilled=1;
    	for (var j = 1; j<10; j++){  
    		if(document.getElementById(j).value==''){ 
        	       	bFilled=0;
        	} 
    	}
	
	if(flag===1){
		if(document.getElementById(winner).value==="O"){
			document.getElementById("result").innerHTML = "You Have Won";
		}
		else if(document.getElementById(winner).value==="X"){
			document.getElementById("result").innerHTML = "Computer Has Won";
		}
		else{
			document.getElementById("result").innerHTML= "Match Draw";	
		}
	}
	else if(bFilled==1) document.getElementById("result").innerHTML= "Match Draw";
	else{
		var pos= findNext(true);
		//winner=-1;
		if(pos!=-1){
			document.getElementById(pos).value='X';
		}
		flag=checkRes();
		if(flag===1){
			if(document.getElementById(winner).value==="O"){
				document.getElementById("result").innerHTML = "You Have Won";
			}
			else if(document.getElementById(winner).value==="X"){
				document.getElementById("result").innerHTML = "Computer Has Won";
			}
		}
		else{
			var bFilled=1;
    			for (var j = 1; j<10; j++){  
    				if(document.getElementById(j).value==''){ 
        	        		bFilled=0;
        			} 
    			}
			if(bFilled==1) document.getElementById("result").innerHTML= "Match Draw";	
		}
	}
	}
 
}
var level;
function setLevel(n){
	level=n;
}
flag=0;
//function addRandSym(sym1,sym2){
var sym1='X',sym2='O';
function addRandSym(){
	//console.log(flag);
	console.log(this.value);
	if(flag===0 && this.value==='') {
		this.value=sym1;
		console.log("level");
		var bFilled=1;
    		for (var j = 1; j<10; j++){  
    			if(document.getElementById(j).value==''){ 
        		       	bFilled=0;
        		} 
    		}
		flag=checkRes();
		if(flag===1){
			if(document.getElementById(winner).value===sym1){
				document.getElementById("result").innerHTML = "You Have Won";
			}
			else if(document.getElementById(winner).value===sym2){
				document.getElementById("result").innerHTML = "Computer Has Won";
			}
			else{
				document.getElementById("result").innerHTML= "Match Draw";	
			}
		}
		else if(bFilled==1) document.getElementById("result").innerHTML= "Match Draw";	
		else{
			var seed;
			seed = Math.floor(Math.random() * 9);		
			while(document.getElementById(seed+1).value!=''){
				seed = Math.floor(Math.random() * 9);
			}
			document.getElementById(seed+1).value=sym2;
			flag=checkRes();
			bFilled=1;
	    		for (var j = 1; j<10; j++){  
    				if(document.getElementById(j).value==''){ 
        			       	bFilled=0;
        			} 
    			}
			if(flag===1){
				if(document.getElementById(winner).value===sym1){
					document.getElementById("result").innerHTML = "You Have Won";
				}
				else if(document.getElementById(winner).value===sym2){
					document.getElementById("result").innerHTML = "Computer Has Won";
				}
				else{
					document.getElementById("result").innerHTML= "Match Draw";	
				}
			}
			else if(bFilled==1) document.getElementById("result").innerHTML= "Match Draw";
		}
	}	
}


function oplMethod(id){
	if(level==2 && id==10){ /// user first
		for(var i=1;i<=9;i++){
			document.getElementById(i).addEventListener('click',addCross);
		}
	}
	else if(level==2 && id==11){
		var seed = Math.floor(Math.random() * 9);
		if(seed==9) seed=seed-1;
		document.getElementById(seed+1).value='X';
		for(var i=1;i<=9;i++){
			document.getElementById(i).addEventListener('click',addKnot);
		}
	}
	else if(level==1 && id==10){
		sym1='X',sym2='O';
		for(var i=1;i<=9;i++){
			document.getElementById(i).addEventListener('click',addRandSym);
			//$(i).click(addRandSym('X','O'));
		}
	}
	else if(level==1 && id==11){
		var seed = Math.floor(Math.random() * 9);
		document.getElementById(seed+1).value='X';
		for(var i=1;i<=9;i++){
			//document.getElementById(i).value='';
			sym1='O',sym2='X';
			document.getElementById(i).addEventListener('click',addRandSym);
			//$(i).click(addRandSym('O','X'));
		}
	}
}

