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
				var form = $('.add-form');
				form.slideToggle();
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
              row += '<button class="btn btn-primary show">Show</button>';
              row += '<button class="btn btn-warning edit">Edit</button>';
              row += '<button class="btn btn-danger delete">Delete</button>';
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
		var row = $(this).closest('tr');
		var list = $('#product');
		var button = $(this);
    button.toggleClass('SeeOrHide');
    if(button.hasClass('SeeOrHide')){
        button.text('Hide');         
    } else {
        button.text('Show');
    }
		$.ajax({
			url: baseUrl + '/' + id,
			type: 'GET',
			dataType: 'JSON'
		}).done( function(data) {
			if (list.children().length > 0 ) {
		    list.children().remove();
			}	else {
				var product = data.product;
				var name = '<li>Name: ' + product.name + '</li>';
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
				$(row).after(list);
			}
		})
	})



	// POST add a product
	$(document).on('click', '.add', function() {
		console.log('in here!');
		var form = $('.add-form');
		form.slideDown();
		var button = $(this);
		button.toggleClass('SeeOrHide');
    if(button.hasClass('SeeOrHide')){
        button.text('Cancel'); 

    } else {
        button.text('Add Product');
        form.slideUp(); 
    }


		$('#new_product').on('submit', function(e) {
			e.preventDefault();
			$.ajax({
				url: baseUrl,
				type: 'POST',
				dataType: 'JSON',
				data: $(this).serializeArray()
			}).done( function() {
				location.pathname = '/';
			});
		})
	})




	// // PUT /products/id - update a product( hint: use data to update)
	// $(document).on('click', '.add', function() {
	// 		var id = $(this).closest('tr').data().id;
	// 		location.pathname = '/products/' + id + '/edit';
	// })








//    DELETE /products/id - delete a product (no data needed)

})