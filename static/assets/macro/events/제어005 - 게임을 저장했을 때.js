module.exports = {
	cid: '{6A1F68A7-F774-43E2-9720-78B2CF652713}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/287',
	class: '제어',
	title: '게임을 저장했을 때',
	description: '게임을 저장했을 때 작동합니다.',
	variables: {},
	fn: function (start) {
		Eri.process.on('gamesave', start);
	}
};