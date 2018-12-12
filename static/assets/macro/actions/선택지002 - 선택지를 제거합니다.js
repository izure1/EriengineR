module.exports = {
	cid: '{EFFBDA35-505D-474A-A22D-FCECD3486CB5}',
	version: '1.0.0',
	class: '선택지',
	title: '선택지를 제거합니다',
	description: '선택지 {{선택지이름}}(를)을 제거합니다.',
	variables: {
		'선택지이름': {
			text: '1번 선택지',
			type: 'value',
			sample: 'select_name'
		}
	},
	fn: function (next, stop, e) {
		const canvas = document.querySelector(Eri.game.canvas);

		delete Eri.select[this.선택지이름];

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
					width: canvas.width / 10 * 6
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