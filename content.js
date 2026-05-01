//alert("func");

function main(){
    const atividades = document.querySelectorAll("div.activity-item")

    for (i = 0 ; i < atividades.length; i++){
        const has_data = atividades[i].querySelector('div > div.activity-dates')

        if (has_data){
            console.log(atividades[i]);
        }
    }
}

window.addEventListener('load', () => {
    main();
});

