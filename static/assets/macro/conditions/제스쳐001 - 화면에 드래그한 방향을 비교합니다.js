module.exports = {
	cid: '{b8ad0fb6-f4ac-4c42-a2db-6b6c8e88e773}',
	version: '1.0.0',
	class: '제스쳐',
	title: '화면에 드래그한 방향을 비교합니다',
	description: '위 사건에서 화면을 {{방향}}(으)로 {{수치}}{{비교}} 드래그했을 경우 작동합니다.',
	variables: {
		'방향': {
			text: '위',
			type: 'radio',
			sample: [{
					text: '위',
					value: 'UP'
				},
				{
					text: '아래',
					value: 'DOWN'
				},
				{
					text: '왼쪽',
					value: 'LEFT'
				},
				{
					text: '오른쪽',
					value: 'RIGHT'
				}
			],
			skip: true
		},
		'수치': {
			text: '10',
			type: 'text',
			skip: true
		},
		'비교': {
			text: '이상',
			type: 'radio',
			sample: [{
					text: '이상',
					value: true
				},
				{
					text: '이하',
					value: false
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		if (e.constructor !== 'MouseEvent') {
			stop();
			return;
		}
		switch (this.방향) {
			case 'UP':
				{
					if (e.value.measurementY > 0) {
						if (Math.abs(e.value.measurementY) > this.수치 === this.비교) next();
						else stop();
					} else stop();
					break;
				}
			case 'DOWN':
				{
					if (e.value.measurementY < 0) {
						if (Math.abs(e.value.measurementY) > this.수치 === this.비교) next();
						else stop();
					} else stop();
					break;
				}
			case 'LEFT':
				{
					if (e.value.measurementX < 0) {
						if (Math.abs(e.value.measurementX) > this.수치 === this.비교) next();
						else stop();
					} else stop();
					break;
				}
			case 'RIGHT':
				{
					if (e.value.measurementX > 0) {
						if (Math.abs(e.value.measurementX) > this.수치 === this.비교) next();
						else stop();
					} else stop();
					break;
				}
			default:
				{
					stop();
					break;
				}
		}
	}
};