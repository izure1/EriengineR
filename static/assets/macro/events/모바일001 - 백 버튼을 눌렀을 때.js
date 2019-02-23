module.exports = {
	cid: '{db0b2c62-e1a8-4631-91e7-47fada8591bf}',
	version: '1.0.0',
	class: '모바일',
	title: '백 버튼을 눌렀을 때',
	description: '백 버튼을 눌렀을 때 작동합니다. <br>이 사건은 모바일에서만 작동합니다.',
	variables: {},
	fn: function (start) {
		Eri.process.on('device_backbutton', start);
	}
};