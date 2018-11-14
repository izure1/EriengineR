module.exports = {
	cid: '{86B0B6BE-FF89-43A9-86EC-CFDD247207BC}',
	version: '1.0.0',
	class: '객체/위치',
	title: '객체의 좌표 방식을 변경합니다',
	description: '객체 {{객체명}}의 좌표 표현 방식을 {{좌표방식}}로 변경합니다. <br>절대좌표는 왼쪽아래가 ｘ0, ｙ0이 되며 카메라와 상관없이 항상 고정됩니다. <br>월드좌표는 카메라의 거리에 따라 위치와 모습이 변동합니다.',
	variables: {
		'객체명': {
			text: '*',
			type: 'value',
			sample: 'character_name'
		},
		'좌표방식': {
			text: '절대좌표',
			type: 'radio',
			sample: [
				{
					text: '절대좌표',
					value: 'fixed'
				},
				{
					text: '월드좌표',
					value: 'absolute'
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		lve(this.객체명).css({ position: this.좌표방식 });
		next();
	}
};