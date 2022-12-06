window.onload = () => {
    let hide = document.querySelectorAll(`ul`)[0];
    let card = document.getElementById(`card`);

    card.addEventListener(`click`, () => {
        if(!hide.classList.contains(`hide`)) {
            hide.classList.add(`hide`);
        }
        else{
            hide.classList.remove(`hide`);
        }
    });
};

