(function ($) {
    'use strict';

    $(function () {
        var catalog = window.TechStoreCatalog;
        var $modal = $('#techstoreQuickView');
        if (!catalog || !$modal.length) { return; }

        var pending = null;
        var zoomInstance = null;
        var heroSelected = true;
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
            zoomInstance = null;
            heroSelected = true;
            $gallery.removeClass('techstore-hero-zoom-enabled');
            $gallery.find('.xzoom-source, .xzoom-preview, .xzoom-lens').remove();
        }

        function resetGallery() {
            releaseZoom();
            $('#techstoreQuickViewMain').remove();
            $thumbs.before($('<img>', {
                id: 'techstoreQuickViewMain',
                'class': 'xzoom',
                alt: ''
            }));
            $thumbs.empty();
        }

        function buildGallery(product) {
            resetGallery();
            var photos = product.gallery || [];
            if (!photos.length) { return; }

            $('#techstoreQuickViewMain').attr({
                src: photos[0].src,
                xoriginal: photos[0].src,
                alt: photos[0].alt
            });
            $.each(photos, function (index, photo) {
                var $link = $('<a>', {
                    href: photo.src,
                    'aria-label': 'Chọn ảnh ' + (photo.role || 'sản phẩm').toLowerCase() + ' của ' + product.name
                });
                $link.append($('<img>', {
                    'class': 'img-responsive xzoom-gallery',
                    src: photo.src,
                    xpreview: photo.src,
                    alt: photo.alt
                }));
                $thumbs.append($('<div class="col-xs-3"></div>').append($link));
            });
        }

        function selectHero(enabled) {
            heroSelected = Boolean(enabled);
            $gallery.toggleClass('techstore-hero-zoom-enabled', heroSelected);
            if (!heroSelected) { closeZoom(); }
        }

        function initializeZoom() {
            if (!pending || !$thumbs.find('.xzoom-gallery').length) { return; }
            if (!$.fn.xzoom) {
                console.error('xZoom chưa được tải: assets/vendor/xzoom/xzoom.min.js');
                return;
            }

            releaseZoom();
            var $main = $('#techstoreQuickViewMain');
            zoomInstance = $('#techstoreQuickViewMain, #techstoreQuickViewThumbnails .xzoom-gallery').xzoom({
                position: 'inside',
                mposition: 'inside',
                scroll: true,
                openOnSmall: true,
                adaptive: true,
                activeClass: 'xactive',
                title: false,
                fadeTrans: false,
                fadeOut: false,
                // Draw zoom within Bootstrap Modal instead of under <body>.
                rootOutput: false
            });
            if (!zoomInstance || typeof zoomInstance.openzoom !== 'function') { return; }

            // xZoom changes images on thumbnail clicks. Only the hero image zooms.
            // Remove the library's unconditional mouseenter event so it cannot zoom images 2-4.
            $main.off('mouseenter', zoomInstance.openzoom);
            selectHero(true);
            $thumbs.on('click.techstoreHeroZoom', 'a', function () {
                selectHero($thumbs.find('a').index(this) === 0);
            });

            // The pointer may already be within the image when Bootstrap's modal appears.
            // mousemove opens zoom only if the first image is selected and no source exists.
            function zoomHeroOnPointer(event) {
                if (!heroSelected || !zoomInstance || !$modal.hasClass('in')) { return; }
                // Source is now inside the modal's gallery. Avoid duplicate overlays.
                if ($gallery.find('.xzoom-source').length) { return; }
                zoomInstance.openzoom(event);
            }
            $main.on('mouseenter.techstoreHeroZoom mousemove.techstoreHeroZoom', zoomHeroOnPointer);
        }

        $modal.on('show.bs.modal', function () {
            if (!pending) { return; }
            $('#techstoreQuickViewTitle').text('Xem nhanh hình ảnh');
            $('#techstoreQuickViewName').text(pending.name);
            $('#techstoreQuickViewPrice').text(catalog.formatPrice(pending.price));
            $('#techstoreQuickViewDescription').text(pending.description);
            $('#techstoreQuickViewDetail').attr('href', catalog.getDetailUrl(pending.id));
            buildGallery(pending);
        });

        // Bootstrap must finish displaying the modal before xZoom reads image dimensions.
        $modal.on('shown.bs.modal', initializeZoom);
        $modal.on('hide.bs.modal', releaseZoom);
        $modal.on('hidden.bs.modal', function () {
            resetGallery();
            pending = null;
        });

        $(document).on('click', '.product-card .techstore-quickview-btn, .order-item .techstore-order-quickview', function (event) {
            event.preventDefault();
            event.stopPropagation();
            var id = $(this).closest('[data-product-id]').attr('data-product-id');
            var product = catalog.getById(id);
            if (!product) { return; }
            pending = product;
            $modal.modal('show');
        });
    });
})(jQuery);
