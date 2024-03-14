document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "robusta", img: "1.jpg", price: 2000 },
      { id: 2, name: "Arabica", img: "2.jpg", price: 2500 },
      { id: 3, name: "Primo", img: "3.jpg", price: 4000 },
      { id: 4, name: "Gayo", img: "4.jpg", price: 5900 },
      { id: 5, name: "whine", img: "5.jpg", price: 1000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      const item = this.items.find((item) => item.id === newItem.id);
      if (!item) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.total += newItem.price;
        this.quantity++;
      } else {
        item.quantity++;
        item.total += newItem.price;
        this.total += newItem.price;
        this.quantity++;
      }
    },
    remove(id) {
      const item = this.items.find((item) => item.id === id);
      if (item.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id === id) {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          } else {
            return item;
          }
        });
      } else if (item.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= item.price;
      }
    },
  });
});

// form validation
const checkoutBtn = document.querySelector("#checkout-btn");
checkoutBtn.disabled = true;

const form = document.querySelector("#checkoutForm");
form.addEventListener('keyup', function () {
  //  for(let i = 0; i < form.elements.length; i++){
  //    if(form.elements[i].value.length !== 0){
  //      checkoutBtn.classList.remove('disabled');
  //      checkoutBtn.classList.add('disabled');
  //    }else{
  //     return false;
  //    }
  //  }
  //  checkoutBtn.disabled = false;
  //  checkoutBtn.classList.remove('disabled');
  //    for(let i = 0; i < form.elements.length; i++){
  //      if(form.elements[i].value.length !== 0){
  //        checkoutBtn.disabled = false;
  //        checkoutBtn.classList.remove('disabled');
  //        break;
  //      }else{
  //       checkoutBtn.disabled = true;
  //       checkoutBtn.classList.add('disabled');
  //      }
  //    }
  const name = document.querySelector("#nameForm").value;
  const email = document.querySelector("#emailForm").value;
  const phone = document.querySelector("#phoneForm").value;

  if (name.length !== 0 && email.length !== 0 && phone.length !== 0) {
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove("disabled");
  } else {
    checkoutBtn.disabled = true;
    checkoutBtn.classList.add("disabled");
  }
});

// kirim data ketika checkout di klik
checkoutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const pesan = message(objData);
  window.open("http://wa.me/6282352306497?text=" + encodeURIComponent(pesan));
  // minta transaksi token menggunakan ajax atau fetch
  // try {
  //   const response = await fetch("php/placeOrder.php", {
  //     method: "POST",
  //     body: data,
  //   });
  //   const token = await response.text();
  //   console.log(token);
  //   // window.snap.pay('TRANSACTION_TOKEN_HERE');
  // } catch (err) {
  //   console.log(err.message);
  // }
});

// format pesan whatsapp
const message = (obj) => {
  return `
    *Pesanan*
    ---------------------------
    *Nama:* ${obj.name}
    *Email:* ${obj.email}
    *Phone:* ${obj.phone}

    detail pesanan
    ---------------------------
    ${JSON.parse(obj.items)
      .map(
        (item) =>
          `*${item.name}* - ${item.quantity} x ${rupiah(item.price)} = ${rupiah(
            item.total
          )}`
      )
      .join("\n")}
    ---------------------------
    *Total:* ${rupiah(obj.total)}

     
  `;
};

// konveri rupiah

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
