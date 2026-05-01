const btn = document.getElementById('go');

function get_tarefas(){
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (! (tabs[0].url && tabs[0].url.startsWith("http") & tabs[0].url.includes("salaonline.ceub.br")) ){
            btn.disabled = true;
            return;
        }

        chrome.tabs.sendMessage(tabs[0].id, {act : 'PEGAR'}, (r) =>{
            if (r && r.html){
                btn.disabled = true;
                const dom_parser = new DOMParser();
                const doc = dom_parser.parseFromString(r.html, 'text/html');

                const atividades = doc.querySelectorAll("div.activity-item");

                for (i = 0 ; i < atividades.length; i++){
                    const tem_data = atividades[i].querySelector('div > div.activity-dates');
                    if (!tem_data) continue;
                        
                    const incompleto  = atividades[i].querySelector('div > span.badge-light');
                    if (!incompleto) continue;

                    const vencendo = Array.from(atividades[i].querySelectorAll('strong')).find(e => e.innerHTML === 'Fecha:' || e.innerHTML === 'Vencimento:');


                    const new_activ = document.createElement("p");
                    new_activ.textContent = atividades[i].getAttribute("data-activityname") + " |  ";
                    if (vencendo){
                        new_activ.textContent += vencendo.parentElement.innerText;
                    }

                    document.body.appendChild(new_activ);
                }
            }
        });

    });
}


document.addEventListener('DOMContentLoaded', () => {
    get_tarefas();
    btn.addEventListener('click', () => { get_tarefas(); });
});