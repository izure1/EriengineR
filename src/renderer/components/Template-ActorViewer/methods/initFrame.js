import LveJS from 'lve'
import {
  EMPTY_TEXT
} from '../vars/name'


export default function () {

  if (this.lve) {
    this.lve.destroy()
  }

  this.lve = new LveJS
  this.lve.init({
    canvas: this.$el.querySelector('canvas')
  }).ready(() => {

    this.lve(EMPTY_TEXT).create({
      type: 'text',
      text: '이 폴더에 생성된 액터가 없습니다.\n<style fontsize="20">좌측의 디자인 탭에서 디자인을 선택하여 배치하세요.</style>'
    }).css({
      fontSize: 30,
      color: 'grey',
      textAlign: 'center',
      lineHeight: '200%'
    })

  })

  window.lve = this.lve

}