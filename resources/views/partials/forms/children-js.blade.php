	$('.add-{{$container}}').on('click', function(e) {
		e.preventDefault();
		var container = $('.collection-container-{{$container}}');
		var count = container.children().length;
		var proto = container.data('prototype').replace(/__NAME__/g, count);
		console.log(proto)
		@if ($boxed)
		proto = '<div class="box"><div class="box-header with-border"><h3 class="box-title">{{$class}}</h3></div>' +
				'<div class="box-body">' +
				proto +
				'</div></div>';
		@else
			proto = '<div class="row">' +
				proto +
				'</div>';
		@endif

		container.append(proto);
	});

	$('.remove-{{$container}}').on('click', function(e) {
		e.preventDefault();
		var a = $(".collection-container-{{$container}}");
		var children = a.children()
		children[children.length - 1].remove();
	});

	@if($parent != null)
		@if (!count($parent->$container))
			var a = $(".collection-container-{{$container}}");
			var children = a.children()
			children[children.length - 1].remove();
		@endif
	@endif
