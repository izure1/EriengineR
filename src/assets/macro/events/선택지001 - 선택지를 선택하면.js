module.exports = {
	cid: '{7DEDE9A2-9463-4362-928F-0C9C6DD40553}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/281',
	class: '선택지',
	title: '선택지를 선택하면',
	description: '선택지를 선택하면 작동합니다.',
	fn: function (start) {
		Eri.process.on('select', start);
	}
};