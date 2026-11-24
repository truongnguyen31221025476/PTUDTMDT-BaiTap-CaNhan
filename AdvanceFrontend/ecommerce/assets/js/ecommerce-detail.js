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
        $('#pageHeading').text(selectedProduct.name + ' | TechStore');
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

    // Zoom is available only for the representative image; other thumbnails change the preview.
    var $detailMain = $('#mainProductImage');
    var $detailThumbs = $('#productThumbnails');
    var detailHeroSelected = true;
    $detailMain.attr('data-zoom-policy', 'hero-only-v15.3');

    if ($.fn.xzoom && selectedProduct.gallery && selectedProduct.gallery.length) {
        // Do not register the thumbnail images with xZoom.
        var detailZoom = $detailMain.xzoom({
            position: 'inside',
            mposition: 'inside',
            scroll: true,
            openOnSmall: true,
            adaptive: true,
            title: false,
            fadeTrans: false
        });

        if (detailZoom && typeof detailZoom.openzoom === 'function') {
            $detailMain.off('mouseenter');
            $detailMain.on('mouseenter.techstoreHeroZoom', function (event) {
                if (detailHeroSelected && this.complete && this.naturalWidth > 0) {
                    detailZoom.openzoom(event);
                }
            });
        }
        $detailThumbs.find('img').removeClass('xactive').first().addClass('xactive');
        $detailThumbs.on('click.techstoreHeroZoom', 'a', function (event) {
            event.preventDefault();
            var index = $detailThumbs.find('a').index(this);
            var photo = selectedProduct.gallery[index];
            if (!photo) { return; }
            detailHeroSelected = index === 0;
            if (detailZoom && typeof detailZoom.closezoom === 'function') {
                detailZoom.closezoom();
            }
            $detailMain.attr({src: photo.src, xoriginal: photo.src, alt: photo.alt});
            $detailThumbs.find('img').removeClass('xactive').eq(index).addClass('xactive');
        });
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

    // Keep stock-limit validation in Vietnamese, including native browser prompts.
    $('#number').on('input invalid', function () {
        var max = Number(this.max);
        var value = Number(this.value);
        this.setCustomValidity('');
        if (this.validity.rangeOverflow || (this.value !== '' && Number.isFinite(max) && value > max)) {
            this.setCustomValidity('Chỉ có thể thêm tối đa ' + max + ' sản phẩm nữa.');
        } else if (this.validity.rangeUnderflow) {
            this.setCustomValidity('Số lượng tối thiểu là 1.');
        } else if (this.value !== '' && !Number.isInteger(value)) {
            this.setCustomValidity('Vui lòng nhập số lượng nguyên.');
        }
    });

    // Add the selected product with its actual quantity and variation.
    $('#productOrderForm').on('submit', function (event) {
        event.preventDefault();
        var $quantity = $('#number');
        var quantityInput = $quantity[0];
        var amount = Number($quantity.val());
        var outcome = window.TechStoreCart.add(selectedProduct.id, amount, {
            color: $('#color').val(),
            ram: $('#selectedRam').val()
        });
        if (!outcome.ok && (!Number.isInteger(amount) || amount < 1)) {
            quantityInput.setCustomValidity(outcome.message);
            quantityInput.reportValidity();
            return;
        }
        quantityInput.setCustomValidity('');
        $('#productFeedback')
            .toggleClass('alert-success', outcome.ok)
            .toggleClass('alert-danger', !outcome.ok)
            .text(outcome.message)
            .prop('hidden', false);
        if (outcome.ok) { window.TechStoreCart.notify(outcome.message); }
    });

    // Add related products through the same cart and stock rules.
    $('[data-toggle="tooltip"]').tooltip();
    $('.related-add').on('click', function () {
        var id = $(this).attr('data-id');
        var outcome = window.TechStoreCart.add(id, 1);
        $('#relatedFeedback')
            .toggleClass('alert-success', outcome.ok)
            .toggleClass('alert-danger', !outcome.ok)
            .text(outcome.message)
            .prop('hidden', false);
        if (outcome.ok) { window.TechStoreCart.notify(outcome.message); }
    });

});
