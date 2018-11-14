module.exports = {
	cid: '{72823E79-2765-4924-B075-B48F45B56E1D}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/290',
	class: '키보드',
	title: '키보드를 눌렀을 때',
	description: '아무 키나 눌렀을 때 작동합니다.',
	fn: function (start) {
		Eri.process.eventManager.on('keydown', start);
	}
};