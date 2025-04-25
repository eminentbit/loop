import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { X } from "lucide-react";
import PropTypes from "prop-types";

const ApplicationModal = ({
  jobTitle,
  showModal,
  onClose,
  onSubmit,
  formRef,
  submitting,
  submitted,
  onFileChange,
  fileErrors,
  className,
}) => {
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const form = formRef.current;
    const errors = {};

    if (!form.name.value.trim()) errors.name = "Name is required.";
    if (!form.email.value.trim()) errors.email = "Email is required.";
    if (!form.coverLetter.value.trim())
      errors.coverLetter = "Cover letter is required.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData(formRef.current);
    await onSubmit(formData);
  };

  return (
    <Dialog open={showModal} onOpenChange={onClose} className={className}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
          <Button
            variant="ghost"
            className="absolute top-4 right-4"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        {!submitted ? (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input type="text" name="name" id="name" required />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" id="email" required />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="coverLetter">Cover Letter</Label>
              <Textarea name="coverLetter" id="coverLetter" rows={5} required />
              {formErrors.coverLetter && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.coverLetter}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="resume">Resume (PDF, max 5MB)</Label>
              <Input
                type="file"
                id="resume"
                accept="application/pdf"
                onChange={onFileChange}
              />
              {fileErrors && (
                <p className="text-red-500 text-sm mt-1">{fileErrors}</p>
              )}
            </div>
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Application Submitted!</h3>
            <p>Thank you for applying. We&apos;ll get back to you soon.</p>
            <Button onClick={onClose}>Close</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

ApplicationModal.propTypes = {
  jobTitle: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formRef: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitted: PropTypes.bool.isRequired,
  onFileChange: PropTypes.func.isRequired,
  fileErrors: PropTypes.string,
  className: PropTypes.string,
};

export default ApplicationModal;
