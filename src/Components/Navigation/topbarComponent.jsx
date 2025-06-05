import React from "react";
import "./topbarComponent.css";

const TopbarComponent = () => (
  <header className="topbar">
    <div className="topbar__left">
      <span className="topbar__logo">DaLatOrchidLab Logo</span>
      <span className="topbar__title">Create Method</span>
    </div>
    <div className="topbar__right">
      <div className="topbar__user">
        <div className="topbar__avatar">
          {/* Có thể thay bằng ảnh thật nếu có */}
          <span>NV</span>
        </div>
        <div>
          <div className="topbar__username">Nguyễn Văn A</div>
          <div className="topbar__role">Researcher</div>
        </div>
      </div>
    </div>
  </header>
);

export default TopbarComponent;