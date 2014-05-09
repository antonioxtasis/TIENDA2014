/***************  Events ******************/
function removeItem(elem){
    var id = elem.id;
    //Remove the ROW        
    $("#" + id).parent().parent().remove();

    saveArticlesToBuy();

    //Reload the page
    location.reload();
}

function saveArticlesToBuy(){
    // //Reset
    localStorage.removeItem('data');
    localStorage.setItem('data', "");

    var articlesToBuy = {
        'articles' : []
    };

    var id = "";
    var quantity = "";
    var price = "";
    var name = "";

    //Get id and quantity by each ROW
    $("#table-body  tr").each(function(){
        id =  $(this).find(".id").html();
        quantity =  $(this).find(".quantity").html();
        price =  $(this).find(".price").html();
        name =  $(this).find(".name").text();
        if(id!=undefined && quantity!=undefined){
            //PUSH item in variable
            articlesToBuy.articles.push({"id":id, "quantity":quantity, "price":price, "name":name});
        }       
                
    });

    //SAVE items in localStorage
    localStorage.setItem('data', JSON.stringify(articlesToBuy));
    localStorage.setItem('articlesToBuy', JSON.stringify(articlesToBuy));
}

/***************  Functions ******************/ 
function lessFunction(elemento){
    var id = elemento.id;
    //Get the row index; #optional
    var row = $("#" + id).parent().parent().attr("id");
    //Get the quantity
    var actual_quantity = $("#" + row).find(".quantity").html();
    if(parseFloat(actual_quantity) > 1){
      //Parse
      var resultado = parseFloat(actual_quantity) - 1;
      //Show new quantity
      $("#" + row).find(".quantity").html(resultado);
      //Show new subtotal
      var actual_price = $("#" + row).find(".price").html();
      var subtotal = resultado * parseInt(actual_price);
      $("#" + row).find(".subtotal").html(subtotal);
      //Total refresh
      calculateTotal();

      saveArticlesToBuy();
    }       
}

function moreFunction(elemento){        
    var id = elemento.id;
    //Get the row index; #optional
    var row = $("#" + id).parent().parent().attr("id");
    //Get the quantity
    var actual_quantity = $("#" + row).find(".quantity").html();
    //Parse
    var resultado = parseFloat(actual_quantity) + 1;
    //Show new quantity
    $("#" + row).find(".quantity").html(resultado);
    //Show new subtotal
    var actual_price = $("#" + row).find(".price").html();
    var subtotal = resultado * parseInt(actual_price);
    $("#" + row).find(".subtotal").html(subtotal);
    //Total refresh
    calculateTotal();

    saveArticlesToBuy();
}
    
function calculateTotal(){
    var total = 0.00;
    var subtotal = 0.00;

    $("#table-body  tr").each(function(){
      sub =  $(this).find(".subtotal").html();
      subtotal = parseFloat(sub);
      if(sub!=undefined){
        total += subtotal;
      }               
    });
    $("#total").html(total);
}

//#############################################################################


$(document).ready(function(){
    if(localStorage.getItem('data')!=null || localStorage.getItem('data')!=undefined || localStorage.getItem('data')!=""){
        data = JSON.parse(localStorage.getItem('data'));
    }

    Conekta.setPublishableKey('key_LUYetCR5VpoHknb8');

    //Get article list of the JSON saved in LocalStorage
    if(localStorage.getItem('data')!=null && localStorage.getItem('data')!= ""){
        $('table').show();
        $("#error").hide();
        //Transform the String generated through JSON.stringify and saved in localStorage in JSON object again
        var restoredData = JSON.parse(localStorage.getItem('data'));
        //Fill the Table
        for (var i=0; i < restoredData.articles.length; i++) {
            if(restoredData.articles[i] != null && restoredData.articles[i] != ""){
              $("#table-body").append(
                    "<tr id='row_"+i+"'>"
                  + "<td class=id>" + restoredData.articles[i].id + "</td>"
                  + "<td><span class=name><b>" + restoredData.articles[i].name + "<b></span></td>"
                  + "<td><span class=price>" + restoredData.articles[i].price + "</span></td>"
                  + "<td><span class=quantity>" + restoredData.articles[i].quantity +"</span></td>"
                  + "<td>"
                  +   "<img id='img_less_"+restoredData.articles[i].id+"' src='/images/less.png' style='cursor: pointer;' onclick='lessFunction(this)'>"
                  +   "<img id='img_more_"+restoredData.articles[i].id+"' src='/images/more.png' style='cursor: pointer;' onclick='moreFunction(this)'>"
                  + "</td>"
                  + "<td><span class=subtotal>" + parseFloat(restoredData.articles[i].price) * parseInt(restoredData.articles[i].quantity) + "</span></td>"
                  + "<td><img src='/images/item-remove.png' class='img-remove' id=button_article_"+restoredData.articles[i].id+" style='width:20px; cursor: pointer;' onclick=removeItem(this)></td>"
                  + "<tr>"
              );
            }       
        }
      
        //Trigger the Function
        calculateTotal();

      }else{
            $("#error").show();
            $('table').hide();
      }//end if

      /************************************************************************************/  
      /*****************************  LLAMADAS AJAX ***************************************/  
      /************************************************************************************/

      var navListItems = $('ul.setup-panel li a'),
          allWells = $('.setup-content');

      allWells.hide();

      navListItems.click(function(e)
      {
          e.preventDefault();
          var $target = $($(this).attr('href')),
              $item = $(this).closest('li');
          
          if (!$item.hasClass('disabled')) {
              navListItems.closest('li').removeClass('active');
              $item.addClass('active');
              allWells.hide();
              $target.show();
          }
      });
    
      $('ul.setup-panel li.active a').trigger('click');
      
      // DEMO ONLY //
      $('#activate-step-2').on('click', function(e) {
          saveArticlesToBuy();

          $('ul.setup-panel li:eq(1)').removeClass('disabled');
          $('ul.setup-panel li a[href="#step-2"]').trigger('click');
          $('#step-2').show();
      });

          // DEMO ONLY //
      $('#activate-step-3').on('click', function(e) {
          $('ul.setup-panel li:eq(2)').removeClass('disabled');
          $('ul.setup-panel li a[href="#step-3"]').trigger('click');
          $(this).remove();
      });


      $("#activate-step-2").click(function(){
            /*************************** Get User Data *****************/
             var id = $("#hdn_user").val();
              $.ajax({
               type:"GET",
               dataType: 'json',
               url:'/api/getUserData?userId=' + id,
               data: {},
               success: function(data){
                 console.log(data);
                 for (var i=0;i<data.length;i++) {
                    if (data[i]!=undefined && data[i]!=null && data[i]!=""){
                        $("#user-name").val(data[i].first_name);
                        $("#user-last-name").val(data[i].last_name);
                        $("#user-email").val(data[i].email);
                        $("#user-phone").val(data[i].phone);
                    }                      
                 }
               }
              });    

              //*************************** Get list of Countries *****************/
              $.ajax({
               type:"GET",
               dataType: 'json',
               url:'/api/getCountries',
               data:{},
               success: function(data){
                 for (var i=0;i<data.length;i++) { 
                   $("#country").append(
                         "<option value="+data[i].id+">" + data[i].name + "</option>"
                   );

                   $("#id_country").append(
                         "<option value="+data[i].id+">" + data[i].name + "</option>"
                   );
                 }
               }
              });

              //*************************** Get list of States *****************/
              $.ajax({
               type:"GET",
               dataType: 'json',
               url:'/api/getStates',
               data:{},
               success: function(data){
                 console.log(data);

                 for (var i=0;i<data.length;i++) { 
                   $("#state").append(
                         "<option value="+data[i].id+">" + data[i].name + "</option>"
                   );

                   $("#id_state").append(
                         "<option value="+data[i].id+">" + data[i].name + "</option>"
                   );
                 }
               }
              });
              //*************************** Get list of Cities *****************/
              $.ajax({
               type:"GET",
               dataType: 'json',
               url:'/api/getCities',
               data:{},
               success: function(data){
                 console.log(data);

                 for (var i=0;i<data.length;i++) { 
                   $("#city").append(
                         "<option value="+data[i].id+">" + data[i].name + "</option>"
                   );

                   $("#id_city").append(
                         "<option value="+data[i].id+">" + data[i].name + "</option>"
                   );
                 }
               }
              });

              /*************************** Get User Address *****************/
              var hdn_user_address = $("#hdn_user_address").val();
              if(hdn_user_address>0){
                $.ajax({
                  type:"GET",
                  dataType: 'json',
                  url:'/api/getUserAddress?id_address=' + hdn_user_address,
                  data: {},
                  success: function(data){
                    console.log(data);
                    for (var i=0;i<data.length;i++) {
                      if (data[i]!=undefined && data[i]!=null && data[i]!=""){
                        $("#user-address").val(data[i].neighborhood);
                        $("#country option").each(function(){
                        if ($(this).val() == data[i].id_country)
                          $(this).attr("selected","selected");
                        });
                        $("#state option").each(function(){
                          if ($(this).val() == data[i].id_state)
                          $(this).attr("selected","selected");
                        });

                        $("#city option").each(function(){
                        if ($(this).val() == data[i].id_city)
                          $(this).attr("selected","selected");
                        });
                      }                      
                    }
                  }
                });  
              } else {   
                $("#address").modal('show');
              }     
      });

      $("#address_form").submit(function(e) {
          e.preventDefault();
          var actionurl = e.currentTarget.action;
           $.ajax({
                  url: actionurl,
                  type: 'post',
                  dataType: 'json',
                  data: $("#address_form").serialize(),
                  success: function(data) {
                      if(data.createdAt){
                        $("#user-address").val($("#street").val());
                        $("#address").modal('hide');
                      }
                  }
            });
       });

       var usuario;
       $("#user_form").submit(function(e){
          e.preventDefault();
          usuario = $("#user_form").serialize();
          $('ul.setup-panel li:eq(2)').removeClass('disabled');
          $('ul.setup-panel li a[href="#step-3"]').trigger('click');
          $('#step-3').show();
       });


       $("#payment_form").submit(function(e){
            $('.backdrop_graph').show();
            e.preventDefault();
            Conekta.charge.create({
              amount: 100000,
              currency: 'MXN',
              description: 'Compra Tienda En Línea',
              card: {
                name: $('#cardname').val(),
                cvc: $('#cvc').val(),
                exp_month: $('#month').val(),
                exp_year: $('#year').val(),
                number: $('#cardnumber').val(),
                address: {
                  street1: 'Alfonso Reyes 231',
                  street2: 'Despacho 112',
                  street3: 'Condesa',
                  city: 'Cuauhtemoc',
                  state: 'DF',
                  country: 'MX',
                  zip: '06100'
                }
              }
            }, conektaSuccessResponseHandler, conektaErrorResponseHandler);
       });

      function conektaSuccessResponseHandler(response) {
          $('.backdrop_graph').hide();
          $(".payment-errors").empty();
          $.ajax({
            url: '/order/create',
            type: 'post',
            dataType: 'json',
            data: JSON.parse(localStorage.getItem('articlesToBuy')),
            success: function(data) {
              if(data == "bien") {
                $('ul.setup-panel li:eq(3)').removeClass('disabled');
                $('ul.setup-panel li a[href="#step-4"]').trigger('click');
                $('#step-4').show();
                localStorage.clear();
              }
            }
          });
      }

      function conektaErrorResponseHandler(response) {
        $('.backdrop_graph').hide();
        console.log(response);
        $(".payment-errors").text(response.message);
      }    
});