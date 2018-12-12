module.exports = {
	cid: '{8bbe8f24-a8ad-4bd3-9841-012df6ea1713}',
	version: '1.0.0',
	class: '모바일',
	title: '볼륨다운 버튼을 눌렀을 때',
	description: '볼륨다운 버튼을 눌렀을 때 작동합니다. <br>이 사건은 모바일에서만 작동합니다.',
	fn: function (start) {
		Eri.process.on('device_volumedownbutton', start);
	}
};