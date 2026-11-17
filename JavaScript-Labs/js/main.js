document.documentElement.classList.add("js");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav-links");
if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
        const open = menuButton.getAttribute("aria-expanded") !== "true";
        menuButton.setAttribute("aria-expanded", String(open));
        navigation.classList.toggle("is-open", open);
    });
    navigation.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
            menuButton.setAttribute("aria-expanded", "false");
            navigation.classList.remove("is-open");
        }
    });
}
const search = document.querySelector("#exercise-search");
if (search) {
    search.addEventListener("input", function () {
        const query = search.value.trim().toLocaleLowerCase("vi");
        let visible = 0;
        document.querySelectorAll("[data-exercise]").forEach(function (card) {
            const matches = card.dataset.exercise.toLocaleLowerCase("vi").includes(query);
            card.hidden = !matches;
            if (matches) visible++;
        });
        document.querySelector("#no-results").hidden = visible > 0;
    });
}
