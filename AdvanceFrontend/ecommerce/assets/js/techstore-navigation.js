(function ($) {
    "use strict";

    $(function () {
        var catalog = window.TechStoreCatalog;
        if (!catalog) { return; }

        var products = catalog.getAll();
        $('.carousel-indicators li[data-slide-to]')
            .attr({role: 'button', tabindex: '0'})
            .on('keydown', function (event) {
                if (event.which === 13 || event.which === 32) {
                    event.preventDefault();
                    $(this).trigger('click');
                }
            });
        var currentPage = window.location.pathname.split('/').pop().toLowerCase() || 'ecommerce.html';
        var currentId = new URLSearchParams(window.location.search).get('id');
        var currentProduct = currentPage === 'ecommerce-detail.html' ? catalog.getById(currentId) : null;

        function productIdFromLink(href) {
            if (!href) { return null; }
            try {
                var url = new URL(href, document.baseURI);
                if (url.pathname.split('/').pop().toLowerCase() !== 'ecommerce-detail.html') {
                    return null;
                }
                return url.searchParams.get('id');
            } catch (error) {
                return null;
            }
        }

        function markLink($link, isActive) {
            $link.toggleClass('active', isActive);
            if (isActive) {
                $link.attr('aria-current', 'page');
            } else {
                $link.removeAttr('aria-current');
            }
        }

        var $mainNav = $('.navbar-collapse > .navbar-nav').first();
        $mainNav.find('li.active').removeClass('active');
        $mainNav.find('a[aria-current]').removeAttr('aria-current');

        if (currentPage === 'ecommerce.html') {
            $mainNav.children('li').children('a[href="ecommerce.html"]')
                .each(function () {
                    $(this).parent().addClass('active');
                    $(this).attr('aria-current', 'page');
                });
        }

        if (currentProduct) {
            $mainNav.find('a[href*="ecommerce-detail.html?id="]').each(function () {
                var linkedProduct = catalog.getById(productIdFromLink($(this).attr('href')));
                if (!linkedProduct || linkedProduct.category !== currentProduct.category) { return; }
                var $link = $(this);
                $link.closest('li').addClass('active');
                $link.attr('aria-current', 'page');
                $link.closest('li.dropdown').addClass('active');
            });
        }

        $('.category-list a.list-group-item').each(function () {
            var $link = $(this);
            var linkedProduct = catalog.getById(productIdFromLink($link.attr('href')));
            if (!linkedProduct) {
                $link.hide().removeClass('active').removeAttr('aria-current');
                return;
            }
            var count = $.grep(products, function (product) {
                return product.category === linkedProduct.category;
            }).length;
            $link.find('.badge').text(count);
            markLink($link, Boolean(currentProduct && linkedProduct.category === currentProduct.category));
        });

        if (currentPage === 'ecommerce-status.html') {
            $('.navbar-nav.navbar-right a[href="ecommerce-status.html"]')
                .attr('aria-current', 'page').closest('li').addClass('active');
            $('.order-menu a[href="ecommerce-status.html"]')
                .addClass('active').attr('aria-current', 'page');
        }

        $('.product-card[data-product-id]').each(function () {
            var $card = $(this);
            var product = catalog.getById($card.attr('data-product-id'));
            if (!product) { $card.hide(); return; }
            $card.find('.product-photo-link').attr({
                'href': catalog.getDetailUrl(product.id),
                'aria-label': 'Xem chi tiết ' + product.name
            });
            $card.find('.caption h4 a').attr('href', catalog.getDetailUrl(product.id));
            $card.find('.add-to-cart a').attr('data-id', product.id);
        });

        $('.order-item[data-product-id]').each(function () {
            var $order = $(this);
            var product = catalog.getById($order.attr('data-product-id'));
            if (!product) { $order.hide(); return; }
            var url = catalog.getDetailUrl(product.id);
            $order.find('.order-image a').attr({
                'href': url,
                'aria-label': 'Xem chi tiết ' + product.name
            });
            $order.find('.order-photo').attr({
                'src': product.heroImage,
                'alt': 'Ảnh ' + product.name
            });
            $order.find('.order-product a').text(product.name).attr('href', url);
            $order.find('.order-price').text(catalog.formatPrice(product.price));
            $order.find('[data-product]').attr('data-product', product.name);
        });

        $('.related-card[data-product-id]').each(function () {
            var $card = $(this);
            var product = catalog.getById($card.attr('data-product-id'));
            if (!product) { $card.closest('.col-sm-4').hide(); return; }
            $card.find('.related-picture a').attr({
                'href': catalog.getDetailUrl(product.id),
                'aria-label': 'Xem chi tiết ' + product.name
            });
            $card.find('.caption h4 a').attr('href', catalog.getDetailUrl(product.id));
            $card.find('.related-add').attr({
                'data-id': product.id,
                'data-name': product.name
            });
        });
    });
})(jQuery);
