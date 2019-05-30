

<!--
<form action="https://formspree.io/chad@sacred-traditions.org" method="POST" class="form-horizontal">
  <div class="form-group">
    <div class="col-sm-6">
      <label>Name</label>
      <input type="text" class="form-control form-bordered" name="name">
    </div>
    <div class="col-sm-6">
      <label>Email</label>
      <input type="email" class="form-control form-bordered" name="email">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-12">
      <label>Message</label>
      <textarea class="form-control form-bordered" rows="8" name="message"></textarea>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-12">
      <button type="submit">Submit</button>
    </div>
  </div>
</form> -->


  <form class="measure center" action="https://formspree.io/chad@sacred-traditions.org" method="POST">
    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">

      <div class="mt3 namefield">
        <label class="db fw6 lh-copy f6" for="name">Name</label>
        <input class="text pa2 input-reset ba bg-transparent w-100" type="" name="name">
      </div>

      <div class="mt3 email">
        <label class="db fw6 lh-copy f6" for="email">Email</label>
        <input class="text pa2 input-reset ba bg-transparent w-100" type="email" name="email">
      </div>

      <div class="mt3 message">
        <label class="db fw6 lh-copy f6" for="message" id="message-desc">Message</label>
        <textarea id="message" name="message" aria-describedby="message-desc" rows="10"
           class="text db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2" ></textarea>
      </div>

    </fieldset>

    <div class="submit">
      <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Send">
    </div>

  </form>





<style>

  /* input.text { padding: 8px;;} */

  input.text {overflow: hidden;}
  .namefield input {width: 95%}


</style>

