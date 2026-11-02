
"use strict";

// Run JavaScript after the page has loaded.
document.addEventListener("DOMContentLoaded", function () {

    // MOBILE NAVIGATION MENU

    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".site-nav");

    if (menuButton && navigation) {

        menuButton.addEventListener("click", function () {

            navigation.classList.toggle("open");

            const isOpen = navigation.classList.contains("open");

            menuButton.setAttribute("aria-expanded", isOpen);

        });

    }


    // PRODUCT SEARCH AND FILTER

    const searchInput = document.getElementById("productSearch");
    const productGrid = document.getElementById("productGrid");
    const filterButtons = document.querySelectorAll("[data-filter]");

    if (productGrid) {

        const products = productGrid.querySelectorAll(".product-card");

        let selectedCategory = "all";

        function filterProducts() {

            const searchText = searchInput
                ? searchInput.value.toLowerCase().trim()
                : "";

            let visibleProducts = 0;

            products.forEach(function (product) {

                const productText = product.textContent.toLowerCase();

                const matchesSearch = productText.includes(searchText);

                const matchesCategory =
                    selectedCategory === "all" ||
                    product.dataset.category === selectedCategory;

                if (matchesSearch && matchesCategory) {

                    product.classList.remove("hidden");
                    visibleProducts++;

                } else {

                    product.classList.add("hidden");

                }

            });

            const count = document.getElementById("productCount");
            const noProducts = document.getElementById("noProducts");

            if (count) {
                count.textContent =
                    "Showing " + visibleProducts + " product categories";
            }

            if (noProducts) {
                noProducts.classList.toggle(
                    "hidden",
                    visibleProducts !== 0
                );
            }

        }

        // Search products while typing.

        if (searchInput) {

            searchInput.addEventListener("input", filterProducts);

        }

        // Filter products by category.

        filterButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                selectedCategory = button.dataset.filter;

                filterButtons.forEach(function (item) {

                    item.classList.remove("active");

                });

                button.classList.add("active");

                filterProducts();

            });

        });

        filterProducts();

    }


    // FAQ ACCORDION

    const accordionButtons =
        document.querySelectorAll(".accordion-button");

    accordionButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const content = button.nextElementSibling;

            const isOpen =
                button.getAttribute("aria-expanded") === "true";

            button.setAttribute("aria-expanded", String(!isOpen));

            if (content) {

                content.classList.toggle("open", !isOpen);

            }

        });

    });


    // SELECT PRODUCT AUTOMATICALLY FROM ENQUIRY LINK

    const productSelect = document.getElementById("inquiryProduct");

    if (productSelect) {

        const parameters =
            new URLSearchParams(window.location.search);

        const selectedProduct = parameters.get("product");

        if (selectedProduct) {

            Array.from(productSelect.options).forEach(function (option) {

                if (
                    option.text.toLowerCase() ===
                    selectedProduct.toLowerCase()
                ) {

                    productSelect.value = option.value;

                }

            });

        }

    }


    // PREPARE EMAIL FROM FORM

    // Replace this address with the actual business email.
    const businessEmail = "yourbusiness@email.com";

    function setupForm(formId, statusId, subject) {

        const form = document.getElementById(formId);

        if (!form) return;

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!form.reportValidity()) return;

            const formData = new FormData(form);

            let message = "";

            formData.forEach(function (value, key) {

                message += key + ": " + value + "\n";

            });

            const emailSubject = encodeURIComponent(subject);

            const emailBody = encodeURIComponent(message);

            const emailLink =
                "mailto:" + businessEmail +
                "?subject=" + emailSubject +
                "&body=" + emailBody;

            const status = document.getElementById(statusId);

            if (status) {

                status.textContent =
                    "Your email application is opening. " +
                    "Please review and send your message.";

            }

            window.location.href = emailLink;

        });

    }


    // PRODUCT ENQUIRY FORM

    setupForm(
        "inquiryForm",
        "inquiryStatus",
        "Product Enquiry - Ampfa's Beauty Store"
    );


    // CONTACT FORM

    setupForm(
        "contactForm",
        "contactStatus",
        "Contact Message - Ampfa's Beauty Store"
    );

});
