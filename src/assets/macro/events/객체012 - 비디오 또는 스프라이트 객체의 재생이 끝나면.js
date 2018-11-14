module.exports = {
	cid: '{2EA76340-FBA5-4101-8D94-58E2E12A1C30}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/270',
	class: '객체',
	title: '비디오 또는 스프라이트 객체의 재생이 끝나면',
	description: '객체의 재생이 끝났을 때 작동합니다.',
	fn: function (start) {
		lve.on('ended', e => {
			const target = ScriptManager.getSavableData(e.target);
			const event = EventManager.createEvent(e.type, target);
			start(event);
		});
	}
};