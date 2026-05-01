var doc;
const btn = document.getElementById('go');

function get_html(){
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {act : 'PEGAR'}, (r) =>{
            if (r && r.html){
                const dom_parser = new DOMParser();
                doc = dom_parser.parseFromString(r.html, 'text/html');

                console.log("receba");
            }
        });
    });
}

function process_html(){
    const atividades = doc.querySelectorAll("div.activity-item");
    var selected = [];

    for (i = 0 ; i < atividades.length; i++){
        const tem_data = atividades[i].querySelector('div > div.activity-dates');
        if (!tem_data) continue;
            
        const incompleto  = atividades[i].querySelector('div > span.badge-light');
        if (!incompleto) continue;


        console.log(atividades[i]);
        selected.push(atividades[i]);

        
        // const vencendo = Array.from(atividades[i].querySelectorAll('strong')).find(e => e.innerHTML === 'Fecha:' || e.innerHTML === 'Vencimento:');

        // if (vencendo){
        //     console.log(atividades[i]);
        // }    
    }
}

document.addEventListener('DOMContentLoaded', () => {
    get_html();
    btn.addEventListener('click', () => { get_html(); process_html(); });
});

