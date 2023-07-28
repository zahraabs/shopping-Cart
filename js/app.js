const products =[
    {
        id:1,
        name:"watch brand CALVIN",
        price : 100,
        image : "./assets/images/1.jpg"
    },    {
        id:2,
        name:"watch brand Adidas",
        price : 120,
        image : "./assets/images/2.jpg"
    },    {
        id:3,
        name:"watch brand ROLEX",
        price : 200,
        image : "./assets/images/3.jpg"
    },    {
        id:4,
        name:"watch brand Citizen",
        price : 190,
        image : "./assets/images/4.jpg"
    }
]

let cart ={
    items : [],
    total: 0,
}

renderProducts();
renderCartItems();
function renderProducts() {
  const productDiv =  document.querySelector(".products");
  productDiv.innerHTML = "";

  products.forEach(function(item , index){
    productDiv.innerHTML += 
    `
    <div class="product p-3 m-3 rounded-1">
                        <div class="product__image">
                            <img src="${item.image}" alt="watch">
                        </div>
                        <h2 class="product__title fs-5 p-2">${item.name}</h2>
                        <h3 class="product__price fs-6 p-4">${item.price} تومان</h3>
                        <button class="add-to-cart btn btn-outline-danger" onclick="addToCart(${index})"> افزودن به سبد خرید</button>
                    </div>
    `
  })
 
}

function renderCartItems() {
   const cartDiv = document.querySelector(".cart__items");
   cartDiv.innerHTML ="";
    const totalPriceEl = document.querySelector(".cart__total-price");

    let totalPrice =0;

    if (cart.items.length === 0) {
        cartDiv.innerHTML = "محصولی در سبد خرید وجود ندارد"
    }
    cart.items.forEach(function(item){
        totalPrice += item.total;

        cartDiv.innerHTML +=
        `
        <div class="cart__item row flex-row-reverse text-center p-3">
                            <div class="col-md-4">
                                <button class="cart__item-remove btn btn-outline-danger" onclick="removeFromCart('${item.name}')"> حذف</button>
                            </div>
                            <div class="col-md-4">
                                <div class="quantity">${item.quantity}</div>
                            </div>
                            <div class="col-md-4">
                                <h3 class="cart__item-title fs-5">${item.name}</h3>
                            </div>
                        </div>
        `
    })
    
    totalPriceEl.innerHTML =  ` مجموع : ${totalPrice} تومان   `

}

function addToCart(productIndex) {
    const product = products[productIndex];

    let existingProduct = false;

   let newCartItems = cart.items.reduce((state,item) =>{
        if (item.name === product.name) {
            existingProduct = true;

            const newItem = {
                ...item ,
                quantity : item.quantity +1 ,
                total : (item.quantity +1) * item.price ,
            }
            return [...state , newItem];
        }
        return [...state , item]
    } , []);
    if (!existingProduct) {
        newCartItems.push({
            ...product,
            quantity :1,
            total : product.price
        })
    }
    cart = {
        ...cart ,
        items : newCartItems,
    }
    renderCartItems()
}

function removeFromCart(productName) {
  let newCartItems=  cart.items.reduce(function(state,item){
        if (item.name === productName) {
            const newItem ={
                ...item ,
                quantity : item.quantity -1 ,
                total: (item.quantity -1) * item.price
            }
            if (newItem.quantity > 0) {
                return [...state , newItem]
            } else{
                return state
            }
        }
        return [...state , item]
    } , [])
    cart = {
        ...cart ,
        items : newCartItems
    }
    renderCartItems();
}

