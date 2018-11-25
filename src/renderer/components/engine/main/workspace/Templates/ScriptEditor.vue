<template>
  <div class="template-scripteditor">
    <div>
      <h6>사건</h6>
      <p>아래 내용이 발생했을 때 시작합니다</p>
      <ul v-if="data.events.length">
        <li v-for="(event, index) in data.events" :key="index">
          <a href="#" @click="modifyItem(event)">{{ event.text }}</a>
        </li>
      </ul>
      <a href="#" @click="addItem(data, 'events')" v-if="!data.events.length">+</a>
    </div>
    <div>
      <h6>조건</h6>
      <p>위 사건이 발생했지만, 아래 내용이 충족되어야 작동합니다. 원한다면 아무것도 넣지 않아도 됩니다</p>
      <ul v-if="data.conditions.length">
        <li v-for="(condition, index) in data.conditions" @dblclick="modifyItem(condition)" :key="index">
          <a href="#" @click="modifyItem(condition)">{{ condition.text }}</a>
        </li>
      </ul>
      <a href="#" @click="addItem(data, 'conditions')">+</a>
    </div>
    <div>
      <h6>행동</h6>
      <p>모든 조건이 만족하면 순서대로 실행됩니다</p>
      <ul v-if="data.actions.length">
        <li v-for="(action, index) in data.actions" @dblclick="modifyItem(action)" :key="index">
          <a href="#" @click="modifyItem(action)">{{ action.text }}</a>
        </li>
      </ul>
      <a href="#" @click="addItem(data, 'actions')">+</a>
    </div>
  </div>
</template>

<script>
  import url from 'url'
  import path from 'path'

  import electron from 'electron'

  export default {
    props: ['data'],
    methods: {
      modifyItem(item) {
        console.log(item)
      },

      addItem(item, prop) {

        let collection
        let browser, parent, uri

        collection = item[prop]

        if (!collection) {
          electron.ipcRenderer.send('send-error', {
            user: 'ScriptEditor',
            content: `'${prop}' is not exits in item.`
          })
          return
        }


        parent = electron.remote.getCurrentWindow()

        uri = parent.getURL()
        uri = url.parse(uri)

        uri.hash = '#/script-editor'
        uri.slashes = true

        uri = url.format(uri)
        
        browser = new electron.remote.BrowserWindow({
          width: 800,
          height: 450,
          modal: true,
          parent
        })

        browser.setMenu(null)
        browser.loadURL(uri)

        browser.on('closed', () => {
          browser = null
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
  .template-scripteditor {
    height: 100%;
    padding: 30px;
    box-sizing: border-box;

    >div {
      margin: 0 0 50px;

      >h6 {
        font-size: xx-large;
        color: gray;
        margin: 10px 0;
      }

      >p {
        font-size: small;
        margin: 0 0 20px;
      }

      >ul {
        list-style: none;
        padding-left: 20px;

        >li {
          margin: 10px 0;

          >a {
            font-size: 13pt;
            color: gray;
            text-decoration: none;
            display: inline-block;

            &:hover {
              font-weight: bold;
              color: black;
            }
          }

          &::before {
            content: '';
            width: 10px;
            height: 10px;
            display: inline-block;
            background: url('~@/assets/img/ico_arrow_right.svg') no-repeat;
            background-size: cover;
            margin-right: 10px;
            opacity: 0.4;
          }
        }
      }

      >a {
        width: 30px;
        height: 30px;
        font-size: xx-large;
        font-weight: bold;
        color: white;
        text-align: center;
        line-height: 35px;
        text-decoration: none;
        display: block;
        background-color: rgba(0, 0, 0, .3);
        transition: transform 0.15s linear;

        &:hover {
          transform: rotateY(180deg);
        }
      }
    }
  }
</style>