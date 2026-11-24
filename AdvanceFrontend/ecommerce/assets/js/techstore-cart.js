(function (window, $) {
    'use strict';

    var catalog = window.TechStoreCatalog;
    if (!catalog) { return; }

    var STORAGE_KEY = 'techstore.cart.v1';
    var memory = [];

    function optionsFor(product, options) {
        if (!product || product.id !== 'laptop') { return {}; }
        var color = options && typeof options.color === 'string' ? options.color : '';
        var ram = options && typeof options.ram === 'string' ? options.ram : '';
        return {
            color: color.substring(0, 50),
            ram: ram.substring(0, 20)
        };
    }

    function keyOf(item) {
        var opt = item.options || {};
        return item.id + '|' + (opt.color || '') + '|' + (opt.ram || '');
    }

    function normalize(data) {
        var list = Array.isArray(data) ? data : [];
        var clean = [];
        var totals = {};
        list.forEach(function (item) {
            var product = item && catalog.getById(item.id);
            if (!product || !Number.isInteger(item.quantity) || item.quantity < 1) { return; }
            var quantity = Math.min(item.quantity, Math.max(0, product.stock - (totals[item.id] || 0)));
            if (!quantity) { return; }
            var record = {id: product.id, quantity: quantity, options: optionsFor(product, item.options)};
            var key = keyOf(record);
            var existing = clean.filter(function (row) { return keyOf(row) === key; })[0];
            if (existing) { existing.quantity += quantity; }
            else { clean.push(record); }
            totals[item.id] = (totals[item.id] || 0) + quantity;
        });
        return clean;
    }

    function read() {
        try {
            var raw = window.localStorage.getItem(STORAGE_KEY);
            if (raw === null) { return normalize(memory); }
            return normalize(JSON.parse(raw));
        } catch (error) {
            return normalize(memory);
        }
    }

    function emit() {
        $(document).trigger('techstore:cart-changed');
    }

    function write(items) {
        memory = normalize(items);
        try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memory)); }
        catch (error) { /* Cart still works while this page remains open. */ }
        emit();
    }

    function quantity(id) {
        return read().reduce(function (sum, item) {
            return sum + (item.id === id ? item.quantity : 0);
        }, 0);
    }

    function remaining(id) {
        var product = catalog.getById(id);
        return product ? Math.max(0, product.stock - quantity(id)) : 0;
    }

    function total() {
        return read().reduce(function (sum, item) { return sum + item.quantity; }, 0);
    }

    function add(id, count, options) {
        var product = catalog.getById(id);
        var amount = Number(count);
        if (!product) { return {ok: false, message: 'Không tìm thấy sản phẩm.'}; }
        if (!Number.isInteger(amount) || amount < 1) {
            return {ok: false, message: 'Số lượng phải là số nguyên dương.'};
        }
        var free = remaining(id);
        if (amount > free) {
            return {ok: false, message: free ? 'Chỉ có thể thêm ' + free + ' sản phẩm nữa.' : 'Đã chọn hết số hàng còn trong kho.'};
        }
        var items = read();
        var record = {id: id, quantity: amount, options: optionsFor(product, options)};
        var existing = items.filter(function (item) { return keyOf(item) === keyOf(record); })[0];
        if (existing) { existing.quantity += amount; }
        else { items.push(record); }
        write(items);
        return {ok: true, message: 'Đã thêm ' + amount + ' ' + product.name + ' vào giỏ hàng.'};
    }

    function setQuantity(key, count) {
        var amount = Number(count);
        if (!Number.isInteger(amount) || amount < 1) {
            return {ok: false, message: 'Số lượng phải từ 1 trở lên. Dùng Xóa để bỏ sản phẩm.'};
        }
        var items = read();
        var item = items.filter(function (row) { return keyOf(row) === key; })[0];
        if (!item) { return {ok: false, message: 'Sản phẩm không còn trong giỏ.'}; }
        var product = catalog.getById(item.id);
        var others = quantity(item.id) - item.quantity;
        if (amount > product.stock - others) {
            return {ok: false, message: 'Tổng số lượng đã chọn vượt quá tồn kho (' + product.stock + ').'};
        }
        item.quantity = amount;
        write(items);
        return {ok: true};
    }

    function remove(key) {
        var items = read();
        var next = items.filter(function (item) { return keyOf(item) !== key; });
        if (next.length === items.length) { return false; }
        write(next);
        return true;
    }

    var api = {
        getItems: read,
        getQuantity: quantity,
        remaining: remaining,
        getTotalQuantity: total,
        add: add,
        setQuantity: setQuantity,
        remove: remove,
        keyOf: keyOf
    };
    window.TechStoreCart = api;

    $(function () {
        var $cartLinks = $('.cart-badge').closest('a');
        $cartLinks.attr({
            href: '#techstoreCartModal',
            'data-toggle': 'modal',
            'data-target': '#techstoreCartModal',
            'class': (($cartLinks.first().attr('class') || '') + ' techstore-cart-link').trim()
        });

        var $modal = $('<div class="modal fade" id="techstoreCartModal" tabindex="-1" role="dialog" aria-labelledby="techstoreCartTitle">' +
            '<div class="modal-dialog modal-lg" role="document"><div class="modal-content">' +
            '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Đóng">' +
            '<span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="techstoreCartTitle">Giỏ hàng TechStore</h4></div>' +
            '<div class="modal-body"><p class="cart-demo-note">Giỏ hàng thử nghiệm được lưu trên trình duyệt; chưa tạo đơn hàng thực tế.</p>' +
            '<div id="techstoreCartItems" class="techstore-cart-items"></div>' +
            '<div id="techstoreCartSummary" class="techstore-cart-summary" role="status" aria-live="polite" aria-atomic="true"></div></div>' +
            '<div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal">Tiếp tục mua sắm</button></div>' +
            '</div></div></div>');
        $('body').append($modal);
        var $toast = $('<div id="techstoreCartToast" class="techstore-cart-toast" role="status" aria-live="polite" aria-atomic="true" hidden></div>');
        $('body').append($toast);
        var toastTimer;

        function notify(message, error) {
            window.clearTimeout(toastTimer);
            $toast.text(message).toggleClass('is-error', Boolean(error)).prop('hidden', false);
            toastTimer = window.setTimeout(function () { $toast.prop('hidden', true); }, 3500);
        }
        api.notify = notify;

        function updateBadges() {
            var count = total();
            $('.cart-badge').text(count);
            $cartLinks.attr('aria-label', 'Giỏ hàng, ' + count + ' sản phẩm. Nhấn để xem giỏ hàng');
        }

        function optionsText(item) {
            var text = [];
            if (item.options.color) { text.push('Màu ' + item.options.color); }
            if (item.options.ram) { text.push('RAM ' + item.options.ram); }
            return text.join(' · ');
        }

        function drawModal() {
            var $list = $('#techstoreCartItems').empty();
            var items = read();
            if (!items.length) {
                $list.append($('<p class="text-muted cart-empty"></p>').text('Giỏ hàng đang trống. Hãy chọn sản phẩm để bắt đầu.'));
                $('#techstoreCartSummary').empty();
                return;
            }
            var grandTotal = 0;
            items.forEach(function (item) {
                var product = catalog.getById(item.id);
                if (!product) { return; }
                var key = keyOf(item);
                grandTotal += product.price * item.quantity;
                var $row = $('<div class="techstore-cart-row"></div>').attr('data-key', key);
                var $img = $('<img class="techstore-cart-photo" alt="">').attr({src: product.heroImage, alt: 'Ảnh ' + product.name});
                var $name = $('<a class="techstore-cart-name"></a>').attr('href', catalog.getDetailUrl(item.id)).text(product.name);
                var $text = $('<div class="techstore-cart-description"></div>').append($name);
                if (optionsText(item)) { $text.append($('<small></small>').text(optionsText(item))); }
                $text.append($('<small></small>').text(catalog.formatPrice(product.price) + '/sản phẩm'));
                var max = product.stock - quantity(item.id) + item.quantity;
                var $quantity = $('<input class="form-control input-sm techstore-cart-quantity" type="number" min="1" step="1">')
                    .attr({max: max, value: item.quantity, 'aria-label': 'Số lượng ' + product.name + (optionsText(item) ? ', ' + optionsText(item) : '')});
                var $remove = $('<button type="button" class="btn btn-link techstore-cart-remove">Xóa</button>').attr('aria-label', 'Xóa ' + product.name + (optionsText(item) ? ', ' + optionsText(item) : '') + ' khỏi giỏ');
                $row.append($img, $text, $('<div class="techstore-cart-controls"></div>').append($quantity, $remove));
                $list.append($row);
            });
            $('#techstoreCartSummary').text('Tổng: ' + total() + ' sản phẩm · Tạm tính ' + catalog.formatPrice(grandTotal));
        }

        $modal.on('show.bs.modal', drawModal);
        $modal.on('change', '.techstore-cart-quantity', function () {
            var key = $(this).closest('[data-key]').attr('data-key');
            var outcome = setQuantity(key, $(this).val());
            if (!outcome.ok) { notify(outcome.message, true); drawModal(); }
        });
        $modal.on('click', '.techstore-cart-remove', function () {
            if (remove($(this).closest('[data-key]').attr('data-key'))) { notify('Đã xóa sản phẩm khỏi giỏ hàng.'); }
        });
        $(document).on('techstore:cart-changed', function () {
            updateBadges();
            if ($modal.hasClass('in')) { drawModal(); }
        });
        $(window).on('storage', function (event) {
            if (event.originalEvent && event.originalEvent.key === STORAGE_KEY) {
                emit();
            }
        });
        updateBadges();
    });
})(window, jQuery);
