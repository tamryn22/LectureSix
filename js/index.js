displayPizza= () => {

    let monthPizza = document.getElementById('pizzaOut');

    for(let i = 0; i < pizzaData.length; i++){

        let name = pizzaData[i].pizzaName;
        let size = pizzaData[i].pizzaSize;
        let base = pizzaData[i].pizzaBase;
        let toppings = pizzaData[i].pizzaToppings;
        let price = pizzaData[i].pizzaPrice; 

        monthPizza.innerHTML += `
        <div class="card">
            <div class="card-body">
                 <h5 class="card-title">${name}</h5>
                <p class="card-text"><strong>Base:</strong> ${base}</p>
                <p class="card-text"><strong>Size:</strong> ${size}</p>
                <p class="card-text"><strong>Toppings:</strong> ${toppings.join}</p>
                <p class="card-text"><strong>Cost:</strong> R${price}.00</p>
            </div>
        </div>`
    }
}

let pizzaOrder = [];

makePizza = () =>{

    let pizzaTotal = 0;

    let pizzaName = document.getElementById("pizzaName").value;
    let size = document.getElementById("size").value;

    if(size === "Small"){
        pizzaTotal = pizzaTotal + 20;
    } else if(size === "Medium"){
        pizzaTotal = pizzaTotal + 40;
    } else if(size === "Large"){
        pizzaTotal = pizzaTotal + 60;
    }

          // Get Radio Options
    let baseOption = document.getElementsByName("baseRadio");
    let baseValue; 
    for(let i = 0; i < baseOption.length; i++){
        if(baseOption[i].checked){
            baseValue = baseOption[i].value
            pizzaTotal = pizzaTotal + +baseOption[i].dataset.cost
        }
    }

    let toppingOptions = document.getElementsByName("toppings");
    let topArray = [];
    for(let i = 0; i < toppingOptions.length; i++){
        if(toppingOptions[i].checked){
            topArray.push(toppingOptions[i].value);
            pizzaTotal = pizzaTotal + +toppingOptions[i].dataset.cost
        }
    }

    pizzaOrder.push({
        pizzaName: pizzaName,
        pizzaSize: size,
        pizzaBase: baseValue,
        pizzaToppings: topArray,
        pizzaPrice: pizzaTotal
    });

    console.log(pizzaOrder)

    document.getElementById("realTimeCost").innerHTML = "R0.00"
    document.getElementById("pizzaForm").reset();

}

realTimeCost = () => {

    realTimePrice = 0; 

    let size = document.getElementById("size").value;
    if(size === "Small"){
        realTimePrice = realTimePrice + 20;
    } else if(size === "Medium"){
        realTimePrice = realTimePrice + 40;
    } else if(size === "Large"){
        realTimePrice = realTimePrice + 60;
    }

    let baseOption = document.getElementsByName("baseRadio"); 
    for(let i = 0; i < baseOption.length; i++){
        if(baseOption[i].checked){
            realTimePrice = realTimePrice + +baseOption[i].dataset.cost
        }
    }

    let toppingOptions = document.getElementsByName("toppings");
    for(let i = 0; i < toppingOptions.length; i++){
        if(toppingOptions[i].checked){
            realTimePrice = realTimePrice + +toppingOptions[i].dataset.cost
        }
    }

    document.getElementById("realTimeCost").innerHTML = "R" + realTimePrice + ".00"

}

displayOrder = () => {

    let area = document.getElementById("orders");
    let total = document.getElementById("orderTotal");

    area.innerHTML = "";

    let overallTotal = 0; 

    for(let i = 0; i < pizzaOrder.length; i++){

        let name = pizzaOrder[i].pizzaName;
        let size = pizzaOrder[i].pizzaSize;
        let base = pizzaOrder[i].pizzaBase;
        let toppings = pizzaOrder[i].pizzaToppings;
        let price = pizzaOrder[i].pizzaPrice; 

        overallTotal += price;

        area.innerHTML += `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text"><strong>Base:</strong> ${base}</p>
                        <p class="card-text"><strong>Size:</strong> ${size}</p>
                        <p class="card-text"><strong>Toppings:</strong> ${toppings}</p>
                        <p class="card-text"><strong>Cost:</strong> R${price}.00</p>
                    </div>
                </div>`

        total.innerHTML = "R" + overallTotal + ".00"

    }
}


checkOut =() =>{
    let data= JSON.stringify(pizzaOrder)
    localStorage.setItem('order', data)
    window.location.href = 'pages/checkout.html';
}



