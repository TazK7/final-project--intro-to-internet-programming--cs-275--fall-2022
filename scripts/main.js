window.onload = () => {
    let hide = document.querySelectorAll(`ul`)[0];
    let selectDiv = document.querySelectorAll(`div`)[0];
    let displayModal = document.getElementById(`cover`);
    let card = document.getElementById(`card`);
    let selectBody = document.querySelector(`body`);

    //This EventListener is displaying and removing the menu when the show menu button is clicked
    card.addEventListener(`click`, () => {
        if(!hide.classList.contains(`hide`)) {
            hide.classList.add(`hide`);
        }
        else{
            hide.classList.remove(`hide`);
        }
    });

    //Adds Modal when you click Show Modal and removes it when you click the background layer
    displayModal.addEventListener(`click`, () => {
        if(selectDiv.classList.contains(`hide`)) {
            selectDiv.classList.remove(`hide`);
            selectBody.classList.add(`remove-scroll`);
        } else{
            !selectDiv.classList.contains(`hide`);
            selectDiv.classList.add(`hide`);
            selectBody.classList.remove(`remove-scroll`);
        }
    });
};
