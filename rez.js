const randDate = () => {
    //Random date generation
    let start = new Date(2021, 0, 1);
    let end = new Date(); 

    let randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    randomDate = randomDate.toLocaleDateString("en-US");

    document.getElementById("date").value = randomDate;
}

const reserve = () => {
    //Get the data from the form
    let json = [{"fname" : document.getElementById("fname").value},
                {"lname" : document.getElementById("lname").value},
                {"phone" : document.getElementById("phone").value},
                {"email" : document.getElementById("email").value},
                {"amka" : document.getElementById("amka").value},
                {"date" : document.getElementById("date").value}];
    //Send data to the API with AJAX
    //Insert, in the URL field, an API endpoint to send the request you want
    $.ajax({
        type: "POST",
        url: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
        data: JSON.stringify(json),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (xhr) => {alert(xhr.message);},
        error: (xhr) => {
            alert("Something went wrong...\nTry again later");
            console.log(xhr);
        }
    });
};
