module.exports = {
	cid: '{dc4b42a7-7d2c-4593-a37a-9607e21381b2}',
	version: '1.0.0',
	class: '변수/객체',
	title: '변수에 장소의 배경 객체명을 담습니다',
	description: '{{스코프}}변수 {{변수명}}에 {{장소}}의 배경 객체명을 담습니다. <br>배경 객체가 없을 경우 null 이 담깁니다.',
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
			text: '배경명',
			type: 'value',
			sample: 'variable_name',
			skip: true
		},
		'장소': {
			text: '(플레이)::집',
			type: 'value',
			sample: 'scene_name_play scene_name_system',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		let value;
		const target = lve('*').filter((item) => {
			return item.hasClass('배경') && item.attr('scene')[0] === this.장소;
		}).get(0);
		const isLveJSObject = lve.instanceof(target);
		// 해당되는 씬의 이름 받아오기
		if (isLveJSObject === false) value = null;
		else value = target.attr('name')[0];
		switch (this.스코프) {
			case 'LOCAL':
				this.session[this.변수명] = value;
				break;
			case 'GLOBAL':
				Eri.variable[this.변수명] = value;
				break;
		}
		if (isLveJSObject === false) stop();
		else next();
	}
};