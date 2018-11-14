module.exports = {
	cid: '{054D671F-B7D4-4291-94CA-1DDED61BF242}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/331',
	class: '화면/효과',
	title: '현재 화면 장소를 비교합니다',
	description: '현재 보고 있는 장소가 {{장소값}}(과)와 {{방식}}(일)할 경우 작동합니다.',
	variables: {
		'장소값': {
			text: '(플레이)',
			type: 'value',
			sample: 'scene_name_play scene_name_system'
		},
		'방식': {
			text: '정확히 일치',
			type: 'radio',
			sample: [
				{ text: '정확히 일치', value: 1 },
				{ text: '불일치', value: 2 },
				{ text: '일치하거나 상위씬', value: 3 },
				{ text: '일치하거나 하위씬', value: 4 }
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const target = lve('[USING_CAMERA]').get(0);
		if (lve.instanceof(target) === false) {
			stop();
			return;
		}
		const scenename = target.attr('scene')[0];
		switch (this.방식) {
			case 1: {
				if (scenename === this.장소값) next();
				else stop();
				break;
			}
			case 2: {
				if (scenename !== this.장소값) next();
				else stop();
				break;
			}
			case 3: {
				if (scenename === this.장소값) next();
				else if (this.장소값.indexOf(scenename) === 0) next();
				else stop();
				break;
			}
			case 4: {
				if (scenename === this.장소값) next();
				else if (scenename.indexOf(`${this.장소값}::`) === 0) next();
				else stop();
				break;
			}
			default: {
				stop();
				break;
			}
		}
	}
};