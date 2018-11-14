module.exports = {
	cid: '{F7FFE269-CD85-4AB5-97E8-2FA7464DAEB0}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/279',
	class: '사운드',
	title: '사운드가 재생되면',
	description: '사운드가 재생될 때 작동합니다.',
	fn: function (start) {
		Eri.process.on('soundplay', start);
	}
};