window.onload = () => {
    let hide = document.querySelectorAll(`ul`)[0];
    let card = document.getElementById(`card`);

    card.addEventListener(`click`, () => {
        hide.classList.remove(`hide`);
    });
};
