import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './signup.css';

function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'DRIVER'
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({
            ...current,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            setLoading(true);

            await authService.register({
                username: form.username.trim(),
                password: form.password,
                email: form.email.trim(),
                role: form.role
            });

            setSuccess('Account created successfully. Redirecting to login...');

            setTimeout(() => {
                navigate('/login');
            }, 900);
        } catch (requestError) {
            console.error('Registration failed:', requestError);
            setError(
                requestError.response?.data?.message ||
                requestError.response?.data ||
                'Unable to create the account.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-brand">
                <div className="signup-brand-content">
                    <div className="signup-logo">🚚</div>

                    <span className="signup-eyebrow">FLEET MANAGEMENT PLATFORM</span>
                    <h1>Join FleetFocus</h1>
                    <p>
                        Create your account and get started with smarter fleet operations.
                    </p>

                    <div className="signup-points">
                        <div className="signup-point">
                            <span>✓</span>
                            <div>
                                <strong>Centralized Operations</strong>
                                <small>Manage fleet activity from one place.</small>
                            </div>
                        </div>

                        <div className="signup-point">
                            <span>✓</span>
                            <div>
                                <strong>Role-Based Access</strong>
                                <small>Work with the permissions for your role.</small>
                            </div>
                        </div>

                        <div className="signup-point">
                            <span>✓</span>
                            <div>
                                <strong>Secure Authentication</strong>
                                <small>Protected access to fleet operations.</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="signup-container">
                <form className="signup-card" onSubmit={handleSubmit}>
                    <div className="signup-header">
                        <div className="mobile-signup-logo">🚚</div>
                        <h2>Create Account</h2>
                        <p>Register your FleetFocus account</p>
                    </div>

                    {error && (
                        <div className="signup-message signup-error">
                            ⚠ {error}
                        </div>
                    )}

                    {success && (
                        <div className="signup-message signup-success">
                            ✓ {success}
                        </div>
                    )}

                    <div className="signup-field-row">
                        <div className="signup-input-group">
                            <label htmlFor="signup-username">Username</label>
                            <input
                                id="signup-username"
                                name="username"
                                type="text"
                                placeholder="Choose a username"
                                value={form.username}
                                required
                                autoComplete="username"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="signup-input-group">
                            <label htmlFor="signup-email">Email</label>
                            <input
                                id="signup-email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                required
                                autoComplete="email"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="signup-input-group">
                        <label htmlFor="signup-role">Role</label>
                        <select
                            id="signup-role"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                        >
                            <option value="DRIVER">Driver</option>
                            <option value="DISPATCHER">Dispatcher</option>
                            <option value="MAINTENANCE_TECH">Maintenance Technician</option>
                        </select>
                    </div>

                    <div className="signup-field-row">
                        <div className="signup-input-group">
                            <label htmlFor="signup-password">Password</label>
                            <input
                                id="signup-password"
                                name="password"
                                type="password"
                                placeholder="Create a password"
                                value={form.password}
                                required
                                minLength={6}
                                autoComplete="new-password"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="signup-input-group">
                            <label htmlFor="signup-confirm-password">Confirm Password</label>
                            <input
                                id="signup-confirm-password"
                                name="confirmPassword"
                                type="password"
                                placeholder="Re-enter password"
                                value={form.confirmPassword}
                                required
                                minLength={6}
                                autoComplete="new-password"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button
                        className="signup-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create FleetFocus Account'}
                    </button>

                    <p className="signup-login-link">
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
