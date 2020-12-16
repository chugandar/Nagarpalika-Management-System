$(() => {
    fetch("http://localhost:5000/zones")
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));

    function loadHTMLTable(data){
        if(data.length === 0){
            $('#zonal-table').append(`<tr><td class='no-data' colspan = '5'></td></tr>`);
            return;
        }
        data.forEach(function({ZONE_ID,WARD_ID,DETAILS}) {
            $('#zonal-table').append(`<tr><td>${WARD_ID}</td><td>${DETAILS}</td></tr>`)
        });        
    }
})