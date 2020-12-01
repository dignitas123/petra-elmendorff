<template>
  <footer class="footer">
    <div style="text-align:center;"></div>
    <footer>
      <div class="container">
        <div class="row" style="margin-top:20px;">
          <div class="col-md-6 item text" style="margin-bottom: 0px;">
            <h3>Kontakt</h3>
            <ul>
              <li><a href="#">Petra Elmendorff</a></li>
              <li><a href="#">Ekkeberstr. 8 | D-79117 Freiburg</a></li>
              <li><a href="#">elmendorff.jsj@gmail.com</a></li>
            </ul>
          </div>
          <div class="col item social" style="margin-top:15px;">
            <a href="#"><i class="fa fa-facebook"></i></a
            ><a href="#"><i class="icon ion-social-youtube"></i></a>
          </div>
          <div class="col-sm-6 col-md-3 item">
            <h3>Newsletter</h3>
            <ul>
              <li></li>
            </ul>
            <div>
              <script
                type="text/javascript"
                src="https://klicktipp.s3.amazonaws.com/userimages/80432/forms/224065/57vuz1un2z8z5052.js"
              ></script>
              <iframe
                class="ktv2"
                src="https://klicktipp.s3.amazonaws.com/userimages/80432/forms/224065/57vuz1un2z8z5052.html"
                width="350"
                height="236"
                scrolling="no"
              ></iframe>
            </div>
          </div>
        </div>
        <div style="text-align:center;margin-top:-40px;">
          <h2 class="divider-style"></h2>
        </div>
        <p class="copyright">
          <span
            ><a href="#">Impressum</a><a href="#">LinDatenschutz</a
            ><a href="#">Links</a></span
          >
        </p>
      </div>
    </footer>
  </footer>
</template>

<script>
export default {
  data: data => {
    if (!data.$store.state) {
      return
    }
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/custom-properties.scss';

// newsletter input
.ktv2 {
  position: relative;
  display: inline-block;
  border: none;
  background: transparent none no-repeat scroll 0 0;
  margin: 0;
}

.divider-style {
  margin-top: 70px;
  position: relative;
  margin-right: 40px;
  margin-left: 40px;
  span {
    background: #fff;
    padding: 0 20px;
    position: relative;
    z-index: 5;
  }
  &::before {
    content: '';
    display: block;
    border-top: solid 1px rgb(143, 143, 143);
    width: 100%;
    height: 1px;
    position: absolute;
    top: 50%;
    z-index: 1;
  }
}

.footer {
  padding: 50px 0;
  color: #f0f9ff;
  background-color: #282d32;
  h3 {
    margin-top: 0;
    margin-bottom: 12px;
    font-weight: bold;
    font-size: 16px;
  }
  ul {
    padding: 0;
    list-style: none;
    line-height: 1.6;
    font-size: 14px;
    margin-bottom: 0;
    a {
      color: inherit;
      text-decoration: none;
      opacity: 0.6;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .item.text p {
    opacity: 0.6;
    margin-bottom: 0;
  }
  .item.text {
    margin-bottom: 36px;
  }
  .item.social {
    text-align: center;
    a {
      font-size: 20px;
      width: 36px;
      height: 36px;
      line-height: 36px;
      display: inline-block;
      text-align: center;
      border-radius: 50%;
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.4);
      margin: 0 8px;
      color: #fff;
      opacity: 0.75;
      &:hover {
        opacity: 0.9;
      }
    }
  }
  .copyright {
    text-align: center;
    padding-top: 24px;
    opacity: 0.3;
    font-size: 13px;
    margin-bottom: 0;
  }
}

@media (max-width: 767px) {
  .footer .item:not(.social) {
    text-align: center;
    padding-bottom: 20px;
  }
}

@media (max-width: 767px) {
  .footer .item.text {
    margin-bottom: 0;
  }
}

@media (max-width: 991px) {
  .footer .item.social {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
