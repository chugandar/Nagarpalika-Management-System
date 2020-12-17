// $(function() {

//const { response } = require("express");

//     $('#login-form-link').click(function(e) {
// 		$("#login-form").delay(100).fadeIn(100);
//  		$("#register-form").fadeOut(100);
// 		$('#register-form-link').removeClass('active');
// 		$(this).addClass('active');
// 		e.preventDefault();
// 	});
// 	$('#register-form-link').click(function(e) {
// 		$("#register-form").delay(100).fadeIn(100);
//  		$("#login-form").fadeOut(100);
// 		$('#login-form-link').removeClass('active');
// 		$(this).addClass('active');
// 		e.preventDefault();
// 	});

// });
// document.addEventListener("DOMContentLoaded",
// 	function (event){
// 		document.querySelector("#login"){
// 			console.log("Hello");
// 		}
// 	}
// );

$(() => {
	$('#login-form').on('submit', function (event) {
		event.preventDefault();
		console.log('submit');

		console.log(event.target.Username.value);
		console.log(event.target.Password.value);
		fetch('http://localhost:5000/login',{
			method:'POST',
			headers:{
				'content-type':"application/json"
			},
			body:JSON.stringify({
				uid:event.target.Username.value,
				pwd:event.target.Password.value
			}),
		}).then(response=>response.json())
		.then(data=>{
			var output = data['data'];
			console.log(output);
			if(data===undefined || data===null|| output.length===0){
				console.log(false);
				$('#wrong').text("Wrong Credentials")
			}
			else {
				console.log(true+" "+output.length);
				window.location.href="http://www.google.com"
			}
		})
		
	})
})