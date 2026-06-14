document.addEventListener("DOMContentLoaded", function () {
    const carYearSelect = document.getElementById("carYear");
    const totalPriceSpan = document.getElementById("totalPrice");
    
    const cardOptionsDiv = document.getElementById("cardOptions");
    const paymentRadioButtons = document.querySelectorAll('input[name="paymentMethod"]');
    
    const diagnosticForm = document.getElementById("diagnosticForm");
    const successMessage = document.getElementById("successMessage");
    const summaryText = document.getElementById("summaryText");
    const goBackBtn = document.getElementById("goBackBtn");

    const sidebar = document.getElementById("historySidebar");
    const toggleHistoryBtn = document.getElementById("toggleHistoryBtn");
    const closeSidebarBtn = document.getElementById("closeSidebarBtn");
    const historyList = document.getElementById("historyList");
    const historyCountSpan = document.getElementById("historyCount");

    // მიმდინარე ენის ცვლადი
    let currentLang = "ka";

    // სრული თარგმანების ბაზა
    const translations = {
        ka: {
            title: "OBD დიაგნოსტიკის სერვისი",
            sidebarTitle: "📋 შეკვეთების ისტორია",
            noOrders: "შეკვეთები ჯერ არ არის.",
            myOrders: "📋 ჩემი შეკვეთები",
            mainTitle: "OBD დიაგნოსტიკა",
            subtitle: "შეავსეთ მონაცემები სერვისის დასაჯავშნად",
            yearLabel: "მანქანის გამოშვების წელი",
            selectYear: "აირჩიეთ წელი",
            typeLabel: "მანქანის ტიპი (კორპუსი)",
            selectType: "აირჩიეთ ტიპი",
            fuelLabel: "საწვავის ტიპი",
            selectFuel: "აირჩიეთ საწვავის ტიპი",
            paymentLabel: "გადახდის მეთოდი",
            payCard: "💳 ბარათით (ონლაინ)",
            selectChannel: "აირჩიეთ გადახდის არხი:",
            payCash: "💵 ნაღდი ანგარიშსწორება",
            costLabel: "სერვისის ღირებულება:",
            btnSubmit: "🧰 დიაგნოსტიკის დაჯავშნა",
            successTitle: " შეკვეთა მიღებულია!",
            btnBack: "⬅️ ახალი შეკვეთის დამატება",
            alertFields: "გთხოვთ შეავსოთ ყველა გრაფა!",
            alertPayment: "გთხოვთ აირჩიოთ გადახდის მეთოდი!",
            sumYear: "მანქანის წელი:",
            sumType: "ტიპი:",
            sumFuel: "საწვავის ტიპი:",
            sumPay: "გადახდის მეთოდი:",
            sumTotal: "გადასახდელი თანხა:",
            cashText: "ნაღდი ანგარიშსწორება",
            cardText: "ბარათით",
            // დინამიური სელექტების მნიშვნელობები
            sedan: "სედანი", suv: "ჯიპი / SUV", hatchback: "ჰეჩბექი", coupe: "კუპე", universal: "უნივერსალი",
            petrol: "ბენზინი", diesel: "დიზელი", hybrid: "ჰიბრიდი", electric: "ელექტრო"
        },
        en: {
            title: "OBD Diagnostics Service",
            sidebarTitle: "📋 Order History",
            noOrders: "No orders yet.",
            myOrders: "📋 My Orders",
            mainTitle: "OBD Diagnostics",
            subtitle: "Fill in the details to book a service",
            yearLabel: "Car Production Year",
            selectYear: "Select year",
            typeLabel: "Car Type (Body)",
            selectType: "Select type",
            fuelLabel: "Fuel Type",
            selectFuel: "Select fuel type",
            paymentLabel: "Payment Method",
            payCard: "💳 By Card (Online)",
            selectChannel: "Select payment channel:",
            payCash: "💵 Cash Payment",
            costLabel: "Service Cost:",
            btnSubmit: "🧰 Book Diagnostics",
            successTitle: " Order Received!",
            btnBack: "⬅️ Add New Order",
            alertFields: "Please fill in all fields!",
            alertPayment: "Please select a payment method!",
            sumYear: "Car Year:",
            sumType: "Type:",
            sumFuel: "Fuel Type:",
            sumPay: "Payment Method:",
            sumTotal: "Total Amount:",
            cashText: "Cash Payment",
            cardText: "By Card",
            sedan: "Sedan", suv: "SUV", hatchback: "Hatchback", coupe: "Coupe", universal: "Universal",
            petrol: "Petrol", diesel: "Diesel", hybrid: "Hybrid", electric: "Electric"
        },
        ru: {
            title: "Сервис ОБД Диагностики",
            sidebarTitle: "📋 История заказов",
            noOrders: "Заказов пока нет.",
            myOrders: "📋 Мои заказы",
            mainTitle: "OBD Диагностика",
            subtitle: "Заполните данные для бронирования услуги",
            yearLabel: "Год выпуска автомобиля",
            selectYear: "Выберите год",
            typeLabel: "Тип автомобиля (Кузов)",
            selectType: "Выберите тип",
            fuelLabel: "Тип топлива",
            selectFuel: "Выберите тип топлива",
            paymentLabel: "Способ оплаты",
            payCard: "💳 Картой (Онлайн)",
            selectChannel: "Выберите канал оплаты:",
            payCash: "💵 Наличный расчет",
            costLabel: "Стоимость услуги:",
            btnSubmit: "🧰 Забронировать диагностику",
            successTitle: " Заказ принят!",
            btnBack: "⬅️ Добавить новый заказ",
            alertFields: "Пожалуйста, заполните все поля!",
            alertPayment: "Пожалуйста, выберите способ оплаты!",
            sumYear: "Год авто:",
            sumType: "Тип:",
            sumFuel: "Тип топлива:",
            sumPay: "Способ оплаты:",
            sumTotal: "Итого к оплате:",
            cashText: "Наличный расчет",
            cardText: "Картой",
            sedan: "Седан", suv: "Джип / SUV", hatchback: "Хэтчбек", coupe: "Купе", universal: "Универсал",
            petrol: "Бензин", diesel: "Дизель", hybrid: "Гибрид", electric: "Электро"
        }
    };

    let ordersList = [];
    
    let selectedCarType = { value: "", name: "", price: 0 };
    let selectedFuelType = { value: "", name: "", price: 0 };

    // ენის დინამიური შეცვლის ფუნქცია
    function changeLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];

        // ძირითადი ტექსტების ჩანაცვლება
        document.title = t.title;
        document.querySelector("#historySidebar .sidebar-header h3").innerHTML = t.sidebarTitle;
        document.querySelector("h2").textContent = t.mainTitle;
        document.querySelector(".subtitle").textContent = t.subtitle;
        document.querySelector("label[for='carYear']").textContent = t.yearLabel;
        
        const firstYearOpt = carYearSelect.options[0];
        if (firstYearOpt.disabled) firstYearOpt.textContent = t.selectYear;

        const labels = document.querySelectorAll(".form-group > label");
        labels[1].textContent = t.typeLabel;
        labels[2].textContent = t.fuelLabel;
        labels[3].textContent = t.paymentLabel;

        document.querySelector("#payCard + span").textContent = t.payCard;
        document.querySelector(".sub-legend").textContent = t.selectChannel;
        document.querySelector("input[value='cash'] + span").textContent = t.payCash;
        document.querySelector(".price-display > span").textContent = t.costLabel;
        document.querySelector(".btn-submit span") ? document.querySelector(".btn-submit").innerHTML = `🧰 <span>${t.btnSubmit.replace('🧰 ', '')}</span>` : document.querySelector(".btn-submit").innerHTML = t.btnSubmit;
        document.querySelector("#successMessage h3").textContent = t.successTitle;
        document.querySelector("#goBackBtn").textContent = t.btnBack;

        // ჩამოსაშლელი სიების (Custom Select) ტექსტების თარგმნა
        document.querySelectorAll(".custom-select").forEach(selectEl => {
            const triggerSpan = selectEl.querySelector(".select-trigger span");
            const isCar = selectEl.id === "carTypeSelect";
            const currentObj = isCar ? selectedCarType : selectedFuelType;

            // თუ არჩეულია, ვანახლებთ არჩეულ ტექსტს მიმდინარე ენაზე
            if (selectEl.querySelector(".select-trigger").classList.contains("selected")) {
                triggerSpan.textContent = t[currentObj.value];
            } else {
                triggerSpan.textContent = isCar ? t.selectType : t.selectFuel;
            }

            // სიის ოფციების ტექსტების გადაწერას
            selectEl.querySelectorAll(".option").forEach(opt => {
                const val = opt.dataset.value;
                opt.querySelector("span:not(.opt-price)").textContent = t[val];
            });
        });

        // ისტორიისა და წარმატების ბლოკის განახლება
        renderHistory();
        if (!successMessage.classList.contains("hidden") && ordersList.length > 0) {
            updateSummaryText(ordersList[0]);
        }
    }

    // ენის ღილაკების ივენთები
    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            changeLanguage(this.dataset.lang);
        });
    });

    // წლების გენერირება
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1995; year--) {
        let option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        carYearSelect.appendChild(option);
    }

    // მორგებული სელექტების ფუნქციონალი
    function setupCustomSelect(selectId, onChangeCallback) {
        const selectEl = document.getElementById(selectId);
        const trigger = selectEl.querySelector('.select-trigger');
        const options = selectEl.querySelectorAll('.option');

        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            document.querySelectorAll('.custom-select').forEach(el => {
                if(el !== selectEl) el.classList.remove('active');
            });
            selectEl.classList.toggle('active');
        });

        options.forEach(opt => {
            opt.addEventListener('click', function(e) {
                e.stopPropagation();
                const val = this.dataset.value;
                const price = parseInt(this.dataset.price);
                const translatedName = translations[currentLang][val];

                trigger.innerHTML = `<span>${translatedName}</span><span class="trigger-price">+${price} ₾</span>`;
                trigger.classList.add('selected');
                selectEl.classList.remove('active');
                
                onChangeCallback(val, translatedName, price);
            });
        });
    }

    setupCustomSelect('carTypeSelect', function(value, name, price) {
        selectedCarType = { value, name, price };
        updatePrice();
    });

    setupCustomSelect('fuelTypeSelect', function(value, name, price) {
        selectedFuelType = { value, name, price };
        updatePrice();
    });

    document.addEventListener('click', function() {
        document.querySelectorAll('.custom-select').forEach(el => el.classList.remove('active'));
    });

    function updatePrice() {
        totalPriceSpan.textContent = selectedCarType.price + selectedFuelType.price;
    }

    paymentRadioButtons.forEach(radio => {
        radio.addEventListener("change", function () {
            if (this.value === "card") {
                cardOptionsDiv.classList.remove("hidden");
            } else {
                cardOptionsDiv.classList.add("hidden");
            }
        });
    });

    toggleHistoryBtn.addEventListener("click", () => sidebar.classList.add("open"));
    closeSidebarBtn.addEventListener("click", () => sidebar.classList.remove("open"));

    function renderHistory() {
        if (ordersList.length === 0) {
            historyList.innerHTML = `<p class="empty-msg">${translations[currentLang].noOrders}</p>`;
            return;
        }

        historyList.innerHTML = "";
        ordersList.forEach(order => {
            const item = document.createElement("div");
            item.className = "history-item";
            
            let paymentText = order.rawPayment === "card"
                ? `${translations[currentLang].cardText} (${order.specificCard})`
                : translations[currentLang].cashText;

            item.innerHTML = `
                <div class="history-date">📅 ${order.timestamp}</div>
                <strong>${translations[currentLang].sumYear}</strong> ${order.year}<br>
                <strong>${translations[currentLang].sumType}</strong> ${translations[currentLang][order.typeValue]}<br>
                <strong>${translations[currentLang].sumFuel}</strong> ${translations[currentLang][order.fuelValue]}<br>
                <strong>${translations[currentLang].sumPay}</strong> ${paymentText}<br>
                <strong>${translations[currentLang].sumTotal}</strong> ${order.price} ₾
            `;
            historyList.appendChild(item);
        });
        historyCountSpan.textContent = ordersList.length;
    }

    function updateSummaryText(order) {
        let paymentText = order.rawPayment === "card"
            ? `${translations[currentLang].cardText} (${order.specificCard})`
            : translations[currentLang].cashText;

        summaryText.innerHTML = `
            <strong>${translations[currentLang].sumYear}</strong> ${order.year}<br>
            <strong>${translations[currentLang].sumType}</strong> ${translations[currentLang][order.typeValue]}<br>
            <strong>${translations[currentLang].sumFuel}</strong> ${translations[currentLang][order.fuelValue]}<br>
            <strong>${translations[currentLang].sumPay}</strong> ${paymentText}<br>
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 12px 0;">
            <strong>${translations[currentLang].sumTotal}</strong> <span style="font-size: 20px; color: #00ffaa; font-weight: bold;">${order.price} ₾</span>
        `;
    }

    diagnosticForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!selectedCarType.value || !selectedFuelType.value) {
            alert(translations[currentLang].alertFields);
            return;
        }

        const checkedPayment = document.querySelector('input[name="paymentMethod"]:checked');
        if (!checkedPayment) {
            alert(translations[currentLang].alertPayment);
            return;
        }

        const selectedYear = carYearSelect.value;
        const mainPaymentMethod = checkedPayment.value;
        let specificCardVal = mainPaymentMethod === "card" ? document.querySelector('input[name="specificCard"]:checked').value : "";

        const finalPrice = totalPriceSpan.textContent;
        const now = new Date();
        const timestamp = now.toLocaleDateString('ka-GE') + " | " + now.toLocaleTimeString('ka-GE', { hour: '2-digit', minute: '2-digit' });

        const newOrder = {
            year: selectedYear,
            typeValue: selectedCarType.value,
            fuelValue: selectedFuelType.value,
            rawPayment: mainPaymentMethod,
            specificCard: specificCardVal,
            price: finalPrice,
            timestamp: timestamp
        };

        ordersList.unshift(newOrder);
        renderHistory();
        updateSummaryText(newOrder);

        diagnosticForm.classList.add("hidden");
        successMessage.classList.remove("hidden");
    });

    goBackBtn.addEventListener("click", function () {
        diagnosticForm.reset();
        cardOptionsDiv.classList.add("hidden");
        
        document.getElementById('carTypeSelect').querySelector('.select-trigger').innerHTML = `<span>${translations[currentLang].selectType}</span>`;
        document.getElementById('fuelTypeSelect').querySelector('.select-trigger').innerHTML = `<span>${translations[currentLang].selectFuel}</span>`;
        document.querySelectorAll('.select-trigger').forEach(el => el.classList.remove('selected'));

        selectedCarType = { value: "", name: "", price: 0 };
        selectedFuelType = { value: "", name: "", price: 0 };
        
        totalPriceSpan.textContent = "0";
        successMessage.classList.add("hidden");
        diagnosticForm.classList.remove("hidden");
    });
});