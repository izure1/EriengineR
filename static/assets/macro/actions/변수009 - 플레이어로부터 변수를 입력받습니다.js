module.exports = {
	cid: '{E06514C2-3B72-49A0-AAEB-7998F35F4885}',
	version: '1.0.0',
	class: '변수',
	title: '플레이어로부터 변수를 입력받습니다',
	description: '플레이어에게 \'{{질문}}\' 질문을 하고, 대답을 {{스코프}}변수 {{변수명}}에 담습니다. 기본값은 {{기본값}} 입니다. <br>플레이어가 대답하기 전까지, 다음 행동은 보류됩니다.',
	variables: {
		'질문': {
			text: '당신의 이름을 입력해주세요',
			type: 'text'
		},
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
			text: '주인공이름',
			type: 'value',
			sample: 'variable_name'
		},
		'기본값': {
			text: '홍길동',
			type: 'value'
		}
	},
	fn: function (next, stop, e) {
		lve.pause();
		const value = prompt(this.질문, this.기본값);
		switch (this.스코프) {
			case 'LOCAL':
				this.session[this.변수명] = value;
				break;
			case 'GLOBAL':
				Eri.variable[this.변수명] = value;
				break;
		}
		lve.play();
		next();
	}
};