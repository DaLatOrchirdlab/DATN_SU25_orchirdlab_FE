import React from "react";
import "./createTaskStepper.css"; // Tạo file css riêng nếu cần

const steps = [
  { label: "Basic Info" },
  { label: "Cage" },
  { label: "Technician" },
  { label: "Review" }
];

const CreateTaskStepper = ({ currentStep = 1 }) => (
  <div className="stepper">
    {steps.map((step, idx) => (
      <React.Fragment key={step.label}>
        <div className={`stepper__step${currentStep === idx + 1 ? " stepper__step--active" : ""}`}>
          <div className="stepper__circle">{idx + 1}</div>
          <div className="stepper__label">{step.label}</div>
        </div>
        {idx < steps.length - 1 && <div className="stepper__line" />}
      </React.Fragment>
    ))}
  </div>
);

export default CreateTaskStepper;
