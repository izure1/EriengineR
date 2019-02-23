module.exports = {
	cid: '{AB8C1282-F59A-485F-843D-803371028958}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/286',
	class: '제어',
	title: '저장된 게임을 불러왔을 때',
	description: '저장된 게임을 불러왔을 때 작동합니다.',
	variables: {},
	fn: function (start) {
		Eri.process.on('gameload', start);
	}
};