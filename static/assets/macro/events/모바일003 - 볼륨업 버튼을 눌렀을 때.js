module.exports = {
	cid: '{fda03330-cd39-4d40-9bf9-8abfbf96dc98}',
	version: '1.0.0',
	class: '모바일',
	title: '볼륨업 버튼을 눌렀을 때',
	description: '볼륨업 버튼을 눌렀을 때 작동합니다. <br>이 사건은 모바일에서만 작동합니다.',
	variables: {},
	fn: function (start) {
		Eri.process.on('device_volumeupbutton', start);
	}
};