
/* =========================================
   DATA KATALOG
   Ganti image dengan nama file foto milik Anda
   di folder assets/products/.
========================================= */

const products = [
    {
        id: 1,
        name: "Menoro Coklat",
        category: "Kretek",
        description: "Menoro Coklat, rokok produksi kudus, lihat kontak informasi jika anda ingin bertanya terkait produk atau membelinya, hubungi kami melalui Facebook atau Email.",
        image: "assets/products/Menoro Coklat.jpeg"
    },
    // {
    //     id: 2,
    //     name: "Djarum Black Macha",
    //     category: "Kretek",
    //     description: "Black Macha, rokok produksi kudus, lihat kontak informasi jika anda ingin bertanya terkait produk atau membelinya, kontak yang dapat dihubungi saat ini hanya di Facebook.",
    //     image: "assets/products/Djarum Black Matcha.jpeg"
    // },
    {
        id: 2,
        name: "Klise",
        category: "Filter",
        description: "Klise, rokok produksi Jawa Timur, lihat kontak informasi jika anda ingin bertanya terkait produk atau membelinya, hubungi kami melalui Facebook atau Email.",
        image: "assets/products/Klise.jpeg"
    }
];


/* =========================================
   DOM ELEMENTS
========================================= */

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const resetButton = document.getElementById("resetFilters");
const emptyState = document.getElementById("emptyState");
const resultSummary = document.getElementById("resultSummary");


/* =========================================
   ESCAPE HTML
   Menghindari karakter HTML dari data katalog
   dirender sebagai markup.
========================================= */

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}


/* =========================================
   RENDER PRODUCTS
========================================= */

function renderProducts() {

    if (
        !productGrid ||
        !searchInput ||
        !categoryFilter ||
        !emptyState ||
        !resultSummary
    ) {
        console.error("Elemen katalog tidak ditemukan.");
        return;
    }

    const keyword = searchInput.value
        .trim()
        .toLocaleLowerCase("id");

    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter((product) => {

        const searchableText = `
            ${product.name}
            ${product.category}
            ${product.description}
        `.toLocaleLowerCase("id");

        const matchesKeyword = searchableText.includes(keyword);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesKeyword && matchesCategory;
    });


    /* Membuat kartu produk */

    productGrid.innerHTML = filteredProducts.map((product) => `

        <article class="product-card">

            <div class="product-image-wrap">

                <img
                    class="product-image"
                    src="${escapeHTML(product.image)}"
                    alt="Foto katalog ${escapeHTML(product.name)}"
                    loading="lazy"
                    onerror="this.hidden=true; this.nextElementSibling.hidden=false;"
                >

                <span
                    class="image-placeholder"
                    hidden
                >
                    Foto belum tersedia
                </span>

            </div>

            <div class="product-content">

                <span class="product-category">
                    ${escapeHTML(product.category)}
                </span>

                <h3>
                    ${escapeHTML(product.name)}
                </h3>

                <p>
                    ${escapeHTML(product.description)}
                </p>

                <div class="product-meta">

                    <span>Informasi katalog</span>

                    <span>ID #${product.id}</span>

                </div>

            </div>

        </article>

    `).join("");


    /* Mengatur kondisi katalog */

    emptyState.hidden = filteredProducts.length !== 0;


    /* Memperbarui ringkasan */

    resultSummary.textContent =
        `Menampilkan ${filteredProducts.length} dari ${products.length} produk.`;


    /* Memperbarui statistik dashboard */

    const productCount = document.getElementById("productCount");
    const resultCount = document.getElementById("resultCount");
    const categoryCount = document.getElementById("categoryCount");

    if (productCount) {
        productCount.textContent = products.length;
    }

    if (resultCount) {
        resultCount.textContent = filteredProducts.length;
    }

    if (categoryCount) {
        categoryCount.textContent =
            new Set(products.map((product) => product.category)).size;
    }
}


/* =========================================
   SEARCH EVENT
========================================= */

if (searchInput) {
    searchInput.addEventListener("input", renderProducts);
}


/* =========================================
   CATEGORY FILTER EVENT
========================================= */

if (categoryFilter) {
    categoryFilter.addEventListener("change", renderProducts);
}


/* =========================================
   RESET FILTER
========================================= */

if (resetButton) {

    resetButton.addEventListener("click", () => {

        searchInput.value = "";
        categoryFilter.value = "all";

        // Memperbarui tampilan dropdown custom
        categoryFilter.dispatchEvent(
            new Event("change", {
                bubbles: true
            })
        );

        renderProducts();

    });

}


/* =========================================
   INITIALIZATION
========================================= */

renderProducts();
