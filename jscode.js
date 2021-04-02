 firebaseRef=firebase.database().ref();
 firebaseFaculty=firebaseRef.child("FACULTY");
 c="false";
 d="false";
 e=0;

 function login(){
  
	var userEmail = document.getElementById('email1').value;
	var userPass = document.getElementById('password1').value;
  
	firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
  
	  window.alert("Error : " + errorMessage);
  
	  // ...
	});
  
  }
  function loginByFaculty(){ 
  	var a=document.getElementById('email').value;
  	var b=document.getElementById('password').value;
  	firebaseFaculty.once('value',function(snapshot)
  	{
		var z=0;
		snapshot.forEach(function(childSnapshot)
  		{
			var c=false;
			var d=false;
			temp1=childSnapshot.val()['email'];
			temp2=childSnapshot.val()['password'];
  			if(a==temp1)
  			{
				c="true";
  			}
  			if(b==temp2)
  			{
				d="true";
  			}
  			if(c=="true" && d=="true")
  			{
				z=1;
				localStorage.setItem('PROFESSOR',temp=childSnapshot.val()['name']);
  				window.location="welcome.html";
  				return;
  			} 
  		}); 
  		if(z==0)
  		{
  			alert("Password or EmailId is wrong");
  		}        
  	});

 }
 function logout(){
	window.location="ht1.html";
}

function home(){
	window.location="ht1.html";
}
function contact(){
	window.location="https://vit.edu.in/";
}
function about(){
	window.location="about.html";
}
function loginFaculty(){
	$("#form").dialog({height:600, width:480, hide:500, draggable:false, resizable:false, modal:true, title:"Attendance Tongle",closeOnEscape:false,backgroundColor:"white"});
}
function adminTongle(){
	$("#form1").dialog({height:600, width:480, hide:500, draggable:false, resizable:false, modal:true, title:"Attendance Tongle",closeOnEscape:false,backgroundColor:"white"});
}

/*
function studentDetails(){
	$("#mainpage").hide();
	document.getElementById("studentpage").style.display="block";
}*/
function buttonChange1(){
	var b1=document.getElementById("b1");
	b1.style.backgroundColor="#ffbf00";
	b1.style.color="black";
}
function buttonChange2(){
	var b2=document.getElementById("b2");
	b2.style.backgroundColor="#ffbf00";
	b2.style.color="black";
}
function buttonChange3(){
	var b2=document.getElementById("b3");
	b2.style.backgroundColor="#ffbf00";
	b2.style.color="black";
}
function buttonChange4(){
	var b2=document.getElementById("b4");
	b2.style.backgroundColor="#ffbf00";
	b2.style.color="black";
}
function buttonChange5(){
	var b2=document.getElementById("b5");
	b2.style.backgroundColor="#006699";
	b2.style.color="white";
}
function buttonChange6(){
	var b2=document.getElementById("b6");
	b2.style.backgroundColor="#006699";
	b2.style.color="white";
}
function buttonOg1(){
	var b1=document.getElementById("b1");
	b1.style.backgroundColor="black";
	b1.style.color="#ffbf00";
}
function buttonOg2(){
	var b2=document.getElementById("b2");
	b2.style.backgroundColor="black";
	b2.style.color="#ffbf00";
}
function buttonOg3(){
	var b2=document.getElementById("b3");
	b2.style.backgroundColor="black";
	b2.style.color="#ffbf00";
}
function buttonOg4(){
	var b2=document.getElementById("b4");
	b2.style.backgroundColor="black";
	b2.style.color="#ffbf00";
}
function buttonOg5(){
	var b2=document.getElementById("b5");
	b2.style.backgroundColor="#33bbff";
	b2.style.color="black";
}
function buttonOg6(){
	var b2=document.getElementById("b6");
	b2.style.backgroundColor="#33bbff";
	b2.style.color="black";
}
/*function login(){
	var u1=document.getElementById("email").value;
	var u2=document.getElementById("password").value;
	window.alert(u1+""+u2);
}*/
