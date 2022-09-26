const AboutUs = () => {
  let login = localStorage.getItem("token");
  return (
    <>
      <section id="intro">
        <div id="intro-info">
          <div>
            <h1>What is I-Class?</h1>
            <div id="intro-tag-btn">
              <span className="text-slate-500 w-10/12">
                I-Class is a website that allow teachers to manage a class
                better and a platform where get to attract student from learning{" "}
              </span>
              {login ? (
                <></>
              ) : (
                <a href="" class="brand-btn">
                  Register Now
                </a>
              )}
            </div>
          </div>
        </div>

        <div id="development-img" className="pb-10">
          <img
            src="https://img.freepik.com/premium-vector/teacher-with-student-isolated_97632-590.jpg?w=900"
            alt="Mobile App Development"
            title="Mobile App Development"
          />
        </div>
      </section>

      <footer>
        <div>
          <span class="logo">I-Class</span>
        </div>

        <div class="row">
          <div class="col-3">
            <span class="footer-cat">Solution</span>
            <ul class="footer-cat-links">
              <li>
                <a href="">
                  <span>Web App Development</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span>Android App Development</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span>ios App Development</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="col-3">
            <span class="footer-cat">Industries</span>
            <ul class="footer-cat-links">
              <li>
                <a href="">
                  <span>Education</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span>ECommerce</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span>Club</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="col-3">
            <span class="footer-cat">Quick Links</span>
            <ul class="footer-cat-links">
              <li>
                <a href="">
                  <span>Reviews</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span>Terms & Condition</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span>Disclaimer</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span>Site Map</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="col-3" id="newsletter">
            <div id="address">
              <span class="footer-cat">Office Location</span>
              <ul>
                <li>
                  <i class="far fa-building"></i>
                  <div>
                    Penang
                    <br />
                    Address: 2, Lebuh Acheh, George Town, 10300 George Town,
                    Pulau Pinang
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="copyright">&copy; All Rights Reserved by I-Class developer team</div>
      </footer>
    </>
  );
};

export default AboutUs;
