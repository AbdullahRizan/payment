import React from 'react'

const About = () => {
  return (
    <>
          <div className="container-fluid p-5">
              <div className="row gx-5">
                  <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: 500 }}>
                      <div className="position-relative h-100">
                          <img className="position-relative w-100 h-100 rounded" src="img/about.jpg" style={{ objectFit: 'cover' }} />
                      </div>
                  </div>
                  <div className="col-lg-7">
                      <div className="mb-4">
                          <h1 className="display-3 text-uppercase mb-0">Welcome to Gymster</h1>
                      </div>
                      <h4 className="text-body mb-4">your safety is our top priority</h4>
                      <p className="mb-4">Whether you are a fitness enthusiast, a beginner, or someone who is looking to make a lifestyle change, we have got you covered. Join us today and let us help you achieve your fitness goals!
</p>
                      <div className="rounded bg-dark p-5">
                          <ul className="nav nav-pills justify-content-between mb-3">
                              <li className="nav-item w-50">
                                  <a className="nav-link text-uppercase text-center w-100 active" data-bs-toggle="pill" href="#pills-1">About Us</a>
                              </li>
                              <li className="nav-item w-50">
                                  <a className="nav-link text-uppercase text-center w-100" data-bs-toggle="pill" href="#pills-2">Why Choose Us</a>
                              </li>
                          </ul>
                          <div className="tab-content">
                              <div className="tab-pane fade show active" id="pills-1">
                                  <p className="text-secondary mb-0">GYMSTER is a state-of-the-art facility that is designed to provide you with an exceptional fitness experience. We are committed to helping you achieve your fitness goals by providing you with world-class facilities, expert trainers, and personalized training programs.
</p>
                              </div>
                              <div className="tab-pane fade" id="pills-2">
                                  <p className="text-secondary mb-0">Choose GYMSTER for state-of-the-art facilities, expert trainers, and personalized training programs tailored to your fitness goals and level. GYMSTER offer a safe and hygienic environment, a community of fitness enthusiasts, and affordable pricing. Join us today and experience the difference!
</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          {/* About End */}

    
    
    </>
  )
}

export default About
