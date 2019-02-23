module.exports = {
	cid: '{E86E5405-7D04-4FD4-B0F8-366C24F2178A}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/282',
	class: '연결',
	title: '서버로부터 요청이 끝나면',
	description: '서버로부터 요청이 끝나, 결과를 수신받았을 때 작동합니다.',
	variables: {},
	fn: function (start) {
		Eri.process.on('requestcomplete', start);
	}
};