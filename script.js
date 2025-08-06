(() => {
  let container, prevButton, carousel, track, nextButton;
  let products,
    favorites,
    position = 0;

  const self = {
    init: () => {
      const isHomepage =
        window.location.hostname === "www.e-bebek.com" &&
        window.location.pathname === "/" &&
        !window.location.search &&
        !window.location.hash;
      const heroElement = document.querySelector(".hero");
      if (!heroElement && !isHomepage) {
        console.log("wrong page");
        return;
      }

      const localData = {
        products: JSON.parse(localStorage.getItem("carouselProducts")),
        favorites: JSON.parse(localStorage.getItem("favoriteProducts")) || [],
      };

      localStorage.setItem("localData", JSON.stringify(localData));

      products = localData.products;
      favorites = localData.favorites;

      self.buildCSS();
      self.buildHTML();
      self.setEvents();

      if (products && products.length > 0) {
        self.renderProducts();
      } else {
        self.fetchProducts();
      }
    },

    buildCSS: () => {
      const styleSheet = document.createElement("style");
      styleSheet.textContent = `
  .carousel-with-controls {
    width: 100%;
    position: relative;
  }

  .carousel-padding-wrapper {
    padding: 0 15px 0 15px;
  }

  .product-carousel-container {
    position: relative; 
    width: 100%;
    overflow:hidden;
    max-width: 1320px;
    height:auto;
    text-align: start;
    border:none;
    box-shadow: 20px 20px 40px rgba(0, 0, 0, 0.05);
    border-radius: 45px;
    box-sizing: border-box;
  }
  
  .product-carousel {
    position: relative;
    overflow-x:clip;
  }
  .product-carousel-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 3rem;
    border-top-left-radius: 45px;
    border-top-right-radius: 45px;
    font-weight: 700;
    padding:2.6rem 7rem;
    background-color: #FEF6EB;
    color:#F28E00;
    margin:0;
    height:82px;
    font-family: Quicksand-Bold;
  }
  .product-carousel-track {
    display: flex;
    position: relative;
  }
  .product-card-wrapper {
    flex: 0 0 calc((100% - 80px) / 5);
    margin-right: 20px;
    position: relative;
  }
  
  .product-card {
    flex-direction: column;
    display: flex;
    width: 100%;
    height: 558px;
    margin: 20px 0 20px 3px;
    border-radius: 10px;
    background: #fff;
    position: relative;
    cursor: pointer;
    padding: 5px;
    border: 1px solid #ededed;
  }
  .product-card:hover {
    box-shadow: inset 0 0 0 3px orange;
    border:1px solid #ededed;
  }

  .product-favorite {
    position: absolute;
    top: 10px;
    right: 15px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 10;
  }
  
  .product-favorite::before {
    content: "";
    width: 50px;
    height: 50px;
    background-image: url("https://www.e-bebek.com/assets/svg/default-favorite.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
  }
  
  .product-favorite:hover::before {
    width: 50px;
    height: 50px;
    background-size: contain;
    background-image: url("https://www.e-bebek.com/assets/svg/default-hover-favorite.svg");
  }
     .product-favorite.active::before{
    width: 50px;
    height: 50px;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 25 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22.6339 2.97449C21.4902 1.83033 19.9388 1.1875 18.3211 1.1875C16.7034 1.1875 15.152 1.83033 14.0084 2.97449L12.8332 4.14968L11.658 2.97449C9.27612 0.592628 5.41435 0.592627 3.03249 2.97449C0.650628 5.35635 0.650628 9.21811 3.03249 11.6L4.20769 12.7752L12.8332 21.4007L21.4587 12.7752L22.6339 11.6C23.778 10.4564 24.4208 8.90494 24.4208 7.28723C24.4208 5.66952 23.778 4.11811 22.6339 2.97449Z' stroke='%23FF8A00' stroke-width='1.0' fill='%23FF8A00'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
  }

  .product-image {
    width: 100%;
    height: 203px;
    object-fit: fill;
    margin-bottom: 45px;
  }
  .product-info {
    text-align: center;
  }
.add-to-cart {
    width:84%;
    height: 48px;
    padding: 15px 20px;
    border-radius: 37.5px;
    background-color: #fff7ec;
    color: #f28e00;
    font-size: 13.44px;
    font-weight: 700;
    font-family: Poppins, "cursive";
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 19px 0 0 0;
    cursor: pointer;
    transition: background-color 0.3s;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    border: none;
    text-align: center;
    border: 1px transparent;
}
    
  .add-to-cart:hover {
    background-color: #f28e00;
    color: white;
  }
  .button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #FEF6EB;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid transparent;
    cursor: pointer;
    z-index: 10;
    font-family: Quicksand-Medium;
    font-weight: 400;
    flex-shrink: 0;
    position: absolute;
    top: 50%;
  }

  .button:hover {
    border: 1px solid #F28E00;
    background-color: transparent;
  }
  .button::before {
    content: "";
    width: 18px;
    height: 18px;
    background-image: url("https://cdn06.e-bebek.com/assets/svg/next.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  .prev-button::before {
    transform: rotate(180deg);
  }
  .product-favorite.active {
    color: #ff8c00;
  }
  .prev-button {
    right:100%;
    margin:0;
  }
  .next-button {
    left:100%;
    margin:0;
  }

  .product-brand {
    color: #7d7d7d;
    font-size: 11.52px;
     font-family: Poppins, "cursive";
    line-height: 21.12px;
    font-weight: 700;
    margin-bottom: 4px;
  }
    
  .product-name {
   color: #7d7d7d;
    font-family: Poppins, "cursive";
    font-size: 11.52px;
    margin-bottom: 15px;
    height: 42px;
    padding: 0;
    text-align: start;
    font-weight: 500;
  }
  
  .product-name b {
    color: #7d7d7d;
    font-size: 11.52px;
     font-family: Poppins, "cursive";
    line-height: 14.08px;
    font-weight: 700;
  }
  
  .product-price {
    font-family: Poppins, "cursive";
    font-weight: 700;
    font-size: 21.12px;
    color: #7d7d7d;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 33.792px;
  }
  
  .original-price {
    text-decoration: line-through;
    color: #999;
    font-size: 24px;
    margin-right: 8px;
    
  }
  
  .discount-container {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    gap: 4px;
  }
  
  .original-price-discount {
    text-decoration: line-through;
    color: #999;
    font-size: 16px;
    font-weight: 500;
    font-family: Poppins, "cursive";
    line-height: 1;
    justify-content: center;
  }
  
  .discount-percentage {
    color: #00a365;
    font-size: 18px;
    font-weight: 700;
    font-family: Poppins, "cursive";
    line-height: 1;
  }
  
  .discount-badge {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .discount-badge:before {
    content: "";
    width: 24px;
    height: 24px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='275 325 450 450' xml:space='preserve'%3E%3Cg transform='translate(540 540)'/%3E%3Cg transform='translate(540 540)'/%3E%3Cpath style='stroke:none;stroke-width:0;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;fill:%2300a365;fill-rule:nonzero;opacity:1' vector-effect='non-scaling-stroke' transform='translate(-302.526 -241.932)scale(11.22)' d='M90.242 70.92c0 1.593-2.651 2.817-3.044 4.286-.406 1.52 1.266 3.903.495 5.234-.781 1.35-3.688 1.088-4.784 2.184s-.834 4.002-2.184 4.784c-1.331.77-3.714-.902-5.234-.495-1.469.393-2.693 3.044-4.286 3.044s-2.817-2.651-4.286-3.044c-1.52-.406-3.903 1.266-5.234.495-1.35-.781-1.088-3.688-2.184-4.784s-4.002-.834-4.784-2.184c-.77-1.331.902-3.714.495-5.234-.393-1.469-3.044-2.693-3.044-4.286s2.651-2.817 3.044-4.286c.406-1.52-1.266-3.903-.495-5.234.781-1.35 3.688-1.088 4.784-2.184s.834-4.002 2.184-4.784c1.331-.77 3.714.902 5.234.495 1.469-.393 2.693-3.044 4.286-3.044s2.817 2.651 4.286 3.044c1.52.406 3.903-1.266 5.234-.495 1.35.781 1.088 3.688 2.184 4.784s4.002.834 4.784 2.184c.77 1.331-.902 3.714-.495 5.234.393 1.469 3.043 2.693 3.043 4.286'/%3E%3Cpath style='stroke:none;stroke-width:0;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;fill:%23fff;fill-rule:nonzero;opacity:1' vector-effect='non-scaling-stroke' transform='matrix(-8.79 0 0 -11.08 599.74 672.96)' d='M11 18.791V7.621l-4.88 4.88c-.39.39-1.03.39-1.42 0a.996.996 0 0 1 0-1.41l6.59-6.59a.996.996 0 0 1 1.41 0l6.6 6.58a.997.997 0 1 1-1.41 1.41L13 7.621v11.17c0 .55-.45 1-1 1s-1-.45-1-1'/%3E%3Cg transform='matrix(0 0)'/%3E%3Cg transform='matrix(0 0)'/%3E%3C/svg%3E");
    background-size: contain;

  }
  
  .final-price {
    font-family: Poppins, "cursive";
    color: #00a365;
    font-size: 2.2rem;
    font-weight: 600;
  }

.product-details {
    padding: 0 10px;
    margin-bottom: 60px;
    height: auto;
  }
  
  .product-rating {
    display: flex;
    justify-content: flex-start;
    margin: 0;
    color: #E9E9E9;
    padding:5px 0 15px 0;
    margin:0 0 4.8px 0;
  }
  
  .product-rating i {
    margin: 0 2px;
    font-size: 14px;
    line-height: 14px;
    color: #fed100;
  }

  
  @media (max-width: 1479px) {
    .product-carousel-container {
      max-width: 1150px;
    }
    .product-card-wrapper {
      flex: 0 0 calc((100% - 60px) / 4);
    }
  }

  @media (max-width: 1279px) {
    .product-carousel-container {
      max-width: 930px;
    }
    .product-card-wrapper {
      flex: 0 0 calc((100% - 40px) / 3);
    }

  }

  @media (max-width: 991px) {
    
    .product-carousel-container {
      max-width: 690px;
    }
    .product-card-wrapper {
      flex: 0 0 calc((100% - 20px) / 2);
    }
  }

  @media (max-width: 768px) {
    .product-carousel-container {
      max-width: 510px;
    }
    .product-card-wrapper {
      flex: 0 0 calc((100% - 20px) / 2);
    }
  }

  @media (max-width: 575px) {
    .product-carousel-container {
      max-width: 545px;
    }
    .product-card-wrapper {
      flex: 0 0 calc((100% - 45px) / 2);
    }
  }
  @media (max-width: 481px) {
    .product-carousel-container {
      max-width: 400px;
      flex:0 1 auto;
    }
    .product-card-wrapper {
      flex: 0 0 calc((100% - 20px) / 2);
    }
    .product-carousel-title {
      background-color: transparent;
    }
  }
`;
      document.head.appendChild(styleSheet);
    },

    buildHTML: () => {
      container = document.querySelector(
        "body > eb-root > cx-storefront > main > cx-page-layout > cx-page-slot.Section2A.has-components"
      );

      if (!container) {
        console.error("Section2A container not found on the page");
        return;
      }

      const carouselWithControls = document.createElement("div");
      carouselWithControls.className = "carousel-with-controls";

      prevButton = document.createElement("button");
      prevButton.className = "button prev-button";

      const paddingWrapper = document.createElement("div");
      paddingWrapper.className = "carousel-padding-wrapper";

      const carouselWrapper = document.createElement("div");
      carouselWrapper.className = "product-carousel-container";

      const title = document.createElement("h2");
      title.className = "product-carousel-title";
      title.textContent = "Beğenebileceğinizi Düşündüklerimiz";
      carouselWrapper.appendChild(title);

      carousel = document.createElement("div");
      carousel.className = "product-carousel";

      track = document.createElement("div");
      track.className = "product-carousel-track";
      carousel.appendChild(track);

      carouselWrapper.appendChild(carousel);
      paddingWrapper.appendChild(carouselWrapper);
      nextButton = document.createElement("button");
      nextButton.className = "button next-button";

      carouselWithControls.appendChild(prevButton);
      carouselWithControls.appendChild(paddingWrapper);
      carouselWithControls.appendChild(nextButton);

      container.prepend(carouselWithControls);
    },

    setEvents: () => {
      const handleResize = () => {
        position = 0;
        track.style.transform = `translateX(${position}px)`;
      };

      window.addEventListener("resize", handleResize);

      prevButton.addEventListener("click", (e) => {
        e.preventDefault();
        self.moveCarousel("prev");
      });

      nextButton.addEventListener("click", (e) => {
        e.preventDefault();
        self.moveCarousel("next");
      });
    },

    fetchProducts: async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        products = await response.json();
        localStorage.setItem("carouselProducts", JSON.stringify(products));
        self.renderProducts();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

    renderProducts: () => {
      track.innerHTML = "";

      products.forEach((product) => {
        const wrapper = document.createElement("div");
        wrapper.className = "product-card-wrapper";

        const card = document.createElement("div");
        card.className = "product-card";
        const isFavorite = favorites.includes(product.id);

        const favoriteIcon = document.createElement("div");
        favoriteIcon.className = `product-favorite ${
          isFavorite ? "active" : ""
        }`;
        favoriteIcon.dataset.id = product.id;
        card.appendChild(favoriteIcon);

        const img = document.createElement("img");
        img.className = "product-image";
        img.src = product.img;
        card.appendChild(img);

        const info = document.createElement("div");
        info.className = "product-info";

        const detailsContainer = document.createElement("div");
        detailsContainer.className = "product-details";

        const brand = document.createElement("div");
        brand.className = "product-brand";
        detailsContainer.appendChild(brand);

        const nameElement = document.createElement("div");
        nameElement.className = "product-name";
        nameElement.innerHTML = `<b>${product.brand}</b> - ${product.name}`;
        detailsContainer.appendChild(nameElement);

        const ratingElement = document.createElement("div");
        ratingElement.className = "product-rating";
        ratingElement.innerHTML = `
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
      `;
        detailsContainer.appendChild(ratingElement);

        const priceContainer = document.createElement("div");
        priceContainer.className = "product-price";

        if (product.price < product.original_price) {
          const discountPercentage = Math.round(
            ((product.original_price - product.price) /
              product.original_price) *
              100
          );

          const discountContainer = document.createElement("div");
          discountContainer.className = "discount-container";

          const originalPrice = document.createElement("span");
          originalPrice.className = "original-price-discount";
          originalPrice.textContent = `${product.original_price.toFixed(2)} TL`;
          discountContainer.appendChild(originalPrice);

          const discountPercentageElement = document.createElement("span");
          discountPercentageElement.className = "discount-percentage";
          discountPercentageElement.textContent = `%${discountPercentage}`;
          discountContainer.appendChild(discountPercentageElement);

          const discountBadge = document.createElement("div");
          discountBadge.className = "discount-badge";
          discountContainer.appendChild(discountBadge);

          priceContainer.appendChild(discountContainer);

          const finalPrice = document.createElement("div");
          finalPrice.className = "final-price";
          finalPrice.textContent = `${product.price.toFixed(2)} TL`;
          priceContainer.appendChild(finalPrice);
        } else {
          priceContainer.textContent = `${product.price.toFixed(2)} TL`;
        }

        detailsContainer.appendChild(priceContainer);
        info.appendChild(detailsContainer);

        const addToCartBtn = document.createElement("button");
        addToCartBtn.className = "add-to-cart";
        addToCartBtn.textContent = "Sepete Ekle";
        info.appendChild(addToCartBtn);

        card.appendChild(info);

        favoriteIcon.addEventListener("click", function (e) {
          e.stopPropagation();
          self.toggleFavorite(product.id, this);
        });

        addToCartBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          console.log("Product added to cart:", product.name);
        });

        card.addEventListener("click", () => {
          window.open(product.url, "_blank");
        });

        wrapper.appendChild(card);
        track.appendChild(wrapper);
      });
    },

    toggleFavorite: (productId, element) => {
      if (favorites.includes(productId)) {
        favorites = favorites.filter((id) => id !== productId);
        element.classList.remove("active");
      } else {
        favorites.push(productId);
        element.classList.add("active");
      }

      localStorage.setItem("favoriteProducts", JSON.stringify(favorites));
    },

    moveCarousel: (direction) => {
      const wrappers = document.querySelectorAll(".product-card-wrapper");
      if (wrappers.length === 0) return;

      const wrapperWidth =
        wrappers[0].offsetWidth +
        parseInt(getComputedStyle(wrappers[0]).marginRight);
      const carouselWidth = carousel.offsetWidth;
      const visibleItems = Math.floor(carouselWidth / wrapperWidth);
      const maxPosition = -(wrappers.length - visibleItems) * wrapperWidth;

      if (direction === "next") {
        position -= wrapperWidth;
        position = position < maxPosition ? 0 : position;
      } else {
        position += wrapperWidth;
        position = position > 0 ? maxPosition : position;
      }

      track.style.transform = `translateX(${position}px)`;
    },
  };

  self.init();
})();
