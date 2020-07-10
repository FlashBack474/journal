<template>
  <div v-if="isAuthenticated" class="home">
    <div class="post-create">
      <div class='post-create__content'>
        <textarea v-model='postContent'></textarea>
      </div>
      <button @click="checkForm" class='post-create__action'>
        Добавить пост
      </button>
    </div>
    <div class="posts-list">
      <div v-for="post in posts" class='post'>
        <div class="post__title">
          <span class="post__title_user">
            {{post.name}}
          </span>
          <span class="post__title_date">
            {{post.created_time | dateFormat}}
          </span>

        </div>
        <div class="post__content">
          {{post.content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState } from "vuex";
  import Login from "components/login";

  export default {
    components: {
      Login,
    },
    name: "home",
    data() {
      return {
        postContent: '',
        tags: ['script', 'style'],
        posts: [],
      };
    },
    filters:{
      dateFormat(val){
          let date = val.getDate() + '.' + val.getMonth() + '.' + val.getFullYear();
          let time = val.getHours() + ':' + val.getMinutes();
          return date + ' ' + time;
        }
    },
    computed: {
      ...mapGetters(["isAuthenticated", "authStatus"]),
      ...mapState({ userName: state => state.user.profile.name }),
    },
    methods: {
      checkForm(){
        let tags = ['script', 'style'];
        tags.forEach( item => {
          let a = new RegExp('<' + item + '>', 'g')
          let b = new RegExp('</' + item + '>', 'g')
          this.postContent = this.postContent.replace(a, '')
          this.postContent = this.postContent.replace(b, '')
        });
        let post = {name: this.userName, content: this.postContent, created_time: new Date()}
        this.posts.push(post)
        this.postContent = ''

      }
    }

  };
</script>

<style lang="scss" scoped>
  .home {
    padding: 15px;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .post-create{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__content{
      width: 100%;
      textarea{
        width: 100%;
        height: 100px;
        padding: 15px;
      }
    }
    &__action{
      cursor: pointer;
      background: #ffffff;
      color: #000000;
      border: 1px solid #0095f6;
      font-size: 18px;
      padding: 10px;
      border-radius: 10px;
      &:hover{
        background: #0095f6;
        color: white;
      }
    }
  }
  .posts-list{
    padding: 15px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .post{
    border-bottom: 1px solid #0095f6;
    padding: 15px;
    &__title{
      display: flex;
      justify-content: space-between;
      &_user{
        font-size: 24px;
        color: #000000;
        padding: 10px 0;
      }
      &_date{
        font-size: 13px;
        color: #0095f6;
        padding: 10px 0;
      }
    }
    &__content{
      font-size: 18px;
    }
  }
</style>
