export default function () {

  return {
    error: {
      title: '문제',
      useInput: false,
      count: 0,
      contents: []
    },
    output: {
      title: '출력',
      useInput: false,
      count: 0,
      contents: []
    },
    terminal: {
      title: '터미널',
      useInput: true,
      count: 0,
      contents: []
    }
  }

}