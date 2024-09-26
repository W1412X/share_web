<template>
  <main>
    <v-row style="height: 100%;">
      <!-- 侧边栏 -->
      <div style="display: flex;flex-direction: column;">
        <v-card style="width: 120px;">
          <v-navigation-drawer style="height: 100%;">
            <v-list>
              <v-list-item :title="'阅读目录'"></v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list density="compact" color="#9c0c13">
              <v-list-item variant="plain" text @click.prevent="scrollTo('#project-name')">
                  1. 项目名称
              </v-list-item>
              <v-list-item variant="plain" text @click.prevent="scrollTo('#project-intro')">
                  2. 项目简介
              </v-list-item>
              <v-list-item variant="plain" text @click.prevent="scrollTo('#background')">
                  3. 项目背景
              </v-list-item>
              <v-list-item variant="plain" text @click.prevent="scrollTo('#advantages')">
                  4. 特点优势
              </v-list-item>
              <v-list-item variant="plain" text @click.prevent="scrollTo('#audience')">
                  5. 目标受众
              </v-list-item>
              <v-list-item variant="plain" text @click.prevent="scrollTo('#features')">
                  6. 主要功能
              </v-list-item>
              <v-list-item variant="plain" text @click.prevent="scrollTo('#tech-stack')">
                  7. 技术栈
              </v-list-item>
              <v-list-item variant="plain" text @click.prevent="scrollTo('#feedback')">
                  8. 用户反馈
              </v-list-item>
              <v-list-item variant="plain" text @click.prevent="scrollTo('#future')">
                  9. 未来发展
              </v-list-item>
              <v-list-item variant="plain" text @click.prevent="scrollTo('#contribute')">
                  10. 参与贡献
              </v-list-item>
              <v-list-item variant="plain" text @click.prevent="scrollTo('#contact')">
                  11. 联系信息
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </div>
      <!-- 主要内容 -->
      <div style="width: 100%;display: flex;justify-content: center;">
        <v-card style="padding:20px;">
          <h2>ShareSdu 项目介绍</h2>

          <h2 id="project-name">1. 项目名称</h2>
          <p style="font-size: 18px">ShareSdu</p>

          <h2 id="project-intro">2. 项目简介</h2>
          <p style="font-size: 18px">网站建立旨在为同学们提供一个共享学习资源，了解大学生活以及一些关于大学学习的平台。</p>
          <h2 id="background">3. 项目背景</h2>
          <p style="font-size: 18px"><strong style="font-size: 20px">开发动机：</strong></p>
          <ul style="margin-left:20px">
            <li style="font-size: 20px">大学中关于某一门课程的课程资料，期末复习资料以及考试变化往往难以获取且现在网上信息良莠不齐。</li>
            <li style="font-size: 20px">一些有关本校的实际生活问题难以及时得到有效回答。</li>
            <li style="font-size: 20px">课程选择往往难以获取大部分学生对某一课程的评价。</li>
          </ul>

          <h2 id="advantages">4. 特点及优势</h2>
          <p style="font-size: 18px"><strong style="font-size: 20px">精准性与实时性：</strong>所有内容均由本校学生创作，可以确保信息的精准性与实时性。</p>
          <p style="font-size: 18px"><strong style="font-size: 20px">方便性：</strong>可以直接通过搜索获取想要的特定信息。</p>
          <p style="font-size: 18px"><strong style="font-size: 20px">用户纯净：</strong>用户均来自本校，可筛选非本校人员。</p>

          <h2 id="audience">5. 目标受众</h2>
          <p style="font-size: 18px">大学全体在校本科生，研究生。</p>

          <h2 id="features">6. 主要功能</h2>
          <ul style="margin-left: 20px; list-style: none; padding-left: 0;">
            <!-- 文章部分 -->
            <h3 style="margin-top: 20px; border-bottom: 2px solid #ccc; padding-bottom: 10px;">文章部分</h3>
            <li style="margin-bottom: 40px;">
              <v-carousel style="border: 2px solid rgba(0,116,248,0.5);" progress="secondary" show-arrows="hover">
                <v-carousel-item v-for="(image, i) in articleImages" :key="i">
                  <v-img :src="image.src" :alt="image.alt"
                    style="border: 1px solid #ddd; padding: 10px; background-color: #f9f9f9;"></v-img>
                </v-carousel-item>
              </v-carousel>
            </li>

            <!-- 问答部分 -->
            <h3 style="margin-top: 20px; border-bottom: 2px solid #ccc; padding-bottom: 10px;">问答部分</h3>
            <li style="margin-bottom: 40px;">
              <v-carousel style="border: 2px solid rgba(0,116,248,0.5);" progress="secondary" show-arrows="hover">
                <v-carousel-item v-for="(image, i) in questionImages" :key="i">
                  <v-img :src="image.src" :alt="image.alt"
                    style="border: 1px solid #ddd; padding: 10px; background-color: #f9f9f9;"></v-img>
                </v-carousel-item>
              </v-carousel>
            </li>

            <!-- 课程部分 -->
            <h3 style="margin-top: 20px; border-bottom: 2px solid #ccc; padding-bottom: 10px;">课程部分</h3>
            <li style="margin-bottom: 40px;">
              <v-carousel style="border: 2px solid rgba(0,116,248,0.5);" progress="secondary" show-arrows="hover">
                <v-carousel-item v-for="(image, i) in courseImages" :key="i">
                  <v-img :src="image.src" :alt="image.alt"
                    style="border: 1px solid #ddd; padding: 10px; background-color: #f9f9f9;"></v-img>
                </v-carousel-item>
              </v-carousel>
            </li>
            <!-- 用户部分 -->
            <h3 style="margin-top: 20px; border-bottom: 2px solid #ccc; padding-bottom: 10px;">用户部分</h3>
            <li style="margin-bottom: 40px;">
              <v-carousel style="border: 2px solid rgba(0,116,248,0.5);" progress="secondary" show-arrows="hover">
                <v-carousel-item v-for="(image, i) in userImages" :key="i">
                  <v-img :src="image.src" :alt="image.alt"
                    style="border: 1px solid #ddd; padding: 10px; background-color: #f9f9f9;"></v-img>
                </v-carousel-item>
              </v-carousel>
            </li>
          </ul>



          <h2 id="tech-stack">7. 技术栈</h2>
          <p style="font-size: 18px"><strong style="font-size: 20px">前端：</strong>HTML，Vue3，Javascript 等</p>
          <p style="font-size: 18px"><strong style="font-size: 20px">后端：</strong>Django 等</p>
          <p style="font-size: 18px"><strong style="font-size: 20px">数据库：</strong>MySQL 等</p>
          <p style="font-size: 18px"><strong style="font-size: 20px">其他工具：</strong>Git、Webpack、Docker , Pytorch 等</p>
          <h2 id="feedback">8. 用户反馈</h2>
          <ul style="margin-left:20px">
            <li style="font-size: 20px"><strong style="font-size: 20px">举报：</strong>可以针对某一个文章，问题，课程，评论提出举报或者反馈。</li>
            <li style="font-size: 20px"><strong style="font-size: 20px">建议：</strong>可以在网站中提交建议或者发送邮件到 <a href="mailto:admin@sharesdu.com"
                style="color:#0074e8;font-weight:bold;">admin@sharesdu.com</a>。</li>
            <li style="font-size: 20px"><strong style="font-size: 20px">数据：</strong>提供网站的相关数据如某一个文章浏览量，收藏量等。</li>
          </ul>

          <h2 id="future">9. 未来发展</h2>
          <ul style="margin-left:20px">
            <li style="font-size: 20px"><strong style="font-size: 20px">推广到更多高校，由各自高校的人员负责运营</strong></li>
            <li style="font-size: 20px"><strong style="font-size: 20px">其他添加功能如二手物品交易平台(本站仅提供平台服务，不从中获利也不参与交易过程)，帖子广场等</strong></li>
            <li style="font-size: 20px"><strong style="font-size: 20px">移动端原生APP开发，包括android，ios，harmony os</strong></li>
          </ul>
          <h2 id="contribute">10. 如何参与或贡献</h2>
          <h2>参与</h2>
          <ul style="margin-left:20px">
            <li style="font-size: 20px">
              开发： <a href="mailto:admin@sharesdu.com" style="color:#0074e8;font-weight:bold;">管理员邮箱</a>，项目
              <span style="color:#0074e8;font-weight: bold;" @click="openGithub">GITHUB</span>，网站QQ群 246680702
            </li>
            <li style="font-size: 20px">内容管理： <a href="mailto:admin@sharesdu.com" style="color:#0074e8;font-weight:bold;">管理员邮箱</a>，网站QQ群
              246680702</li>
          </ul>
          <h2>贡献</h2>
          <ul style="margin-left:20px">
            <li style="font-size: 20px">
              开发：项目
              <span style="color:#0074e8;font-weight: bold;" @click="openGithub">GITHUB</span>
            </li>
            <li style="font-size: 20px">内容：发布您的文章，或者回答问题，添加课程评价。</li>
          </ul>

          <h2 id="contact">11. 联系信息</h2>
          <p style="font-size: 18px">管理员邮箱<a href="mailto:admin@sharesdu.com" style="color:#0074e8;font-weight:bold;">admin@sharesdu.com</a>
          </p>
          <p style="font-size: 18px">QQ群 246680702</p>
        </v-card>
      </div>
    </v-row>
  </main>
</template>

<script>
export default {
  data() {
    return {
      articleImages: [
        { src: '/intro_imgs/article/article1.png', alt: '文章主页' },
        { src: '/intro_imgs/article/article2.png', alt: '文章页面' },
        { src: '/intro_imgs/article/article_editor.png', alt: '文章富文本编辑器' },
        { src: '/intro_imgs/article/article_editorbar.png', alt: '文章编辑栏' },
        { src: '/intro_imgs/article/article_markdown.png', alt: '文章Markdown编辑器' }
      ],
      questionImages: [
        { src: '/intro_imgs/question/question1.png', alt: '问题主页' },
        { src: '/intro_imgs/question/question2.png', alt: '问题页面' },
        { src: '/intro_imgs/question/question_editor.png', alt: '问题编辑器' }
      ],
      courseImages: [
        { src: '/intro_imgs/course/course1.png', alt: '课程主页' },
        { src: '/intro_imgs/course/course2.png', alt: '课程页面' },
        { src: '/intro_imgs/course/course_editor.png', alt: '课程编辑器' },
        { src: '/intro_imgs/course/course_evaluation.png', alt: '课程评价编辑' },
      ],
      userImages: [
        { src: '/intro_imgs/self/self_create.png', alt: '用户创作列表' },
        { src: '/intro_imgs/self/self_star.png', alt: '用户收藏列表' },
        { src: '/intro_imgs/self/self_follow.png', alt: '用户关注列表' },
        { src: '/intro_imgs/self/self_msg.png', alt: '用户消息列表' },
        { src: '/intro_imgs/self/self_self.png', alt: '用户信息编辑' },
        { src: '/intro_imgs/self/self_settings.png', alt: '用户设置' },
      ],
    }
  },
  methods: {
    openGithub() {
      window.open('https://github.com/ShareSdu', '_blank'); // 替换为您的 GitHub 项目链接
    },
    scrollTo(target) {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

h2 {
  margin-top: 20px;
}

a {
  color: #0074e8;
  font-weight: bold;
}

p {
  font-size: 20px
}

v-btn {
  color: #0074e8;
  font-weight: bold;
}
</style>
