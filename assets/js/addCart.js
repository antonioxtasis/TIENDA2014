//Global Variable
var data = {
       'articles' : []
};
data = JSON.parse(localStorage.getItem('data'))

function addCart(elem){
      //Get Article ID
      var id = elem.id.substring(15);
      var q = $("#select_article_" + id + " option:selected").text();
      var name = $("#name_article_" + id).text();
      var price = $("#price_article_" + id).text();

      //Fade-In
      $("#button_article_" + id).hide();
      $("#select_article_" + id).before("<br><span style='color: green;'><b>Added to Cart!</b></span>");
      $("#select_article_" + id).hide();

      //LocalStorage      
      data.articles.push({"id":id, "quantity":q, "name":name, "price":price});

      //Converting the JSON string with JSON.stringify then saving with localStorage
      localStorage.setItem('data', JSON.stringify(data));
}