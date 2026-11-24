$(function () {

    var catalog = window.TechStoreCatalog;
    var selectedId = new URLSearchParams(window.location.search).get('id');
    var selectedProduct = catalog && catalog.getById(selectedId);

    if (!selectedProduct) {
        window.location.replace('ecommerce.html');
        return;
    }

    if (selectedProduct) {
        document.title = selectedProduct.seoTitle || (selectedProduct.name + ' | TechStore');
        $('meta[name="description"]').attr('content', selectedProduct.seoDescription || selectedProduct.description);
        $('.product-info .product-price').text(catalog.formatPrice(selectedProduct.price));
        $('.product-info .clearfix h4 a').text(selectedProduct.name)
            .attr('href', catalog.getDetailUrl(selectedProduct.id));
        var description = $('.product-info .description').empty();
        description.append($('<p></p>').text(selectedProduct.intro || selectedProduct.description));
        if (selectedProduct.highlights && selectedProduct.highlights.length) {
            var list = $('<ul class="product-highlights"></ul>');
            $.each(selectedProduct.highlights, function (_, item) {
                list.append($('<li></li>').text(item));
            });
            description.append(list);
        }

        var galleryItems = selectedProduct.gallery || [];
        var gallery = $('#productThumbnails').empty();
        $.each(galleryItems, function (index, photo) {
            var anchor = $('<a></a>', {
                href: photo.src,
                'data-alt': photo.alt,
                'data-role': photo.role,
                'aria-label': 'Xem ' + photo.role.toLowerCase() + ' của ' + selectedProduct.name
            });
            anchor.append($('<img>', {
                src: photo.src,
                alt: photo.role + ' - ' + selectedProduct.name,
                'class': 'img-thumbnail img-responsive xzoom-gallery',
                xpreview: photo.src,
                loading: 'lazy'
            }));
            gallery.append($('<div class="col-xs-3"></div>').append(anchor));
        });
        gallery.toggle(galleryItems.length > 1);
        if (galleryItems.length) {
            $('#mainProductImage').attr({
                src: galleryItems[0].src,
                xoriginal: galleryItems[0].src,
                alt: galleryItems[0].alt
            });
        }

        if (selectedProduct.id !== 'laptop') {
            $('.ram-options').closest('.form-group').hide();
            $('#selectedRam').val('');
            $('#color').closest('.form-group').hide();
            $('#reviewEntries').empty();
            $('#reviewCount').text('Chưa có đánh giá');
            $('#averageRating').text('Chưa có điểm đánh giá');
        }

        var related = $.grep(catalog.getAll(), function (p) {
            return p.id !== selectedProduct.id;
        });
        $('.related-card').each(function (index) {
            var product = related[index];
            if (!product) { $(this).closest('.col-sm-4').hide(); return; }
            $(this).attr('data-product-id', product.id);
            var picture = $(this).find('.related-picture');
            picture.find('img').attr({src: product.heroImage, alt: 'Ảnh ' + product.name});
            picture.find('a').remove();
            picture.wrapInner($('<a></a>', {href: catalog.getDetailUrl(product.id), 'aria-label': 'Xem ' + product.name}));
            $(this).find('.caption h4 a').text(product.name).attr('href', catalog.getDetailUrl(product.id));
            $(this).find('.related-price').text(catalog.formatPrice(product.price));
            $(this).find('.related-description').text(product.description);
            $(this).find('.related-add').attr({
                'data-name': product.name,
                'data-id': product.id,
                'aria-label': 'Thêm ' + product.name + ' vào giỏ hàng'
            });
        });
    }

    // Official xZoom controls thumbnail selection and magnification.
    if ($.fn.xzoom && selectedProduct.gallery && selectedProduct.gallery.length) {
        var detailZoom = $('#mainProductImage, #productThumbnails .xzoom-gallery').xzoom({
            position: 'inside',
            mposition: 'inside',
            scroll: true,
            openOnSmall: true,
            adaptive: true,
            activeClass: 'xactive',
            title: false,
            fadeTrans: false
        });

        // Keep xZoom responsible for thumbnail selection, but only the first
        // (representative) image is magnified on mouse hover.
        if (detailZoom && typeof detailZoom.openzoom === 'function') {
            var heroSelected = true;
            var $detailMain = $('#mainProductImage');
            $detailMain.off('mouseenter', detailZoom.openzoom);
            $('#productThumbnails').on('click.techstoreHeroZoom', 'a', function () {
                heroSelected = $(this).closest('.col-xs-3').index() === 0;
                if (!heroSelected) { detailZoom.closezoom(); }
            });
            $detailMain.on('mouseenter.techstoreHeroZoom', function (event) {
                if (heroSelected) { detailZoom.openzoom(event); }
            });
        }
    } else if (!$.fn.xzoom) {
        console.error('xZoom is unavailable. Check assets/vendor/xzoom/xzoom.min.js');
    }

    // Select RAM
    $('.ram-options button').on('click', function () {
        $('.ram-options button')
            .removeClass('active')
            .attr('aria-pressed', 'false');

        $(this)
            .addClass('active')
            .attr('aria-pressed', 'true');

        $('#selectedRam').val($(this).data('ram'));
    });

    // Clear quantity validation
    $('#number').on('input', function () {
        this.setCustomValidity('');
    });

    // Add to Cart
    $('#productOrderForm').on('submit', function (event) {
        event.preventDefault();

        var quantityInput = document.getElementById('number');
        var quantity = Number(quantityInput.value);

        if (!Number.isInteger(quantity) || quantity < 1) {
            quantityInput.setCustomValidity(
                'Vui lòng nhập số nguyên lớn hơn 0.'
            );

            quantityInput.reportValidity();
            return;
        }

        quantityInput.setCustomValidity('');

        var color = $('#color').val();
        var ram = $('#selectedRam').val();

        var currentCount = Number(
            $('.cart-badge').first().text()
        );

        var newCount = currentCount + quantity;

        $('.cart-badge').text(newCount);

        $('.cart-badge').closest('a').attr(
            'aria-label',
            'Giỏ hàng, ' + newCount + ' sản phẩm'
        );

        $('#productFeedback')
            .text(
                'Đã thêm ' + quantity +
                ' ' + (selectedProduct ? selectedProduct.name : 'Laptop 14 inch') +
                (selectedProduct && selectedProduct.id === 'laptop' ? ', màu ' + color + ', RAM ' + ram : '') +
                ' vào giỏ hàng.'
            )
            .prop('hidden', false);
    });

    // Other Products
    $('[data-toggle="tooltip"]').tooltip();

    $('.related-add').on('click', function () {
        var productName = $(this).attr('data-name');

        var count = Number(
            $('.cart-badge').first().text()
        ) + 1;

        $('.cart-badge').text(count);

        $('.cart-badge').closest('a').attr(
            'aria-label',
            'Giỏ hàng, ' + count + ' sản phẩm'
        );

        $('#relatedFeedback')
            .text(
                'Đã thêm 1 ' + productName +
                ' vào giỏ hàng.'
            )
            .prop('hidden', false);
    });

});
