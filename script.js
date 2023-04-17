const caixaTexto = document.querySelector('#caixa-texto');
const botaoCripto = document.querySelector('#criptog');
const botaoDescripto = document.querySelector('#descriptog');
const saidaTexto = document.getElementById('caixa-branca');

const troca = { 
    a: 'ai', 
    e: 'enter', 
    i: 'imes', 
    o: 'ober', 
    u: 'ufat',
};

const trocaVogais = (event, str) => {
	const vogais = /[aeiou]/g;
	const substituir = /(ai | enter | imes | ober | ufat)/g;

	if (event.target === botaoCripto) {
		return str.replace(vogais, match => troca[match]);
	}

    if (event.target === botaoDescripto) {
        const trocaSubstituir = {};
        for (let vogal in troca) {
        trocaSubstituir[troca[vogal]] = vogal;
        }
        return str.replace(substituir, match => trocaSubstituir[match]);
    }
};	

const saidaDeTexto = document.createElement('textarea');
saidaDeTexto.id = 'texto-final';
const copiar = document.createElement('button');

const resultado = str => {
    if (caixaTexto.value !== '') {
        copiar.classList.add('botao');
        copiar.id = 'copiar';
        copiar.type = 'submit';
        copiar.textContent = 'COPIAR';

        saidaTexto.innerHTML = '';
        saidaTexto.appendChild(saidaDeTexto);
        saidaTexto.appendChild(copiar);

        saidaDeTexto.textContent = str;
    }
};

const criptografar = event => {
    const str = caixaTexto.value.toLowerCase();
    const novaFrase = trocaVogais(event, str);
    resultado(novaFrase);
    setTimeout(() => mudaTexto('CRIPTOGRAFANDO...', 'CRIPTOGRAFAR', botaoCripto), 12);
};

const descriptografar = event => {
    const str = caixaTexto.value;
    const novaFrase = trocaVogais(event, str);
    resultado(novaFrase);
    setTimeout(() => mudaTexto('DESCRIPTOGRAFANDO...', 'DESCRIPTOGRAFAR', botaoDescripto), 12);
};

const mudaTexto = (strNova, strOriginal, botaoNovo) => {
    caixaTexto.placeholder = "DIGITE SEU TEXTO"
    if (caixaTexto.value !== '') {
        botaoNovo.textContent = strNova;
        setTimeout(() => {
        botaoNovo.textContent = strOriginal;
        }, 1000);
    } else{
        caixaTexto.placeholder = "POR FAVOR, PRIMEIRO DIGITE AQUI..."
    }
};

const textoCopiado = () => {
    const texto = saidaDeTexto.value;
    const novoTexto = document.createElement('textarea');
    novoTexto.value = texto;
    document.body.appendChild(novoTexto);
    novoTexto.select();
    document.execCommand('copy');
    document.body.removeChild(novoTexto);
    setTimeout(() => mudaTexto('COPIADO!', 'COPIAR', copiar), 12);
};

botaoCripto.addEventListener('click', criptografar);
botaoDescripto.addEventListener('click', descriptografar);
copiar.addEventListener('click', textoCopiado);