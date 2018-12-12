module.exports = {
	cid: '{964E695C-0EE9-49C6-8709-1DA705812496}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/272',
	class: '마우스',
	title: '마우스 휠을 굴렸을 때',
	description: '마우스 휠을 굴렸을 때 작동합니다.',
	fn: function (start) {
		Eri.process.eventManager.on('mousewheel', start);
	}
};