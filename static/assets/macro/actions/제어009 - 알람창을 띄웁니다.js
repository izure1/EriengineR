module.exports = {
	cid: '{24bee358-da4c-40ee-b185-57277969ffb8}',
	version: '1.0.0',
	class: '제어',
	title: '알람창을 띄웁니다',
	description: '{{제목}}(이)란 제목을 가진 알람창을 띄웁니다. 내용은 {{내용}}입니다.',
	variables: {
		'제목': {
			text: '경고!',
			type: 'text',
			skip: true
		},
		'내용': {
			text: '이 기능은 현재 구현되어 있지 않습니다.',
			type: 'text'
		}
	},
	fn: function (next, stop, e) {
		Eri.process.showErrMsg(this.제목 + '', this.내용 + '');
		next();
	}
};