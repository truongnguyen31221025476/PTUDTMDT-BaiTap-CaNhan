(function (window) {
    "use strict";

    var products = [
    {
        "id": "laptop",
        "name": "Laptop Apple MacBook Pro 14 inch M1 Pro",
        "category": "laptop",
        "price": 14990000,
        "description": "MacBook Pro 14 inch với màn hình Liquid Retina XDR, chip M1 Pro, thiết kế nhôm và các cổng kết nối phục vụ học tập, sáng tạo.",
        "photoModel": "Apple MacBook Pro 14 M1 Pro (ảnh tham khảo)",
        "images": [
            "assets/images/products/laptop/hero.jpg",
            "assets/images/products/laptop/02.jpg",
            "assets/images/products/laptop/specs.jpg",
            "assets/images/products/laptop/lifestyle.jpg"
        ],
        "originalPrice": 16990000,
        "stock": 24,
        "stockReference": 30,
        "badge": "best-seller",
        "heroImage": "assets/images/products/laptop/hero.jpg",
        "gallery": [
            {
                "role": "Đại diện",
                "src": "assets/images/products/laptop/hero.jpg",
                "alt": "Ảnh chính diện Laptop Apple MacBook Pro 14 inch M1 Pro"
            },
            {
                "role": "Cận cảnh",
                "src": "assets/images/products/laptop/02.jpg",
                "alt": "Ảnh chi tiết Laptop Apple MacBook Pro 14 inch M1 Pro"
            },
            {
                "role": "Thông số",
                "src": "assets/images/products/laptop/specs.jpg",
                "alt": "Hình tổng hợp tính năng Laptop Apple MacBook Pro 14 inch M1 Pro"
            },
            {
                "role": "Sử dụng thực tế",
                "src": "assets/images/products/laptop/lifestyle.jpg",
                "alt": "Ảnh sử dụng Laptop Apple MacBook Pro 14 inch M1 Pro"
            }
        ],
        "modelVerified": false,
        "seoTitle": "MacBook Pro 14 inch (2021) M1 Pro | TechStore",
        "seoDescription": "Khám phá MacBook Pro 14 inch 2021 với chip M1 Pro, màn hình Liquid Retina XDR 14,2 inch, thiết kế nhôm và cổng kết nối tiện dụng.",
        "intro": "MacBook Pro 14 inch (2021) được phát triển cho những công việc cần không gian hiển thị rõ nét và hiệu năng ổn định. Chip Apple M1 Pro kết hợp màn hình Liquid Retina XDR 14,2 inch giúp thiết bị phù hợp với xử lý hình ảnh, học tập và các tác vụ chuyên môn.",
        "highlights": [
            "Màn hình Liquid Retina XDR 14,2 inch, độ sáng và độ tương phản cao.",
            "Chip Apple M1 Pro dành cho nhu cầu đa nhiệm và xử lý nội dung.",
            "Trang bị cổng MagSafe 3, HDMI và khe thẻ SDXC."
        ],
        "specsCaveat": "Dung lượng RAM và SSD cần chọn theo phiên bản thực tế; không mặc định 8 GB."
    },
    {
        "id": "phone",
        "name": "Điện thoại iPhone 13 Pro 6,1 inch",
        "category": "phone",
        "price": 8490000,
        "description": "iPhone 13 Pro với màn hình Super Retina XDR 6,1 inch, thiết kế cao cấp và cụm ba camera cho nhu cầu chụp ảnh, giải trí.",
        "photoModel": "Apple iPhone 13 Pro (ảnh tham khảo)",
        "images": [
            "assets/images/products/phone/hero.jpg",
            "assets/images/products/phone/02.jpg",
            "assets/images/products/phone/specs.jpg",
            "assets/images/products/phone/lifestyle.jpg"
        ],
        "originalPrice": 9990000,
        "stock": 20,
        "stockReference": 40,
        "badge": null,
        "heroImage": "assets/images/products/phone/hero.jpg",
        "gallery": [
            {
                "role": "Đại diện",
                "src": "assets/images/products/phone/hero.jpg",
                "alt": "Ảnh chính diện Điện thoại iPhone 13 Pro 6,1 inch"
            },
            {
                "role": "Cận cảnh",
                "src": "assets/images/products/phone/02.jpg",
                "alt": "Ảnh chi tiết Điện thoại iPhone 13 Pro 6,1 inch"
            },
            {
                "role": "Thông số",
                "src": "assets/images/products/phone/specs.jpg",
                "alt": "Hình tổng hợp tính năng Điện thoại iPhone 13 Pro 6,1 inch"
            },
            {
                "role": "Sử dụng thực tế",
                "src": "assets/images/products/phone/lifestyle.jpg",
                "alt": "Ảnh sử dụng Điện thoại iPhone 13 Pro 6,1 inch"
            }
        ],
        "modelVerified": false,
        "seoTitle": "iPhone 13 Pro 6,1 inch – Điện thoại Apple | TechStore",
        "seoDescription": "iPhone 13 Pro sở hữu màn hình Super Retina XDR 6,1 inch ProMotion, chip A15 Bionic, cụm ba camera 12 MP và khả năng kết nối 5G.",
        "intro": "iPhone 13 Pro có thiết kế khung thép không gỉ và mặt kính nhám, nổi bật với màn hình Super Retina XDR 6,1 inch hỗ trợ ProMotion. Bộ ba camera 12 MP hỗ trợ nhiều tiêu cự, thích hợp với nhu cầu chụp ảnh, quay video và sử dụng hằng ngày.",
        "highlights": [
            "Màn hình Super Retina XDR 6,1 inch hỗ trợ ProMotion.",
            "Chip A15 Bionic kết hợp khả năng kết nối mạng 5G.",
            "Hệ thống ba camera sau 12 MP với nhiều chế độ chụp."
        ],
        "specsCaveat": "Dung lượng lưu trữ, màu sắc và tình trạng máy cần xác minh theo biến thể."
    },
    {
        "id": "headphones",
        "name": "Tai nghe chụp tai không dây chống ồn",
        "category": "headphones",
        "price": 990000,
        "description": "Tai nghe chụp tai với thiết kế ôm tai, đệm êm, kết nối không dây và trải nghiệm nghe phù hợp làm việc, giải trí.",
        "photoModel": "Apple AirPods Max (ảnh tham khảo)",
        "images": [
            "assets/images/products/headphones/hero.jpg",
            "assets/images/products/headphones/02.jpg",
            "assets/images/products/headphones/specs.jpg",
            "assets/images/products/headphones/lifestyle.jpg"
        ],
        "originalPrice": null,
        "stock": 7,
        "stockReference": 30,
        "badge": "new",
        "heroImage": "assets/images/products/headphones/hero.jpg",
        "gallery": [
            {
                "role": "Đại diện",
                "src": "assets/images/products/headphones/hero.jpg",
                "alt": "Ảnh chính diện Tai nghe chụp tai không dây chống ồn"
            },
            {
                "role": "Cận cảnh",
                "src": "assets/images/products/headphones/02.jpg",
                "alt": "Ảnh chi tiết Tai nghe chụp tai không dây chống ồn"
            },
            {
                "role": "Thông số",
                "src": "assets/images/products/headphones/specs.jpg",
                "alt": "Hình tổng hợp tính năng Tai nghe chụp tai không dây chống ồn"
            },
            {
                "role": "Sử dụng thực tế",
                "src": "assets/images/products/headphones/lifestyle.jpg",
                "alt": "Ảnh sử dụng Tai nghe chụp tai không dây chống ồn"
            }
        ],
        "modelVerified": false,
        "seoTitle": "Tai nghe chụp tai không dây – Đệm êm, chống ồn | TechStore",
        "seoDescription": "AirPods Max với thiết kế chụp tai, chống ồn chủ động, chế độ Xuyên âm và âm thanh không gian, phù hợp nghe nhạc, làm việc và giải trí.",
        "intro": "Tai nghe chụp tai không dây tập trung vào trải nghiệm đeo thoải mái và không gian nghe riêng tư. Phần đệm tai mềm, vòng đeo ôm đầu cùng kiểu dáng thanh lịch phù hợp sử dụng tại bàn làm việc, nghe nhạc hoặc học trực tuyến.",
        "highlights": [
            "Thiết kế chụp tai với đệm êm và vòng đeo chắc chắn.",
            "Kết nối không dây, giảm sự vướng víu của dây truyền tín hiệu.",
            "Phù hợp nghe nhạc, học trực tuyến và làm việc."
        ],
        "specsCaveat": "Không tự suy luận phiên bản cổng sạc hoặc màu sắc khi ảnh chưa xác nhận."
    },
    {
        "id": "keyboard",
        "name": "Bàn phím cơ Keychron K8 TKL",
        "category": "keyboard",
        "price": 1290000,
        "description": "Keychron K8 có bố cục TKL gọn gàng, phím cơ và kết nối linh hoạt, phù hợp góc làm việc, học tập hoặc giải trí.",
        "photoModel": "Keychron K8 (ảnh tham khảo)",
        "images": [
            "assets/images/products/keyboard/hero.jpg",
            "assets/images/products/keyboard/02.jpg",
            "assets/images/products/keyboard/specs.jpg",
            "assets/images/products/keyboard/lifestyle.jpg"
        ],
        "originalPrice": 1490000,
        "stock": 18,
        "stockReference": 30,
        "badge": "new",
        "heroImage": "assets/images/products/keyboard/hero.jpg",
        "gallery": [
            {
                "role": "Đại diện",
                "src": "assets/images/products/keyboard/hero.jpg",
                "alt": "Ảnh chính diện Bàn phím cơ Keychron K8 TKL"
            },
            {
                "role": "Cận cảnh",
                "src": "assets/images/products/keyboard/02.jpg",
                "alt": "Ảnh chi tiết Bàn phím cơ Keychron K8 TKL"
            },
            {
                "role": "Thông số",
                "src": "assets/images/products/keyboard/specs.jpg",
                "alt": "Hình tổng hợp tính năng Bàn phím cơ Keychron K8 TKL"
            },
            {
                "role": "Sử dụng thực tế",
                "src": "assets/images/products/keyboard/lifestyle.jpg",
                "alt": "Ảnh sử dụng Bàn phím cơ Keychron K8 TKL"
            }
        ],
        "modelVerified": false,
        "seoTitle": "Bàn phím cơ Keychron K8 TKL – Thiết kế gọn | TechStore",
        "seoDescription": "Bàn phím cơ Keychron K8 bố cục TKL 87 phím, kết nối Bluetooth và USB-C, hỗ trợ Windows và macOS cho góc làm việc gọn gàng.",
        "intro": "Keychron K8 sử dụng bố cục TKL 87 phím, giữ lại cụm phím điều hướng nhưng loại bỏ bàn phím số để tiết kiệm diện tích. Bàn phím có thể kết nối không dây qua Bluetooth hoặc dùng dây USB-C, thuận tiện khi chuyển đổi giữa các thiết bị làm việc.",
        "highlights": [
            "Bố cục TKL 87 phím tối ưu diện tích bàn làm việc.",
            "Hỗ trợ kết nối Bluetooth 5.1 và chế độ dùng dây USB-C.",
            "Tương thích macOS và Windows."
        ],
        "specsCaveat": "Loại switch, LED và tính năng hot-swap phụ thuộc phiên bản cụ thể."
    },
    {
        "id": "mouse",
        "name": "Chuột không dây Logitech MX Master 2S",
        "category": "mouse",
        "price": 490000,
        "description": "Chuột Logitech MX Master 2S thiết kế công thái học, nhiều nút thao tác và kết nối không dây cho công việc hằng ngày.",
        "photoModel": "Logitech MX Master 2S (ảnh tham khảo)",
        "images": [
            "assets/images/products/mouse/hero.jpg",
            "assets/images/products/mouse/02.jpg",
            "assets/images/products/mouse/specs.jpg",
            "assets/images/products/mouse/lifestyle.jpg"
        ],
        "originalPrice": null,
        "stock": 5,
        "stockReference": 40,
        "badge": "best-seller",
        "heroImage": "assets/images/products/mouse/hero.jpg",
        "gallery": [
            {
                "role": "Đại diện",
                "src": "assets/images/products/mouse/hero.jpg",
                "alt": "Ảnh chính diện Chuột không dây Logitech MX Master 2S"
            },
            {
                "role": "Cận cảnh",
                "src": "assets/images/products/mouse/02.jpg",
                "alt": "Ảnh chi tiết Chuột không dây Logitech MX Master 2S"
            },
            {
                "role": "Thông số",
                "src": "assets/images/products/mouse/specs.jpg",
                "alt": "Hình tổng hợp tính năng Chuột không dây Logitech MX Master 2S"
            },
            {
                "role": "Sử dụng thực tế",
                "src": "assets/images/products/mouse/lifestyle.jpg",
                "alt": "Ảnh sử dụng Chuột không dây Logitech MX Master 2S"
            }
        ],
        "modelVerified": false,
        "seoTitle": "Chuột Logitech MX Master 2S không dây | TechStore",
        "seoDescription": "Logitech MX Master 2S có thiết kế công thái học, cảm biến Darkfield đến 4.000 DPI, kết nối đa thiết bị qua Bluetooth hoặc Unifying.",
        "intro": "Logitech MX Master 2S sở hữu thiết kế ôm tay với phần tựa ngón cái, hỗ trợ thao tác thoải mái khi làm việc lâu. Cảm biến Darkfield cùng khả năng kết nối đa thiết bị phù hợp với người dùng thường xuyên chuyển đổi giữa laptop và máy tính để bàn.",
        "highlights": [
            "Cảm biến Darkfield với độ phân giải lên đến 4.000 DPI.",
            "Kết nối qua Bluetooth hoặc đầu thu Logitech Unifying.",
            "Nhiều nút thao tác và thiết kế công thái học cho công việc."
        ],
        "specsCaveat": "Thông số và phụ kiện trong hộp cần kiểm tra theo mã SKU."
    },
    {
        "id": "charger",
        "name": "Củ sạc USB-C AUKEY Omnia Mini",
        "category": "charger",
        "price": 390000,
        "description": "Củ sạc USB-C AUKEY Omnia Mini thiết kế nhỏ gọn, một cổng USB-C hỗ trợ sạc cho các thiết bị tương thích.",
        "photoModel": "AUKEY Omnia Mini 20W (ảnh tham khảo)",
        "images": [
            "assets/images/products/charger/hero.jpg",
            "assets/images/products/charger/detail.jpg",
            "assets/images/products/charger/specs.jpg",
            "assets/images/products/charger/lifestyle.jpg"
        ],
        "originalPrice": 490000,
        "stock": 3,
        "stockReference": 35,
        "badge": null,
        "heroImage": "assets/images/products/charger/hero.jpg",
        "gallery": [
            {
                "role": "Đại diện",
                "src": "assets/images/products/charger/hero.jpg",
                "alt": "Ảnh chính diện Củ sạc USB-C AUKEY Omnia Mini"
            },
            {
                "role": "Cận cảnh",
                "src": "assets/images/products/charger/detail.jpg",
                "alt": "Ảnh chi tiết Củ sạc USB-C AUKEY Omnia Mini"
            },
            {
                "role": "Thông số",
                "src": "assets/images/products/charger/specs.jpg",
                "alt": "Hình tổng hợp tính năng Củ sạc USB-C AUKEY Omnia Mini"
            },
            {
                "role": "Sử dụng thực tế",
                "src": "assets/images/products/charger/lifestyle.jpg",
                "alt": "Ảnh sử dụng Củ sạc USB-C AUKEY Omnia Mini"
            }
        ],
        "modelVerified": false,
        "seoTitle": "Củ sạc AUKEY Omnia Mini USB-C nhỏ gọn | TechStore",
        "seoDescription": "Củ sạc AUKEY Omnia Mini có thiết kế nhỏ gọn, cổng USB-C tiện dụng, đáp ứng nhu cầu sạc thiết bị tương thích tại nhà và khi di chuyển.",
        "intro": "AUKEY Omnia Mini là củ sạc USB-C có thiết kế nhỏ gọn, thuận tiện mang theo khi di chuyển. Cổng USB-C được bố trí trực diện, dễ kết nối với dây sạc và các thiết bị tương thích.",
        "highlights": [
            "Thiết kế nhỏ gọn, dễ bố trí tại bàn làm việc.",
            "Sử dụng cổng USB-C để kết nối với thiết bị tương thích.",
            "Phù hợp nhu cầu sạc hàng ngày tại nhà hoặc khi di chuyển."
        ],
        "specsCaveat": "Loại chân cắm và thiết bị tương thích cần đối chiếu model bán thực tế."
    }
];

    function getAll() { return products.slice(); }
    function getById(id) {
        for (var i = 0; i < products.length; i++) {
            if (products[i].id === id) { return products[i]; }
        }
        return null;
    }
    function formatPrice(value) {
        return new Intl.NumberFormat("vi-VN").format(value) + "đ";
    }
    function getDetailUrl(id) {
        return "ecommerce-detail.html?id=" + encodeURIComponent(id);
    }
    window.TechStoreCatalog = {
        getAll: getAll,
        getById: getById,
        formatPrice: formatPrice,
        getDetailUrl: getDetailUrl
    };
})(window);
