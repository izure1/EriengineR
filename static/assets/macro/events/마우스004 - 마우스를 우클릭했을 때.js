module.exports = {
	cid: '{8A06AE89-BAE3-4CDF-A98F-2611DE70C870}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/275',
	class: '마우스',
	title: '마우스를 우클릭했을 때',
	description: '마우스를 우클릭했을 때 작동합니다.',
	fn: function (start) {
		Eri.process.eventManager.on('contextmenu', start);
	}
};