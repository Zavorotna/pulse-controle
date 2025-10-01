document.addEventListener("DOMContentLoaded", function () {
    //burger
    if (document.querySelector(".burger")) {
        const burger = document.querySelector(".burger"),
            menu = document.querySelector(".menu"),
            cancel = document.querySelector(".close_burger"),
            links = menu.querySelectorAll("a")
        console.log(links);
        burger.addEventListener('click', function () {
            menu.style.top = "111px"
            burger.style.display = "none"
            cancel.style.display = "block"
        })

        function cancelBurger() {
            menu.style.top = "-110%"
            burger.style.display = "block"
            cancel.style.display = "none"

        }
        cancel.addEventListener("click", cancelBurger)

        links.forEach(item => {
            item.addEventListener("click", function () {
                cancelBurger()
                burger.style.display = "none"
            })

        })
    }

    //custome select

    function initCustomSelect(wrapper) {
        const select = wrapper.querySelector("select"),
            selectedDiv = wrapper.querySelector(".custom-selected"),
            optionsContainer = wrapper.querySelector(".custom-options"),
            customSelect = wrapper.querySelector(".custom-select")

        if (!optionsContainer.hasChildNodes()) {
            select.querySelectorAll("option").forEach(option => {
                const div = document.createElement("div")
                div.classList.add("custom-option")
                div.textContent = option.textContent
                div.dataset.value = option.value
                div.dataset.type = option.dataset.type ?? ""

                if (option.selected) {
                    selectedDiv.textContent = option.textContent
                }

                div.addEventListener("click", (e) => {
                    e.stopPropagation()

                    selectedDiv.textContent = option.textContent;
                    select.value = option.value;
                    customSelect.classList.remove("open");
                    select.dispatchEvent(new Event("change"))
                })

                optionsContainer.appendChild(div)
            })
        }

        wrapper.querySelector(".custom-select").addEventListener("click", () => {
            wrapper.querySelector(".custom-select").classList.toggle("open")
        })

        document.addEventListener("click", (e) => {
            if (!wrapper.contains(e.target)) {
                wrapper.querySelector(".custom-select").classList.remove("open")
            }
        })
    }
    if (document.querySelector("select")) {

        const typeWrapper = document.getElementById("type-select"),
            serviceWrapper = document.getElementById("service-select")

        initCustomSelect(typeWrapper);
        initCustomSelect(serviceWrapper);


        //form for doctors and document
        const typeSelect = typeWrapper.querySelector("select"),
            serviceSelect = serviceWrapper.querySelector("select"),
            serviceOptions = serviceWrapper.querySelectorAll(".custom-option"),
            serviceSelected = serviceWrapper.querySelector(".custom-selected")

        function filterServices(type, preferredValue) {
            const realOptions = [...serviceSelect.querySelectorAll("option")],
                label = document.querySelector(".services_form label")
            let firstVisible = null

            realOptions.forEach((opt, idx) => {
                const relatedCustom = serviceOptions[idx]
                if (opt.dataset.type === type) {
                    opt.hidden = false;
                    if (relatedCustom) relatedCustom.style.display = "block"
                    if (!firstVisible) firstVisible = {
                        opt,
                        relatedCustom
                    }
                } else {
                    opt.hidden = true;
                    if (relatedCustom) relatedCustom.style.display = "none"
                }
            })

            if (firstVisible) {
                let selectedOpt = firstVisible.opt

                if (preferredValue) {
                    const pref = realOptions.find(opt => !opt.hidden && opt.value === preferredValue)
                    if (pref) selectedOpt = pref
                }

                serviceSelect.value = selectedOpt.value
                serviceSelected.textContent = selectedOpt.textContent

                serviceOptions.forEach(div => div.classList.remove('selected'))
                const match = [...serviceOptions].find(div => div.dataset.value === selectedOpt.value)
                if (match) match.classList.add('selected')

                if (selectedOpt.dataset.type === "Запис до лікаря") label.textContent = "Оберіть лікаря"
                else if (selectedOpt.dataset.type === "Медична довідка") label.textContent = "Оберіть тип довідки"
            }

        }

        typeSelect.addEventListener("change", () => {
            filterServices(typeSelect.value)
        })

        filterServices(typeSelect.value)


        //автозаповнення довідки зі сторінки довідк и
        const savedService = localStorage.getItem('selectedService');

        if (savedService) {
            const realOptions = [...serviceSelect.querySelectorAll("option")],
                matchedOption = realOptions.find(opt => opt.value === savedService)

            if (matchedOption) {
                typeSelect.value = matchedOption.dataset.type
                typeWrapper.querySelector('.custom-selected').textContent = matchedOption.dataset.type

                filterServices(matchedOption.dataset.type, matchedOption.value)
                document.querySelector('#form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })

                localStorage.removeItem('selectedService')
            }
        }

        //автозаповнення лікаря
        document.querySelectorAll('.doctors .cta').forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault()
                const doctorValue = btn.dataset.doctor,
                    option = [...serviceSelect.options].find(opt => opt.value === doctorValue)

                typeSelect.value = option.dataset.type
                typeWrapper.querySelector('.custom-selected').textContent = option.dataset.type

                filterServices(option.dataset.type, option.value)

                document.querySelector('#form').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })

                serviceWrapper.querySelector('.custom-select').classList.remove('open')
            })

        })
    }


    //запис у локал сторедж опції для селекта на довідки
    if (document.querySelector('.page_cta[data-service]')) {
        const ctaButtons = document.querySelectorAll('.page_cta[data-service]');

        ctaButtons.forEach(button => {
            button.addEventListener('click', function (e) {

                const serviceType = this.getAttribute('data-service');

                if (serviceType) {
                    localStorage.setItem('selectedService', serviceType)
                }
            })
        })
    }
    
})