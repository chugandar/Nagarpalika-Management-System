$(() => {
    fetch("http://localhost:5000/wards")
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    function loadHTMLTable(data){
        if(data.length === 0){
            $('#ward-table').append(`<tr><td class='no-data' colspan = '5'></td></tr>`);
            return;
        }
        data.forEach(function({WARD_ID,DETAILS}) {
            $('#ward-table').append(`<tr><td>${WARD_ID}</td><td>${DETAILS}</td></tr>`)
        });
        
    }
})