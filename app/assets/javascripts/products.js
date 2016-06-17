$(document).ready(function() {
	var baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/products';

	if (location.pathname === '/') {
		// GET /products - lists all products
		function getProducts() {
	    $.ajax({
	      url: baseUrl,
	      type: 'GET',
	      dataType: 'JSON'
	    }).done( function(data) {
				var tbody = $('#products');
	      tbody.children().remove();
	      data.products.forEach( function(product) {
					var price = product.base_price ? product.base_price : '0';
          var desc = product.description ? product.description : '';
          var quantity = product.quanity_on_hand ? product.quanity_on_hand : '';
          var weight = product.weight ? product.weight : '';
          var color = product.color ? product.color : '';
          var row = '<tr data-id="' + product.id + '"><td>' + product.name + '</td>';
	            row += '<td>$' + price + '</td>';
              row += '<td>' + desc + '</td>';
              row += '<td>' + quantity + '</td>';
              row += '<td>' + color + '</td>';
              row += '<td>' + weight + '</td>';
              row += '<td>'
              row += '<button class="btn btn-danger delete">Delete</button>';
              row += '<button class="btn btn-primary show">Show</button>';
              row += '</td>';
              row += '</tr>';
	            tbody.append(row);
				});
			}).fail( function(err) {
				alert('Something went wrong call support');
			});
		}

		getProducts();

	}

	// GET /products/id - lists a single product
	$(document).on('click', '.show', function() {
			var id = $(this).closest('tr').data().id;
			location.pathname = '/products/' + id;
		})

	var re = /\/products\/\d+/;
	if (location.pathname.match(re)) {
		var panel = $('#panel');
		var id = panel.data().id;
		$.ajax({
			url: baseUrl + '/' + id,
			type: 'GET',
			dataType: 'JSON'
		}).done( function(data) {
			var product = data.product;
			panel.children('#heading').html(product.name);
			var list = $('#product');
			var name = '<li>Name: ' + product.first_name + '</li>';
			var price = '<li>Price: $' + product.base_price + '</li>';
			var desc = '<li>Description: ' + product.description + '</li>';
			var quantity = '<li>Quantity: ' + product.quanity_on_hand + '</li>';
			var color = '<li>Color: ' + product.color + '</li>';
			var weight = '<li>Weight: ' + product.weight + '</li>';
			list.append(name);
			list.append(price);
			list.append(desc);
			list.append(quantity);
			list.append(color);
			list.append(weight);
		})
	}







// POST /products
//   POST DATA:
//     product[name] - required
//     product[base_price] - optional
//     product[description] - optional  
//     product[quanity_on_hand] - optional  
//     product[color] - optional
//     product[weight] - optional  
//     product[other_attributes][] - optional - (hint: http://stackoverflow.com/questions/8890524/pass-array-to-ajax-request-in-ajax)


//    PUT /products/id - update a product( hint: use data to update)



//    DELETE /products/id - delete a product (no data needed)



})