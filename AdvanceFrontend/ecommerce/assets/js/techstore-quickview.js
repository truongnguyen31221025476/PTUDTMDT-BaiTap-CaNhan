(function ($) {
    'use strict';

    $(function () {
        var catalog = window.TechStoreCatalog;
        var $modal = $('#techstoreQuickView');
        if (!catalog || !$modal.length) { return; }

        var product = null;
        var zoomInstance = null;
        var selectedIndex = 0;
        var $gallery = $('#techstoreQuickViewGallery');
        var $thumbs = $('#techstoreQuickViewThumbnails');

        function closeZoom() {
            if (zoomInstance && typeof zoomInstance.closezoom === 'function') {
                zoomInstance.closezoom();
            }
        }

        function releaseZoom() {
            var $main = $('#techstoreQuickViewMain');
            $main.off('.techstoreHeroZoom');
            $thumbs.off('.techstoreHeroZoom');
            closeZoom();
            if (zoomInstance && typeof zoomInstance.destroy === 'function') {
                zoomInstance.destroy();
            }
            $main.removeData('xzoom');
            zoomInstance = null;
            selectedIndex = 0;
            $gallery.removeClass('techstore-hero-zoom-enabled');
            $gallery.find('.xzoom-source, .xzoom-preview, .xzoom-lens').remove();
        }

        function resetGallery() {
            releaseZoom();
            $('#techstoreQuickViewMain').remove();
            $thumbs.before($('<img>', {
                id: 'techstoreQuickViewMain',
                'class': 'xzoom',
                alt: '',
                'data-zoom-policy': 'hero-only-v15.3'
            }));
            $thumbs.empty();
        }

        function selectPhoto(index) {
            var gallery = product && product.gallery ? product.gallery : [];
            if (index < 0 || index >= gallery.length) { return; }
            closeZoom();
            selectedIndex = index;
            var photo = gallery[index];
            $('#techstoreQuickViewMain').attr({
                src: photo.src,
                xoriginal: photo.src,
                alt: photo.alt
            });
            $thumbs.find('.xzoom-gallery').removeClass('xactive').eq(index).addClass('xactive');
            $gallery.toggleClass('techstore-hero-zoom-enabled', index === 0);
        }

        function buildGallery(item) {
            resetGallery();
            product = item;
            var photos = item.gallery || [];
            if (!photos.length) { return; }
            $.each(photos, function (index, photo) {
                var $link = $('<a>', {
                    href: photo.src,
                    'data-photo-index': index,
                    'aria-label': 'Chọn ảnh ' + (photo.role || 'sản phẩm').toLowerCase() + ' của ' + item.name
                });
                $link.append($('<img>', {
                    'class': 'img-responsive xzoom-gallery',
                    src: photo.src,
                    alt: photo.alt
                }));
                $thumbs.append($('<div class="col-xs-3"></div>').append($link));
            });
            selectPhoto(0);
        }

        function initializeZoom() {
            if (!product || zoomInstance) { return; }
            var $main = $('#techstoreQuickViewMain');
            if (!$.fn.xzoom) {
                console.error('Không tìm thấy thư viện xZoom.');
                return;
            }
            // Pass only the main image to xZoom. Thumbnail clicks remain ordinary image selection.
            zoomInstance = $main.xzoom({
                position: 'inside',
                mposition: 'inside',
                scroll: true,
                openOnSmall: true,
                adaptive: true,
                title: false,
                fadeTrans: false,
                fadeOut: false,
                rootOutput: false
            });
            if (!zoomInstance || typeof zoomInstance.openzoom !== 'function') { return; }
            // The library's unconditional handler would zoom every selected image.
            $main.off('mouseenter');
            $main.on('mouseenter.techstoreHeroZoom mousemove.techstoreHeroZoom', function (event) {
                if (selectedIndex !== 0 || !$modal.hasClass('in')) { return; }
                if (!this.complete || this.naturalWidth === 0) { return; }
                if ($gallery.find('.xzoom-source').length) { return; }
                zoomInstance.openzoom(event);
            });
        }

        function initializeWhenReady() {
            if (!product || !$modal.hasClass('in')) { return; }
            var $main = $('#techstoreQuickViewMain');
            var image = $main[0];
            if (!image) { return; }
            if (image.complete && image.naturalWidth > 0) {
                initializeZoom();
            } else {
                $main.one('load.techstoreHeroZoom', function () {
                    if ($modal.hasClass('in')) { initializeZoom(); }
                });
                $main.one('error.techstoreHeroZoom', function () {
                    console.warn('Không tải được ảnh sản phẩm trong cửa sổ xem nhanh.');
                });
            }
        }

        $modal.on('show.bs.modal', function () {
            if (!product) { return; }
            $('#techstoreQuickViewTitle').text('Xem nhanh hình ảnh');
            $('#techstoreQuickViewName').text(product.name);
            $('#techstoreQuickViewPrice').text(catalog.formatPrice(product.price));
            $('#techstoreQuickViewDescription').text(product.description);
            $('#techstoreQuickViewDetail').attr('href', catalog.getDetailUrl(product.id));
            buildGallery(product);
            $thumbs.on('click.techstoreHeroZoom', 'a', function (event) {
                event.preventDefault();
                selectPhoto(Number($(this).attr('data-photo-index')));
            });
        });

        $modal.on('shown.bs.modal', initializeWhenReady);
        $modal.on('hide.bs.modal', releaseZoom);
        $modal.on('hidden.bs.modal', function () {
            resetGallery();
            product = null;
        });

        $(document).on('click', '.product-card .techstore-quickview-btn, .order-item .techstore-order-quickview', function (event) {
            event.preventDefault();
            event.stopPropagation();
            var id = $(this).closest('[data-product-id]').attr('data-product-id');
            product = catalog.getById(id);
            if (product) { $modal.modal('show'); }
        });
    });
})(jQuery);
