module.exports = {
	cid: '{FCCC6930-D6F0-4378-9F0A-F5B13D718C27}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/291',
	class: '키보드',
	title: '키보드를 땠을 때',
	description: '아무 키나 땠을 때 작동합니다.',
	fn: function (start) {
		Eri.process.eventManager.on('keyup', start);
	}
};