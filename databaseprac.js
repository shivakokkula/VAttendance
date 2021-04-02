BRANCH=localStorage.getItem("BRANCH");
YEAR=localStorage.getItem("YEAR");
SEM=localStorage.getItem("SEM");
DIV=localStorage.getItem("DIV");
BATCH=localStorage.getItem("BATCH");
SUB=localStorage.getItem("SUB");
TIMESLOT=localStorage.getItem("TIMESLOT");
hours=parseInt(localStorage.getItem("hours"));
PROFESSOR=localStorage.getItem("PROFESSOR");

document.getElementById("branchsemdiv").innerHTML=BRANCH+"&nbsp;"+"&nbsp;"+"&nbsp;"+"&nbsp;"+"&nbsp;"+SEM+"&nbsp;"+"&nbsp;"+"&nbsp;"+"&nbsp;"+"&nbsp;"+DIV;;
document.getElementById("batch").innerHTML=BATCH;
document.getElementById("subject").innerHTML=SUB;
document.getElementById("prof").innerHTML="PROFESSOR : "+PROFESSOR;
document.getElementById("time").innerHTML="TIMESLOT : "+TIMESLOT;
document.getElementById("hour").innerHTML="HOURS : "+hours;
/********database section*************/

totalstudents=0;
var date;
s=document.getElementsByClassName("Check");
hour=[];
total=[];
Name=[];
Rollno=[];
i=0;
j=0;
today=new Date();
year=today.getFullYear();
month=today.getMonth()+1;
day=today.getDate();
date=day+'-'+month+'-'+year+'{'+TIMESLOT+'}';

    firebaseRef=firebase.database().ref();
    firebaseDataRef=firebaseRef.child("DATA").child(BRANCH).child(YEAR).child(DIV).child(BATCH);
    firebasePracticalRef=firebaseRef.child("PRACTICAL").child(BRANCH).child(YEAR).child(SEM).child(DIV).child(BATCH).child(SUB).child(PROFESSOR);

    firebaseDataRef.once('value', function(snapshot)
    {
        snapshot.forEach(function(childSnapshot)
        {
            Name[i]=childSnapshot.val()["Name"];
            Rollno[i]=childSnapshot.val()["Roll No"];
            i++;
        });
        /*
        snapshot.child("BATCH 1").child("Name").forEach(function(childSnapshot)
        {
            Name[i]=childSnapshot.val();
            i++;
        });
        snapshot.child("BATCH 1").child("Roll No").forEach(function(childSnapshot)
        {
            Rollno[j]=childSnapshot.val();
            j++;
        });
        snapshot.child("BATCH 2").child("Name").forEach(function(childSnapshot)
        {
            Name[i]=childSnapshot.val();
            i++;
        });
        snapshot.child("BATCH 2").child("Roll No").forEach(function(childSnapshot)
        {
            Rollno[j]=childSnapshot.val();
            j++;
        });
        snapshot.child("BATCH 3").child("Name").forEach(function(childSnapshot)
        {
            Name[i]=childSnapshot.val();
            i++;
        });
        snapshot.child("BATCH 3").child("Roll No").forEach(function(childSnapshot)
        {
            Rollno[j]=childSnapshot.val();
            j++;
        });
        */
        for(i=0;i<Name.length;i++)
        {
            tr=document.createElement('tr');
            document.getElementById('Remark').before(tr);

            td=document.createElement('td');
            td.appendChild(document.createTextNode(i+1));
            tr.appendChild(td);

            td=document.createElement('td');
            td.appendChild(document.createTextNode(Rollno[i]));
            tr.appendChild(td);

            td=document.createElement('td');
            td.appendChild(document.createTextNode(Name[i]));
            tr.appendChild(td);

            td=document.createElement('td');
            checkbox = document.createElement('input');
            checkbox.className="Check";
            checkbox.type="checkbox";
            checkbox.style.width="20px";
            checkbox.style.height="20px";
            td.appendChild(checkbox);
            tr.appendChild(td);
        }
    });

function AllPresent()
{
    if(document.getElementById("AllPresent").checked==true)
    {
        for(i=0;i<s.length;i++)
        {
            s[i].checked=true;
        }
    }   
    else
    {
        for (i=0;i<s.length;i++)
        {
            s[i].checked=false;
        }
    }
}

function MarkCheckbox()
{
    firebasePracticalRef.once('value', function(snapshot)
    {
        k=0;
        snapshot.child(date).forEach(function(childSnapshot)
        {
            temp=childSnapshot.val();
            if(k<Name.length)
            {
                s[k].checked=(temp!=0);
            }
            else if(k==Name.length)
            {
                hours=parseInt(temp);
            }
            k++;  
        });
    });
}
function Update()
{
    var REMARK=document.getElementById("REMARK").value;
    firebasePracticalRef.once('value', function(snapshot)
    {
        if(snapshot.hasChild("Total Hours")==false)
        {
            for(i=0;i<Name.length+2;i++)
            {
                total[i]=0;
            }
        }
        else
        {
            total=snapshot.child("Total Hours").val();
        }
        z=0;
        snapshot.child(date).forEach(function(childSnapshot)
        {
            if(z<total.length-1)
            {
                total[z]=total[z]-childSnapshot.val();
            }
            z=z+1;
        }); 
        totalstudents=0;
        for(i=0;i<s.length;i++)
        {
            if(s[i].checked==true)
            {
                hour[i]=hours;
                total[i]=total[i]+hours;
                totalstudents++;
            }
            else
            {
                hour[i]=0;
            }
        }
        hour[i]=hours;
        total[i]=total[i]+hours;
        i=0;
        for(i=0;i<hour.length;i++)
        {
            firebasePracticalRef.child(date).child(i).set(hour[i]);
        }
        firebasePracticalRef.child(date).child(i).set(totalstudents);
        i++;
        if(REMARK!="")
        {
            firebasePracticalRef.child(date).child(i).set(REMARK);
        }        
        firebasePracticalRef.child('Total Hours').set(total);
        j=hour.length;
        firebasePracticalRef.child('Total Hours').child(j).set(hour.length-1);
        j++;
        firebasePracticalRef.child('Total Hours').child(j).set("");
        $("#gif").dialog({height:600, width:480, hide:500, draggable:false, resizable:false, modal:true, title:"Total students:"+totalstudents,closeOnEscape:false});
    });    
}

function MarkAttendance()
{
    var REMARK=document.getElementById("REMARK").value;
    firebasePracticalRef.once('value', function(snapshot)
    {
        if(snapshot.hasChild("Total Hours")==false)
        {
            for(i=0;i<Name.length+2;i++)
            {
                total[i]=0;
            }
        }
        else
        {
            total=snapshot.child("Total Hours").val();
        }
        if(snapshot.hasChild(date)==true)
        {
            window.alert("Attendance for this slot is already being taken")
        }
        else
        {
                    totalstudents=0;
                    for(i=0;i<s.length;i++)
                    {
                        if(s[i].checked==true)
                        {
                            hour[i]=hours;
                            total[i]=total[i]+hours;
                            totalstudents++;
                        }
                        else
                        {
                            hour[i]=0;
                        }
                    }
                    hour[i]=hours;
                    total[i]=total[i]+hours;
                    firebasePracticalRef.child(date).set(hour);
                    i=hour.length;
                    firebasePracticalRef.child(date).child(i).set(totalstudents);
                    i++;
                    firebasePracticalRef.child(date).child(i).set(REMARK);        
                    firebasePracticalRef.child('Total Hours').set(total);
                    j=hour.length;
                    firebasePracticalRef.child('Total Hours').child(j).set(hour.length-1);
                    j++;
                    firebasePracticalRef.child('Total Hours').child(j).set("");
                    $("#gif").dialog({height:600, width:480, hide:500, draggable:false, resizable:false, modal:true, title:"Total students:"+totalstudents,closeOnEscape:false});
                }
    });        
}       

function s2ab(s){
    var buf=new ArrayBuffer(s.length);
    var view=new Uint8Array(buf);
    for(var i=0;i<s.length;i++) view[i]=s.charCodeAt(i)& 0xFF;
    return buf;
}
function GenerateExcelSheet()
{
    var exceldata=[];
    for(i=0;i<=Name.length+7;i++)
    {
        exceldata[i]=[];        
    }
    exceldata[0].push("","","","                        Vidyalankar        Institute        Of        Technology");
    exceldata[2].push("","",    BRANCH+'        '+YEAR+'       '+SEM+'       '+DIV+'        '+BATCH+'        '+SUB+'        '+"Prof : "+PROFESSOR);
    exceldata[4].push("Sr No","Roll No","Name");
    for(i=5;i<=Name.length+4;i++)
    {
        exceldata[i].push(i-4,Rollno[i-5],Name[i-5]);        
    }
    exceldata[i].push(i-4,'No Of Hours','');
    i++;        
    exceldata[i].push(i-4,'Total Students','');
    i++;        
    exceldata[i].push(i-4,'Remark','');        
    firebasePracticalRef.once('value', function(snapshot)
    {
        snapshot.forEach(function(childSnapshot)
        {
        tempy=childSnapshot.key;
        if(tempy!="00-00-00{00:00 AM|PM}")
        {
            exceldata[4].push(tempy);
            i=5;
            childSnapshot.forEach(function(innerchildSnapshot)
            {
                exceldata[i].push(innerchildSnapshot.val());
                i++;
            });
        }            
        });
        var filename=BRANCH+' '+YEAR+' '+SEM+' '+DIV+' '+BATCH+' '+SUB+' '+'Prof :'+' '+PROFESSOR;
        var wb=XLSX.utils.book_new();
        wb.SheetNames.push("Sheet 1");
        
        var ws=XLSX.utils.aoa_to_sheet(exceldata);
        //var merge = { s: {r:0, c:0}, e: {r:0, c:1},f: {r:0, c:2}, g: {r:0, c:3},h: {r:0, c:4}, i: {r:0, c:5},j: {r:0, c:6}, k: {r:0, c:7}};
        var merge1 = XLSX.utils.decode_range("D1:L1");
        if(!ws['!merges']) ws['!merges'] = [];
        ws['!merges'].push(merge1);
        var merge2 = XLSX.utils.decode_range("A2:L2");
        if(!ws['!merges']) ws['!merges'] = [];
        ws['!merges'].push(merge2);
        var merge = XLSX.utils.decode_range("A1:C1");
        if(!ws['!merges']) ws['!merges'] = [];
        ws['!merges'].push(merge);
        var merging = XLSX.utils.decode_range("A3:B3");
        if(!ws['!merges']) ws['!merges'] = [];
        ws['!merges'].push(merging);
        var merge3 = XLSX.utils.decode_range("C3:L3");
        if(!ws['!merges']) ws['!merges'] = [];
        ws['!merges'].push(merge3);
        var merge4 = XLSX.utils.decode_range("A4:L4");
        if(!ws['!merges']) ws['!merges'] = [];
        ws['!merges'].push(merge4);
        wb.Sheets["Sheet 1"]=ws;
        var wbout=XLSX.write(wb,{booktype:'xlsx',type:'binary'});
        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}),filename+'.xlsx');
    });
    /*
        tr=document.createElement('tr')
        tr.id='head1';
        document.getElementById('Table2').append(tr);
        td=document.createElement('td');
        td.colspan="4";
        td.appendChild(document.createTextNode('Vidyalankar Institute Of Technology'));
        tr.appendChild(td);
        tr=document.createElement('tr')
        tr.id='head2';
        document.getElementById('Table2').append(tr);
        td=document.createElement('td');
        td.colspan="4";
        td.appendChild(document.createTextNode(BRANCH+"   "+YEAR+"   "+SEM+"   "+DIV));
        tr.appendChild(td);
        tr=document.createElement('tr')
        tr.id=0;
        document.getElementById('Table2').append(tr);
        td=document.createElement('td');
        td.appendChild(document.createTextNode('Sr No'));
        tr.appendChild(td);
        td=document.createElement('td');
        td.appendChild(document.createTextNode('Roll No'));
        tr.appendChild(td);
        td=document.createElement('td');
        td.appendChild(document.createTextNode('Name'));
        tr.appendChild(td);
    
    Table2=document.getElementById("Table2");
    document.getElementById('heading2').innerHTML="&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+BRANCH+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+" "+YEAR+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+" "+SEM+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+" "+DIV+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+" "+BATCH+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+" "+SUB+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+" "+"Prof : "+PROFESSOR+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp";
    for(i=1;i<Name.length+1;i++)
    {
        tr=document.createElement('tr')
        tr.id=i;
        document.getElementById(i-1).after(tr);
        td=document.createElement('td');
        td.appendChild(document.createTextNode(i));
        tr.appendChild(td);
        td=document.createElement('td');
        td.appendChild(document.createTextNode(Rollno[i-1]));
        tr.appendChild(td);
        td=document.createElement('td');
        td.appendChild(document.createTextNode(Name[i-1]));
        tr.appendChild(td);
    }
        tr=document.createElement('tr')
        tr.id=i;
        document.getElementById(i-1).after(tr);
        td=document.createElement('td');
        td.appendChild(document.createTextNode(i));
        tr.appendChild(td);
        td=document.createElement('td');
        td.appendChild(document.createTextNode('No Of Hours'));
        tr.appendChild(td);
        td=document.createElement('td');
        td.appendChild(document.createTextNode(''));
        tr.appendChild(td);
        i++;
        tr=document.createElement('tr')
        tr.id=i;
        document.getElementById(i-1).after(tr);
        td=document.createElement('td');
        td.appendChild(document.createTextNode(i));
        tr.appendChild(td);
        td=document.createElement('td');
        td.appendChild(document.createTextNode('Total Students'));
        tr.appendChild(td);
        td=document.createElement('td');
        td.appendChild(document.createTextNode(''));
        tr.appendChild(td);
        i++;
        tr=document.createElement('tr')
        tr.id=i;
        document.getElementById(i-1).after(tr);
        td=document.createElement('td');
        td.appendChild(document.createTextNode(i));
        tr.appendChild(td);
        td=document.createElement('td');
        td.appendChild(document.createTextNode('Remark'));
        tr.appendChild(td);
        td=document.createElement('td');
        td.appendChild(document.createTextNode(''));
        tr.appendChild(td);
        firebasePracticalRef.once('value', function(snapshot)
    {
        snapshot.forEach(function(childSnapshot)
        {
            tempy=childSnapshot.key;
            if(tempy!="00-00-00{00:00 AM|PM}")
            {
                td=document.createElement('td');
                td.appendChild(document.createTextNode(tempy));
                document.getElementById("0").appendChild(td);
                td=document.createElement('td');
                td.appendChild(document.createTextNode(tempy));
                document.getElementById("0").appendChild(td);
                i=1;
                childSnapshot.forEach(function(innerchildSnapshot)
                {
                    td=document.createElement('td');
                    td.appendChild(document.createTextNode(innerchildSnapshot.val()));
                    document.getElementById(i).appendChild(td);            
                    i++;
                });
            }        
        });
        document.getElementById('Table2').style.textAlign="center";
        document.getElementById('Table2').style.border="1px";
        var filename=BRANCH+' '+YEAR+' '+SEM+' '+DIV+' '+BATCH+' '+SUB+' '+'Prof :'+' '+PROFESSOR;
        var wb=XLSX.utils.book_new();
        wb.SheetNames.push("Sheet 1");
        var ws=XLSX.utils.table_to_sheet(document.getElementById("Table2"));
        wb.Sheets["Sheet 1"]=ws;
        var wbout=XLSX.write(wb,{booktype:'xlsx',type:'binary'});
        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}),filename+'.xlsx');
        //$("#Table2").dialog({height:600, width:480, hide:500, draggable:false, resizable:false, modal:true,closeOnEscape:false});
        window.location="amprac.html";
    });*/
}
/*
            var temp=childSnapshot.val();
            for(i=1;i<=Name.length;i++)
            {
                if(j<temp.length-3)
                {
                    exceldata[i].push(temp[j]);
                    j++;
                }
                else
                {
                    exceldata[i].push(0);
                }
            }
            exceldata[i].push(temp[j]);
            i++;j++;
            exceldata[i].push(temp[j]);
            i++;j++;
            exceldata[i].push(temp[j]);
        });
        wb.Props={
            Title:"Excel Sheet",
            Subject:"Attendance Sheet",
            Author:"Vidyalankar",
            CreatedDate:date
        };*/