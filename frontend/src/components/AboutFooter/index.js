import React from "react";

function AboutFooter() {
  return (
    <div className="pad25 flx-space-around bg-gray-f3f2f0 font125 mrg-t-35">
      <div>
        @2023 SpotOnBnB
      </div>
      <div className="flx gap10p">
        <div>
          Dongliang Li
        </div>
        <div>
          <a href="https://github.com/dongliang09" target="_blank" rel="noopener noreferrer"
            className="color-main-gray color-black-hover">
            <i className="fab fa-github"></i>
          </a>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/dongliang-li-a9ab038a/" target="_blank" rel="noopener noreferrer"
            className="color-main-gray color-main-blue-hover" >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </div>
  )
}


export default AboutFooter
