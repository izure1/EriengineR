module.exports = {
	cid: '{CFB1BE98-4B8A-4A0E-86DD-D8A8CC9E3297}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/271',
	class: '화면/효과',
	title: '카메라 객체가 변경되었을 때',
	description: '카메라가 바뀌었을 때 작동합니다.',
	fn: function (start) {
		lve.on('use', e => {
			const target = ScriptManager.getSavableData(e.target);
			const event = EventManager.createEvent(e.type, target);
			start(event);
		});
	}
};