const stats = () => {
    //Check if array exists and if so Delete
    if (document.getElementById("stats") != null) {
        document.getElementById("stats").remove();
    }

    //Get Dates
    let data = {
        date_from: document.getElementById("start").value,
        date_to: document.getElementById("end").value
    };

    // Partition tool
    const partition = (items, size) => {
        let result = _.groupBy(items, (item, i) => {
            return Math.floor(i / size);
        });
        return _.values(result);
    };
    //Insert your own Government token
    $.ajax({
        url: 'https://data.gov.gr/api/v1/query/mdg_emvolio',
        data: data,
        dataType: 'json',
        headers: {
            "Authorization": "Token xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        },
        success: (data) => {
            alert('Total results found: ' + data.length);
            //Partition APIs array
            let array = partition(data, 74);

            let table = document.createElement("table");
            table.setAttribute("id", "stats");

            let trHead = document.createElement("tr");
            
            let thDay = document.createElement("th");
            thDay.innerHTML = "Ημερομηνία";
            trHead.appendChild(thDay);

            let thDose1 = document.createElement("th");
            thDose1.innerHTML = "1η Δόση";
            trHead.appendChild(thDose1);

            let thDose2 = document.createElement("th");
            thDose2.innerHTML = "2η Δόση";
            trHead.appendChild(thDose2);

            let thTotal = document.createElement("th");
            thTotal.innerHTML = "Σύνολο Ημέρας";
            trHead.appendChild(thTotal);

            let thAll = document.createElement("th");
            thAll.innerHTML = "Σύνολο μέχρι αυτή την Ημέρα";
            trHead.appendChild(thAll);
            
            table.appendChild(trHead);
            document.body.appendChild(table);

            //Count the results of the array and populate table
            for(let i = 0; i < array.length; i++) {
                let totalDose1 = 0;
                let totalDose2 = 0;
                let totalDay = 0;
                let totalAll = 0;

                let tr = document.createElement("tr");
                let tdDate = document.createElement("td");
                tdDate.innerHTML = array[i][0].referencedate.split('T')[0];
                tr.appendChild(tdDate);

                for(let j = 0; j < array[i].length; j++) {
                    totalDose1 += array[i][j].dailydose1;
                    totalDose2 += array[i][j].dailydose2;
                    totalDay += array[i][j].daytotal;
                    totalAll += array[i][j].totalvaccinations;
                }

                let tdDose1 = document.createElement("td");
                tdDose1.innerHTML = totalDose1;
                tr.appendChild(tdDose1);

                let tdDose2 = document.createElement("td");
                tdDose2.innerHTML = totalDose2;
                tr.appendChild(tdDose2);

                let tdDay = document.createElement("td");
                tdDay.innerHTML = totalDay;
                tr.appendChild(tdDay);

                let tdAll = document.createElement("td");
                tdAll.innerHTML = totalAll;
                tr.appendChild(tdAll);

                table.appendChild(tr);
            }
        } 
    });    
};
