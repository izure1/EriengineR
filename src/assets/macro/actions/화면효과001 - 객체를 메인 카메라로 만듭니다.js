module.exports = {
	cid: '{055AC505-0BAC-4ADC-A4FC-24873F343637}',
	version: '1.0.0',
	class: '화면/효과',
	title: '객체를 메인카메라로 만듭니다',
	description: '객체 {{객체명}}(를)을 {{시간}}초에 걸쳐 메인카메라로 만듭니다. <br>앞으로 플레이어는 이 객체의 시점에서 월드를 볼 것입니다.',
	variables: {
		'객체명': {
			text: '객체명',
			type: 'value',
			sample: 'character_name'
		},
		'시간': {
			text: '0.5',
			type: 'value',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		lve('*').removeClass('주인공');
		lve(this.객체명).addClass('주인공');
		Eri.setCamera(this.객체명, this.시간 * 1000);
		next();
	}
};