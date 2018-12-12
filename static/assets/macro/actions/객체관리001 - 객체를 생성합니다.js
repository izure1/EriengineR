module.exports = {
	cid: '{CE362D64-F4AC-4634-A19C-ADF87456A341}',
	version: '1.0.0',
	class: '객체/관리',
	title: '객체를 생성합니다',
	description: '장소 {{장소명}}에 {{객체명}}(이)란 이름의 객체를 {{타입}} 유형으로 생성합니다. 이 객체는 {{객체종류}}입니다. <br><b>객체명은 반드시 유일무이해야만 합니다.</b>',
	variables: {
		'장소명': {
			text: '(플레이)::집',
			type: 'value',
			sample: 'scene_name_play'
		},
		'객체명': {
			text: '객체명',
			type: 'value',
			sample: 'character_name'
		},
		'객체종류': {
			text: '이미지',
			type: 'radio',
			sample: [{
					text: '이미지',
					value: 'image'
				},
				{
					text: '스프라이트',
					value: 'sprite'
				},
				{
					text: '카메라',
					value: 'camera'
				},
				{
					text: '문자열',
					value: 'text'
				},
				{
					text: '비디오',
					value: 'video'
				},
				{
					text: '사각형',
					value: 'square'
				},
				{
					text: '원형',
					value: 'circle'
				}
			],
			skip: true
		},
		'타입': {
			text: '캐릭터',
			type: 'radio',
			sample: [{
					text: '캐릭터',
					value: '캐릭터'
				},
				{
					text: '인터페이스',
					value: '인터페이스'
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const newObj = lve(this.객체명).create({
			type: this.객체종류,
			scene: this.장소명
		}).css({
			perspective: 100
		}).addClass(this.타입).data({
			__opacity: 1
		});
		// 인터페이스 타입일 경우 perspective: 1
		if (this.타입 === '인터페이스') newObj.css({
			perspective: 1,
			position: 'fixed'
		});
		// 카메라 객체일 경우 perspective: 0
		if (this.객체종류 === 'camera') newObj.css({
			perspective: 0
		});
		next();
	}
};