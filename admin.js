firebaseRef=firebase.database().ref();
firebaseFaculty=firebaseRef.child("FACULTY");
firebaseSubject=firebaseRef.child("SUBJECT");
/*firebaseFacultyName=firebaseRef.child("FACULTY").child("NAME");
firebaseFacultyUserId=firebaseRef.child("FACULTY").child("USERID");
firebaseFacultyPassword=firebaseRef.child("FACULTY").child("PASSWORD");
*/
i=j=k=f=0;
item=0;

 function logout(){
	firebase.auth().signOut();
 }
function addFaculty(){

	var a=document.getElementById('text1').value;
	var b=document.getElementById('text2').value;
	var c=document.getElementById('text3').value;
	if(a==""||b==""||c==""){
		alert("Please Fill All the Details");
	}
	else{
	var e=confirm("Your changes are final");
	if(e==true)
	{	
		/*firebaseFacultyName.child("i").set(a);
		firebaseFacultyName.child(i).set(a);
		firebaseFacultyPassword.child(i).set(c);
		firebaseFacultyUserId.child(i).set(b);*/
		firebaseFaculty.once('value',function(snapshot)
		{
			var d=snapshot.numChildren();
			firebaseFaculty.child(d).child("email").set(b);
			firebaseFaculty.child(d).child("name").set(a);
			firebaseFaculty.child(d).child("password").set(c);		
		});
		document.getElementById('text1').value="";
		document.getElementById('text2').value="";
		document.getElementById('text3').value="";
	}
}
}
function removeFaculty(){
	var a=document.getElementById('text4').value;
	if(a=="")
	{
		alert("Please Fill All the Details");
	}
	else
	{
	f=confirm("Your changes are final");
	if(f==true)
	{
		
		firebaseFaculty.once('value',function(snapshot)
		{
			snapshot.forEach(function(childSnapshot){
				childSnapshot.forEach(function(dataSnapshot){
					if(a==dataSnapshot.val()){
						/*childSnapshot.remove();*/
						firebaseRef.child("FACULTY").child(childSnapshot.key).child("null").set("null");
						h=firebaseRef.child("FACULTY").child(childSnapshot.key).child("email");
						i=firebaseRef.child("FACULTY").child(childSnapshot.key).child("name");
						j=firebaseRef.child("FACULTY").child(childSnapshot.key).child("password");
						h.remove();
						i.remove();
						j.remove();
						/*alert("pp");*/

					}
				});
			});
		}
		);
		document.getElementById('text4').value="";
	}
}
}
function removesubjectdata(){
	var a=document.querySelector('#semn').value;
	var b=document.querySelector('#branchn').value;
	var e=document.querySelector('#thprac').value;
	f=confirm("Your changes are final");
	if(f==true)
	{
		firebaseInner=firebaseSubject.child(b).child(e).child(a);
		firebaseInner.once('value',function(snapshot)
		{
			firebaseInner.remove();		
		});
		

	}

}
function viewsubjectdata(){
		$("#form").dialog({height:600, draggable:false, resizable:false, modal:true, title:"Attendance Tongle",closeOnEscape:false,backgroundColor:"white"});

}
function updatesubjectdata(){
	var a=document.querySelector('#sem').value;
	var b=document.querySelector('#branch').value;
	var e=document.querySelector('#thprac').value;
	var c=document.getElementById('sub').value;
	if(c=="")
	{
		alert("Please Fill All the Details");
	}
	else
	{
	var f=confirm("Your changes are final");
	if(f==true)
	{	
		if(e=="THEORY")
		{
			
			/*firebaseFacultyName.child("i").set(a);
			firebaseFacultyName.child(i).set(a);
			firebaseFacultyPassword.child(i).set(c);
			firebaseFacultyUserId.child(i).set(b);*/
			firebaseInner=firebaseSubject.child(b).child(e).child(a);
			firebaseInner.once('value',function(snapshot)
			{
				var d=snapshot.numChildren();
				firebaseInner.child(d).set(c);		
			});
			document.getElementById('sub').value="";
		}
		if(e=="PRACTICAL")
		{
			var c=document.getElementById('sub').value;
			/*firebaseFacultyName.child("i").set(a);
			firebaseFacultyName.child(i).set(a);
			firebaseFacultyPassword.child(i).set(c);
			firebaseFacultyUserId.child(i).set(b);*/
			firebaseInner=firebaseSubject.child(b).child(e).child(a);
			firebaseInner.once('value',function(snapshot)
			{
				var d=snapshot.numChildren();
				firebaseInner.child(d).set(c);		
			});
			document.getElementById('sub').value="";
		}
	}
}
}
function updatedata(){
	var u=document.getElementById('text5').value;
	var v=document.getElementById('text6').value;
	if(u==""||v=="")
	{
		alert("Please Fill All the Details");
	}	
	else
	{
		f=confirm("Your changes are final");
		if(f==true)
		{
		var u=document.getElementById('text5').value;
		var v=document.getElementById('text6').value;
		firebaseFaculty.once('value',function(snapshot)
			{
				snapshot.forEach(function(childSnapshot){
					childSnapshot.forEach(function(dataSnapshot){
						if(u==dataSnapshot.val()){
							
							/*childSnapshot.remove();*/
							/*if(f==0){
								g=dataSnapshot.val();
								alert(g);	
							}
							if(f==1){
								h=dataSnapshot.val();
								document.write(h);
							}
							f=f+1;*/
							/*
							item=firebaseRef.child("FACULTY").child(childSnapshot.key);
						
							/*localStorage.setItem("itemn",item);*/					
							firebaseRef.child("FACULTY").child(childSnapshot.key).child("password").set(v);
						}
					});
				
				});
			});

		/*itemnn=localStorage.getItem("itemn");*/
		/*
		item.remove();	
		*/
		/*
		item.once('value',function(snapshot)
		{
			snapshot.forEach(function(childSnapshot)
			{
				if(f==0){
					w=childSnapshot.val();
				}
				if(f==1){
					w=childSnapshot.val();
				}
				f++;
			});
		});*/
		document.getElementById('text5').value="";
		document.getElementById('text6').value="";
	}
}
}
/*	var a=document.querySelector('#update');
	out=a.value;
	if(out=="UPDATE NAME" && i==0){
		var body=document.getElementById('body');
		var label=document.createElement("label");
		var text=document.createTextNode("ENTER NEW NAME :");
		body.appendChild(label);
		label.appendChild(text);
		var input=document.createElement("input");
		body.appendChild(input);
		i++;		
	}
	if(out=="UPDATE EMAIL" && j==0){
		var body=document.getElementById('body');
		var label=document.createElement("label");
		var text=document.createTextNode("ENTER NEW EMAIL :");
		body.appendChild(label);
		label.appendChild(text);
		var input=document.createElement("input");
		body.appendChild(input);
		j++;		
	}
	if(out=="UPDATE PASSWORD" && k==0){
		var body=document.getElementById('body');
		var label=document.createElement("label");
		var text=document.createTextNode("ENTER NEW PASSWORD :");
		body.appendChild(label);
		label.appendChild(text);
		var input=document.createElement("input");
		body.appendChild(input);
		k++;		
	}
*/

/*function submit1(){
	var a=document.getElementById('text1').value;
	var b=document.getElementById('text2').value;
	firebaseRef.on('value',function(snapshot)
	{
		snapshot.child("FACULTY").forEach(function(childSnapshot)
		{
			firebaseFaculty.on('value')
			if((a==childSnapshot.val())&&() ){
				alert("success");
			}
		});
	});
}*/
let selectedFile;
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})
document.getElementById('button').addEventListener("click", () => {
    if(selectedFile){
    	f=confirm("Your changes are final");
		if(f==true)
		{
		
        BRANCH=document.getElementById("BRANCH").value;
        YEAR=document.getElementById("YEAR").value;
        DIV=document.getElementById("DIV").value;
        BATCH=document.getElementById("BATCH").value;
        firebaseDataRef=firebaseRef.child("DATA").child(BRANCH).child(YEAR).child(DIV).child(BATCH);
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event)=>{
        let data = event.target.result;
        let workbook = XLSX.read(data,{type:"binary"});
        workbook.SheetNames.forEach(sheet => {
            let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            /*document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)
            Name=[];
            Rollno=[];
            rowObject.forEach(function(child){
                Name.push(child["Name"]);
                Rollno.push(child["Roll No"]);
            })*/
            firebaseDataRef.set(rowObject);  
         });
        }
    }
    }
    else
    {
    	alert("Please Choose a File First");
    }
});
