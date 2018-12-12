module.exports = {
	cid: '{FFEE96AE-9242-4605-B89C-5B40006F149C}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/280',
	class: '사운드',
	title: '사운드의 재생이 끝나면',
	description: '사운드의 재생이 끝났을 때 작동합니다.',
	fn: function (start) {
		Eri.process.on('soundend', start);
	}
};