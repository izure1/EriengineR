module.exports = {
	cid: '{3F3A1E10-0D07-4D96-B8E8-C83A4B450F5D}',
	version: '1.0.0',
	class: '화면/효과',
	title: '화면을 전체화면/윈도우로 변경합니다',
	description: '게임을 {{화면종류}}(으)로 진입합니다.',
	variables: {
		"화면종류": {
			text: '전체화면',
			type: 'radio',
			sample: [
				{
					text: '전체화면',
					value: 1
				},
				{
					text: '윈도우',
					value: 2
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		if (Eri.util.RE === 'android') {
			Eri.util.cordovaFullscreen();
			next();
			return;
		}
		switch (this.화면종류) {
			case 1: {
				lve.fullscreen(true, 'body');
				break;
			}
			case 2: {
				lve.exitFullscreen();
				break;
			}
		}
		next();
	}
};