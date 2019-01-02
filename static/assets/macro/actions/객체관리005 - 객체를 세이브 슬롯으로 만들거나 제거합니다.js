module.exports = {
	cid: '{26AAD63D-1E57-4C7E-A31A-EA704C5216DD}',
	version: '1.0.0',
	class: '객체/관리',
	title: '객체를 세이브 썸네일 슬롯으로 만들거나 제거합니다',
	description: '객체 {{객체명}}(를)을 {{슬롯번호}}번 세이브 썸네일 슬롯으로 {{방식}}. <br>여러개의 세이브 슬롯을 보여주고 싶다면, 개수만큼 추가하십시오.',
	variables: {
		'객체명': {
			text: '세이브슬롯_1',
			type: 'text',
			sample: 'character_name'
		},
		'슬롯번호': {
			text: '1',
			type: 'text'
		},
		'방식': {
			text: '만듭니다',
			type: 'radio',
			sample: [
				{
					text: '만듭니다',
					value: 1
				},
				{
					text: '만들지 않습니다',
					value: 2
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		if (isNaN(this.슬롯번호)) {
			stop();
			Eri.process.showErrMsg('Save thumbnail slot error', 'Slot number argument is must be type of number variable.');
		}
		switch (this.방식) {
			case 1: {
				Eri.game.env.system.saveslot[this.슬롯번호] = this.객체명;
				break;
			}
			case 2: {
				delete Eri.game.env.system.saveslot[this.슬롯번호];
				break;
			}
		}

		const setSaveSlot = () => {
			const savename = `${Eri.game.id}_save_${this.슬롯번호}`;
			const rawSavedata = localStorage.getItem(savename);
			let thumbnail = './image/ui-save-bg.png';
			if (rawSavedata) {
				const savedata = JSON.parse(rawSavedata);
				thumbnail = savedata.thumb || thumbnail;
			}
			lve(this.객체명).ready((item) => {
				item.css({ width: item.width()[0], height: item.height()[0] });
				item.attr({ src: thumbnail });
			});
		};

		Eri.process.on('gamesave', setSaveSlot);
		setSaveSlot();
		next();
	}
};