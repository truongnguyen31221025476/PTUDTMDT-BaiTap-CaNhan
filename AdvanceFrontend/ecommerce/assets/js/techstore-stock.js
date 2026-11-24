(function ($) {
    "use strict";

    $(function () {
        var catalog = window.TechStoreCatalog;
        if (!catalog) { return; }

        function inventory(product) {
            if (!product || !Number.isInteger(product.stock) ||
                !Number.isInteger(product.stockReference) ||
                product.stockReference <= 0 || product.stock < 0 ||
                product.stock > product.stockReference) {
                return null;
            }
            var ratio = Math.round(100 * product.stock / product.stockReference);
            var type = ratio >= 60 ? 'success' :
                ratio >= 35 ? 'info' :
                ratio >= 15 ? 'warning' : 'danger';
            var status = product.stock === 0 ? 'Hết hàng' :
                ratio < 15 ? 'Sắp hết hàng' :
                ratio < 35 ? 'Còn ít hàng' : 'Còn hàng';
            return {
                available: product.stock,
                reference: product.stockReference,
                percent: ratio,
                status: status,
                type: type
            };
        }

        function buildStock(product, size) {
            var data = inventory(product);
            if (!data) { return null; }

            var compact = size === 'card';
            var $container = $('<section>', {
                'class': 'techstore-stock techstore-stock--' + size,
                'aria-label': 'Trạng thái tồn kho ' + product.name
            });
            var $header = $('<div>', {'class': 'techstore-stock__header'});
            $header.append($('<span>', {'class': 'techstore-stock__heading'}).text('Tồn kho'));
            $header.append($('<span>', {'class': 'techstore-stock__amount'})
                .text('Còn ' + data.available + '/' + data.reference));
            $container.append($header);

            var $progress = $('<div>', {'class': 'progress techstore-stock__progress'});
            var classes = 'progress-bar progress-bar-' + data.type;
            if (data.type === 'warning' || data.type === 'danger') {
                classes += ' progress-bar-striped';
            }
            if (data.type === 'danger' && !compact) {
                classes += ' active';
            }
            var $bar = $('<div>', {
                'class': classes,
                role: 'progressbar',
                'aria-valuenow': data.percent,
                'aria-valuemin': 0,
                'aria-valuemax': 100,
                'aria-valuetext': data.status + ', còn ' + data.available +
                    ' trên ' + data.reference + ' sản phẩm'
            });
            $bar.css('width', data.percent + '%');
            // Visible labels are only used when the bar has enough room to be legible.
            if (!compact && data.percent >= 35) {
                $bar.text(data.percent + '%');
            } else {
                $bar.append($('<span>', {'class': 'sr-only'})
                    .text(data.percent + '% số hàng còn lại'));
            }
            $progress.append($bar);
            $container.append($progress);
            if (!compact) {
                $container.append($('<div>', {
                    'class': 'techstore-stock__status techstore-stock__status--' + data.type
                }).text(data.status));
            }
            return $container;
        }

        $('.product-card[data-product-id]').each(function () {
            var $card = $(this);
            var product = catalog.getById($card.attr('data-product-id'));
            if (!product) { return; }
            $card.find('.techstore-stock').remove();
            var $stock = buildStock(product, 'card');
            if ($stock) { $card.find('.product-description').first().after($stock); }
        });

        var id = new URLSearchParams(window.location.search).get('id');
        var selectedProduct = catalog.getById(id);
        if ($('#productOrderForm').length && selectedProduct) {
            var $detailStock = buildStock(selectedProduct, 'detail');
            $('.product-info .techstore-stock').remove();
            if ($detailStock) { $('.product-info .description').first().after($detailStock); }
            // HTML5 max validation blocks quantities greater than the available stock.
            var $quantity = $('#number');
            if (inventory(selectedProduct)) {
                $quantity.attr('max', selectedProduct.stock);
                if (selectedProduct.stock === 0) {
                    $quantity.prop('disabled', true);
                    $('#productOrderForm button[type="submit"]').prop('disabled', true);
                }
            }
        }

        // Quick View is shared by homepage and order page. This handler uses the
        // product URL already populated by the existing Bootstrap modal script.
        $('#techstoreQuickView').on('show.bs.modal', function () {
            var href = $('#techstoreQuickViewDetail').attr('href') || '';
            var idFromLink = null;
            try {
                var url = new URL(href, document.baseURI);
                idFromLink = url.searchParams.get('id');
            } catch (error) {
                return;
            }
            var product = catalog.getById(idFromLink);
            var $description = $('#techstoreQuickViewDescription');
            $('.techstore-quickview-info > .techstore-stock').remove();
            var $quickStock = buildStock(product, 'quickview');
            if ($quickStock) { $description.after($quickStock); }
        });

        // Expose only a read-only rendering helper for manual QA if needed.
        window.TechStoreInventory = {
            describe: function (id) { return inventory(catalog.getById(id)); }
        };
    });
})(jQuery);
