module.exports = {
	cid: '{8B81B90D-BB67-4E51-B7E5-7771AAE912D1}',
	version: '1.0.0',
	class: '미완성',
	title: '화면에 파티클 효과를 주거나 제거합니다',
	description: '장소 {{장소명}}에 {{파티클효과명}} 파티클 효과를 {{작업방식}}.',
	variables: {
		'장소명': {
			text: '(플레이)::집',
			type: 'text',
			sample: 'scene_name_play'
		},
		'파티클효과명': {
			text: '비',
			type: 'radio',
			sample: [
				{ text: '비', value: 'rain' },
				{ text: '눈', value: 'snow' },
				{ text: '먼지', value: 'dust' },
				{ text: '반딧불', value: 'firefly' }
			],
			skip: true
		},
		'작업방식': {
			text: '줍니다',
			type: 'radio',
			sample: [
				{ text: '줍니다', value: 'add' },
				{ text: '제거합니다', value: 'remove' }
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		// TODO: 함수 제작 필요
		switch (self['파티클효과명']) {
			case 'rain': {
				break;
			}
			case 'snow': {
				break;
			}
			case 'dust': {
				break;
			}
			case 'firefly': {
				break;
			}
		}
		next();
	}
};