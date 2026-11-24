(function ($) {
    'use strict';

    $(function () {
        var catalog = window.TechStoreCatalog;
        if (!catalog) { return; }

        function offer(product) {
            if (!product) { return null; }
            var price = Number(product.price);
            var original = Number(product.originalPrice);
            var discount = Number.isFinite(price) && Number.isFinite(original) &&
                price > 0 && original > price ?
                Math.round((original - price) * 100 / original) : 0;
            var label = product.badge === 'new' ? 'New' :
                product.badge === 'best-seller' ? 'Best Seller' : '';
            return { discount: discount, original: discount > 0 ? original : null, label: label };
        }

        function badgeNode(text, classes, position) {
            return $('<span>', {
                'class': 'label ' + classes + ' techstore-promo-label techstore-promo-label--' + position
            }).text(text);
        }

        function renderFlags($host, product) {
            if (!$host.length) { return; }
            $host.children('.techstore-product-flags').remove();
            var info = offer(product);
            if (!info || (!info.discount && !info.label)) { return; }

            var $flags = $('<div>', { 'class': 'techstore-product-flags' });
            if (info.discount) {
                $flags.append(badgeNode('-' + info.discount + '%', 'label-danger', 'left'));
            }
            if (info.label) {
                $flags.append(badgeNode(info.label,
                    info.label === 'New' ? 'label-success' : 'label-warning', 'right'));
            }
            $host.prepend($flags);
        }

        function renderPrice($host, product) {
            if (!$host.length) { return; }
            $host.children('.techstore-original-price').remove();
            var info = offer(product);
            if (info && info.original) {
                $host.append($('<del>', {
                    'class': 'techstore-original-price',
                    'aria-label': 'Giá gốc ' + catalog.formatPrice(info.original)
                }).text(catalog.formatPrice(info.original)));
            }
        }

        function renderProductCard($card) {
            var product = catalog.getById($card.attr('data-product-id'));
            if (!product) { return; }
            renderFlags($card.find('.product-image').first(), product);
            renderPrice($card.find('.product-price').first(), product);
        }

        function renderRelatedCard($card) {
            var product = catalog.getById($card.attr('data-product-id'));
            if (!product) { return; }
            renderFlags($card.find('.related-picture').first(), product);
            renderPrice($card.find('.related-price').first(), product);
        }

        $('.product-card[data-product-id]').each(function () { renderProductCard($(this)); });

        // Detail content has already been populated by ecommerce-detail.js.
        if ($('#mainProductImage').length) {
            var id = new URLSearchParams(window.location.search).get('id');
            var product = catalog.getById(id);
            if (product) {
                renderFlags($('.product-gallery').first(), product);
                renderPrice($('.product-info .product-price').first(), product);
            }
            $('.related-card').each(function () { renderRelatedCard($(this)); });
        }

        // Rebuild the overlay on each Bootstrap Modal opening to prevent stale labels.
        $('#techstoreQuickView').on('show.bs.modal', function () {
            var $modal = $(this);
            var href = $('#techstoreQuickViewDetail').attr('href') || '';
            var id = null;
            try {
                id = new URL(href, document.baseURI).searchParams.get('id');
            } catch (error) { return; }
            var product = catalog.getById(id);
            renderFlags($modal.find('#techstoreQuickViewGallery'), product);
            renderPrice($modal.find('#techstoreQuickViewPrice'), product);
        });
        $('#techstoreQuickView').on('hidden.bs.modal', function () {
            $(this).find('.techstore-product-flags, .techstore-original-price').remove();
        });
    });
})(jQuery);
