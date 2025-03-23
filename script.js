(function () {
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
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
  .product-carousel-container {
    position: relative; 
    width: 1290px;
    height:697.677px;
    margin: 0 auto;
    text-align: start;
    border:none;
    padding:0;
    box-shadow: 20px 20px 40px rgba(0, 0, 0, 0.05);
    border-radius: 35px;
    white-space: nowrap;
}
  
  .product-carousel {
    overflow: hidden;
    position: relative;
  }
  .product-carousel-title {
    font-size: 43.2px;
    border-top-left-radius: 35px;
    border-top-right-radius: 35px;
    font-weight: 700;
    padding:25px 67px;
    background-color: #FEF6EB;
    color:#F28E00;
    margin:0;
    max-height:97.95px;
  }
  .product-carousel-track {
    display: flex;
    white-space: nowrap;
    
  }
  .product-card {
    flex: 0 0 242px;
    flex-direction: column;
    display: flex;
    width: 242px;
    height: 559.73px;
    wrap:normal;
    
    word-wrap: break-word;
    box-sizing: border-box;
    margin: 20px 20px 20px 3px;
    height: 559.73px;
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
    right: 10px;
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
  
  .product-favorite:hover::before,
  .product-favorite.active::before {
    width: 50px;
    height: 50px;
    background-size: contain;
    background-image: url("https://www.e-bebek.com/assets/svg/default-hover-favorite.svg");
  }

  .product-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    margin-bottom: 15px;
    
  }
  .product-info {
    text-align: center;
  }
.add-to-cart {
    width: 196.67px;
    height: 48px;
    padding: 15px 20px 5px;
    border-radius: 37.5px;
    background-color: #fff7ec;
    color: #f28e00;
    font-size: 20.16px;
    font-weight: 700;
    font-family: Poppins, "cursive";
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    cursor: pointer;
    transition: background-color 0.3s;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    border: none;
    text-align: center;
}
  .add-to-cart:hover {
    background-color: #f28e00;
    color: white;
  }
  .button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute; 
    top: 50%;
    background-color: #FEF6EB;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid transparent;
    cursor: pointer;
    z-index: 10;
    font-family: Poppins, "cursive";
    font-weight: 700;
    
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
    position: absolute;
  }
  .prev-button {
    margin:0;
    left: -65px; 
  }
  .next-button {
    margin:0;
    right: -65px; 
  }
  .prev-button::before {
    transform: rotate(180deg);
  }
  .product-favorite.active {
    color: #ff8c00;
  }

  .product-brand {
    font-weight: bold;
    color: #666;
    margin-bottom: 5px;
  }
    
  .product-name {
    font-size: 17.28px;
    color: #333;
    margin-bottom: 4px;
    height: 40px;
    overflow: hidden;
    padding: 0;
    
    
  }
  
  .product-name b {
    color: rgb(125, 125, 125);
    font-size: 17.28px;
    font-family: Poppins, "cursive";
    line-height: 21.12px;
    font-weight: 700;

  }
  
  .product-price {
    font-family: Poppins, "cursive";
    font-weight: 700;
    font-size: 31.68px;
    color: rgb(125, 125, 125);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .original-price {
    text-decoration: line-through;
    color: #999;
    font-size: 24px;
    margin-right: 8px;
  }
  
  .discount-tag {
    background-color: #f28e00;
    color: white;
    padding: 2px 5px;
    border-radius: 4px;
    font-size: 14px;
    margin-left: 5px;
  }
  
  .cart-discount {
    background-color: #e0f7e9;
    color: #00a046;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 18px;
    margin-top: 5px;
    font-weight: 600;
  }
.product-details {
    padding: 0 10px;
    margin-bottom: 60px;
    height: auto;
    overflow: hidden;
  }
  
  .product-brand {
    color: rgb(125, 125, 125);
    font-size: 17.28px;
    font-family: Poppins, "cursive";
    line-height: 21.12px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  
  .product-name {
    font-size: 17.28px;
    color: #333;
    margin-bottom: 4px;
    height: 48px;
    overflow: hidden;
    white-space: normal;
    
  }
  
  .product-name b {
    color: rgb(125, 125, 125);
    font-size: 17.28px;
    font-family: Poppins, "cursive";
    line-height: 21.12px;
    font-weight: 700;

  }
  
  .product-price {
    
    font-family: Poppins, "cursive";
    font-weight: 700;
    font-size: 31.68px;
    color: rgb(125, 125, 125);
  }
  .product-rating {
    display: flex;
    justify-content: center;
    margin: 0;
    color: rgb(233, 233, 233);
    
  }
  
  .product-rating i {
    margin: 0 2px;
    font-size: 14px;
    line-height: 14px;
    
    color: rgb(233, 233, 233);
  }
`;
  document.head.appendChild(styleSheet);

  const container = document.createElement("div");
  container.className = "product-carousel-container";

  const title = document.createElement("h2");
  title.className = "product-carousel-title";
  title.textContent = "Beğenebileceğinizi düşündüklerimiz";
  container.appendChild(title);

  const prevButton = document.createElement("button");
  prevButton.className = "button prev-button";
  container.appendChild(prevButton);

  const nextButton = document.createElement("button");
  nextButton.className = "button next-button";
  container.appendChild(nextButton);

  const carousel = document.createElement("div");
  carousel.className = "product-carousel";

  const track = document.createElement("div");
  track.className = "product-carousel-track";
  carousel.appendChild(track);

  container.appendChild(carousel);

  const localData = {
    products: JSON.parse(localStorage.getItem("carouselProducts")),
    favorites: JSON.parse(localStorage.getItem("favoriteProducts")) || [],
  };

  localStorage.setItem("localData", JSON.stringify(localData));

  let products = localData.products;
  let favorites = localData.favorites;

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      products = await response.json();
      localStorage.setItem("carouselProducts", JSON.stringify(products));
      renderProducts();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const renderProducts = () => {
    track.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      const isFavorite = favorites.includes(product.id);

      const favoriteIcon = document.createElement("div");
      favoriteIcon.className = `product-favorite ${isFavorite ? "active" : ""}`;
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
      const originalPrice = document.createElement("div");
      originalPrice.textContent = `${product.original_price.toFixed(2)} TL`;
      originalPrice.style.textDecoration = "line-through";
      originalPrice.style.color = "#999";
      originalPrice.style.fontSize = "24px";
      priceContainer.appendChild(originalPrice);
      const cartDiscount = document.createElement("div");
      cartDiscount.className = "cart-discount";
      cartDiscount.textContent = `Sepette ${product.price.toFixed(2)} TL`;
      priceContainer.appendChild(cartDiscount);
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
        toggleFavorite(product.id, this);
      });

      addToCartBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        console.log("Product added to cart:", product.name);
      });

      card.addEventListener("click", () => {
        window.open(product.url, "_blank");
      });

      track.appendChild(card);
    });
  };

  const toggleFavorite = (productId, element) => {
    if (favorites.includes(productId)) {
      favorites = favorites.filter((id) => id !== productId);
      element.classList.remove("active");
    } else {
      favorites.push(productId);
      element.classList.add("active");
    }

    localStorage.setItem("favoriteProducts", JSON.stringify(favorites));
  };

  let position = 0;
  const moveCarousel = (direction) => {
    const cards = document.querySelectorAll(".product-card");
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth + 20;
    const carouselWidth = carousel.offsetWidth;
    const visibleItems = Math.floor(carouselWidth / cardWidth);
    const maxPosition = -(cards.length - visibleItems) * cardWidth;

    if (direction === "next") {
      position -= cardWidth;
      position = position < maxPosition ? 0 : position;
    } else {
      position += cardWidth;
      position = position > 0 ? maxPosition : position;
    }

    track.style.transform = `translateX(${position}px)`;
  };

  prevButton.addEventListener("click", (e) => {
    e.preventDefault();
    moveCarousel("prev");
  });

  nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    moveCarousel("next");
  });

  if (products && products.length > 0) {
    renderProducts();
  } else {
    fetchProducts();
  }

  if (heroElement) {
    heroElement.parentNode.insertBefore(container, heroElement.nextSibling);
  }
})();

