//call to the recipe api
//call to the restaurant api
//toggle switch between restaurant and recipe
//check box for cuisine parameter, possible an array
//click func for search

$('.dropdown-trigger').dropdown();
$(".parallax").parallax();




//Click Function for random restaurant by cuisine
$(".restButton").on("click", function (event) {
    event.preventDefault();
    var citySearch = $(".city").val();
    var cityURL = 'https://developers.zomato.com/api/v2.1/cities?q=' + citySearch;


    var cuisine = $(this).text();
    //API call to get city code
    $.ajax({
        url: cityURL,
        method: "GET",
        beforeSend: function (parameter) {
            parameter.setRequestHeader("user-key", "f9550802c047aa378e5fcae18afc7d6b");

        }

    }).then(function (response) {


        var city = (response.location_suggestions[0].id)



        var cuisinesURL = 'https://developers.zomato.com/api/v2.1/cuisines?city_id=' + city;
        //API call to get cuisine ids
        $.ajax({
            url: cuisinesURL,
            method: "GET",
            beforeSend: function (parameter) {
                parameter.setRequestHeader("user-key", "f9550802c047aa378e5fcae18afc7d6b");

            }

        }).then(function (response) {
            var matchedCuisine = response.cuisines.find(function (foodType) {
                return foodType.cuisine.cuisine_name.toLowerCase() === cuisine.toLowerCase();
            })

            var cuisine_id = matchedCuisine.cuisine.cuisine_id;


            var queryURL = 'https://developers.zomato.com/api/v2.1/search?entity_id=' + city + '&entity_type=city&cuisines=' + cuisine_id;
            //API call to get restaurants
            $.ajax({
                url: queryURL,
                method: "GET",
                beforeSend: function (parameter) {
                    parameter.setRequestHeader("user-key", "f9550802c047aa378e5fcae18afc7d6b");

                }
                //rendering reponses
            }).then(function (response) {
                var randomRestaurant = Math.floor(Math.random() * 19)
                let restName = $('<div>');
                restName.css({
                    'color': 'white',
                    'font-size': '30px',
                    'color': 'sandybrown'
                })
                restName.text(response.restaurants[randomRestaurant].restaurant.name);
                $(".dataRender").html(restName);

                let restIMG = $('<img>');
                restIMG.attr('src', response.restaurants[randomRestaurant].restaurant.featured_image);
                restIMG.css({
                    "height":"200px",
                    "border-style":"solid",
                    "border-color":"teal",
                    "border-width":"8px",
                    "margin-top":"5px"
                });
                $(".dataRender").append(restIMG);

                let restAddress = $('<div>')
                restAddress.text(response.restaurants[randomRestaurant].restaurant.location.address);
                restAddress.css({
                    'color': 'white',
                    'font-size': '20px',
                    'color': 'sandybrown'
                });
                $(".dataRender").append(restAddress);

                let restPhone = $('<div>')
                restPhone.text(response.restaurants[randomRestaurant].restaurant.phone_numbers);
                restPhone.css({
                    'color': 'white',
                    'font-size': '20px',
                    'color': 'sandybrown'
                });
                $(".dataRender").append(restPhone);

                let restMenu = $('<a href=>')
                restMenu.text(response.restaurants[randomRestaurant].restaurant.menu_url);
                restMenu.css({
                    'color': 'white',
                    'font-size': '20px',
                    'color': 'sandybrown'
                });
                $(".dataRender").append(restMenu);

                console.log(response.restaurants[randomRestaurant].restaurant.name);
                console.log(response.restaurants[randomRestaurant].restaurant.featured_image);
                console.log(response.restaurants[randomRestaurant].restaurant.menu_url);
                console.log(response.restaurants[randomRestaurant].restaurant.location.address);
                console.log(response.restaurants[randomRestaurant].restaurant.phone_numbers);

            const titles = JSON.parse(localStorage.getItem("titles")) || [];
            titles.push(restName.text())
            let key = "titles"
            localStorage.setItem(key,JSON.stringify(titles)); 
            for( i = 0; i < titles.length; i++) {
                let item = $("<p>");
                item.text(titles[i]);
                $(".history").append(item);
                }

            });

        });

    });
});
//Click function for random restaurant all cuisines
$(".btnRest").on("click", function (event) {
    event.preventDefault();
    var citySearch = $(".city").val();
    var cityURL = 'https://developers.zomato.com/api/v2.1/cities?q=' + citySearch;


    //API call to get city code
    $.ajax({
        url: cityURL,
        method: "GET",
        beforeSend: function (parameter) {
            parameter.setRequestHeader("user-key", "f9550802c047aa378e5fcae18afc7d6b");

        }

    }).then(function (response) {


        //function for random cuisine id
        var randCuisines1 = [`1`, `3`, `137`, `73`, `83`, `55`, `82`, `182`, `40`];

        function randCuis() {
            var result = Math.floor(Math.random() * 8)

            return result;
        };
        var index = randCuis(randCuisines1.length);
        var result = randCuisines1[index];

        var randCity = (response.location_suggestions[0].id)

        var randRestURL = 'https://developers.zomato.com/api/v2.1/search?entity_id=' + randCity + '&entity_type=city&cuisines=' + result;;



        //API call to get random restaurant all cuisines
        $.ajax({
            url: randRestURL,
            method: "GET",
            beforeSend: function (parameter) {
                parameter.setRequestHeader("user-key", "f9550802c047aa378e5fcae18afc7d6b");

            }
            //rendering responses
        }).then(function (response) {
            var randRest = Math.floor(Math.random() * 19)
            let restName = $('<div>');
            restName.css({
                'color': 'white',
                'font-size': '30px',
                'color': 'sandybrown'
            })
            restName.text(response.restaurants[randRest].restaurant.name);
            $(".dataRender").html(restName);

            let restIMG = $('<img>');
            restIMG.attr('src', response.restaurants[randRest].restaurant.featured_image);
            restIMG.css({
                'height': '200',
                'border-style':'solid',
                'border-color':'teal',
                'border-width':'8px',
                'margin-top':'5px'
            });
            $(".dataRender").append(restIMG);

            let restAddress = $('<div>')
            restAddress.text(response.restaurants[randRest].restaurant.location.address);
            restAddress.css({
                'color': 'white',
                'font-size': '20px',
                'color': 'sandybrown'
            });
            $(".dataRender").append(restAddress);

            let restPhone = $('<div>')
            restPhone.text(response.restaurants[randRest].restaurant.phone_numbers);
            restPhone.css({
                'color': 'white',
                'font-size': '20px',
                'color': 'sandybrown'
            });
            $(".dataRender").append(restPhone);

            let restMenu = $('<a href= src=>');
            restMenu.text(response.restaurants[randRest].restaurant.menu_url);
            restMenu.css({
                'color': 'white',
                'font-size': '20px',
                'color': 'sandybrown'
            });
            $(".dataRender").append(restMenu);

            console.log(response.restaurants[randRest].restaurant.name);
            console.log(response.restaurants[randRest].restaurant.featured_image);
            console.log(response.restaurants[randRest].restaurant.menu_url);
            console.log(response.restaurants[randRest].restaurant.location.address);
            console.log(response.restaurants[randRest].restaurant.phone_numbers);

            const titles = JSON.parse(localStorage.getItem("titles")) || [];
            titles.push(restName.text())
            let key = "titles"
            localStorage.setItem(key,JSON.stringify(titles)); 
            for( i = 0; i < titles.length; i++) {
                let item = $("<p>");
                item.text(titles[i]);
                $(".history").append(item);
                }
           

        });
    });
});


$(".btnRec").click(function () {
    event.preventDefault();
    
    let cuisine = ["indian","chinese","mexican","itailian","american", "bbq"]
    
    function recCui() {
        var food = Math.floor(Math.random() * 5)

        return food;
    };
    var idx = recCui(cuisine.length);
    var food = [cuisine.idx];

    let spoonUrl = "https://api.spoonacular.com/recipes/complexSearch?cuisine=" + food + "&apiKey=16c525231b8e44dab6169ec9d64da6e5"


    $.ajax({
        url: spoonUrl,
        method: "GET",

    }).then(function (response) {
        let recIndex = Math.floor(Math.random() * 10);
       
        let recId = response.results[recIndex].id;
        
        let recTitle = $("<div>");
        recTitle.text(response.results[recIndex].title);
        recTitle.css({"color": "sandybrown", "font-size":"30px", "margin-top":"5px"});
        $(".dataRender").html(recTitle);
        
        let recImg = $("<img>");
        recImg.attr("src", response.results[recIndex].image);
        recImg.css({"border-style":"solid", "border-color":"teal", "border-width":"8px", "margin-top":"5px"})
        $(".dataRender").append(recImg);
       
        let recipeUrl = "https://api.spoonacular.com/recipes/" + recId + "/information?includeNutrition=false&apiKey=16c525231b8e44dab6169ec9d64da6e5"
        $.ajax({
            url: recipeUrl,
            method: "GET",

        }).then(function (recipe) {
            for( i= 0; i < (recipe.extendedIngredients).length; i++){
                        
                let recIng = $("<div>")
                recIng.text(recipe.extendedIngredients[i].originalString);
                recIng.css({"color": "sandybrown", "font-size": "14px"});
                $(".dataRender").append(recIng);
                }

            
            let recIns = $("<div>");
            recIns.text(recipe.instructions);
            recIns.css({"color": "sandybrown", "font-size": "12px", "margin-top":"10px"});
           $(".dataRender").append(recIns);
            
            const titles = JSON.parse(localStorage.getItem("titles")) || [];
            titles.push(recTitle.text())
            let key = "titles"
            localStorage.setItem(key,JSON.stringify(titles)); 
            for( i = 0; i < titles.length; i++) {
                let item = $("<p>");
                item.text(titles[i]);
                $(".history").append(item);
            }
        })

    })

})

$(".pure-menu-link").click(function () {
    event.preventDefault();
    var choice  = $(this).text();
    console.log(choice)

    
    

    let spoonUrl = "https://api.spoonacular.com/recipes/complexSearch?cuisine=" + choice + "&apiKey=16c525231b8e44dab6169ec9d64da6e5"


    $.ajax({
        url: spoonUrl,
        method: "GET",

    }).then(function (response) {
        console.log(response.results);
        let recIndex = Math.floor(Math.random() * 10)
        console.log(response.results[recIndex].id);


        let recId = response.results[recIndex].id;
        console.log(recId);

        let recTitle = $("<div>");
        recTitle.text(response.results[recIndex].title);
        recTitle.css({"color": "sandybrown", "font-size":"30px", "margin-top":"5px"});
        $(".dataRender").html(recTitle);
        console.log(response.results[recIndex].title);

        let recImg = $("<img>");
        recImg.attr("src", response.results[recIndex].image);
        recImg.css({"border-style":"solid", "border-color":"teal", "border-width":"8px", "margin-top":"5px"})
        $(".dataRender").append(recImg);
        console.log(response.results[recIndex].image);



        let recipeUrl = "https://api.spoonacular.com/recipes/" + recId + "/information?includeNutrition=false&apiKey=16c525231b8e44dab6169ec9d64da6e5"
        $.ajax({
            url: recipeUrl,
            method: "GET",

        }).then(function (recipe) {
            console.log(recipe);

            for( i= 0; i < (recipe.extendedIngredients).length; i++){
            console.log(recipe.extendedIngredients[i].originalString);
            
            let recIng = $("<div>")
            recIng.text(recipe.extendedIngredients[i].originalString);
            recIng.css({"color": "sandybrown", "font-size": "14px"});
            $(".dataRender").append(recIng);
            }

            console.log(recipe.instructions);
            let recIns = $("<div>");
            recIns.text(recipe.instructions);
            recIns.css({"color": "sandybrown", "font-size": "12px", "margin-top":"10px"});
           $(".dataRender").append(recIns);
            
            const titles = JSON.parse(localStorage.getItem("titles")) || [];
            titles.push(recTitle.text())
            let key = "titles"
            localStorage.setItem(key,JSON.stringify(titles)); 
            for( i = 0; i < titles.length; i++) {
                let item = $("<p>");
                item.text(titles[i]);
                $(".history").append(item);
            }
        })

    })

})








