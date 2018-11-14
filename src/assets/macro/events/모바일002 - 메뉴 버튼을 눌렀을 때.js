module.exports = {
	cid: '{3ff7e795-3a2a-47cd-8486-7a9b5636a5d8}',
	version: '1.0.0',
	class: '모바일',
	title: '메뉴 버튼을 눌렀을 때',
	description: '메뉴 버튼을 눌렀을 때 작동합니다. <br>이 사건은 모바일에서만 작동합니다.',
	fn: function (start) {
		Eri.process.on('device_menubutton', start);
	}
};