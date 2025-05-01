import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
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
  cvError,
  coverLetterError,
}) => {
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const form = formRef.current;
    const errors = {};
    if (!form.fullName.value.trim()) errors.fullName = "Name is required.";
    if (!form.email.value.trim()) errors.email = "Email is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(e);
  };

  return (
    <Dialog open={showModal} onOpenChange={onClose}>
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
              <Label htmlFor="fullName">Name</Label>
              <Input type="text" name="fullName" id="fullName" />
              {formErrors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.fullName}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" id="email" />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="cover_letter">Cover Letter (PDF)</Label>
              <Input
                type="file"
                name="cover_letter"
                id="cover_letter"
                accept="application/pdf"
                onChange={onFileChange}
              />
              {coverLetterError && (
                <p className="text-red-500 text-sm mt-1">{coverLetterError}</p>
              )}
            </div>

            <div>
              <Label htmlFor="cv">Resume/CV (PDF)</Label>
              <Input
                type="file"
                name="cv"
                id="cv"
                accept="application/pdf"
                onChange={onFileChange}
              />
              {cvError && (
                <p className="text-red-500 text-sm mt-1">{cvError}</p>
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
  cvError: PropTypes.string,
  coverLetterError: PropTypes.string,
};

export default ApplicationModal;
