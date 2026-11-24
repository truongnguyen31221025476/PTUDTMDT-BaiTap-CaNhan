$(function () {
    var catalog = window.TechStoreCatalog;

    if (catalog) {
        $('.product-card').each(function () {
            var product = catalog.getById($(this).attr('data-product-id'));
            if (!product) { return; }
            $(this).find('.product-image img').attr({
                src: product.heroImage,
                alt: 'Ảnh đại diện ' + product.name
            });
            $(this).find('.caption h4 a').text(product.name)
                .attr('href', catalog.getDetailUrl(product.id));
            $(this).find('.product-price').text(catalog.formatPrice(product.price));
            $(this).find('.product-description').text(product.description);
            $(this).find('.add-to-cart a').attr({
                'aria-label': 'Thêm ' + product.name + ' vào giỏ hàng',
                'data-id': product.id
            });
        });
    }

    $('[data-toggle="tooltip"]').tooltip();
    $('.add-to-cart a').on('click', function (event) {
        event.preventDefault();
        var id = $(this).attr('data-id') || $(this).closest('.product-card').attr('data-product-id');
        var outcome = window.TechStoreCart.add(id, 1);
        window.TechStoreCart.notify(outcome.message, !outcome.ok);
    });
});
