'use client';

import { useState, useRef, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import styles from './ContactForm.module.css';

type FormData = {
    name: string;
    email: string;
    message: string;
};

type FormErrors = {
    name?: string;
    email?: string;
    message?: string;
};

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<FormStatus>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Validate name
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Validate message
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setStatus('sending');
        setStatusMessage('');

        try {
            // EmailJS configuration
            // You need to replace these with your actual EmailJS credentials
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

            if (!formRef.current) {
                throw new Error('Form reference not found');
            }

            await emailjs.sendForm(
                serviceId,
                templateId,
                formRef.current,
                publicKey
            );

            setStatus('success');
            setStatusMessage('Thank you! Your message has been sent successfully.');

            // Reset form
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus('error');
            setStatusMessage('Failed to send message. Please try again or contact me directly via email.');
        }
    };

    return (
        <div className={styles.contactFormContainer}>
            <h3 className={styles.formTitle}>Send me a message</h3>

            {status === 'success' && (
                <div className={styles.successMessage}>
                    {statusMessage}
                </div>
            )}

            {status === 'error' && (
                <div className={styles.errorMessage}>
                    {statusMessage}
                </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                        placeholder="Your name"
                        disabled={status === 'sending'}
                    />
                    {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        placeholder="your.email@example.com"
                        disabled={status === 'sending'}
                    />
                    {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.label}>Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                        placeholder="Your message..."
                        rows={5}
                        disabled={status === 'sending'}
                    />
                    {errors.message && <span className={styles.fieldError}>{errors.message}</span>}
                </div>

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={status === 'sending'}
                >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
}
