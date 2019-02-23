module.exports = {
	cid: '{3077d0f4-e157-456f-b8b1-e5d0829bad07}',
	version: '1.0.0',
	class: '제어',
	title: '프로그램을 준비하기 시작했을 때',
	description: '프로그램을 실행하기 위해, 에셋 데이터를 불러오기 시작할 때 작동합니다.',
	variables: {},
	fn: function (start) {
		Eri.process.on('loadingstart', start);
	}
};