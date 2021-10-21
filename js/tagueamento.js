// Preencha este arquivo com qualquer código que você necessite para realizar a
// coleta, desde a biblioteca analytics.js, gtag.js ou o snippet do Google Tag
// Manager. No último caso, não é necessário implementar a tag <noscript>.
// O ambiente dispõe da jQuery 3.5.1, então caso deseje, poderá utilizá-la
// para fazer a sua coleta.
// Caso tenha alguma dúvida sobre o case, não hesite em entrar em contato.

// Exemplo do de envio de event com o ga():

// ga('send', {
//   hitType: 'event',
//   eventCategory: 'Video',
//   eventAction: 'play',
//   eventLabel: 'cats.mp4'
// });

// criando uma função para o enviar o evento com o ga:

const envioDeEvento = (categoria, acao, rotulo) => {
	// usando o ga:
	ga('send', {
	  hitType: 'event',
	  eventCategory: categoria,
	  eventAction: acao,
	  eventLabel: rotulo
	});
}

// capturando o elemento do menu do "Entra em contato"

const btMenuentraEmContato = document.querySelector('.menu-lista-contato');

// capturando o elemento do menu do 'Download PDF'

const btMenuDownloadPdf = document.querySelector('.menu-lista-download');

// criando eventListener para capturar o clique no menu "Entre em Contato""
btMenuentraEmContato.addEventListener('click',  () => {
	console.log('clicou no entre em contato');
	envioDeEvento('menu', 'entre_em_contato', 'link_externo')
});

// criando eventListener para capturar o clique no menu "Download PDF""
btMenuDownloadPdf.addEventListener('click', () => {
	console.log('clicou no download PDF');
	envioDeEvento('menu', 'download_pdf', 'download_pdf');
});



// criando um event Listener no body todo para realizar
// event delegation e filtar os CLICKs dependendo da classe:

document.addEventListener('click', (e) => {

	// console.log(e.target);
	// chamei o evento de 'e' acima

	// vou filtrar o e.target por classe para descobrir
	// se ele clicou em um dos cards:

	// por conta desses elementos nao serem button e existirem
	// tags do tipo p e div eu vou filtrar usando diferentes casos:

	if (e.target.classList.contains('card-title') || e.target.classList.contains('card-link')) {
		// console.log(e.target.parentElement.parentElement.dataset.name);
		envioDeEvento('analise', 'ver_mais', e.target.parentElement.parentElement.dataset.name);
	}
	if (e.target.dataset.name) {
		// console.log(e.target.dataset.name);
		envioDeEvento('analise', 'ver_mais', e.target.dataset.name);
	}
	if (e.target.classList.contains('card-image')){
		// console.log(e.target.parentElement.dataset.name);
		envioDeEvento('analise', 'ver_mais', e.target.parentElement.dataset.name);
	}

	// verificando se o clique foi no checkbox do 'aceito que entrem em contato':
	if (e.target.type='checkbox' && e.target.id === 'aceito') {
		// console.log(e.target.id);
		envioDeEvento('contato', e.target.id, 'preencheu');
	}

	// verificando se o botao de envio do form em /sobre foi clicado:

	if (e.target.type === "submit" && e.target.tagName === 'BUTTON') {
		// clicou no submit
		// verificar se o lightbox esta aparecendo:

		// abrindo um setInterval e salvando o ID para poder remove-lo depois:
		const intervalId = window.setInterval(() => {

			if (document.querySelector('body').classList.contains('lightbox-open')){
				console.log('lightbox entrou');
				clearInterval(intervalId);
				envioDeEvento('contato', 'enviado', 'enviado');
			}

		}, 500)


	}

})


// criando um event Listener no body todo para realizar
// event delegation e filtar os 'KEYUP' dependendo do input:

document.addEventListener('keyup', (e) => {

	if (e.target.tagName === 'INPUT') {
		// se usuario preencheu um dos inputs do '/sobre#contato

		console.log(e.target.id);
		envioDeEvento('contato', e.target.id, 'preencheu');
	}

});