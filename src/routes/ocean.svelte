<svelte:head>
  <title>𝐎𝐜𝐞𝐚𝐧 𝟐.𝟎 𝐈𝐧𝐭𝐞𝐫𝐟𝐚𝐢𝐭𝐡 𝐑𝐞𝐚𝐝𝐞𝐫 ㊪ sacred-traditions.org </title>
   <meta data-key="description" name="description" content="𝐎𝐜𝐞𝐚𝐧 𝟐.𝟎 𝐈𝐧𝐭𝐞𝐫𝐟𝐚𝐢𝐭𝐡 𝐑𝐞𝐚𝐝𝐞𝐫 is a custom ebook reader designed for exploration and study of the sacred literature of the world’s religious traditions. It provides a simple cross-platform reading experience with an immersive audio-integrated reading experience and usful study and research tools."/>
   <meta name="keywords" content="{ocean_keywords}" />
   <meta name="theme-color" content="#ffffff"/>
   <meta name="msapplication-TileColor" content="#2d89ef"/>
   <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Oswald:700" defer="true"/> -->
</svelte:head>


<section class="promo">

  <div class="container">
    <div class="logo">
      <img src="/ocean_assets/images/ocean-logo2.svg" alt="Ocean 2.0 Logo" width="100" class="logo_icon" />
      <div>Ocean 2.0 Interfaith Reader
        <span>Immersive Library of the World’s Sacred Literature</span>
      </div>
    </div>
  </div>

  <div class="promo-content container">
    <div class="wrapper-text">
      <h2>
        <span class="text-header">Read</span>
        <span class="text-header">Listen</span>
        <span class="text-header">Search</span>
        <span class="text-header">Share</span>
      </h2>
    <div class="text-content">Ocean is a custom ebook reader designed for exploration and study of the
      sacred literature of the world’s religious traditions. It provides a simple cross-platform reading experience with an immersive audio-integrated reading experience and usful study and research tools.
    </div>

    <div class="download-links">
      {#if OS.android}
      <a class="download-button" href="{artifacts.android}">
        <img src="/ocean_assets/images/icon_android_button.svg" alt="android download" width="30" /> App for
        <span> Android</span>
      </a>
      {:else if OS.ios}
      <a class="download-button" href="{artifacts.ios}">
        <img src="/ocean_assets/images/icon_ios_button.svg" alt="ios link" width="30" /> App for
        <span> iOS</span>
      </a>
      {:else if OS.mac}
      <a class="download-button" href="{artifacts.mac}">
        <img src="/ocean_assets/images/icon_subtract_button.svg" alt="mac download" width="30" /> Installer for
        <span> Mac</span>
      </a>
      {:else if OS.linux}
      <a class="download-button" href="{artifacts.linux}">
        <img src="/ocean_assets/images/icon_linux_button2.svg" alt="linux download" width="30" /> Installer for
        <span> Linux</span>
      </a>
      {:else if OS.windows}
      <a v-if="OS.windows" class="download-button" href="{artifacts.windows}">
        <img src="/ocean_assets/images/icon_windows_button.svg" alt="windows download" width="30" /> Installer for
        <span> Windows</span>
      </a>
      {/if}

      <div class="links-images">
          {#if !OS.linux} <a href={artifacts.linux}><img src="/ocean_assets/images/icon_linux2.svg" width="30"  alt="Linux icon"/></a> {/if}
          {#if !OS.android} <a href={artifacts.android}><img src="/ocean_assets/images/icon_android.svg" width="30" alt="Android icon"/></a> {/if}
          {#if !OS.mac} <a href={artifacts.mac}><img src="/ocean_assets/images/icon_subtract.svg" width="30"  alt="Mac icon"/></a> {/if}
          {#if !OS.windows} <a href={artifacts.windows}><img src="/ocean_assets/images/icon_windows.svg" width="30"  alt="Windows icon"/></a> {/if}
          {#if !OS.ios} <a href={artifacts.ios}><img src="/ocean_assets/images/icon_ios.svg" width="30"  alt="iOS icon" class="applelogo"/></a> {/if}
      </div>

    </div>
  </div>

  <div class="img-promo">
    <img src="/ocean_assets/images/iMac-ocean.png" width="962" class="big-img first" alt="App  Large"/>
    <img src="/ocean_assets/images/promo_portrait.webp" width="262"  class="md-img" alt="App  medium" style="float:right"/>
    <img src="/ocean_assets/images/promo_sm.webp" width="360" class="sm-img" alt="App small"/>
  </div>

  </div>
</section>

<section class="about">
  <div class="container">
    <h1>What is Ocean Reader</h1>
    <div class="about-content">
      <div class="icons-block">
        <div class="icons icon-read">
            <img src="/ocean_assets/images/icon_open_book.svg" alt="icon read"/>
        </div>
        <h3>Read</h3>
        <span>The Ocean library contains a vast collection of the world’s great religious classics.</span>

      </div>
      <div class="icons-block">
        <div class="icons icon-read">
            <img src="/ocean_assets/images/icon_headphones.svg" alt="icon read"/>
        </div>
        <h3>Listen</h3>
        <span>Many books are word-aligned with an audio reading to provide an enjoyable “read-along” experience.</span>

      </div>
      <div class="icons-block">
        <div class="icons icon-read">
            <img src="/ocean_assets/images/icon_search.svg" alt="icon search"/>
        </div>
        <h3>Search</h3>
        <span>Full text search across thousands of books, articles and website resources.</span>
      </div>
    </div>
  </div>
</section>

<section class="content read">
  <div class="container container-flex">
    <div class="wrapper-text">
      <h2>Read &amp; Listen</h2>
      <span>Almost every book has integrated audio so you can read, listen or both. Reading progress and position are mapped to
        your navigation bar and synced across all your devices.</span>
    </div>

    <div class="images-wrapper">
      <img src="/ocean_assets/images/1.webp" width="462" class="big-img" alt="ocean sshot"/>
      <img src="/ocean_assets/images/1_sm.webp" width="462" class="sm-img" alt="ocean sshot"/>
    </div>

  </div>
</section>

<section class="content search">
  <div class="container container-flex">
    <div class="wrapper-text">
      <h2>Powerful Full-text Search</h2>
      <span>When online, Ocean can return search results from thousands of books, papers, articles and websites. When offline,
        you can still search, but only in non copyright-encumbered library books.</span>
    </div>
    <div class="images-wrapper">
      <img src="/ocean_assets/images/2.webp" width="462" class="big-img" alt="ocean sshot"/>
      <img src="/ocean_assets/images/2_sm.webp" width="462" class="sm-img" alt="ocean sshot"/>
    </div>
  </div>
</section>

<section class="content notes">
    <div class="container container-flex">
      <div class="wrapper-text">
          <h2>Organize Tags and Notes</h2>
          <span>Add your own notes, filter and organize notes for presentations or study. (Soon you will be able to export
            and share your notes with others.)
          </span>
      </div>
      <div class="images-wrapper">
          <img src="/ocean_assets/images/3.webp" width="462" class="big-img" alt="ocean sshot"/>
          <img src="/ocean_assets/images/3_sm.webp" width="462" class="sm-img" alt="ocean sshot"/>
      </div>
    </div>
</section>

<section class="content compilations">
  <div class="container container-flex">
    <div class="wrapper-text">
        <h2>Build and Share Compilations</h2>
        <span>Extract quotes (with audio) into subject compilations for later study. Read, listen or share your compilations with anyone.
        </span>
    </div>

    <div class="images-wrapper">
        <img src="/ocean_assets/images/4.webp" width="462" class="big-img" alt="ocean sshot"/>
        <img src="/ocean_assets/images/4_sm.webp" width="462" class="sm-img" alt="ocean sshot"/>
    </div>

  </div>
</section>

<section class="footer">
  Ocean 2.0 Interfaith Reader &mdash; <a href="/" class="lightlink">Sacred-traditions.org</a>
</section>




<script>
  import { onMount } from 'svelte';

  let OS = {};
  let ocean_keywords = "interfaith,christian,islam,judaism,bible search,qur'an search,Zoroastrianism,Hinduism,Sikh"
  let artifacts = {
    //windows:  'https://ocean-download.dev2.us/win32_setup.exe',
    windows:  'https://portal-artifacts-production.dev2.us/ffa-ocean/ocean/ocean-electron-win/Ocean2.0-reader-win.x32.exe',
    //mac:      'https://ocean-download.dev2.us/mac_setup.pkg',
    mac:      'https://portal-artifacts-production.dev2.us/ffa-ocean/ocean/ocean-electron-mac/Ocean2.0-reader-mac.x64.pkg',
    //linux:    'https://ocean-download.dev2.us/linux_setup.AppImage',
    linux:    'https://portal-artifacts-production.dev2.us/ffa-ocean/ocean/ocean-electron-linux/Ocean2.0-reader-linux.x64.AppImage',
    android:  'https://play.google.com/store/apps/details?id=org.ocean.reader',
    ios:      'https://itunes.apple.com/us/app/ocean-reader/id1287394047?mt=8&app=itunes&ign-mpt=uo%3D4'
  }

  onMount(async () => {
    let os = getOS()
    OS[os] = true;
  });


  function getOS() {
    var os = null;
    var exprs = {
      ios    : [/\biPad\b/, /\biPhone\b/, /\biPod\b/],
      android: [/\bAndroid\b/],
      windows: [/\bWindows|(Win\d\d)\b/, /\bWin 9x\b/],
      mac    : [/\bMac OS\b/],
      linux  : [/\bLinux\b/]
    }
    Object.keys(exprs).every(function (key) {
      exprs[key].forEach(function (expr) {
        if (expr.test(window.navigator.userAgent)) {
          os = key;
        }
      })
      return !os;
    })
    return os
  }


  //  export default {
  //     components: { RemoveChromeLayout },
  //     data: function () {
  //        return {
  //           link: '',
  //           OS: {},
  //           artifacts: {
  //              windows:  'https://ocean-download.dev2.us/win32_setup.exe',
  //              mac:      'https://ocean-download.dev2.us/mac_setup.pkg',
  //              linux:    'https://ocean-download.dev2.us/linux_setup.deb',
  //              android:  'https://play.google.com/store/apps/details?id=org.ocean.reader',
  //              ios:      'https://itunes.apple.com/us/app/ocean-reader/id1287394047?mt=8&app=itunes&ign-mpt=uo%3D4'
  //           }
  //        }
  //     },
  //     mounted: function () {
  //        var os = this.getOS();
  //        this.link = this.artifacts[os];
  //        this.$set(this.OS, os, true);
  //     },
  //     methods: {
  //        getOS: function () {
  //           var os = null;
  //           var exprs = {
  //              ios    : [/\biPad\b/, /\biPhone\b/, /\biPod\b/],
  //              android: [/\bAndroid\b/],
  //              windows: [/\bWindows|(Win\d\d)\b/, /\bWin 9x\b/],
  //              mac    : [/\bMac OS\b/],
  //              linux  : [/\bLinux\b/]
  //           };
  //           Object.keys(exprs).every(function (key) {
  //              exprs[key].forEach(function (expr) {
  //                 if (expr.test(window.navigator.userAgent)) {
  //                    os = key;
  //                 }
  //              });
  //              return !os;
  //           });
  //           return os
  //        }
  //     },
  //     head () {
  //        // let post = this.post
  //        return {
  //           title: "Ocean 2.0 Interfaith Reader", // not working
  //           meta: [
  //              { charset: "utf-8" },
  //              { name: "viewport", content: "width=device-width, initial-scale=1" },
  //              { name: "keywords", content: "" },
  //              { name: "description", content: "Sacred Traditions Interfaith Project -- ocean page" },
  //              { name: "viewport", content: "width=device-width, initial-scale=1.0" },
  //              { name: "msapplication-TileColor", content: "#00aba9" },
  //              { name: "theme-color", content: "#ffffff" },
  //              { name: "language", content: "en", 'hid':'language' }, // kosher?
  //              { name: 'title', content: "Ocean 2.0 Interfaith Reader" },
  //           ],
  //           link: [
  //              {"rel": "apple-touch-icon", "sizes": "180x180", "href": "/ocean_assets/favicon/apple-touch-icon.png"},
  //              {"rel": "icon", "type": "image/png", "sizes": "32x32", "href": "/ocean_assets/favicon/favicon-32x32.png"},
  //              {"rel": "icon", "type": "image/png", "sizes": "16x16", "href": "/ocean_assets/favicon/favicon-16x16.png"},
  //              {"rel": "manifest", "href": "/ocean_assets/favicon/site.webmanifest"},
  //              {"rel": "mask-icon", "href": "/ocean_assets/favicon/safari-pinned-tab.svg", "color": "#5bbad5"},
  //              {"rel": "msapplication-TileColor", "content": "#00aba9"},
  //              {"rel": "theme-color", "content": "#ffffff"}
  //           ]
  //        }
  //     },
  //  };


</script>




<style>
* {
   padding: 0;
   margin: 0;
   -webkit-box-sizing: border-box;
   -moz-box-sizing: border-box;
   -ms-box-sizing: border-box;
   box-sizing: border-box;
   font-family: 'Raleway', sans-serif;
 }
 img.big-img.first {  max-width:200%; }

 /*  large device */
 h1,
 h2 {
   font-size: 56px;
   line-height: 1.5em;
   font-weight: 400;
   text-align: center;
   text-align: left;
   text-transform: uppercase;
 }
 /*  medium size */
 @media (min-width: 575.98px) and (max-width: 1024px) {
   h1, h2 {
     font-size: 46px;
   }
 }
 /*  small width */
@media (max-width: 575.98px) {
   h1,
   h2 {
     font-size: 34px;
   }
 }

/* sections:
   .about .read .search .notes .compilations
*/

 section {
   height: 750px;
   overflow: hidden;
   position: relative;
   padding-bottom: 1em;
 }

 section.read  {
   height: 531px;
 }
 section.search  {
   height: 600px;
 }
 section.notes {
   height: 531px;
 }
 section.compilations {
   height: 531px;
 }



 @media (max-width: 575.98px) {
   section {
     padding-top: 2em;
     height: auto !important;
   }
   section.promo {
     padding-top:0;
   }
 }
 section:nth-child(2n-1) {
   background-color: #1d4583;
   color: #ffffff;
 }
 section:not(:first-child) {
   /* padding-top: 1em; */
 }
 section:nth-child(2n-1) .images-wrapper {
   right: 68%;
   background: -webkit-linear-gradient(to right, #3966aa, #1d4583);
   background: linear-gradient(to right, #3966aa, #1d4583);
 }
 @media (min-width: 575.98px) and (max-width: 1024px) {
   section:nth-child(2n-1) .images-wrapper {
     right: 50%;
     left:0;
   }
 }
 section:nth-child(2n-1) .container-flex {
   -webkit-justify-content: flex-end;
   -moz-justify-content: flex-end;
   -ms-justify-content: flex-end;
   justify-content: flex-end;
 }
 @media (max-width: 575.98px) {
   section:nth-child(2n-1) .container-flex {
     -webkit-align-items: flex-start;
     -moz-align-items: flex-start;
     -ms-align-items: flex-start;
     align-items: flex-start;
   }
 }
 section:nth-child(2n) {
   color: #909da4;
 }
 section:nth-child(2n) .images-wrapper {
   left: 68%;
   /* background: -webkit-linear-gradient(to left, #ecf7fd, #ffffff); */
   /* background: linear-gradient(to left, #ecf7fd, #ffffff); */
 }
 @media (min-width: 575.98px) and (max-width: 1024px) {
   section:nth-child(2n) .images-wrapper {
     left: 50%;
   }
 }
 @media (max-width: 575.98px) {
   section:nth-child(2n) .images-wrapper {
     background: -webkit-linear-gradient(to left, #ffffff, #ecf7fd);
     background: linear-gradient(to left, #ffffff, #ecf7fd);
   }
 }
 section:nth-child(2n) .container-flex {
   -webkit-justify-content: flex-start;
   -moz-justify-content: flex-start;
   -ms-justify-content: flex-start;
   justify-content: flex-start;
 }
 @media (max-width: 575.98px) {
   section:nth-child(2n) .container-flex {
     -webkit-align-items: flex-start;
     -moz-align-items: flex-start;
     -ms-align-items: flex-start;
     align-items: flex-start;
   }
 }
 section:nth-child(2n) h1,
 section:nth-child(2n) h2 {
   color: #1d4583;
 }
 section:nth-child(3) .images-wrapper {
   /* right: 62%; */
 }
 @media (min-width: 575.98px) and (max-width: 1024px) {
   section:nth-child(3) .images-wrapper {
     right: 50%;

   }
 }
 section .images-wrapper {
   top: 50%;
   margin-top: -265px;
   height: 530px;
   position: absolute;
   padding-top: 25px;
 }
 @media (max-width: 575.98px) {
   section .images-wrapper {
     position: static;
     height: 320px;
     margin-top: 80px;
   }
 }
 .container-flex {
   display: -webkit-flex;
   display: -moz-flex;
   display: -ms-flexbox;
   display: -ms-flex;
   display: flex;
   -webkit-align-items: center;
   -moz-align-items: center;
   -ms-align-items: center;
   align-items: center;
   height: 100%;
 }
 .container-flex h2 {
   margin-bottom: 35px;
 }
 @media (max-width: 575.98px) {
   .container-flex {
     -webkit-flex-direction: column;
     -moz-flex-direction: column;
     -ms-flex-direction: column;
     flex-direction: column;
   }
   .container-flex h2 {
     font-size: 36px;
   }
 }
 .promo {
   background-image: url('/ocean_assets/images/logo_bg.svg');
   background-position: center;
   background-repeat: no-repeat;
   background-size: 100% 100%;
   height: auto;
 }
 @media (max-width: 575.98px) {
   .promo {
     background-image: none;
   }
 }
 @media (min-width: 575.98px) and (max-width: 1024px) {
   .promo {
     background-size: auto 100%;
   }
 }
 .logo {
   font-size: 34px;
   display: -webkit-flex;
   display: -moz-flex;
   display: -ms-flexbox;
   display: -ms-flex;
   display: flex;
   -webkit-justify-content: flex-start;
   -moz-justify-content: flex-start;
   -ms-justify-content: flex-start;
   justify-content: flex-start;
   -webkit-align-items: center;
   -moz-align-items: center;
   -ms-align-items: center;
   align-items: center;
   margin-bottom: 60px;
   font-weight: 600;
   padding: 15px;
   padding-left: 20px;
   padding-top: 30px;
 }
 .logo img {
   filter: drop-shadow(0px 0px 5px rgba(256, 256, 256, .5));
   /* position: absolute; top:20px; left: 10px; */
   float: left; padding-right: 20px;
  }
 *, img, h1, h2 { transition: all .5s linear; }
 @media (max-width: 575.98px) {
   .logo {
     font-size: 25px;
     margin-bottom: 20px; margin-top:0;
     padding-left: 100px; padding-top: 20px;
   }
   .logo img {
    position: absolute; top:15px; left: 10px; width: 80px;
  }
 }
 /* @media (min-width: 575.98px) and (max-width: 1024px) {
   .logo {
     margin-bottom: 30px;
   }
 } */

 .logo span {
   color: #9bb7e4;
   font-size: 16px;
   font-weight: 500;
   display: block;
 }
 /* .logo_bg {
   width: 100%;
   height: auto;
   position: absolute;
   left: 0;
   bottom: 0;
 } */
 .promo-content {
   display: -webkit-flex;
   display: -moz-flex;
   display: -ms-flexbox;
   display: -ms-flex;
   display: flex;
 }
 @media (max-width: 575.98px) {
   .promo-content {
     -webkit-flex-direction: column;
     -moz-flex-direction: column;
     -ms-flex-direction: column;
     flex-direction: column;
   }
 }
 @media (min-width: 575.98px) and (max-width: 1024px) {
   .promo-content h2 {
     /* font-size: 90px; */
   }
 }
 .img-promo {
   position: absolute;
   left: 60%;
   bottom: 0;
 }
 @media (min-width: 575.98px) and (max-width: 1024px) {
   .img-promo {
     left: 55%;
   }
   section.promo .img-promo { position: absolute; right:0; }
 }
 @media (min-width: 575.98px) and (max-width: 768px) {
   .img-promo {
     left: 65%;
   }
 }
 @media (max-width: 575.98px) {
   .img-promo {
     position: static;
     -webkit-align-self: flex-end;
     -moz-align-self: flex-end;
     -ms-align-self: flex-end;
     align-self: flex-end;
   }
 }
 .container {
   max-width: 1030px;
   margin: 0 auto;
 }
 .wrapper-text {
   max-width: 50%;
   padding: 0 15px;
   font-size: 20px;
   line-height: 32px;
 }
 @media (max-width: 575.98px) {
   .wrapper-text {
     max-width: inherit;
   }
 }
 @media (min-width: 575.98px) and (max-width: 1024px) {
   .wrapper-text {
     padding: 0 30px;
   }
 }
 .wrapper-text .text-header {
   display: block;
   font-size: 95%;
 }
 .text-content {
   margin-top: 30px;
 }
 .download-links {
   display: -webkit-flex;
   display: -moz-flex;
   display: -ms-flexbox;
   display: -ms-flex;
   display: flex;
   margin-top: 50px;
 }
 @media (max-width: 575.98px), (min-width: 575.98px) and (max-width: 1024px) {
   .download-links {
     -webkit-flex-direction: column;
     -moz-flex-direction: column;
     -ms-flex-direction: column;
     flex-direction: column;
   }
 }
 .download-button {
   background-color: #f6f6f6;
   border-radius: 4px;
   line-height: 54px;
   padding: 0 15px;
   font-size: 18px;
   color: #1d4583;
   border: none;
   outline: none;
   box-shadow: none;
   -webkit-flex-grow: 1;
   -moz-flex-grow: 1;
   -ms-flex-grow: 1;
   flex-grow: 1;
   text-decoration: none;
   display: block;
   text-align: center;
 }
 .download-button img {
   max-width: 30px;
   max-height: 30px;
   margin-right: 18px;
   display: inline-block;
   position: relative;
   top: 0;
 }
 .download-button span {
   font-weight: 600;
   padding-left: 5px;
   display: inline-block;
 }
 .links-images {
   border-left: 1px solid #ffffff;
   height: 54px;
   display: -webkit-flex;
   display: -moz-flex;
   display: -ms-flexbox;
   display: -ms-flex;
   display: flex;
   -webkit-justify-content: space-around;
   -moz-justify-content: space-around;
   -ms-justify-content: space-around;
   justify-content: space-around;
   -webkit-align-items: center;
   -moz-align-items: center;
   -ms-align-items: center;
   align-items: center;
   margin-left: 25px;
 }
 .links-images a {
   display: block;
   margin-left: 35px;
 }
 @media (max-width: 575.98px), (min-width: 575.98px) and (max-width: 1024px) {
   .links-images {
     width: 100%;
     border: none;
     margin-top: 25px;
     margin-left: 0;
   }
   .links-images a {
     margin-left: 0;
   }
 }
 .about {
   padding: 40px 0;
   height: auto;
 }
 .about .container {
   padding: 0 15px;
 }
 .about h1 {
   font-size: 52px;
   text-transform: none;
   text-align: center;
 }
 @media (min-width: 575.98px) and (max-width: 768px) {
   .about h1 {
     font-size: 36px;
   }
 }
 @media (max-width: 575.98px) {
   .about h1 {
     font-size: 32px;
   }
 }
 .about-content {
   display: -webkit-flex;
   display: -moz-flex;
   display: -ms-flexbox;
   display: -ms-flex;
   display: flex;
   -webkit-justify-content: space-around;
   -moz-justify-content: space-around;
   -ms-justify-content: space-around;
   justify-content: space-around;
   margin-top: 80px;
 }
 .about-content h3 {
   color: #1d4583;
   font-size: 25px;
   font-weight: 400;
   margin-bottom: 20px;
 }
 @media (max-width: 575.98px) {
   .about-content {
     -webkit-flex-direction: column;
     -moz-flex-direction: column;
     -ms-flex-direction: column;
     flex-direction: column;
   }
 }
 .icons {
   width: 140px;
   height: 140px;
   border-radius: 140px;
   margin: 0 auto;
   display: -webkit-flex;
   display: -moz-flex;
   display: -ms-flexbox;
   display: -ms-flex;
   display: flex;
   -webkit-justify-content: center;
   -moz-justify-content: center;
   -ms-justify-content: center;
   justify-content: center;
   -webkit-align-items: center;
   -moz-align-items: center;
   -ms-align-items: center;
   align-items: center;
   background-color: #e1f1f9;
   margin-bottom: 20px;
 }
 .icons-block {
   font-size: 17px;
   line-height: 24px;
   color: #909da4;
   text-align: center;
   padding: 0 20px;
 }
 @media (max-width: 575.98px) {
   .icons-block {
     margin-bottom: 60px;
   }
   .icons-block:last-child {
     margin-bottom: 0px;
   }
 }
 /* .icons-block h2 {
   font-size: 25px;
   margin-bottom: 20px;
   font-weight: 400;
 } */
 .footer {
   height: auto;
   padding: 0;
   line-height: 67px;
   font-size: 14px;
   text-align: center;
 }
 @media (max-width: 575.98px) {
   .big-img {
     display: none;
   }
 }
 @media (min-width: 575.98px) and (max-width: 1024px) {
   .img-promo .big-img {
     display: none;
   }
 }
 .sm-img {
   display: none;
 }
 @media (max-width: 575.98px) {
   .sm-img {
     display: block;
   }
 }
 .md-img {
   display: none;
 }
 @media (min-width: 575.98px) and (max-width: 1024px) {
   .md-img {
     display: block;
   }
 }
  img.applelogo {
    width: 35px;
  }
  .container {
    padding: 0;
  }
  .download-button {
    white-space: nowrap;
  }
  .download-button img {
    /* top: 10px; */
    /* margin-top: -5px; */
  }

  /* h1,
  h2,
  h3,
  h4,
  h5 {
    line-height: 1.5em;
    margin-top: 0;
    margin-bottom: 0;
  } */
  /* ul {
    margin: 0;
  } */
  /* .slider li {
    float: none;
  } */

  .lightlink:visited, .lightlink, .lightlink:hover {
    color: white;
  }
  .lightlink:hover { text-decoration: underline;}
</style>

