import React from 'react'
import '../MissionValues/MissionValues.css'
import { Target, Eye, Users, Lightbulb } from 'lucide-react'

const MissionValues = () => {
  return (
    <div className="missionvalues">

<section className="mission-values">
  <div className="mission-values-container">
    <div className="mission-card">
      <div className="mission-icon">
        <Target />
      </div>
      <div className="mission-title">Our Mission</div>
      <div className="mission-description">
        <p>To empower businesses with innovative solutions that drive growth and success.</p>
      </div>
    </div>

    <div className="mission-card">
      <div className="mission-icon">
        <Eye />
      </div>
      <div className="mission-title">Our Vision</div>
      <div className="mission-description">
        <p>To be a global leader in delivering cutting-edge solutions that redefine industries.</p>
      </div>
    </div>
  </div>
</section>;


    <section className="core-values">
  <div className="core-values-container">
    <div className="core-values-header-title">
      <h2>Our Core Values</h2>
    </div>
    <div className="values-grid">
      <div className="values-card">
        <div className="values-icon">
          <Lightbulb />
        </div>
        <div className="values-title">Innovation</div>
        <div className="values-description">
          <p>To empower businesses with innovative solutions that drive growth and success.</p>
        </div>
      </div>
      <div className="values-card">
        <div className="values-icon">
          <Users />
        </div>
        <div className="values-title">Our Clients</div>
        <div className="values-description">
          <p>We prioritize our clients by delivering high-quality solutions tailored to their needs.</p>
        </div>
      </div>
      <div className="values-card">
        <div className="values-icon">
          <Eye />
        </div>
        <div className="values-title">Our Team</div>
        <div className="values-description">
          <p>We foster a collaborative and supportive environment to drive team success.</p>
        </div>
      </div>
    </div>
  </div>
</section>;
    </div>
    
  )
}

export default MissionValues
