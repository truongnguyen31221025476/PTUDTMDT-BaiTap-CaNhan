(function (window, $) {
    'use strict';

    $(function () {
        var catalog = window.TechStoreCatalog;
        if (!catalog) { return; }
        var $forms = $('form.desktop-search, form.mobile-search');
        var $inputs = $forms.find('input[type="search"]');
        var isHome = (window.location.pathname.split('/').pop() || 'ecommerce.html').toLowerCase() === 'ecommerce.html';
        var $cards = $('.techstore-product-grid .product-card[data-product-id]');
        var timer;

        function normalize(value) {
            var text = String(value || '').toLowerCase().trim();
            if (typeof text.normalize === 'function') { text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
            return text.replace(/đ/g, 'd');
        }

        function updateInputs(value) { $inputs.val(value); }

        function updateUrl(value) {
            if (!window.history || !window.history.replaceState) { return; }
            var url = new URL(window.location.href);
            if (value) { url.searchParams.set('q', value); }
            else { url.searchParams.delete('q'); }
            window.history.replaceState(null, '', url.pathname + url.search + url.hash);
        }

        function render(value) {
            var query = $.trim(value);
            var normalized = normalize(query);
            var visible = 0;
            $cards.each(function () {
                var $card = $(this);
                var product = catalog.getById($card.attr('data-product-id'));
                var matches = product && (!normalized || normalize([product.name, product.description, product.category].join(' ')).indexOf(normalized) !== -1);
                $card.parent().toggleClass('techstore-search-hidden', !matches);
                if (matches) { visible++; }
            });
            var $feedback = $('#techstoreSearchFeedback');
            if (!query) {
                $feedback.prop('hidden', true).empty();
                $('.product-title').first().text('Sản phẩm nổi bật');
                return;
            }
            $('.product-title').first().text('Kết quả tìm kiếm');
            $feedback.empty().prop('hidden', false);
            $feedback.append($('<span></span>').text(visible ?
                'Tìm thấy ' + visible + ' sản phẩm cho “' + query + '”.' :
                'Không tìm thấy sản phẩm cho “' + query + '”.'));
            $feedback.append($('<button type="button" class="btn btn-link btn-sm techstore-search-reset">Xóa tìm kiếm</button>'));
        }

        function perform(query) {
            var value = $.trim(query);
            if (!isHome) {
                var dest = 'ecommerce.html' + (value ? '?q=' + encodeURIComponent(value) : '') + '#productCatalog';
                window.location.assign(dest);
                return;
            }
            updateInputs(value);
            updateUrl(value);
            render(value);
        }

        $forms.removeAttr('onsubmit').on('submit', function (event) {
            event.preventDefault();
            window.clearTimeout(timer);
            perform($(this).find('input[type="search"]').val());
            if (isHome) { document.getElementById('productCatalog').scrollIntoView({behavior: 'smooth', block: 'start'}); }
        });

        if (isHome) {
            $inputs.on('input', function () {
                var text = $(this).val();
                updateInputs(text);
                window.clearTimeout(timer);
                timer = window.setTimeout(function () { perform(text); }, 200);
            });
            $(document).on('click', '.techstore-search-reset', function () {
                window.clearTimeout(timer);
                perform('');
                $inputs.first().trigger('focus');
            });
            var initial = new URLSearchParams(window.location.search).get('q') || '';
            updateInputs(initial);
            render(initial);
        }
    });
})(window, jQuery);
