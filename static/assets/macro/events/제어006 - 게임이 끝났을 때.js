module.exports = {
	cid: '{206DE4FA-C441-4729-B0CC-60770DAB885B}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/288',
	class: '제어',
	title: '게임이 끝났을 때',
	description: '게임이 끝났을 때 작동합니다.',
	variables: {},
	fn: function (start) {
		Eri.process.on('gameend', start);
	}
};