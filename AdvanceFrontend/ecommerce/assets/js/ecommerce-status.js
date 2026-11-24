$(function () {
    var catalog = window.TechStoreCatalog;
    if (catalog) {
        $('.order-item').each(function () {
            var product = catalog.getById($(this).attr('data-product-id'));
            if (!product) { return; }
            $(this).find('.order-photo').attr({src: product.heroImage, alt: 'Ảnh ' + product.name});
            $(this).find('.order-image a').attr('href', catalog.getDetailUrl(product.id));
            $(this).find('.order-product a').text(product.name).attr('href', catalog.getDetailUrl(product.id));
            $(this).find('.order-price').text(catalog.formatPrice(product.price));
            $(this).find('[data-product]').attr('data-product', product.name);
        });
    }


    // Tracking information
    $('.track-order').on('click', function () {
        var product = $(this).attr('data-product');
        $('#trackingProduct').text(product);
    });

    // Messages
    $('.message-order').on('click', function (event) {
        event.preventDefault();

        var product = $(this).attr('data-product');
        var count = $(this).attr('data-count');

        $('#messageProduct').text(product);
        $('#messageCount').text(
            count + ' tin nhắn.'
        );

        $('#messageModal').modal('show');
    });

    // Sidebar items
    $('.sidebar-demo').on('click', function () {
        var title = $(this).attr('data-title');

        $('#sidebarModalLabel').text(title);
        $('#sidebarModal').modal('show');
    });

});
