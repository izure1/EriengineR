module.exports = {
	cid: '{0E8EA88B-470C-4A36-85A2-8AFCB4A6E7AA}',
	version: '1.0.0',
	class: '선택지',
	title: '선택지를 추가합니다',
	description: '화면에 선택지 {{선택지이름}}(를)을 추가합니다. 내용은 {{선택지내용}} 입니다. <br>여러개의 선택지를 보여주고 싶다면, 선택지 개수만큼 추가하십시오. <br><hr>이미지: {{선택지배경}} / 색상: {{선택지색상}} / 크기: {{선택지글씨크기}} / 글꼴: {{선택지글꼴}}',
	variables: {
		'선택지이름': {
			text: '1번 선택지',
			type: 'text',
			sample: 'select_name'
		},
		'선택지내용': {
			text: '따라가지 않는다',
			type: 'text'
		},
		'선택지배경': {
			text: 'ui-flag-bg.png',
			type: 'file',
			sample: 'image',
			skip: true
		},
		'선택지색상': {
			text: 'white',
			type: 'text',
			skip: true
		},
		'선택지글씨크기': {
			text: '30',
			type: 'text',
			skip: true
		},
		'선택지글꼴': {
			text: 'NanumBarunpen',
			type: 'text',
			sample: 'font_name',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const canvas = document.querySelector(Eri.game.canvas);

		Eri.select[this.선택지이름] = new Eri.select({
			text: this.선택지내용,
			color: this.선택지색상,
			fontSize: this.선택지글씨크기,
			fontFamily: this.선택지글꼴,
			bg: this.선택지배경
		});

		maxcount = Object.keys(Eri.select).length * 2;
		count = 1;
		offsetGap = canvas.height / maxcount;

		// remove all drawed flags
		lve('*').findClass('선택지').remove();
		// and re-draw selectors
		for (const flagname in Eri.select) {
			const flag = Eri.select[flagname];

			// create flag text
			lve(`__선택지내용_${flagname}__`)
				.create({
					type: 'text',
					scene: '(플레이)',
					text: flag.text
				})
				.addClass('선택지 인터페이스')
				.css({
					fontSize: flag.fontSize,
					fontFamily: flag.fontFamily,
					fontWeight: 'bold',
					color: flag.color
				})
				.css({
					position: 'fixed',
					textAlign: 'center',
					verticalAlign: 'middle',
					perspective: (1 / Number.MAX_SAFE_INTEGER),
					zIndex: 1
				})
				.css({
					width: canvas.width,
					left: 0,
					bottom: (maxcount - count) * offsetGap + 4
				})
				.css({
					pointerEvents: 'none'
				});

			// create flag background image
			lve(`__선택지배경_${flagname}__`)
				.create({
					type: 'image',
					scene: '(플레이)'
				})
				.addClass('선택지 인터페이스')
				.css({
					width: canvas.width / 10 * 6,
					height: 'auto'
				})
				.css({
					position: 'fixed',
					verticalAlign: 'middle',
					perspective: (1 / Number.MAX_SAFE_INTEGER)
				})
				.css({
					bottom: (maxcount - count) * offsetGap
				})
				.data({
					'__선택지이름': flagname
				})
				.load(Eri.process.fileManager.get(flag.bg), (e) => {
					lve(`__선택지배경_${flagname}__`).css({
						left: (item) => {
							return (canvas.width / 2) - (item.width()[0] / 2)
						}
					});
				});

			// update count
			count = count + 2;
		}

		next();
	}
};