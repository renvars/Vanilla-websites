//ONCLICK CHANGE POSITION OF HEADER DROPDOWN
const dropdown_button = document.querySelector('#header_dropdown')
const header_nav = document.querySelector('#header_navigation')
const header_checkbox = document.querySelector('#header_input')
const drop_down_links = document.querySelectorAll(".nav-link")

dropdown_button.onclick = function(event) {
    header_checkbox.checked = !header_checkbox.checked
    if (header_checkbox.checked) {
        header_nav.classList.add("active_nav")
        dropdown_button.classList.add("active_btn")
        let active_header_nav = document.querySelector('.active_nav')
        active_header_nav.style.left = '0px'
    } else {
        header_nav.classList.remove("active_nav")
        dropdown_button.classList.remove("active_btn")
    }

}

drop_down_links.forEach(element => element.onclick = () => {
    header_nav.classList.remove("active_nav")
    dropdown_button.classList.remove("active_btn")
    header_checkbox.checked = !header_checkbox.checked
})

//MINT PAGE STYLE PARENT ELEMENTS ON CHILD HOVER//

const mint_children = document.querySelectorAll('.content_card_bottom')






//FAQ LOGIC AND WORKS

const faq_button_list = document.querySelectorAll(".question_icon")
const all_faq_plus_signs = document.querySelectorAll(".question_plus")
const all_faq_divs = document.querySelectorAll(".question_header")
const all_input_boxes = document.querySelectorAll(".faq_input")
const answers_faq = document.querySelectorAll(".question_answer_wrapper")

for (let i = 0; i < faq_button_list.length; i++) {
    faq_button_list[i].onclick = () => {
        all_input_boxes[i].checked = !all_input_boxes[i].checked
        if (all_input_boxes[i].checked) {
            all_faq_plus_signs[i].style.transform = "rotateX(90deg)"
            answers_faq[i].style.display = "block"
        } else {
            all_faq_plus_signs[i].removeAttribute("style")
            answers_faq[i].style.display = "none"
        }
    }
}
for (let i = 0; i < all_faq_divs.length; i++) {
    all_faq_divs[i].onclick = () => {
        all_input_boxes[i].checked = !all_input_boxes[i].checked
        if (all_input_boxes[i].checked) {
            all_faq_plus_signs[i].style.transform = "rotateX(90deg)"
            answers_faq[i].style.display = "block"
        } else {
            all_faq_plus_signs[i].removeAttribute("style")
            answers_faq[i].style.display = "none"
        }
    }
}