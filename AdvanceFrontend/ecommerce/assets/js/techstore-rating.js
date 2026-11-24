(function ($) {
    'use strict';

    $(function () {
        var catalog = window.TechStoreCatalog;
        if (!catalog) { return; }
        if (!$.fn.rating) {
            console.error('Kartik Star Rating is missing. Check assets/vendor/bootstrap-star-rating/.');
            return;
        }

        var STORAGE_KEY = 'techstore.product-reviews.v1';
        var seeded = {laptop: [5, 4, 3]};
        var memory = {};

        function savedReviews() {
            try {
                var raw = window.localStorage.getItem(STORAGE_KEY);
                var parsed = raw ? JSON.parse(raw) : {};
                return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
            } catch (error) {
                return memory;
            }
        }

        function usableReviews(id) {
            var stored = savedReviews();
            var items = Array.isArray(stored[id]) ? stored[id] : [];
            return items.slice(-100).filter(function (item) {
                return item && Number.isInteger(item.rating) && item.rating >= 1 && item.rating <= 5 &&
                    typeof item.name === 'string' && typeof item.message === 'string';
            });
        }

        function addReview(id, review) {
            var data = savedReviews();
            var current = usableReviews(id);
            current.push(review);
            data[id] = current.slice(-100);
            memory = data;
            try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
            catch (error) { /* Keep the new rating available in this page session. */ }
        }

        function summary(id) {
            var base = seeded[id] || [];
            var saved = usableReviews(id);
            var total = base.reduce(function (sum, value) { return sum + value; }, 0);
            saved.forEach(function (item) { total += item.rating; });
            var count = base.length + saved.length;
            return {count: count, average: count ? total / count : 0};
        }

        function initReadonly($el, value) {
            $el.val(value).rating({
                theme: 'krajee-svg',
                displayOnly: true,
                showClear: false,
                showCaption: false,
                size: 'xs',
                min: 0,
                max: 5,
                step: 0.1,
                animate: false
            });
        }

        function updateReadonly($el, value) {
            if (!$el.length) { return; }
            $el.rating('update', value);
        }

        function label(stat) {
            return stat.count ? stat.average.toFixed(1) + ' sao · ' + stat.count + ' đánh giá' : 'Chưa có đánh giá';
        }

        // Homepage and all related-product cards use the same catalog IDs as the detail page.
        function refreshCards() {
            $('.product-card[data-product-id], .related-card[data-product-id]').each(function () {
                var $card = $(this);
                var id = $card.attr('data-product-id');
                if (!catalog.getById(id)) { return; }
                var stat = summary(id);
                updateReadonly($card.find('.techstore-rating-readonly').first(), Number(stat.average.toFixed(1)));
                $card.find('.techstore-rating-meta').text(label(stat));
                $card.find('.techstore-rating-readonly').attr('aria-label', 'Điểm đánh giá ' + label(stat));
            });
        }

        var currentId = new URLSearchParams(window.location.search).get('id');
        var current = catalog.getById(currentId);

        function refreshDetail() {
            if (!current || !$('#reviewStars').length) { return; }
            var stat = summary(current.id);
            updateReadonly($('#reviewStars .techstore-rating-readonly'), Number(stat.average.toFixed(1)));
            $('#reviewCount').text(stat.count ? stat.count + ' đánh giá' : 'Chưa có đánh giá');
            $('#averageRating').text(stat.count ? stat.average.toFixed(1) + ' sao' : 'Chưa có điểm đánh giá');
            $('#reviewStars').attr('aria-label', 'Điểm đánh giá trung bình ' + stat.average.toFixed(1) + ' trên 5 sao, ' + stat.count + ' lượt đánh giá');
        }

        function createComment(item, isNew) {
            var $panel = $('<div class="panel panel-default review-item"></div>');
            var $body = $('<div class="panel-body"></div>');
            var $stars = $('<span class="comment-stars"></span>');
            var $rate = $('<input type="text" class="techstore-rating-readonly">');
            $stars.append($rate);
            $body.append($('<span class="pull-right comment-time"></span>').text(isNew ? 'Mới đăng' : 'Đánh giá'));
            $body.append($stars);
            $body.append($('<strong></strong>').text(item.name));
            $body.append($('<p></p>').text(item.message));
            $panel.append($body);
            $rate.val(item.rating);
            return $panel;
        }

        function prependComment(item, isNew) {
            var $panel = createComment(item, isNew);
            $('#reviewEntries').prepend($panel);
            initReadonly($panel.find('.techstore-rating-readonly'), item.rating);
        }

        $('.techstore-rating-readonly').each(function () {
            var $field = $(this);
            var $comment = $field.closest('.comment-stars');
            if ($comment.length) {
                initReadonly($field, Number($field.val()) || 0);
            } else {
                var id = $field.closest('[data-product-id]').attr('data-product-id') || (current && current.id);
                initReadonly($field, id ? Number(summary(id).average.toFixed(1)) : 0);
            }
        });

        if (current && $('#reviewForm').length) {
            $('#reviewModalLabel').text('Đánh giá ' + current.name);
            var reviews = usableReviews(current.id);
            reviews.forEach(function (item) { prependComment(item, false); });
            var $rating = $('#reviewRating');
            $rating.rating({
                theme: 'krajee-svg',
                min: 0, max: 5, step: 1,
                size: 'md',
                showClear: false,
                showCaption: false,
                animate: true
            });

            $('#reviewForm').on('submit', function (event) {
                event.preventDefault();
                var name = $.trim($('#reviewName').val());
                var message = $.trim($('#reviewText').val());
                var value = Number($rating.val());
                var valid = Number.isInteger(value) && value >= 1 && value <= 5;
                $('#reviewRatingError').prop('hidden', valid);
                if (!valid) { return; }
                if (!name || !message) { return; }
                var entry = {name: name.substring(0, 60), message: message.substring(0, 500), rating: value};
                addReview(current.id, entry);
                prependComment(entry, true);
                refreshDetail();
                refreshCards();
                this.reset();
                $rating.rating('clear');
                $('#reviewRatingError').prop('hidden', true);
                $('#reviewModal').modal('hide');
            });
            $rating.on('rating:change', function () {
                $('#reviewRatingError').prop('hidden', true);
            });
        }

        refreshCards();
        refreshDetail();
    });
})(jQuery);
