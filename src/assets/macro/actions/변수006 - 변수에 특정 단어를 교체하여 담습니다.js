module.exports = {
	cid: '{11014e97-1411-43f6-b1bf-30cb1186c028}',
	version: '1.0.0',
	class: '변수',
	title: '변수에 특정 단어를 교체하여 담습니다',
	description: '{{스코프}}변수 {{변수명}}에 {{문자열}} 내용 중 {{패턴}}(이)란 단어를 {{치환값}}(으)로 {{방식}} 교체하여 담습니다. 교체할 단어의 대소문자를 {{대소문자}}.',
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
			text: '문자열_교체된내용',
			type: 'value',
			sample: 'variable_name',
			skip: true
		},
		'문자열': {
			text: '코카콜라는 정말 최고야!',
			type: 'text'
		},
		'패턴': {
			text: '코카콜라',
			type: 'value'
		},
		'치환값': {
			text: '펩시',
			type: 'value'
		},
		'방식': {
			text: '모두',
			type: 'radio',
			sample: [{
					text: '모두',
					value: 'gm'
				},
				{
					text: '하나만',
					value: ''
				}
			],
			skip: true
		},
		'대소문자': {
			text: '구분하지 않습니다',
			type: 'radio',
			sample: [{
					text: '구분하지 않습니다',
					value: 'i'
				},
				{
					text: '구분합니다',
					value: ''
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const flag = this.방식 + this.대소문자;
		const pattern = this.패턴 + '';
		const targetString = this.문자열 + '';
		const replaceString = this.치환값 + '';
		// 정규식을 생성하고, 치환합니다
		const regexp = new RegExp(pattern, flag);
		switch (this.스코프) {
			case 'LOCAL':
				this.session[this.변수명] = targetString.replace(regexp, replaceString);
				break;
			case 'GLOBAL':
				Eri.variable[this.변수명] = targetString.replace(regexp, replaceString);
				break;
		}
		next();
	}
};