'use client';

import { useState, FormEvent } from 'react';
import { Form, TextInput, TextArea, Button } from '@carbon/react';
import { Analytics, Checkmark } from '@carbon/icons-react';

interface TicketInputFormProps {
  onSubmit: (title: string, description: string) => void;
  loading?: boolean;
  initialTitle?: string;
  initialDescription?: string;
}

interface FormErrors {
  title?: string;
  description?: string;
}

export default function TicketInputForm({
  onSubmit,
  loading = false,
  initialTitle = '',
  initialDescription = ''
}: TicketInputFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({ title: false, description: false });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.trim().length < 50) {
      newErrors.description = `Description must be at least 50 characters (current: ${description.trim().length})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ title: true, description: true });

    if (validateForm()) {
      onSubmit(title.trim(), description.trim());
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (touched.title) {
      validateForm();
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    if (touched.description) {
      validateForm();
    }
  };

  const handleTitleBlur = () => {
    setTouched(prev => ({ ...prev, title: true }));
    validateForm();
  };

  const handleDescriptionBlur = () => {
    setTouched(prev => ({ ...prev, description: true }));
    validateForm();
  };

  return (
    <Form onSubmit={handleSubmit} aria-label="Ticket input form">
      <div className="space-y-7">
        <div className="relative">
          <TextInput
            id="ticket-title"
            labelText="Ticket Title *"
            placeholder="e.g., Login page not loading"
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            invalid={touched.title && !!errors.title}
            invalidText={errors.title}
            disabled={loading}
            required
            aria-required="true"
          />
          {title && !errors.title && (
            <div className="absolute right-3 top-10 text-green-500">
              <Checkmark size={20} />
            </div>
          )}
        </div>

        <div className="relative mt-6">
          <TextArea
            id="ticket-description"
            labelText="Ticket Description *"
            placeholder="Provide a detailed description of the issue. Include what happened, when it started, and any error messages you've seen..."
            value={description}
            onChange={handleDescriptionChange}
            onBlur={handleDescriptionBlur}
            invalid={touched.description && !!errors.description}
            invalidText={errors.description}
            disabled={loading}
            rows={7}
            required
            aria-required="true"
            helperText={
              <span className={description.length >= 50 ? 'text-green-600 dark:text-green-400 font-medium' : 'text-gray-700 dark:text-gray-300'}>
                {description.length} / 50 characters minimum
                {description.length >= 50 && ' ready'}
              </span>
            }
          />
        </div>

        <Button
          type="submit"
          disabled={loading || !title.trim() || !description.trim() || description.trim().length < 50}
          className="w-full min-h-[48px] font-semibold text-base"
          renderIcon={loading ? undefined : Analytics}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            'Analyze ticket'
          )}
        </Button>
        
        {!loading && title.trim() && description.trim().length >= 50 && (
          <div className="text-center mt-4">
            <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
              Ready to analyze
            </p>
          </div>
        )}
      </div>
    </Form>
  );
}

// Made with Bob
