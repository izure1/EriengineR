module.exports = {
	cid: '{EC06F3E7-DB31-4C22-88B4-1DB1621A5BDE}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/284',
	class: '제어',
	title: '프로그램이 실행됐을 때',
	description: '프로그램이 실행되어, 타이틀 화면으로 진입했을 때 작동합니다.',
	variables: {},
	fn: function (start) {
		Eri.process.on('programstart', start);
	}
};