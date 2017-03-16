<template>
  <div class="col-12 intro bg-faded">
    <h2>Before You Start...</h2>
    <p>The issue list is reserved exclusively for bug reports
      and feature requests. If you open an issue that does not conform to the
      requirements, <strong>it will be closed immediately</strong>.
      <a href="#" @click="show = true">Why are we so strict about this?</a></p>
    <p>For simple questions, please use the following resources:</p>
    <ul>
      <li>Read the <a tabindex="-1" target="_blank" href="https://vuejs.org/guide/">docs</a>
      </li>
      <li>Watch
        <a tabindex="-1" target="_blank"
          href="https://laracasts.com/series/learn-vue-2-step-by-step">video tutorials</a>
      </li>
      <li>Ask in the <a tabindex="-1" target="_blank" href="https://gitter.im/vuejs/vue">Gitter chat room</a>
      </li>
      <li>Ask on the <a tabindex="-1" target="_blank" href="https://forum.vuejs.org/">forums</a>
      </li>
      <li>Look for/ask questions on
        <a tabindex="-1" target="_blank" href="https://stackoverflow.com/questions/ask?tags=vue.js">Stack Overflow</a>
      </li>
    </ul>
    <p>Also try to search for your issue - it may have already been answered or
      even fixed in the development branch. However, if you find that an old,
      closed issue still persists in the latest version, you should open a new
      issue using the form below instead of commenting on the old issue.</p>

    <modal :open="show" @close="show = false">
      <div class="card">
        <div class="card-header">
          <h4>The reason behind our strict issue policy</h4>
        </div>
        <div class="card-block">
          <p>
          Maintaining open source projects, especially popular ones, is
          <a href="https://nolanlawson.com/2017/03/05/what-it-feels-like-to-be-an-open-source-maintainer/" target="_blank">hard work</a>. As Vue's user base has grown, we are getting more and more usage questions, bug reports, feature requests and pull requests every single day.</p>
          <p>As a free and open source project, Vue also has limited maintainer bandwidth. That means the only way to ensure the project's sustainability is to:</p>
          <ol>
            <li>Prioritize more concrete work (bug fixes and new feautres);</li>
            <li>Improve issue triaging efficiency.</li>
          </ol>
          <p>
            For (1), we have decided to use the GitHub issue lists exclusively for work that has well-defined, actionable goals. Questions and open ended discussions should be posted to mediums that are better suited for them.
          </p>
          <p>For (2), we have found that issues that do not provide proper information upfront usually results in terribly inefficient back-and-forth communication just to extract the basic information needed for actual triaging. This is exactly why we have created this app: to ensure every issue is created with the necessary information, and to save time on both sides.</p>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false
  })
}
</script>

<style lang="scss">
.intro {
  font-size: .9em;
  padding: 1.5em 2em;
  border-radius: 4px;
  margin: 0 15px 15px;
  h2 {
    font-size: 1.6em;
  }
}
</style>
