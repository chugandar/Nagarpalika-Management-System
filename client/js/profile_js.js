$(() => {
    //const {username,password} = require('./script');
    var username = localStorage.getItem('username');
    fetch("http://localhost:5000/complaints")
    .then(response => response.json())
    .then(data => getId(data['data']));
    var id=0;
    function getId(data){
        id = parseInt(data[0]['C_ID'])+1;
        //console.log(data+" "+id);
    }
    fetch("http://localhost:5000/displaycomplaints",{
        method:'POST',
        headers:{
            'content-type':"application/json"
        },
        body:JSON.stringify({
            uid:username
        })
    })
    .then(response => response.json())
    .then(data => displayData(data['data']));
    var wardid=0;
    function displayData(data){
        if(data.length === 0){
            $("#Name").val(username)
            $("#uname").val(username)
            $("#pwd").val(username)
            $('#complaint').append(`<tr><td class='no-data' colspan = '3'></td></tr>`);
        }
        else{
            var pwd = data[0]['user_id'];
            wardid = data[0]['ward_id'];
            console.log(data);
            $("#Name").val(username)
            $("#uname").val(username)
            $("#pwd").val(pwd)
            data.forEach(function({c_id,details,status}) {
                $("#complaint").append(`<tr><td>${c_id}</td><td>${details}</td><td>${status}</td></tr>`)
            });
        }

    }
    $("#profile").on('submit', function(event){
        event.preventDefault();
        console.log('submit');
        var complain = event.target.newcomp.value;
        console.log(complain);
        if(complain){
            fetch("http://localhost:5000/newcomplain",{
                method:'POST',
                headers:{
                    'content-type':"application/json"
                },
                body:JSON.stringify({
                    cid: id,
                    uid: username,
                    wid: wardid,
                    details: complain
                })
            })
            .then(response => response.json())
            .then(data => {
                window.location.href = './profile.html';
            });
        }
    })
})