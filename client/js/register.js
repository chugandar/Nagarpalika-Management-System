$(() => {
    $('#register-form').on('submit', function(event){
        event.preventDefault();
        console.log('submit');
        console.log(event.target.Username.value);
        console.log(event.target.Password.value);
        console.log(event.target.Wardid.value);
        
		fetch('http://localhost:5000/register',{
			method:'POST',
			headers:{
				'content-type':"application/json"
			},
			body:JSON.stringify({
				uid:event.target.Username.value,
                pwd:event.target.Password.value,
                wid:event.target.Wardid.value
			}),
		}).then(response=>response.json())
		.then(data => {
            var output = data['data'];
            console.log(output);
            window.location.href="./login.html";
        })
    })
})