import React, { useState } from 'react'
import './PostPaymentForm.css'
import clevertap from '../hooks/clevertap'
import { trackCustomEvent } from '../hooks/meta'
import { usePrice } from '../hooks/usePrice'

const BACKEND_URL = import.meta.env.REACT_APP_BACKEND_URL;

const FIELDS = [
  { name: 'phone',      label: 'WhatsApp Number',        type: 'tel',      placeholder: '98XXXXXXXX', required: true, prefix: '+91' },
  { name: 'gender',     label: 'Gender',                 type: 'select',   required: true,
    options: ['Female', 'Male', 'Non-binary', 'Prefer not to say'] },
  { name: 'city',       label: 'City',                   type: 'text',     placeholder: 'Mumbai, Delhi…', required: true },
  { name: 'state',      label: 'State',                  type: 'text',     placeholder: 'Maharashtra…',   required: true },
  { name: 'occupation', label: 'Occupation',             type: 'select',   required: true,
    options: ['Student', 'Working Professional', 'Homemaker', 'Freelancer / Self-employed', 'Beauty Professional', 'Other'] },
  { name: 'reason',     label: 'Why do you want to learn?', type: 'textarea', placeholder: 'I want to do my own makeup for events…', required: false },
]

export default function PostPaymentForm({ paymentData, courseAmount, razorpayOrderId, onComplete }) {
  const { urgencyVariant } = usePrice()
  const [form, setForm]           = useState({ phone: '', gender: '', city: '', state: '', occupation: '', reason: '' })
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors]       = useState({})

  const validate = () => {
    const errs = {}
    FIELDS.forEach(f => {
      if (f.required && !form[f.name]?.trim()) errs[f.name] = 'This field is required'
    })
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setSubmitting(true)
    try {
      await fetch(`${BACKEND_URL}/api/save-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: paymentData.name,
          email: paymentData.email,
          phone: paymentData.phone,
          razorpayOrderId,
          whatsappPhone: form.phone,
          gender: form.gender,
          city: form.city,
          state: form.state,
          occupation: form.occupation,
          reason: form.reason,
        }),
      })
    } catch (e) {
      console.error('Profile save error:', e)
    } finally {
      clevertap.profile.push({
        Site: {
          Gender: form.gender === 'Female' ? 'F' : form.gender === 'Male' ? 'M' : undefined,
          City: form.city,
          State: form.state,
        },
      })
      clevertap.event.push('Profile Completed', {
        gender: form.gender,
        city: form.city,
        state: form.state,
        occupation: form.occupation,
        pricing_variant: `pricing_${courseAmount}`,
        urgency_variant: urgencyVariant,
        name: paymentData.name,
        phone: paymentData.phone,
      })
      trackCustomEvent('Profile Completed', {
        gender: form.gender,
        city: form.city,
        state: form.state,
        occupation: form.occupation,
        pricing_variant: `pricing_${courseAmount}`,
        name: paymentData.name,
        phone: paymentData.phone,
      })
      setSubmitting(false)
      onComplete(form)
    }
  }

  const set = (name, value) => {
    setForm(f => ({ ...f, [name]: value }))
    setErrors(er => ({ ...er, [name]: '' }))
  }

  return (
    <div className="ppf-overlay">
      <div className="ppf-modal">
        <div className="ppf-blob ppf-blob-1" />
        <div className="ppf-blob ppf-blob-2" />

        <div className="ppf-header">
          <h2 className="ppf-title">Tell us about <em>yourself</em></h2>
          <p className="ppf-subtitle">Help us personalise your experience ✨</p>
        </div>

        <div className="ppf-body">
          {FIELDS.map(field => (
            <div className="ppf-field" key={field.name}>
              <label className="ppf-label">
                {field.label}
                {field.required && <span className="ppf-required">*</span>}
              </label>

              {field.type === 'select' ? (
                <div className="ppf-select-wrap">
                  <select
                    className={`ppf-select ${errors[field.name] ? 'ppf-error' : ''}`}
                    value={form[field.name]}
                    onChange={e => set(field.name, e.target.value)}
                  >
                    <option value="">Choose…</option>
                    {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <span className="ppf-select-arrow">▾</span>
                </div>

              ) : field.type === 'textarea' ? (
                <textarea
                  className={`ppf-textarea ${errors[field.name] ? 'ppf-error' : ''}`}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  rows={3}
                  onChange={e => set(field.name, e.target.value)}
                />

              ) : (
                <div className={`ppf-input-wrap ${field.prefix ? 'ppf-has-prefix' : ''}`}>
                  {field.prefix && <span className="ppf-tel-prefix">{field.prefix}</span>}
                  <input
                    className={`ppf-input ${errors[field.name] ? 'ppf-error' : ''}`}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={e => set(field.name, e.target.value)}
                  />
                </div>
              )}

              {errors[field.name] && <span className="ppf-error-msg">{errors[field.name]}</span>}
            </div>
          ))}
        </div>

        <div className="ppf-footer">
          <button className="ppf-next-btn" onClick={handleSubmit} disabled={submitting}>
            {submitting
              ? <span className="ppf-spinner" />
              : <>Complete & Continue →</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}