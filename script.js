// --- DATOS ---
const MENU = {
    tacos: [
        { name: "Taco Tender", priceSolo: 6.95, priceMenu: 8.95, img: "assets/taco_tender.jpg", desc: "Tenders de pollo, salsa queso.", badge: "🏆 TOP VENTAS" },
        { name: "Taco Cordon Bleu", priceSolo: 6.95, priceMenu: 8.95, img: "assets/taco_cordon_bleu.jpg", desc: "Cordon Bleu crujiente, salsa queso.", badge: "⭐ FAVORITO" },
        { name: "Taco Kifta", priceSolo: 5.95, priceMenu: 7.95, img: "assets/taco_kifta.jpg", desc: "Carne picada especiada, salsa queso." },
        { name: "Taco Pollo Curry", priceSolo: 5.95, priceMenu: 7.95, img: "assets/taco_pollo_curry.jpg", desc: "Pollo marinado al curry, salsa queso." },
        { name: "Taco Mixto", priceSolo: 6.95, priceMenu: 8.95, img: "assets/taco_mixto.jpg", desc: "Pollo + Ternera, salsa queso." }
    ],
    burgers: [
        { name: "Big Cabra", priceSolo: 7.50, priceMenu: 9.50, img: "assets/burger1.jpg", desc: "100g Ternera, Queso Cabra, Cebolla C.", badge: "⭐ FAVORITO" },
        { name: "Doble Cheese", priceSolo: 4.50, priceMenu: 6.50, img: "assets/burger1.jpg", desc: "Doble carne, Doble Cheddar." },
        { name: "Burger Pollo", priceSolo: 5.95, priceMenu: 7.95, img: "assets/burger2.jpg", desc: "Pollo crujiente, Lechuga, Mayo." }
    ],
    bowls: [
        bowls: [
            { name: "Bowl Tenders", priceSolo: 7.95, noMenu: true, img: "assets/bowl.jpg", desc: "Base patatas, Tenders de Pollo, Salsa Queso.", badge: "🔥 TOP VENTAS" },
            { name: "Bowl Cordon Bleu", priceSolo: 7.95, noMenu: true, img: "assets/bowl.jpg", desc: "Base patatas, Cordon Bleu, Salsa Queso." },
            { name: "Kifta Bowl", priceSolo: 6.95, noMenu: true, img: "assets/bowl.jpg", desc: "Base patatas, Ternera, Bacon, Mozzarella." },
            { name: "Pollo Curry Bowl", priceSolo: 6.95, noMenu: true, img: "assets/bowl.jpg", desc: "Base patatas, Pollo Curry, Cheddar." }
        ],
        extras: [
            { name: "Nuggets x6", priceSolo: 3.90, noMenu: true, img: "assets/nuggets_balls.jpg" },
            { name: "Bacon Cheese Fries", priceSolo: 2.50, noMenu: true, img: "assets/bacon_cheese_fries.jpg", badge: "NUEVO" },
            { name: "Bebida Extra", priceSolo: 1.90, noMenu: true, isDrink: true, img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300" },
            { name: "Postre", priceSolo: 3.50, noMenu: true, img: "assets/dessert.jpg" }
        ]
};

const SALSAS = ["Pita", "Mahonesa", "Barbacoa", "Ketchup", "Andaluza", "Curry", "Samurai", "Tasty", "Biggy"];

const BEBIDAS = [
    // Nacionales
    { name: "Coca-Cola", type: "nac" },
    { name: "Coca-Cola Zero", type: "nac" },
    { name: "Aquarius Limón", type: "nac" },
    { name: "Aquarius Naranja", type: "nac" },
    { name: "Fanta Limón", type: "nac" },
    { name: "Fanta Naranja", type: "nac" },
    { name: "Nestea Limón", type: "nac" },
    { name: "Nestea Maracuyá", type: "nac" },
    { name: "SevenUp", type: "nac" },
    // Importadas
    { name: "Coca-Cola Cherry", type: "imp" },
    { name: "Orangina", type: "imp" },
    { name: "Oasis Tropical", type: "imp" },
    { name: "Oasis Frambuesa", type: "imp" },
    { name: "SevenUp Mojito", type: "imp" },
    { name: "Schweppes Agrum", type: "imp" },
    { name: "Lipton Melocotón", type: "imp" },
    { name: "Tropico", type: "imp" },
    { name: "Hawai", type: "imp" },
    { name: "Poms", type: "imp" },
    { name: "Red Bull", type: "imp", surcharge: 0.60 }
];

let cart = [];
let tempItem = {};

// --- INICIALIZAR ---
window.onload = function () {
    renderSection('tacos', MENU.tacos, 'tacos-container');
    renderSection('burgers', MENU.burgers, 'burgers-container');
    renderSection('bowls', MENU.bowls, 'bowls-container');

    // Render Extras
    const extraCont = document.getElementById('extras-container');
    MENU.extras.forEach(item => {
        const action = item.isDrink
            ? `onclick="openConfig('${item.name}', ${item.priceSolo}, 0)"`
            : `onclick="addSimple('${item.name}', ${item.priceSolo})"`;

        extraCont.innerHTML += `
            <div class="bg-card p-3 rounded-xl border border-white/5 text-center">
                <div class="h-24 bg-black rounded-lg mb-2 overflow-hidden"><img src="${item.img}" class="w-full h-full object-cover"></div>
                <h3 class="font-display font-bold text-sm text-white">${item.name}</h3>
                <div class="flex justify-between items-center mt-2">
                    <span class="text-secondary font-bold">${item.priceSolo.toFixed(2)}€</span>
                    <button ${action} class="bg-[#333] hover:bg-primary text-white w-7 h-7 rounded flex items-center justify-center">+</button>
                </div>
            </div>`;
    });
};

function renderSection(type, items, containerId) {
    const container = document.getElementById(containerId);
    items.forEach(item => {
        const btn = item.noMenu
            ? `<button onclick="addSimple('${item.name}', ${item.priceSolo})" class="bg-primary text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold shadow-lg shadow-primary/30">+</button>`
            : `<button onclick="openConfig('${item.name}', ${item.priceSolo}, ${item.priceMenu})" class="bg-primary text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold shadow-lg shadow-primary/30">+</button>`;

        const badgeHtml = item.badge
            ? `<div class="absolute top-2 right-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded shadow-lg z-10 animate-pulse">${item.badge}</div>`
            : '';

        container.innerHTML += `
            <div class="bg-card p-3 rounded-xl border border-white/5 flex gap-4 relative overflow-hidden group">
                ${badgeHtml}
                <div class="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-black">
                    <img src="${item.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                </div>
                <div class="flex flex-col justify-center flex-1">
                    <h3 class="font-display text-lg font-bold text-white uppercase leading-tight">${item.name}</h3>
                    <p class="text-xs text-gray-400 mt-1 line-clamp-2">${item.desc}</p>
                    <div class="mt-3 flex items-center justify-between">
                        <span class="text-secondary font-bold text-lg">${item.priceSolo.toFixed(2)}€</span>
                        ${btn}
                    </div>
                </div>
            </div>`;
    });
}

// --- LÓGICA MODAL ---
function openConfig(name, pSolo, pMenu) {
    tempItem = { name, pSolo, pMenu };
    document.getElementById('modal-item-title').innerText = name;

    const isDrinkOnly = name === "Bebida Extra";

    if (isDrinkOnly) {
        document.getElementById('step-format').classList.add('hidden');
        document.getElementById('step-sauce').classList.add('hidden');
        document.getElementById('step-extras').classList.add('hidden');
        tempItem.format = "Solo";
    } else {
        document.getElementById('step-format').classList.remove('hidden');
        document.getElementById('step-sauce').classList.remove('hidden');
        document.getElementById('step-extras').classList.remove('hidden');
        document.querySelector('input[name="format"][value="Solo"]').checked = true;
        document.getElementById('price-solo-display').innerText = pSolo.toFixed(2) + '€';
        document.getElementById('price-menu-display').innerText = pMenu.toFixed(2) + '€';
    }

    // Renderizar Bebidas
    const dList = document.getElementById('drinks-list');
    dList.innerHTML = BEBIDAS.map((d, i) => {
        const surchargeText = d.surcharge ? ` (+${d.surcharge.toFixed(2)}€)` : '';
        return `
        <label class="cursor-pointer">
            <input type="radio" name="menuDrink" value="${d.name}" data-surcharge="${d.surcharge || 0}" class="drink-radio hidden" ${i === 0 ? 'checked' : ''} onchange="updateTotal()">
            <div class="bg-black border border-white/10 rounded-lg py-2 px-1 text-center text-xs font-bold text-gray-300 hover:border-secondary/50 peer-checked:bg-secondary peer-checked:text-black">
                ${d.name}${surchargeText}
            </div>
        </label>`;
    }).join('');

    // Renderizar Salsas
    const sList = document.getElementById('sauces-list');
    sList.innerHTML = SALSAS.map((s, i) => `
        <label class="cursor-pointer">
            <input type="radio" name="mainSauce" value="${s}" class="sauce-radio hidden" ${i === 0 ? 'checked' : ''} onchange="updateTotal()">
            <div class="bg-black border border-white/10 rounded-lg py-3 text-center text-xs font-bold text-gray-300 hover:border-primary/50">${s}</div>
        </label>`).join('');

    // Renderizar Extras
    const eList = document.getElementById('extras-list');
    eList.innerHTML = SALSAS.map(s => `
        <label class="cursor-pointer">
            <input type="checkbox" name="extraSauce" value="${s}" class="extra-checkbox hidden" onchange="updateTotal()">
            <div class="bg-black border border-white/10 rounded-lg py-3 text-center text-xs text-gray-500 hover:border-secondary/50">${s}</div>
        </label>`).join('');

    updateTotal();
    document.getElementById('modal-config').classList.remove('hidden');
    document.getElementById('modal-config').classList.add('flex');
}

function updateTotal() {
    let format = "Solo";
    if (!document.getElementById('step-format').classList.contains('hidden')) {
        format = document.querySelector('input[name="format"]:checked').value;
    }

    const isDrinkOnly = tempItem.name === "Bebida Extra";
    const drinkSection = document.getElementById('step-drink');

    if (format === 'Menú' || isDrinkOnly) {
        drinkSection.classList.remove('hidden');
    } else {
        drinkSection.classList.add('hidden');
    }

    let base = (format === 'Solo') ? tempItem.pSolo : tempItem.pMenu;

    let extrasTotal = 0;
    if (!isDrinkOnly) {
        const extrasCount = document.querySelectorAll('input[name="extraSauce"]:checked').length;
        extrasTotal = extrasCount * 0.25;
    }

    let drinkSurcharge = 0;
    if (!drinkSection.classList.contains('hidden')) {
        const selectedDrink = document.querySelector('input[name="menuDrink"]:checked');
        if (selectedDrink) {
            drinkSurcharge = parseFloat(selectedDrink.getAttribute('data-surcharge'));
        }
    }

    let total = base + extrasTotal + drinkSurcharge;
    document.getElementById('modal-total').innerText = total.toFixed(2) + '€';
}

function closeModal() {
    document.getElementById('modal-config').classList.add('hidden');
    document.getElementById('modal-config').classList.remove('flex');
}

function addToCart() {
    let format = "Solo";
    if (!document.getElementById('step-format').classList.contains('hidden')) {
        format = document.querySelector('input[name="format"]:checked').value;
    }

    const isDrinkOnly = tempItem.name === "Bebida Extra";
    let detail = "";
    let total = parseFloat(document.getElementById('modal-total').innerText.replace('€', ''));

    if (isDrinkOnly) {
        const selectedDrink = document.querySelector('input[name="menuDrink"]:checked').value;
        detail = selectedDrink;
    } else {
        const mainSauce = document.querySelector('input[name="mainSauce"]:checked').value;
        const extras = Array.from(document.querySelectorAll('input[name="extraSauce"]:checked')).map(cb => cb.value);

        detail = `${format} • Salsa ${mainSauce}`;

        if (format === 'Menú') {
            const selectedDrink = document.querySelector('input[name="menuDrink"]:checked').value;
            detail += ` • Bebida: ${selectedDrink}`;
        }
        if (extras.length > 0) detail += ` • Extras: ${extras.join(', ')}`;
    }

    const title = isDrinkOnly ? "Bebida Extra" : tempItem.name;

    cart.push({ title: title, desc: detail, price: total });
    updateCartUI();
    closeModal();

    // Trigger Upsell if it's not an extra
    if (!isDrinkOnly) {
        showUpsell();
    }
}

function showUpsell() {
    const upsellModal = document.getElementById('modal-upsell');
    if (upsellModal) {
        upsellModal.classList.remove('hidden');
        upsellModal.classList.add('flex');
    }
}

function closeUpsell() {
    document.getElementById('modal-upsell').classList.add('hidden');
    document.getElementById('modal-upsell').classList.remove('flex');
}

function addUpsellItem(name, price) {
    cart.push({ title: name, desc: 'Extra Upsell', price: price });
    updateCartUI();
    closeUpsell();
}

function addSimple(name, price) {
    cart.push({ title: name, desc: '', price: price });
    updateCartUI();
}

function updateCartUI() {
    const count = cart.length;
    const total = cart.reduce((a, b) => a + b.price, 0);

    document.getElementById('cart-count').innerText = count;
    document.getElementById('float-total').innerText = total.toFixed(2) + '€';
    document.getElementById('checkout-total').innerText = total.toFixed(2) + '€';

    const container = document.getElementById('cart-items-container');
    container.innerHTML = cart.map((item, i) => `
        <div class="flex justify-between items-start bg-black/40 p-3 rounded-lg border border-white/5">
            <div>
                <div class="font-bold text-white text-sm">${item.title}</div>
                <div class="text-xs text-gray-400">${item.desc}</div>
            </div>
            <div class="flex flex-col items-end">
                <span class="font-bold text-secondary text-sm">${item.price.toFixed(2)}€</span>
                <button onclick="remove(${i})" class="text-[10px] text-red-500 mt-1">Eliminar</button>
            </div>
        </div>`).join('');

    if (count > 0) document.getElementById('float-btn').classList.remove('hidden');
    else document.getElementById('float-btn').classList.add('hidden');
}

function remove(i) {
    cart.splice(i, 1);
    updateCartUI();
    if (cart.length === 0) closeCheckout();
}

function openCheckout() {
    document.getElementById('modal-checkout').classList.remove('hidden');
    document.getElementById('modal-checkout').classList.add('flex');
}

function closeCheckout() {
    document.getElementById('modal-checkout').classList.add('hidden');
    document.getElementById('modal-checkout').classList.remove('flex');
}

function toggleBizum() {
    const val = document.getElementById('cust-payment').value;
    document.getElementById('bizum-details').style.display = val === 'Bizum' ? 'block' : 'none';
}

function sendOrder() {
    const name = document.getElementById('cust-name').value;
    const addr = document.getElementById('cust-address').value;
    const pay = document.getElementById('cust-payment').value;

    if (!name || !addr) { alert("⚠️ Faltan datos: Nombre y Dirección son obligatorios"); return; }

    const itemsStr = cart.map(i => `▪️ ${i.title} (${i.price.toFixed(2)}€)\n   └ ${i.desc}`).join('\n');
    const total = cart.reduce((a, b) => a + b.price, 0).toFixed(2);
    const phone = "34636745584"; // TU NÚMERO

    const text = `🔥 *NUEVO PEDIDO APP*\n👤 *${name}*\n📍 *${addr}*\n💳 Pago: ${pay}\n\n🛒 *PEDIDO:*\n${itemsStr}\n\n💰 *TOTAL: ${total}€*`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
}
