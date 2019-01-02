module.exports = {
	cid: '{a2a44be2-3329-4594-9ad0-d0a5caf97ab5}',
	version: '1.0.0',
	class: '변수/객체',
	title: '변수에 월드좌표값을 계산하여 담습니다',
	description: '{{스코프}}변수 {{변수명}}에 화면의 {{분자}}/{{분모}}위치의 {{좌표종류}}좌표값을 담습니다. <br>이 좌표값은 객체 {{카메라객체}}(으)로부터 ｚ축으로 {{거리}}만큼 떨어진 곳의 위치입니다.',
	variables: {
		'스코프': {
			text: '지역',
			type: 'radio',
			sample: [{
					text: '지역',
					value: 'LOCAL'
				},
				{
					text: '전역',
					value: 'GLOBAL'
				}
			],
			skip: true
		},
		'변수명': {
			text: '좌표',
			type: 'text',
			sample: 'variable_name',
			skip: true
		},
		'분자': {
			text: '2',
			type: 'text'
		},
		'분모': {
			text: '3',
			type: 'text',
			skip: true
		},
		'좌표종류': {
			text: 'ｘ',
			type: 'radio',
			sample: [{
					text: 'ｘ',
					value: 'left'
				},
				{
					text: 'ｙ',
					value: 'bottom'
				}
			],
			skip: true
		},
		'카메라객체': {
			text: '카메라',
			type: 'text',
			sample: 'character_name'
		},
		'거리': {
			text: '100',
			type: 'text',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const camera = lve(this.카메라객체).get(0);
		if (lve.instanceof(camera) === false) {
			stop();
			throw new Error(`'${this.카메라객체}' 객체는 존재하지 않습니다.`);
		}
		const canvas = lve.status.canvas;
		const computedStyle = getComputedStyle(canvas);
		const width = parseFloat(computedStyle.width);
		const height = parseFloat(computedStyle.height);
		// get lve World setting
		const scaleDistance = lve.data().initSetting.scaleDistance;
		let step = 1;
		switch (this.좌표종류) {
			case 'left':
				step = width / this.분모 / 2;
				break;
			case 'bottom':
				step = height / this.분모 / 2;
				break;
		}
		const offset = lve.calc({
			left: step * (this.분자 * 2 - 1),
			bottom: step * (this.분자 * 2 - 1),
			perspective: this.거리
		}, camera);
		const value = ~~offset[this.좌표종류];
		switch (this.스코프) {
			case 'LOCAL':
				this.session[this.변수명] = value;
				break;
			case 'GLOBAL':
				Eri.variable[this.변수명] = value;
				break;
		}
		next();
	}
};